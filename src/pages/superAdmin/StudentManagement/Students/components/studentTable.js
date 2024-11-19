import React, { useCallback, useMemo, useState } from "react";
import {
	Badge,
	ButtonDropdown,
	CenteredDialog,
	ConfirmationModal,
	Search,
	TMTable
} from "../../../../../ui_elements";
import { PAGESIZE, SEARCH_DELAY } from "../../../../../utils/constants";
import { useDebouncedCallback } from "use-debounce";
import { useHistory } from "react-router-dom";
import {
	getAllStudentsUrl,
	initiateImpersonationProcessUrl,
	toggleUserActivationStatusUrl
} from "../../../../../api/urls";
import { useApiGet, useApiPost, useApiPut } from "../../../../../api/apiCall";
import useAuthAction from "../../../../../custom-hooks/useAuthAction";
import { DeactivateStudentModal } from "./deactivateStudentModal";
import { ActivateStudentModal } from "./activateStudentModal";
import { useQueryClient } from "react-query";

export const StudentTable = ({
	filter,
	title,
	allSessions,
	allRoles,
	isFacultyPage
}) => {
	const { push } = useHistory();
	const [searchTerm, setSearchTerm] = useState("");
	const queryClient = useQueryClient();
	const [editData, setEditData] = useState(null);
	const [editOpen, setEditOpen] = useState(false);
	const [deactiveOpen, setDeactivateOpen] = useState(false);
	const [openImpersonate, setOpenImpersonate] = useState(false);
	const [openActivateUser, setOpenActivateUser] = useState(false);
	const { mutate: toggle, isLoading: isPosting } = useApiPut();
	const debouncedSearch = useDebouncedCallback(
		(value) => {
			setSearchTerm(value);
		},
		// delay in ms
		SEARCH_DELAY.sm
	);
	const [pageNumber, setPageNumber] = useState(1);
	const pageSize = PAGESIZE.sm;

	const { mutate, isLoading: isImpersonating } = useApiPost();
	const { logout } = useAuthAction();
	const { data, isLoading, isFetching } = useApiGet(
		isFacultyPage
			? getAllStudentsUrl({
					...filter,
					pageSize,
					pageNumber,
					searchTerm
			  })
			: getAllStudentsUrl({
					pageSize,
					pageNumber,
					searchTerm
			  }),
		{
			enabled: isFacultyPage ? !!filter.studentTypeId : true,
			keepPreviousData: true,
			refetchOnWindowFocus: false
		}
	);

	const impersonateUser = () => {
		const requestDet = {
			url: initiateImpersonationProcessUrl(),
			data: {
				userIdToImpersonate: editData?.userId
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				setOpenImpersonate(false);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Impersonation Action Success!",
					body: `You have successfully, initiated impersonation on ${editData?.fullname}. Kindly check your email address to continue.`
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				logout();
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Impersonation Action Failed!",
					body:
						response?.data?.message ||
						`User wasn't impersonated successfully`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	const toggleUserActivation = useCallback(() => {
		const requestDet = {
			url: toggleUserActivationStatusUrl(editData?.userId)
		};
		toggle(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getAllStudentsUrl({
						...filter,
						pageNumber,
						searchTerm
					})
				);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "User Action Success!",
					body: `User was updated successfully!`
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				setOpenActivateUser(false);
			},
			onError: () => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "User Action Success!",
					body: `User wasn't updated successfully!`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	}, [filter, pageNumber, editData, queryClient, searchTerm, toggle]);

	const columns = useMemo(
		() => [
			{
				Header: "S/N",
				accessor: "serialNo",
				Cell: ({ cell: { row } }) => (
					<div>
						<span>
							{pageSize * (pageNumber - 1) + (row.index + 1)}
						</span>
					</div>
				)
			},
			{
				Header: "Full Name",
				accessor: "fullName"
			},
			{
				Header: "Matric No",
				accessor: "matricNumber"
			},
			{
				Header: "Jamb No",
				accessor: "jambRegNumber"
			},
			{
				Header: "Department",
				accessor: "department"
			},
			{
				Header: "Sex",
				accessor: "gender"
			},
			{
				Header: "Status",
				accessor: "status",
				Cell: ({ cell: { row } }) => {
					return (
						<Badge
							item={{
								title:
									row?.original?.role === "student"
										? "Active"
										: row?.original?.role,
								type: statusOptions[row?.original?.role]
							}}
						/>
					);
				}
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => {
					const { userId, fullname, role } = row.original;
					const buttonGroup = [
						{
							name: "View Profile",
							onClick: () =>
								push({
									pathname: "/student_management/view/edit",
									state: {
										refCode: userId
									}
								})
						},
						{
							name: "Change Status",
							onClick: () => {
								setEditData(row.original);
								role === "student"
									? setDeactivateOpen(true)
									: setEditOpen(true);
							}
						},
						{
							name: row.original.active
								? "Deactivate User"
								: "Activate User",
							onClick: () => {
								setEditData(row.original);
								setOpenActivateUser(true);
							}
						},
						{
							name: "Impersonate User",
							onClick: () => {
								setEditData(row.original);
								setOpenImpersonate(true);
							}
						},
						{
							name: "Manage Claims",
							onClick: () => {
								push({
									pathname: `/student_management/manage_claims`,
									state: {
										userId,
										name: fullname
									}
								});
							}
						}
					];
					return <ButtonDropdown buttonGroup={buttonGroup} />;
				}
			}
		],
		[pageSize, pageNumber, push]
	);
	return (
		<>
			<CenteredDialog
				modalId="deactive_student"
				isOpen={deactiveOpen}
				closeModal={() => setDeactivateOpen(false)}
				width={1000}
				formTitle="Change Status"
			>
				<DeactivateStudentModal
					userId={editData?.userId}
					filter={filter}
					pageNumber={pageNumber}
					searchTerm={searchTerm}
					closeModal={() => setDeactivateOpen(false)}
					allSessions={allSessions}
					allRoles={allRoles}
				/>
			</CenteredDialog>
			<CenteredDialog
				modalId="edit_user"
				isOpen={editOpen}
				closeModal={() => setEditOpen(false)}
				width={705}
				formTitle="Activate Student"
			>
				<ActivateStudentModal
					studentData={editData}
					closeModal={() => setEditOpen(false)}
					filter={filter}
					pageNumber={pageNumber}
					searchTerm={searchTerm}
				/>
			</CenteredDialog>
			<ConfirmationModal
				isOpen={openImpersonate}
				closeModal={() => setOpenImpersonate(false)}
				handleClick={impersonateUser}
				message={`You are about to initiate an impersonation process for ${editData?.fullName}. Do you wish to continue?`}
				formTitle="Impersonate user"
				buttonLabel="Yes, Impersonate"
				isDeleteModal={false}
				isLoading={isImpersonating}
			/>
			<ConfirmationModal
				isOpen={openActivateUser}
				closeModal={() => setOpenActivateUser(false)}
				handleClick={toggleUserActivation}
				message={`You are about to ${
					editData?.active ? "deactivate" : "activate"
				}  ${editData?.fullName}. Do you wish to continue?`}
				formTitle={`${
					editData?.active ? "Deactivate User" : "Activate User"
				}`}
				buttonLabel={`Yes, ${
					editData?.active ? "Deactivate" : "Activate"
				}`}
				isDeleteModal={editData?.active}
				isLoading={isPosting}
			/>
			<TMTable
				columns={columns}
				data={data?.data?.items || []}
				title={title}
				additonalTitleData={
					<div className="d-flex align-items-center">
						<Search
							placeholder="Search for student name or JAMB REG NO "
							onChange={(e) => {
								debouncedSearch(e.target.value);
								setPageNumber(1);
							}}
						/>
					</div>
				}
				loading={isLoading || isFetching}
				setPageNumber={setPageNumber}
				availablePages={data?.data?.metaData.totalPages}
			/>
		</>
	);
};

const statusOptions = {
	student: "success",
	suspended: "warning",
	withdrawn: "rejected",
	expelled: "rejected",
	deferred: "warning"
};

import React, { useMemo, useState } from "react";
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
	initiateImpersonationProcessUrl
} from "../../../../../api/urls";
import { useApiGet, useApiPost } from "../../../../../api/apiCall";
import useAuthAction from "../../../../../custom-hooks/useAuthAction";
import { DeactivateStudentModal } from "./deactivateStudentModal";
import { ActivateStudentModal } from "./activateStudentModal";

export const StudentTable = ({
	filter,
	title,
	allSessions,
	allRoles,
	isFacultyPage
}) => {
	const { push } = useHistory();
	const [searchTerm, setSearchTerm] = useState("");
	const [editData, setEditData] = useState(null);
	const [editOpen, setEditOpen] = useState(false);
	const [deactiveOpen, setDeactivateOpen] = useState(false);
	const [openImpersonate, setOpenImpersonate] = useState(false);
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
							name:
								role === "student" ? "Deactivate" : "Activate",
							onClick: () => {
								setEditData(row.original);
								role === "student"
									? setDeactivateOpen(true)
									: setEditOpen(true);
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
				formTitle="Dectivate"
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

import React, { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useApiPost } from "../../../../../../api/apiCall";
import { initiateImpersonationProcessUrl } from "../../../../../../api/urls";
import useAuthAction from "../../../../../../custom-hooks/useAuthAction";
import {
	Badge,
	ButtonDropdown,
	CenteredDialog,
	ConfirmationModal,
	Search,
	TMTable,
	ToggleElement
} from "../../../../../../ui_elements";

import { AddUser } from "./addUser";
import { EditUser } from "./editUser";

export const Table = ({
	data,
	addOpen,
	allDepartments,
	allRoles,
	paginationProps,
	setAddOpen,
	setPageNumber,
	pageNumber,
	pageSize,
	searchValue,
	debouncedSearch,
	hasPerformedQuery,
	allStudentTypes,
	loading,
	onSubmit,
	isPosting,
	filter
}) => {
	const [editOpen, setEditOpen] = useState(false);
	const [editData, setEditData] = useState({});
	const { push } = useHistory();
	const [openImpersonate, setOpenImpersonate] = useState(false);
	const { mutate, isLoading } = useApiPost();
	const { logout } = useAuthAction();

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
					body: `You have successfully, initiated impersonation on ${editData?.userName}. Kindly check your email address to continue.`
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
				Header: "Fullname",
				Cell: ({
					cell: {
						row: { original }
					}
				}) => {
					return `${original?.lastName ?? ""} ${
						original?.firstName ?? ""
					} ${original?.middleName ?? ""}`;
				}
			},
			{
				Header: "Email",
				accessor: "email"
			},
			{
				Header: "Role",
				accessor: "role"
			},
			{
				Header: "Student Type",
				accessor: "studentType"
			},
			{
				Header: "Department",
				accessor: "department"
			},
			{
				Header: "Status",
				accessor: "isCleared",
				Cell: ({ cell: { row } }) => {
					return (
						<Badge
							item={{
								title: row.original.status,
								type:
									row.original.status === "Activated"
										? "success"
										: "fail"
							}}
						/>
					);
				}
			},

			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => {
					const { userId, status } = row.original;
					const buttonGroup = [
						{
							name: "Manage Claims",
							onClick: () => {
								push({
									pathname: `/user_management/users/management`,
									state: {
										userId: row?.original?.userId,
										name: `${
											row?.original?.surname ?? ""
										} ${row?.original?.firstname ?? ""}`
									}
								});
							}
						},
						{
							name: "Edit",
							onClick:
								row.original.role === "student"
									? () =>
											push({
												pathname:
													"/user_management/users/edit",
												state: {
													refCode:
														row.original.userId,
													fromUserManagement: true
												}
											})
									: () => {
											setEditData(row.original);
											setEditOpen(true);
									  }
						},
						{
							name: "Impersonate User",
							onClick: () => {
								setEditData(row.original);
								setOpenImpersonate(true);
							},
							disabled: !row.original.allowImpersonation
						}
					];
					return (
						<div className="d-flex align-items-center">
							<ToggleElement
								id={`cleareance-status-${status}`}
								checked={status === "Activated"}
								onChange={() => onSubmit(userId)}
								isDisabled={isPosting}
							/>
							<ButtonDropdown buttonGroup={buttonGroup} />
						</div>
					);
				}
			}
		],
		[
			pageNumber,
			pageSize,
			setEditOpen,
			setEditData,
			isPosting,
			onSubmit,
			push
		]
	);

	return (
		<div>
			<CenteredDialog
				modalId="add_user"
				isOpen={addOpen}
				closeModal={() => setAddOpen(false)}
				width={705}
				formTitle="Add user"
			>
				<AddUser
					allRoles={allRoles}
					allDepartments={allDepartments}
					allStudentTypes={allStudentTypes}
					data={editData}
					currentFilterState={{ ...filter, pageNumber, searchValue }}
					closeModal={() => setAddOpen(false)}
				/>
			</CenteredDialog>
			<CenteredDialog
				modalId="edit_user"
				isOpen={editOpen}
				closeModal={() => setEditOpen(false)}
				width={705}
				formTitle="Edit User"
			>
				<EditUser
					allRoles={allRoles}
					allDepartments={allDepartments}
					allStudentTypes={allStudentTypes}
					data={editData}
					currentFilterState={{ ...filter, pageNumber, searchValue }}
					closeModal={() => setEditOpen(false)}
				/>
			</CenteredDialog>
			<ConfirmationModal
				isOpen={openImpersonate}
				closeModal={() => setOpenImpersonate(false)}
				handleClick={impersonateUser}
				message={`You are about to initiate an impersonation process for ${editData?.userName}. Do you wish to continue?`}
				formTitle="Impersonate user"
				buttonLabel="Yes, Impersonate"
				isDeleteModal={false}
				isLoading={isLoading}
			/>
			<TMTable
				columns={columns}
				data={data}
				title=" "
				additonalTitleData={
					<>
						{true && (
							<div className="d-flex align-items-center">
								<Search
									placeholder="Search for student name or JAMB REG NO "
									onChange={(e) => {
										debouncedSearch(e.target.value);
										setPageNumber(1);
									}}
								/>
							</div>
						)}
					</>
				}
				availablePages={paginationProps.totalPages}
				setPageNumber={setPageNumber}
				hasPerformedQuery={hasPerformedQuery}
				searchParams={searchValue}
				loading={loading || isPosting}
			/>
		</div>
	);
};

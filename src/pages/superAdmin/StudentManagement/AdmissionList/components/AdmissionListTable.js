import React, { useMemo, useState } from "react";
import { useQueryClient } from "react-query";
// import { useHistory } from "react-router-dom";
import { useApiDelete } from "../../../../../api/apiCall";
import {
	deleteAdmissionListUrl,
	deleteAdmissionListRecordUrl,
	getAdmissionList,
	getSearchAdmissionList
} from "../../../../../api/urlCategories/AdmissionList";
import {
	Button,
	Search,
	TMTable,
	CenteredDialog,
	ConfirmationModal
} from "../../../../../ui_elements";
import { removeFalsy } from "../../../../../utils/removeFalsy";
import { EditRowOnAdmissionList } from ".././components";

export default function AdmissionListTable({
	data,
	paginationProps,
	setPageNumber,
	pageNumber,
	pageSize,
	searchTerm,
	hasPerformedQuery,
	loading,
	debouncedSearch,
	allSessions,
	allDepartments,
	allStudentModes,
	allStudentTypes,
	allAdmissionTypes,
	isFacultyPage,
	setValue,
	filter,
	setSearchStudentType,
	isDepartmentLoading
}) {
	const [isDeleteAll, setIsDeleteAll] = useState(false);
	const [editData, setEditData] = useState({});
	const [editOpen, setEditOpen] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const { mutate, isLoading: isDeleting } = useApiDelete();
	const queryClient = useQueryClient();
	// const history = useHistory();

	const cacheData = queryClient.getQueryData(
		isFacultyPage
			? getAdmissionList({
					...filter,
					pageNumber,
					pageSize,
					searchTerm
			  })
			: getSearchAdmissionList({
					pageSize,
					pageNumber,
					searchTerm
			  })
	);

	console.log(pageNumber)

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
				Header: "Reg No.",
				accessor: "regNumber"
			},
			{
				Header: "Surname",
				accessor: "lastname"
			},
			{
				Header: "First Name",
				accessor: "firstname"
			},
			{
				Header: "Middle Name",
				accessor: "middlename"
			},
			{
				Header: "Supervisor",
				accessor: "supervisor",
				Cell: ({ cell: { row } }) => (
					<>{row.original.supervisor || "-"}</>
				)
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => (
					<div>
						<Button
							data-cy="edit"
							label="Edit"
							buttonClass="standard"
							onClick={() => {
								setEditData(row.original);
								setEditOpen(true);
								setSearchStudentType(
									row.original.studentTypeId
								);
							}}
						/>
						<Button
							data-cy="delete"
							label="Delete"
							buttonClass="standard-danger"
							onClick={() => {
								setEditData(row.original);
								setOpenDelete(true);
							}}
						/>
					</div>
				)
			}
		],
		[pageNumber, pageSize, setSearchStudentType]
	);

	const deleteAdmissionList = () => {
		const filterWithoutFalsy = removeFalsy(filter);

		const requestBody = {
			url: isDeleteAll
				? deleteAdmissionListUrl(filterWithoutFalsy)
				: deleteAdmissionListRecordUrl(editData.admissionListId),
			data: isDeleteAll
				? null
				: { admissionListId: editData.admissionListId }
		};

		mutate(requestBody, {
			onSuccess: (data) => {
				queryClient.invalidateQueries(
					isFacultyPage
						? getAdmissionList({
								...filter,
								pageNumber,
								pageSize,
								searchTerm
						  })
						: getSearchAdmissionList({
								pageSize,
								pageNumber,
								searchTerm
						  })
				);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Admission List ",
					body: "Admission List deleted successfully"
				});
				// if (isDeleteAll) history.push("/admission_list");
				setOpenDelete(false);
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Failed!",
					body:
						response?.data?.message ||
						response?.data?.title ||
						"Something went wrong"
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	return (
		<div>
			<CenteredDialog
				modalId="edit_course"
				isOpen={editOpen}
				closeModal={() => setEditOpen(false)}
				width={705}
				formTitle="Edit Student Record"
			>
				<EditRowOnAdmissionList
					editData={editData}
					allSessions={allSessions}
					allDepartments={allDepartments}
					allStudentModes={allStudentModes}
					allStudentTypes={allStudentTypes}
					allAdmissionTypes={allAdmissionTypes}
					setEditOpen={setEditOpen}
					filter={filter}
					setValue={setValue}
					pageNumber={pageNumber}
					searchTerm={searchTerm}
					pageSize={pageSize}
					isFacultyPage={isFacultyPage}
					isDepartmentLoading={isDepartmentLoading}
				/>
			</CenteredDialog>
			<ConfirmationModal
				isOpen={openDelete}
				closeModal={() => {
					setIsDeleteAll(false);
					setOpenDelete(false);
				}}
				formTitle="Delete Student Record"
				message={
					<div className="mb-4">
						<span>
							Are you sure you want to{" "}
							{isDeleteAll ? (
								<span>
									<strong className="u-alt-text-color">
										delete all
									</strong>{" "}
									the records on the admission list?.{" "}
								</span>
							) : (
								"delete the record of "
							)}
						</span>
						{!isDeleteAll && (
							<strong className="u-alt-text-color">{` ${
								editData?.lastname ?? ""
							} ${editData?.firstname ?? ""} ${
								editData?.middlename ?? ""
							}?. `}</strong>
						)}
						<span>This action cannot be undone.</span>
					</div>
				}
				buttonLabel="Delete Record"
				handleClick={deleteAdmissionList}
				isLoading={isDeleting}
			/>
			<TMTable
				columns={columns}
				data={data}
				title="Records"
				pageNumber={pageNumber}
				additonalTitleData={
					<div className="d-flex align-items-center">
						{isFacultyPage ? (
							hasPerformedQuery && (
								<Search
									placeholder="Search for student name or JAMB REG NO "
									onChange={(e) => {
										debouncedSearch(e.target.value);
										setPageNumber(1);
									}}
								/>
							)
						) : (
							<Search
								placeholder="Search for student name or JAMB REG NO "
								onChange={(e) => {
									debouncedSearch(e.target.value);
									setPageNumber(1);
								}}
							/>
						)}
					</div>
				}
				availablePages={paginationProps.totalPages}
				setPageNumber={setPageNumber}
				hasPerformedQuery={hasPerformedQuery}
				searchParams={searchTerm}
				loading={loading && !cacheData}
				additonalFooterData={
					data?.length > 0 &&
					isFacultyPage && (
						<Button
							data-cy="delete_all"
							label="Delete All"
							buttonClass="standard-danger"
							onClick={() => {
								setIsDeleteAll(true);
								setOpenDelete(true);
							}}
						/>
					)
				}
			/>
		</div>
	);
}

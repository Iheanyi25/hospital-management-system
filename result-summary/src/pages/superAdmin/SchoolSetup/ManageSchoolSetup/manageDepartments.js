import React, { useCallback, useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import { useDebouncedCallback } from "use-debounce/lib";
import { useApiGet, useApiDelete, useApiPut } from "../../../../api/apiCall";
import {
	toggleDepartmentActivationStatusUrl,
	deleteDepartmentUrl,
	getAllPaginatedDepartmentsUrl
} from "../../../../api/urls";
import {
	PageTitle,
	Button,
	TMTable,
	CenteredDialog,
	Search,
	Spinner,
	ToggleElement,
	ButtonDropdown,
	Badge,
	Breadcrumbs,
	SMSelect
} from "../../../../ui_elements";
import {
	PAGESIZE,
	SEARCH_DELAY
	// STUDENT_TYPE_HOLDER
} from "../../../../utils/constants";
import {
	DeleteDepartmentModal,
	EditDepartment,
	UploadDepartment
} from "./components";
import styles from "./style.module.css";
import { useHistory, useLocation } from "react-router-dom";

const ManageDepartments = () => {
	const queryClient = useQueryClient();
	const { state } = useLocation();
	const pageSize = PAGESIZE.md;
	const [pageNumber, setPageNumber] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [addModal, setAddModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [currentData, setCurrentData] = useState({});
	const [status, setStatus] = useState("");
	const { push } = useHistory();
	const debounced = useDebouncedCallback((value) => {
		setSearchTerm(value);
	}, SEARCH_DELAY.sm);
	const allStatuses = [
		{ label: "All", value: "" },
		{ label: "Activated", value: true },
		{ label: "Deactivated", value: false }
	];
	const { data, isLoading, isFetching } = useApiGet(
		getAllPaginatedDepartmentsUrl({
			pageSize,
			status,
			facultyId: state?.id,
			pageNumber,
			searchTerm
		}),
		{
			keepPreviousData: true
		}
	);
	// get current notice
	const getCurrentNotice = (data) => {
		setCurrentData(data);
		setEditModal(true);
	};
	const { mutate, isLoading: isDeleting } = useApiDelete();
	const { mutate: changeStatus, isLoading: isUpdating } = useApiPut();

	//delete a notice
	const deleteDepartment = () => {
		const requestDet = {
			url: deleteDepartmentUrl(currentData?.departmentId)
		};

		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getAllPaginatedDepartmentsUrl({
						pageSize,
						status,
						facultyId: state?.id,
						pageNumber,
						searchTerm
					})
				);
				setDeleteModal(false);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Department Deletion Success!",
					body: "Department was deleted successfully"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				setDeleteModal(false);
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Department Deletion Failed!",
					body:
						response?.data?.message ||
						`Department wasn't deleted successfully`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};
	const statusToggle = useCallback(
		(id) => {
			const requestDet = {
				url: toggleDepartmentActivationStatusUrl(id)
			};

			changeStatus(requestDet, {
				onSuccess: () => {
					queryClient.invalidateQueries(
						getAllPaginatedDepartmentsUrl({
							pageSize,
							status,
							facultyId: state?.id,
							pageNumber,
							searchTerm
						})
					);
					const successFlag = window.AJS.flag({
						type: "success",
						title: "Department Updated Successfully!",
						body: "Department was updated successfully"
					});
					setTimeout(() => {
						successFlag.close();
					}, 5000);
				},
				onError: ({ response }) => {
					setDeleteModal(false);
					const errorFlag = window.AJS.flag({
						type: "error",
						title: "Department Updated Failed!",
						body:
							response?.data?.message ||
							`Department wasn't updated successfully`
					});
					setTimeout(() => {
						errorFlag.close();
					}, 5000);
				}
			});
		},
		[
			changeStatus,
			searchTerm,
			status,
			state?.id,
			pageNumber,
			pageSize,
			queryClient
		]
	);

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
				Header: "Department Name",
				accessor: "department"
			},
			{
				Header: "Code",
				accessor: "code",
				Cell: ({ cell: { row } }) => (
					<>{row.original.code || "-"}</>
				)
			},
			{
				Header: "Options",
				accessor: "numberOfDepartmentOptions"
			},
			{
				Header: "Programme",
				accessor: "numberOfPrograms"
			},
			{
				Header: "Status",
				accessor: "status",
				Cell: ({ cell: { row } }) => (
					<Badge
						item={{
							title: row.original.status
								? "Activated"
								: "Decativated",
							type: row.original.status ? "success" : "fail"
						}}
					/>
				)
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => {
					const buttonGroup = [
						{
							name: "View",
							onClick: () => {
								push({
									pathname:
										"/school_setup/manage_faculty_and_department/department/options",
									state: {
										prevState: state,
										currentState: row.original
									}
								});
							}
						},
						{
							name: "Edit",
							onClick: () => {
								getCurrentNotice(row?.original);
							}
						},
						{
							name: "Delete",
							style: "text-danger",
							onClick: () => {
								setCurrentData(row?.original);
								setDeleteModal(true);
							},
							disabled: row.original?.numberOfDepartments > 0
						}
					];
					return (
						<div className="d-flex align-items-center">
							<ToggleElement
								checked={row.original.status}
								onChange={() =>
									statusToggle(row.original.departmentId)
								}
								isDisabled={isUpdating}
							/>
							<ButtonDropdown buttonGroup={buttonGroup} />
						</div>
					);
				}
			}
		],
		[pageNumber, isUpdating, push, state, statusToggle, pageSize]
	);

	const openAddModal = () => {
		setAddModal(true);
		setCurrentData({});
	};

	if (isLoading) <Spinner />;
	const crumbItems = [
		{
			name: "Faculty",
			path: "/school_setup/manage_faculty_and_department"
		},
		{
			name: `${state?.name}`,
			path: "/"
		}
	];

	return (
		<>
			<DeleteDepartmentModal
				isOpen={deleteModal}
				closeModal={() => setDeleteModal(false)}
				handleDelete={deleteDepartment}
				currentData={currentData}
				isDeleting={isDeleting}
			/>

			<CenteredDialog
				modalId="add_department"
				isOpen={addModal}
				closeModal={() => setAddModal(false)}
				formTitle="Add Department"
			>
				<UploadDepartment
					currentFilterState={{
						pageSize,
						status,
						facultyId: state?.id,
						pageNumber,
						searchTerm
					}}
					setUploadModal={setAddModal}
				/>
			</CenteredDialog>
			<CenteredDialog
				modalId="edit_department"
				isOpen={editModal}
				closeModal={() => setEditModal(false)}
				formTitle="Edit Department"
			>
				<EditDepartment
					currentFilterState={{
						pageSize,
						status,
						facultyId: state?.id,
						pageNumber,
						searchTerm
					}}
					setUploadModal={setEditModal}
					data={currentData}
					closeModal={() => setEditModal(false)}
				/>
			</CenteredDialog>
			<div>
				<Breadcrumbs crumbs={crumbItems} />
				<PageTitle
					title={`Faculty of ${state?.name}`}
					buttonGroup={
						<Button
							onClick={openAddModal}
							buttonClass="primary"
							label="Add Department"
						/>
					}
				/>
				<div className={`${styles.tableContainer}`}>
					<TMTable
						setPageNumber={setPageNumber}
						metaData={data?.data.metaData}
						columns={columns}
						data={data?.data.items || []}
						title={`Department List (${
							data?.data?.metaData?.totalCount ?? "0"
						})`}
						loading={isLoading || isFetching}
						availablePages={data?.data?.metaData?.totalPages || ""}
						additonalTitleData={
							<div className="d-flex align-items-center gap-2">
								<SMSelect
									id="semester"
									placeholder="Status"
									searchable={false}
									options={allStatuses}
									defaultValue={allStatuses[1]}
									onChange={(e) => {
										setStatus(e.value);
									}}
								/>
								<Search
									placeholder="Search department"
									onChange={(e) => {
										debounced(e.target.value);
										setPageNumber(1);
									}}
								/>
							</div>
						}
					/>
				</div>
			</div>
		</>
	);
};

export default ManageDepartments;

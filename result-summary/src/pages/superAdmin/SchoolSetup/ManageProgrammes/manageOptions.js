import React, { useCallback, useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import { useDebouncedCallback } from "use-debounce/lib";
import { useApiGet, useApiDelete, useApiPut } from "../../../../api/apiCall";
import {
	toggleOptionActivationStatusUrl,
	deleteOptionUrl,
	getAllPaginatedOptionsUrl
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
import styles from "./style.module.css";
import { useHistory, useLocation } from "react-router-dom";
import { DeleteOptionsModal, UploadOptions, EditOptions } from "./components";

const ManageOptions = () => {
	const queryClient = useQueryClient();
	const { state: pageState } = useLocation();
	const pageSize = PAGESIZE.md;
	const [pageNumber, setPageNumber] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [addModal, setAddModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [currentData, setCurrentData] = useState({});
	const [status, setStatus] = useState("");
	const { goBack } = useHistory();
	const debounced = useDebouncedCallback((value) => {
		setSearchTerm(value);
	}, SEARCH_DELAY.sm);
	if (!pageState) goBack();

	const { prevState: state, currentState } = pageState;
	const allStatuses = [
		{ label: "All", value: "" },
		{ label: "Activated", value: true },
		{ label: "Deactivated", value: false }
	];
	const { data, isLoading, isFetching } = useApiGet(
		getAllPaginatedOptionsUrl({
			pageSize,
			status,
			departmentId: currentState?.departmentId,
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
	const deleteDepartmentOption = () => {
		const requestDet = {
			url: deleteOptionUrl(currentData?.departmentOptionId)
		};

		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getAllPaginatedOptionsUrl({
						pageSize,
						status,
						departmentId: currentState?.departmentId,
						pageNumber,
						searchTerm
					})
				);
				setDeleteModal(false);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Option Deletion Success!",
					body: "Option was deleted successfully"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				setDeleteModal(false);
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Option Deletion Failed!",
					body:
						response?.data?.message ||
						`Option wasn't deleted successfully`
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
				url: toggleOptionActivationStatusUrl(id)
			};

			changeStatus(requestDet, {
				onSuccess: () => {
					queryClient.invalidateQueries(
						getAllPaginatedOptionsUrl({
							pageSize,
							status,
							departmentId: currentState?.departmentId,
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
			currentState?.departmentId,
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
				Header: "Option Name",
				accessor: "departmentOption"
			},
			{
				Header: "Code",
				accessor: "code",
				Cell: ({ cell: { row } }) => (
					<>{row.original.code || "-"}</>
				)
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
							}
							// disabled: row.original?.numberOfDepartments > 0
						}
					];
					return (
						<div className="d-flex align-items-center">
							<ToggleElement
								checked={row.original.status}
								onChange={() =>
									statusToggle(
										row.original.departmentOptionId
									)
								}
								isDisabled={isUpdating}
							/>
							<ButtonDropdown buttonGroup={buttonGroup} />
						</div>
					);
				}
			}
		],
		[pageNumber, isUpdating, statusToggle, pageSize]
	);

	const openAddModal = () => {
		setAddModal(true);
		setCurrentData({});
	};

	if (isLoading) <Spinner />;
	const crumbItems = [
		{
			name: "Faculty",
			path: "/hostel_management/manage_hostel"
		},
		{
			name: `${state?.name}`,
			path: "/school_setup/manage_faculty_and_department/department",
			state
		},
		{
			name: `${currentState?.department}`,
			path: "/"
		}
	];

	return (
		<>
			<DeleteOptionsModal
				isOpen={deleteModal}
				closeModal={() => setDeleteModal(false)}
				handleDelete={deleteDepartmentOption}
				currentData={currentData}
				isDeleting={isDeleting}
			/>

			<CenteredDialog
				modalId="add_department"
				isOpen={addModal}
				closeModal={() => setAddModal(false)}
				formTitle="Add Option"
			>
				<UploadOptions
					currentFilterState={{
						pageSize,
						status,
						departmentId: currentState?.departmentId,
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
				formTitle="Edit Option"
			>
				<EditOptions
					currentFilterState={{
						pageSize,
						status,
						departmentId: currentState?.departmentId,
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
					title={`${currentState?.department}`}
					buttonGroup={
						<Button
							onClick={openAddModal}
							buttonClass="primary"
							label="Add Option"
						/>
					}
				/>
				<div className={`${styles.tableContainer}`}>
					<TMTable
						setPageNumber={setPageNumber}
						metaData={data?.data.metaData}
						columns={columns}
						data={data?.data.items || []}
						title={`Options List (${
							data?.data?.metaData?.totalCount ?? "0"
						})`}
						loading={isLoading || isFetching}
						availablePages={data?.data?.metaData?.totalPages || ""}
						additonalTitleData={
							<div className="d-flex align-items-center gap-2">
								<SMSelect
									id="options"
									placeholder="Status"
									searchable={false}
									options={allStatuses}
									defaultValue={allStatuses[1]}
									onChange={(e) => {
										setStatus(e.value);
									}}
								/>
								<Search
									placeholder="Search options"
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

export default ManageOptions;

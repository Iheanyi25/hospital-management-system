import React, { useCallback, useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import { useDebouncedCallback } from "use-debounce/lib";
import { useApiGet, useApiDelete, useApiPut } from "../../../../api/apiCall";
import {
	toggleFacultyActivationStatusUrl,
	deleteFacultyUrl,
	getAllPaginatedFacultiesUrl,
	getAllSchoolProgrammesUrl
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
	Badge
} from "../../../../ui_elements";
import {
	PAGESIZE,
	SEARCH_DELAY
	// STUDENT_TYPE_HOLDER
} from "../../../../utils/constants";
import { DeleteFacultyModal, EditFaculty, UploadFaculty } from "./components";
import styles from "./style.module.css";
import { useHistory } from "react-router-dom";

const ManageFaculty = () => {
	const queryClient = useQueryClient();
	const pageSize = PAGESIZE.md;
	const [pageNumber, setPageNumber] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [addModal, setAddModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [currentData, setCurrentData] = useState({});
	const { push } = useHistory();
	const debounced = useDebouncedCallback((value) => {
		setSearchTerm(value);
	}, SEARCH_DELAY.sm);

	const { data, isLoading, isFetching } = useApiGet(
		getAllSchoolProgrammesUrl({
			pageSize,
			pageNumber,
			searchTerm,
			status:true
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
	const deleteFaculty = () => {
		const requestDet = {
			url: deleteFacultyUrl(currentData?.id)
		};

		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getAllPaginatedFacultiesUrl({
						pageSize,
						pageNumber,
						searchTerm
					})
				);
				setDeleteModal(false);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Faculty Deletion Success!",
					body: "Faculty was deleted successfully"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				setDeleteModal(false);
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Faculty Deletion Failed!",
					body:
						response?.data?.message ||
						`Faculty wasn't deleted successfully`
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
				url: toggleFacultyActivationStatusUrl(id)
			};

			changeStatus(requestDet, {
				onSuccess: () => {
					queryClient.invalidateQueries(
						getAllPaginatedFacultiesUrl({
							pageSize,
							pageNumber,
							searchTerm
						})
					);
					const successFlag = window.AJS.flag({
						type: "success",
						title: "Faculty Updated Successfully!",
						body: "Faculty was updated successfully"
					});
					setTimeout(() => {
						successFlag.close();
					}, 5000);
				},
				onError: ({ response }) => {
					setDeleteModal(false);
					const errorFlag = window.AJS.flag({
						type: "error",
						title: "Faculty Updated Failed!",
						body:
							response?.data?.message ||
							`Faculty wasn't updated successfully`
					});
					setTimeout(() => {
						errorFlag.close();
					}, 5000);
				}
			});
		},
		[changeStatus, searchTerm, pageNumber, pageSize, queryClient]
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
				Header: "Faculty Name",
				accessor: "name"
			},
			{
				Header: "Departments",
				accessor: "numberOfDepartments"
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
									pathname: `/school_setup/manage_faculty_and_department/department`,
									state: row.original
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
								onChange={() => statusToggle(row.original.id)}
								isDisabled={isUpdating}
							/>
							<ButtonDropdown buttonGroup={buttonGroup} />
						</div>
					);
				}
			}
		],
		[pageNumber, isUpdating, push, statusToggle, pageSize]
	);

	const openAddModal = () => {
		setAddModal(true);
		setCurrentData({});
	};

	if (isLoading) <Spinner />;

	return (
		<>
			<DeleteFacultyModal
				isOpen={deleteModal}
				closeModal={() => setDeleteModal(false)}
				handleDelete={deleteFaculty}
				currentData={currentData}
				isDeleting={isDeleting}
			/>

			<CenteredDialog
				modalId="add_faculty"
				isOpen={addModal}
				closeModal={() => setAddModal(false)}
				formTitle="Add Faculty"
			>
				<UploadFaculty
					currentFilterState={{ pageSize, pageNumber, searchTerm }}
					setUploadModal={setAddModal}
				/>
			</CenteredDialog>
			<CenteredDialog
				modalId="edit_faculty"
				isOpen={editModal}
				closeModal={() => setEditModal(false)}
				formTitle="Edit Faculty"
			>
				<EditFaculty
					currentFilterState={{ pageSize, pageNumber, searchTerm }}
					setUploadModal={setEditModal}
					data={currentData}
					closeModal={() => setEditModal(false)}
				/>
			</CenteredDialog>
			<div>
				<PageTitle
					title="Programmes"
					buttonGroup={
						<Button
							onClick={openAddModal}
							buttonClass="primary"
							label="Add Programmes"
						/>
					}
				/>
				<div className={`${styles.tableContainer}`}>
					<TMTable
						setPageNumber={setPageNumber}
						metaData={data?.data.metaData}
						columns={columns}
						data={data?.data.items || []}
						title={`Programme List (${
							data?.data?.metaData?.totalCount ?? "0"
						})`}
						loading={isLoading || isFetching}
						availablePages={data?.data?.metaData?.totalPages || ""}
						additonalTitleData={
							<div className="d-flex align-items-center">
								<Search
									placeholder="Search faculty"
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

export default ManageFaculty;

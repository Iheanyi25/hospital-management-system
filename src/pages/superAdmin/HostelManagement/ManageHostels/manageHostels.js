import React, { useCallback, useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import { useDebouncedCallback } from "use-debounce/lib";
import { useApiGet, useApiDelete, useApiPut } from "../../../../api/apiCall";
import {
	getAllHostelsUrl,
	toggleHostelStatusUrl,
	getGendersUrl,
	getAllDepartmentsUrl,
	deleteHostelUrl,
	getGroupSelectionsUrl
} from "../../../../api/urls";
import {
	PageTitle,
	Button,
	TMTable,
	CenteredDialog,
	Search,
	Spinner,
	ToggleElement,
	ButtonDropdown
} from "../../../../ui_elements";
import {
	PAGESIZE,
	SEARCH_DELAY
	// STUDENT_TYPE_HOLDER
} from "../../../../utils/constants";
import { CreateHostelModal, DeleteHostelModel } from "./components";
import { formatSelectItems } from "../../../../utils/formatSelectItems";
import styles from "./style.module.css";
import { useHistory } from "react-router-dom";
import numberFormatter from "../../../../utils/numberFormatter";

const HanageHostels = () => {
	const queryClient = useQueryClient();
	const pageSize = PAGESIZE.sm;
	const [pageNumber, setPageNumber] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [addModal, setAddModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [currentId, setCurrentId] = useState(null);
	const [currentData, setCurrentData] = useState({});
	const { push } = useHistory();
	const debounced = useDebouncedCallback((value) => {
		setSearchTerm(value);
	}, SEARCH_DELAY.sm);

	const { data, isLoading, isFetching } = useApiGet(
		getAllHostelsUrl({
			pageSize,
			pageNumber,
			searchTerm
		}),
		{
			keepPreviousData: true
		}
	);

	const { data: genders, isLoading: isLoadingGenders } = useApiGet(
		getGendersUrl()
	);
	const { data: departments, isLoading: isLoadingDepartments } = useApiGet(
		getAllDepartmentsUrl()
	);

	const {
		data: activationStatuses,
		isLoading: isLoadingHostelActivationStatus
	} = useApiGet(getGroupSelectionsUrl());

	const allGenders = formatSelectItems(genders?.data, "name", "id");
	const allActivationStatuses = formatSelectItems(
		activationStatuses?.data,
		"name",
		"id"
	);
	const allDepartments = formatSelectItems(
		departments?.data,
		"department",
		"departmentId"
	);

	// get current notice
	const getCurrentNotice = (id, data) => {
		setAddModal(true);
		setCurrentId(id);
		setCurrentData(data);
	};
	const { mutate, isLoading: isDeleting } = useApiDelete();
	const { mutate: changeStatus, isLoading: isUpdating } = useApiPut();

	//delete a notice
	const deleteNotice = () => {
		const requestDet = {
			url: deleteHostelUrl(currentData?.id)
		};

		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getAllHostelsUrl({ pageSize, pageNumber })
				);
				setDeleteModal(false);
				setCurrentId(null);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Notice Deletion Success!",
					body: "Notice was deleted successfully"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				setDeleteModal(false);
				setCurrentId(null);
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Notice Deletion Failed!",
					body:
						response?.data?.message ||
						`Notice wasn't deleted successfully`
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
				url: toggleHostelStatusUrl(id)
			};

			changeStatus(requestDet, {
				onSuccess: () => {
					queryClient.invalidateQueries(
						getAllHostelsUrl({ pageSize, pageNumber })
					);
					setCurrentId(null);
					const successFlag = window.AJS.flag({
						type: "success",
						title: "Hostel Updated Successfully!",
						body: "Hostel was updated successfully"
					});
					setTimeout(() => {
						successFlag.close();
					}, 5000);
				},
				onError: ({ response }) => {
					setDeleteModal(false);
					setCurrentId(null);
					const errorFlag = window.AJS.flag({
						type: "error",
						title: "Hostel Updated Failed!",
						body:
							response?.data?.message ||
							`Hostel wasn't updated successfully`
					});
					setTimeout(() => {
						errorFlag.close();
					}, 5000);
				}
			});
		},
		[changeStatus, pageNumber, pageSize, queryClient]
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
				Header: "Hostel Name",
				accessor: "name"
			},
			{
				Header: "No of Rooms",
				accessor: "numberOfRooms"
			},
			{
				Header: "Occupants Gender",
				accessor: "gender"
			},
			{
				Header: "Location",
				accessor: "location",
				Cell: ({ cell: { row } }) => (
					<div>{row.original.location || 0}</div>
				)
			},
			{
				Header: "Price Range",
				accessor: "price",
				Cell: ({ cell: { row } }) => (
					<div>
						{row.original.minimumPrice
							? `₦${numberFormatter(
									row.original.minimumPrice
							  )} - ₦${numberFormatter(
									row.original.maximumPrice
							  )}`
							: row.original.minimumPrice}
					</div>
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
									pathname: `/hostel_management/manage_hostel/view_hostel`,
									state: row.original
								});
							}
						},
						{
							name: "Edit",
							onClick: () => {
								getCurrentNotice(
									row?.original?.id,
									row?.original
								);
							}
						},
						{
							name: "Delete",
							style: "text-danger",
							onClick: () => {
								setCurrentData(row?.original);
								setDeleteModal(true);
							}
						}
					];
					return (
						<div className="d-flex align-items-center">
							<ToggleElement
								checked={row.original.active}
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
		setCurrentId(null);
		setCurrentData({});
	};

	if (
		isLoading ||
		isLoadingGenders ||
		isLoadingDepartments ||
		isLoadingHostelActivationStatus
	) {
		return <Spinner />;
	}

	return (
		<>
			<DeleteHostelModel
				isOpen={deleteModal}
				closeModal={() => setDeleteModal(false)}
				handleDelete={deleteNotice}
				currentData={currentData}
				isDeleting={isDeleting}
			/>

			<CenteredDialog
				modalId="add-notice-dialog"
				closeModal={() => setAddModal(false)}
				isOpen={addModal}
				width={705}
				formTitle={currentId === null ? "Create Hostel" : "Edit Hostel"}
			>
				<CreateHostelModal
					currentId={currentId}
					allGenders={allGenders}
					setCurrentId={setCurrentId}
					closeModal={() => setAddModal(false)}
					isOpen={addModal}
					currentData={currentData}
					allActivationStatuses={allActivationStatuses}
					allDepartments={allDepartments}
					filter={getAllHostelsUrl({ pageSize, pageNumber })}
				/>
			</CenteredDialog>
			<div>
				<PageTitle
					title="Hostels"
					buttonGroup={
						<Button
							onClick={openAddModal}
							buttonClass="primary"
							label="Create Hostel"
						/>
					}
				/>
				<div className={styles.tableContainer}>
					<TMTable
						setPageNumber={setPageNumber}
						columns={columns}
						data={data?.data.items || []}
						title={`Hostel List (${
							data?.data?.metaData?.totalCount ?? "0"
						})`}
						loading={isLoading || isFetching}
						availablePages={data?.data?.metaData?.totalPages || ""}
						additonalTitleData={
							<div className="d-flex align-items-center">
								<Search
									placeholder="Search hostels"
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

export default HanageHostels;

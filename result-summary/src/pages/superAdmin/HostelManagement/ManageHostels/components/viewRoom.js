import React, { useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import { useDebouncedCallback } from "use-debounce/lib";
import { useApiGet, useApiDelete } from "../../../../../api/apiCall";
import {
	getGendersUrl,
	deleteHostelRoomUrl,
	getAllHostelsRoomUrl,
	getUpaginatedHostelRoomCategories,
	getGroupSelectionsUrl,
	getAllSelectLevels
} from "../../../../../api/urls";
import {
	PageTitle,
	Button,
	TMTable,
	CenteredDialog,
	Search,
	Spinner,
	ButtonDropdown,
	Breadcrumbs,
	ConfirmationModal,
	Badge
} from "../../../../../ui_elements";
import { PAGESIZE, SEARCH_DELAY } from "../../../../../utils/constants";
import { BatchRoomActionsModal, EditRoomModal, UploadRoom } from ".";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import styles from "../style.module.css";
import { useHistory, useLocation } from "react-router-dom";
import numberFormatter from "../../../../../utils/numberFormatter";

const ViewRoom = () => {
	const queryClient = useQueryClient();
	const pageSize = PAGESIZE.xxl;
	const [pageNumber, setPageNumber] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [open, setOpen] = useState(false);
	const [batchOpen, setBatchOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [currentData, setCurrentData] = useState({});

	const { push } = useHistory();
	const debounced = useDebouncedCallback((value) => {
		setSearchTerm(value);
	}, SEARCH_DELAY.sm);
	const { goBack } = useHistory();
	const { state } = useLocation();

	if (!state) goBack();
	const { data, isLoading, isFetching } = useApiGet(
		getAllHostelsRoomUrl({
			hostelId: state?.id,
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
	const { data: levels, isLoading: isLoadingLevels } = useApiGet(
		getAllSelectLevels()
	);
	const { data: categories, isLoading: isLoadingCatgories } = useApiGet(
		getUpaginatedHostelRoomCategories()
	);
	const {
		data: activationStatuses,
		isLoading: isLoadingHostelActivationStatus
	} = useApiGet(getGroupSelectionsUrl());

	const allGenders = formatSelectItems(genders?.data, "name", "id");
	const allLevels = formatSelectItems(
		levels?.data,
		["name", "studentType"],
		"id"
	);
	const allCategories = formatSelectItems(categories?.data, "name", "id");
	const allActivationStatuses = formatSelectItems(
		activationStatuses?.data,
		"name",
		"id"
	);

	const getCurrentNotice = (id, data) => {
		setCurrentData(data);
	};
	const { mutate, isLoading: isDeleting } = useApiDelete();

	//delete a notice
	const deleteRoom = () => {
		const requestDet = {
			url: deleteHostelRoomUrl(currentData?.id)
		};

		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getAllHostelsRoomUrl({
						hostelId: state?.id,
						pageSize,
						pageNumber,
						searchTerm
					})
				);
				setDeleteModal(false);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Room Deletion Success!",
					body: "Room was deleted successfully"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				setDeleteModal(false);
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Room Deletion Failed!",
					body:
						response?.data?.message ||
						`Room wasn't deleted successfully`
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
				Header: "Room Name",
				accessor: "name"
			},
			{
				Header: "Gender Based",
				accessor: "gender"
			},
			{
				Header: "Price",
				accessor: "price",
				Cell: ({ cell: { row } }) => (
					<div>{numberFormatter(row.original.price) || "-"}</div>
				)
			},
			{
				Header: "Category",
				accessor: "hostelRoomCategory",
				Cell: ({ cell: { row } }) => (
					<div>{row.original.hostelRoomCategory || "-"}</div>
				)
			},
			{
				Header: "No of Bedspaces",
				accessor: "numberOfBeds",
				Cell: ({ cell: { row } }) => (
					<div>{row.original.numberOfBeds || 0}</div>
				)
			},
			{
				Header: "Status",
				accessor: "active",
				Cell: ({ cell: { row } }) => {
					const statusOptions = {
						true: "success",
						false: "fail"
					};
					return (
						<Badge
							item={{
								title: row.original.active
									? "Active"
									: "Deactivated",
								type: statusOptions[row.original.active]
							}}
						/>
					);
				}
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
									pathname: `/hostel_management/manage_hostel/view_hostel/view_bedspaces`,
									state: {
										...state,
										bedSpaceState: {
											...row.original,
											roomName: `${state?.name}`
										}
									}
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
								setEditOpen(true);
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
							<ButtonDropdown buttonGroup={buttonGroup} />
						</div>
					);
				}
			}
		],
		[pageNumber, push, state, pageSize]
	);

	if (
		isLoading ||
		isLoadingGenders ||
		isLoadingLevels ||
		isLoadingCatgories ||
		isLoadingHostelActivationStatus
	) {
		return <Spinner />;
	}
	const crumbItems = [
		{
			name: "Hostels",
			path: "/hostel_management/manage_hostel"
		},
		{
			name: `${state?.name}`,
			path: "/"
		}
	];
	return (
		<>
			<ConfirmationModal
				isOpen={deleteModal}
				closeModal={() => setDeleteModal(false)}
				formTitle={`Delete ${currentData?.name}`}
				handleClick={deleteRoom}
				isLoading={isDeleting}
				buttonLabel={"Delete Room"}
				message={
					<div className={styles.delete_modal_body}>
						<p>
							Are you sure you want to <span>delete</span> this
							room?. This action cannot be undone.
						</p>
					</div>
				}
			/>
			<CenteredDialog
				modalId="create_room"
				isOpen={open}
				closeModal={() => setOpen(false)}
				formTitle="Create Room"
			>
				<UploadRoom
					state={state}
					filter={{
						hostelId: state?.id,
						pageSize,
						pageNumber,
						searchTerm
					}}
					setUploadModal={setOpen}
					allGenders={allGenders}
					allLevels={allLevels}
					allCategories={allCategories}
					allActivationStatuses={allActivationStatuses}
				/>
			</CenteredDialog>
			<CenteredDialog
				modalId="edit_room"
				isOpen={editOpen}
				closeModal={() => setEditOpen(false)}
				formTitle="Edit Room"
			>
				<EditRoomModal
					state={state}
					filter={getAllHostelsRoomUrl({
						hostelId: state?.id,
						pageSize,
						pageNumber,
						searchTerm
					})}
					currentData={currentData}
					setUploadModal={setEditOpen}
					allGenders={allGenders}
					allLevels={allLevels}
					allCategories={allCategories}
					allActivationStatuses={allActivationStatuses}
				/>
			</CenteredDialog>
			<CenteredDialog
				modalId="batch_action"
				isOpen={batchOpen}
				closeModal={() => setBatchOpen(false)}
				formTitle="Batch Action"
			>
				<BatchRoomActionsModal
					state={state}
					filter={getAllHostelsRoomUrl({
						hostelId: state?.id,
						pageSize,
						pageNumber,
						searchTerm
					})}
					closeModal={() => setBatchOpen(false)}
					allActivationStatuses={allActivationStatuses}
					rooms={data?.data?.items?.map((obj) => obj.id)}
				/>
			</CenteredDialog>
			<div>
				<Breadcrumbs crumbs={crumbItems} />
				<PageTitle
					title={state?.name}
					buttonGroup={
						<>
							<Button
								onClick={setOpen}
								buttonClass="primary"
								label="Create Room"
							/>
							<Button
								onClick={setBatchOpen}
								buttonClass="standard"
								label="Batch Actions"
								disabled={!data?.data?.metaData?.totalCount}
							/>
						</>
					}
				/>
				<div className={styles.tableContainer}>
					<TMTable
						setPageNumber={setPageNumber}
						columns={columns}
						data={data?.data.items || []}
						title={`Rooms (${
							data?.data?.metaData?.totalCount ?? "0"
						})`}
						loading={isLoading || isFetching}
						availablePages={data?.data?.metaData?.totalPages || ""}
						additonalTitleData={
							<div className="d-flex align-items-center">
								<Search
									placeholder="Search rooms"
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

export default ViewRoom;

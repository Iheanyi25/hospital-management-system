import React, { useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import { useDebouncedCallback } from "use-debounce/lib";
import { useApiGet, useApiDelete } from "../../../../../api/apiCall";
import {
	deleteHostelBedUrl,
	getHostelBedSpaceUrl,
	getAllSessionsUrl,
	getGroupSelectionsUrl,
	getStudentTypesUrl
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
	ConfirmationModal
} from "../../../../../ui_elements";
import { PAGESIZE, SEARCH_DELAY } from "../../../../../utils/constants";
import { CreateBedspaceModal } from ".";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import styles from "../style.module.css";
import { useHistory, useLocation } from "react-router-dom";
import { ReAssignBedspace } from "./reAssignBedspace";
import { AssignBedspace } from "./assignBedspace";

const ViewBedspaces = () => {
	const queryClient = useQueryClient();
	const pageSize = PAGESIZE.xxl;
	const [pageNumber, setPageNumber] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [open, setOpen] = useState(false);
	const [openReAssign, setReAssign] = useState(false);
	const [openAssignModal, setOpenAssignModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [currentId, setCurrentId] = useState(null);
	const [currentData, setCurrentData] = useState({});
	const debounced = useDebouncedCallback((value) => {
		setSearchTerm(value);
	}, SEARCH_DELAY.sm);
	const { goBack } = useHistory();
	const { state } = useLocation();

	if (!state?.bedSpaceState) goBack();
	const { data, isLoading, isFetching } = useApiGet(
		getHostelBedSpaceUrl({
			hostelRoomId: state?.bedSpaceState?.id,
			pageSize,
			pageNumber,
			searchTerm
		}),
		{
			keepPreviousData: true
		}
	);

	const { data: sessions, isLoading: sessionLoading } = useApiGet(
		getAllSessionsUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const {
		data: activationStatuses,
		isLoading: isLoadingHostelActivationStatus
	} = useApiGet(getGroupSelectionsUrl());

	const { data: studentTypes, isLoading: isLoadingStudentTypes } = useApiGet(
		getStudentTypesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const allStudentTypes = formatSelectItems(studentTypes?.data, "name", "id");
	const allActivationStatuses = formatSelectItems(
		activationStatuses?.data,
		"name",
		"id"
	);

	const allSessions = formatSelectItems(sessions?.data, "session", "id");

	const { mutate, isLoading: isDeleting } = useApiDelete();

	const deleteBedSpace = () => {
		const requestDet = {
			url: deleteHostelBedUrl(currentData?.id)
		};

		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getHostelBedSpaceUrl({
						hostelRoomId: state?.bedSpaceState?.id,
						pageSize,
						pageNumber,
						searchTerm
					})
				);
				setDeleteModal(false);
				setCurrentId(null);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Bedspace Deletion Success!",
					body: "Bedspace was deleted successfully"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				setDeleteModal(false);
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Bedspace Deletion Failed!",
					body:
						response?.data?.message ||
						`Bedspace wasn't deleted successfully`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	const openAddModal = () => {
		setOpen(true);
		setCurrentId(null);
		setCurrentData({});
	};

	const getCurrentBedspace = (id, data, isAssign = false) => {
		isAssign === "reassign"
			? setReAssign(true)
			: isAssign === "assign"
			? setOpenAssignModal(true)
			: setOpen(true);
		setCurrentId(id);
		setCurrentData(data);
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
				Header: "Bedspace Name",
				accessor: "name"
			},
			{
				Header: "Occupant Type",
				accessor: "userRole"
			},
			{
				Header: "Occupant",
				accessor: "username"
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => {
					const buttonGroup = [
						{
							name: "Assign",
							onClick: () => {
								getCurrentBedspace(
									row?.original?.id,
									row?.original,
									"assign"
								);
							}
						},
						{
							name: "Reassign",
							onClick: () => {
								getCurrentBedspace(
									row?.original?.id,
									row?.original,
									"reassign"
								);
							}
						},
						{
							name: "Edit",
							onClick: () => {
								getCurrentBedspace(
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
							<ButtonDropdown buttonGroup={buttonGroup} />
						</div>
					);
				}
			}
		],
		[pageNumber, pageSize]
	);

	if (
		isLoading ||
		sessionLoading ||
		isLoadingStudentTypes ||
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
			name: `${state?.bedSpaceState?.roomName}`,
			path: "/hostel_management/manage_hostel/view_hostel",
			state: { ...state, bedSpaceState: null }
		},
		{
			name: `${state?.bedSpaceState?.name}`,
			path: "/"
		}
	];

	return (
		<>
			<ConfirmationModal
				isOpen={deleteModal}
				closeModal={() => setDeleteModal(false)}
				formTitle={`Delete ${currentData?.name}`}
				handleClick={deleteBedSpace}
				isLoading={isDeleting}
				buttonLabel={"Delete Bedspace"}
				message={
					<div className={styles.delete_modal_body}>
						<p>
							Are you sure you want to <span>delete</span> this
							bedspace?. This action cannot be undone.
						</p>
					</div>
				}
			/>
			<CenteredDialog
				modalId="create_bedspace"
				isOpen={open}
				closeModal={() => setOpen(false)}
				formTitle={
					currentId === null ? "Create Bedspace" : "Edit Bedspace"
				}
			>
				<CreateBedspaceModal
					allActivationStatuses={allActivationStatuses}
					state={state?.bedSpaceState}
					currentId={currentId}
					setCurrentId={setCurrentId}
					currentData={currentData}
					allStudentTypes={allStudentTypes}
					setUploadModal={setOpen}
					closeModal={() => setOpen(false)}
					filter={getHostelBedSpaceUrl({
						hostelRoomId: state?.bedSpaceState?.id,
						pageSize,
						pageNumber,
						searchTerm
					})}
				/>
			</CenteredDialog>
			<CenteredDialog
				modalId="reassign_bedspace"
				isOpen={openReAssign}
				closeModal={() => setReAssign(false)}
				formTitle={"Reassign Bedspace"}
				width={1000}
			>
				<ReAssignBedspace
					data={currentData}
					filter={getHostelBedSpaceUrl({
						hostelRoomId: state?.bedSpaceState?.id,
						pageSize,
						pageNumber,
						searchTerm
					})}
					closeModal={() => setReAssign(false)}
					allSessions={allSessions}
				/>
			</CenteredDialog>
			<CenteredDialog
				modalId="assign_bedspace"
				isOpen={openAssignModal}
				closeModal={() => setOpenAssignModal(false)}
				formTitle={"Assign Bedspace"}
				width={1000}
			>
				<AssignBedspace
					data={currentData}
					filter={getHostelBedSpaceUrl({
						hostelRoomId: state?.bedSpaceState?.id,
						pageSize,
						pageNumber,
						searchTerm
					})}
					closeModal={() => setOpenAssignModal(false)}
					allSessions={allSessions}
				/>
			</CenteredDialog>
			<div>
				<Breadcrumbs crumbs={crumbItems} />
				<PageTitle
					title={state?.bedSpaceState?.name}
					buttonGroup={
						<Button
							onClick={openAddModal}
							buttonClass="primary"
							label="Create Bedspace"
						/>
					}
				/>
				<div className={styles.tableContainer}>
					<TMTable
						setPageNumber={setPageNumber}
						columns={columns}
						data={data?.data.items || []}
						title={`Bedspaces (${
							data?.data?.metaData?.totalCount ?? "0"
						})`}
						loading={isLoading || isFetching}
						availablePages={data?.data?.metaData?.totalPages || ""}
						additonalTitleData={
							<div className="d-flex align-items-center">
								<Search
									placeholder="Search bedspaces"
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

export default ViewBedspaces;

import {
	Button,
	CenteredDialog,
	ConfirmationModal,
	Search,
	Spinner,
	TMTable,
	ToggleElement
} from "../../../../ui_elements";
import styles from "./style.module.css";
import { useCallback, useMemo, useState } from "react";
import { EditApplication, AddApplication } from "./components";
import {
	deleteApplicationTypeUrl,
	getAllApplicationTypesUrl,
	getAllDepartmentsWithoutValuesUrl,
	getAllServiceTypesUrl,
	getAllSessionsUrl,
	getGroupSelectionsUrl,
	getStudentTypesUrl,
	toggleApplicationStatusUrl,
	toggleOpenCloseApplicationStatusUrl
} from "../../../../api/urls";
import { useApiDelete, useApiGet, useApiPut } from "../../../../api/apiCall";
import { useQueryClient } from "react-query";
import { PAGESIZE, SEARCH_DELAY } from "../../../../utils/constants";
import { useDebouncedCallback } from "use-debounce";
import { formatSelectItems } from "../../../../utils/formatSelectItems";
import numberFormatter from "../../../../utils/numberFormatter";

const ApplicationSetup = () => {
	const [open, setOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [editData, setEditData] = useState({});
	const [openDelete, setOpenDelete] = useState(false);
	const pageSize = PAGESIZE.sm;
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearch = useDebouncedCallback(
		(value) => {
			setSearchTerm(value);
		},
		// delay in ms
		SEARCH_DELAY.sm
	);
	const [pageNumber, setPageNumber] = useState(1);

	console.log(pageNumber)
	const { data, isLoading, isFetching, error } = useApiGet(
		getAllApplicationTypesUrl({
			pageSize,
			pageNumber,
			searchTerm
		}),
		{
			keepPreviousData: true
		}
	);
	const { data: sessions, isLoading: isLoadingSessions } = useApiGet(
		getAllSessionsUrl()
	);
	const { data: serviceTypes, isLoading: isLoadingServiceTypes } = useApiGet(
		getAllServiceTypesUrl()
	);
	const { data: studentTypes, isLoading: isLoadingStudentTypes } = useApiGet(
		getStudentTypesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const { data: departments, isLoading: isLoadingDepartments } = useApiGet(
		getAllDepartmentsWithoutValuesUrl()
	);

	const {
		data: activationStatuses,
		isLoading: isLoadingHostelActivationStatus
	} = useApiGet(getGroupSelectionsUrl());

	const allActivationStatuses = formatSelectItems(
		activationStatuses?.data,
		"name",
		"id"
	);
	const allDepartments = formatSelectItems(departments?.data, "name", "id");
	const allSessions = formatSelectItems(sessions?.data, "session", "id");
	const allServiceTypes = formatSelectItems(serviceTypes?.data, "name", "id");
	const allStudentTypes = formatSelectItems(studentTypes?.data, "name", "id");
	const { mutate, isLoading: isDeleting } = useApiDelete();
	const { mutate: toggle, isLoading: isPosting } = useApiPut();
	const queryClient = useQueryClient();
	const deleteApplication = () => {
		const requestDet = {
			url: deleteApplicationTypeUrl(editData.id)
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getAllApplicationTypesUrl({
						pageSize,
						pageNumber,
						searchTerm
					})
				);
				setOpenDelete(false);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Application Deletion Success!",
					body: "Application was deleted successfully"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Application Deletion Failed!",
					body:
						response?.data?.message ||
						`Application wasn't deleted successfully`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};
	const toggleClearanceStatus = useCallback(
		(id) => {
			const requestDet = {
				url: toggleApplicationStatusUrl(id)
			};
			toggle(requestDet, {
				onSuccess: () => {
					queryClient.invalidateQueries(
						getAllApplicationTypesUrl({
							pageSize,
							pageNumber,
							searchTerm
						})
					);
					const successFlag = window.AJS.flag({
						type: "success",
						title: "Update Success!",
						body: `Status updated successfully!`
					});
					setTimeout(() => {
						successFlag.close();
					}, 5000);
				},
				onError: ({ response }) => {
					const errorFlag = window.AJS.flag({
						type: "error",
						title: "Update Failure!",
						body:
							response?.data?.message ||
							`Status wasn't updated successfully!`
					});
					setTimeout(() => {
						errorFlag.close();
					}, 5000);
				}
			});
		},
		[pageNumber, pageSize, searchTerm, queryClient, toggle]
	);

	const toggleOpenApplicationStatus = useCallback(
		(id) => {
			const requestDet = {
				url: toggleOpenCloseApplicationStatusUrl(id)
			};
			toggle(requestDet, {
				onSuccess: () => {
					queryClient.invalidateQueries(
						getAllApplicationTypesUrl({
							pageSize,
							pageNumber,
							searchTerm
						})
					);
					const successFlag = window.AJS.flag({
						type: "success",
						title: "Update Success!",
						body: `Status updated successfully!`
					});
					setTimeout(() => {
						successFlag.close();
					}, 5000);
				},
				onError: ({ response }) => {
					const errorFlag = window.AJS.flag({
						type: "error",
						title: "Update Failure!",
						body:
							response?.data?.message ||
							`Status wasn't updated successfully!`
					});
					setTimeout(() => {
						errorFlag.close();
					}, 5000);
				}
			});
		},
		[pageNumber, pageSize, searchTerm, queryClient, toggle]
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
				Header: "Application title",
				accessor: "name"
			},
			{
				Header: "Session",
				accessor: "session"
			},
			{
				Header: "Amount",
				accessor: "amount",
				Cell: ({ cell: { row } }) => (
					<p>{numberFormatter(row.original.amount) || "-"}</p>
				)
			},
			{
				Header: "Commission",
				accessor: "teneceCommission",
				Cell: ({ cell: { row } }) => (
					<p>
						{numberFormatter(row.original.teneceCommission) || "-"}
					</p>
				)
			},
			{
				Header: "Status",
				accessor: "activated",
				Cell: ({ cell: { row } }) => {
					return (
						<div className="d-flex justify-content-center gap-2">
							<ToggleElement
								id={`application-status-${row.original.id}`}
								checked={row.original.active}
								onChange={() =>
									toggleClearanceStatus(row.original.id)
								}
								label={
									row.original.active
										? "Activated"
										: "Deactivated"
								}
								isDisabled={isPosting}
							/>
							<ToggleElement
								id={`application-open-status-${row.original.id}`}
								checked={!row.original.closed}
								onChange={() =>
									toggleOpenApplicationStatus(row.original.id)
								}
								label={
									!row.original.closed ? "Opened" : "Closed"
								}
								isDisabled={isPosting}
							/>
						</div>
					);
				}
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => (
					<div>
						<Button
							data-cy="edit_course"
							label="Edit"
							buttonClass="standard"
							onClick={() => {
								setEditData(row.original);
								setEditOpen(true);
							}}
						/>
						<Button
							data-cy="delete_course"
							label="Delete"
							buttonClass="standard-danger"
							onClick={() => {
								setEditData({
									id: row.original.id
								});
								setOpenDelete(true);
							}}
						/>
					</div>
				)
			}
		],
		[
			pageSize,
			pageNumber,
			toggleClearanceStatus,
			toggleOpenApplicationStatus,
			isPosting
		]
	);
	if (
		isLoadingSessions ||
		isLoadingServiceTypes ||
		isLoadingStudentTypes ||
		isLoadingDepartments ||
		isLoadingHostelActivationStatus
	)
		return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<div className={styles.container}>
			<CenteredDialog
				modalId="add_app"
				isOpen={open}
				closeModal={() => setOpen(false)}
				formTitle="Add New Application"
			>
				<AddApplication
					allSessions={allSessions}
					allServiceTypes={allServiceTypes}
					allStudentTypes={allStudentTypes}
					closeModal={() => setOpen(false)}
					allActivationStatuses={allActivationStatuses}
					allDepartments={allDepartments}
					currentFilterState={{ pageSize, pageNumber, searchTerm }}
					setUploadModal={setOpen}
				/>
			</CenteredDialog>
			<CenteredDialog
				modalId="edit_app"
				isOpen={editOpen}
				closeModal={() => setEditOpen(false)}
				width={705}
				formTitle="Edit application"
			>
				<EditApplication
					data={editData}
					allSessions={allSessions}
					allServiceTypes={allServiceTypes}
					allStudentTypes={allStudentTypes}
					allActivationStatuses={allActivationStatuses}
					allDepartments={allDepartments}
					closeModal={() => setEditOpen(false)}
					currentFilterState={{ pageSize, pageNumber, searchTerm }}
				/>
			</CenteredDialog>
			<ConfirmationModal
				isOpen={openDelete}
				closeModal={() => setOpenDelete(false)}
				handleClick={deleteApplication}
				formTitle="Delete Application"
				message="Are you sure you want to delete this application?"
				isLoading={isDeleting}
				buttonLabel="Delete Application"
			/>
			<div className={styles.page_content}>
				<div className="w-100">
					<TMTable
						columns={columns}
						data={data?.data.items || []}
						title="All Applications"
						additonalTitleData={
							<div className="d-flex align-items-center">
								<Search
									placeholder="Search for application"
									onChange={(e) => {
										debouncedSearch(e.target.value);
										setPageNumber(1);
									}}
								/>
								<Button
									data-cy="default"
									buttonClass="primary"
									label="Add new application"
									customClass="ml-3"
									onClick={() => setOpen(true)}
								/>
							</div>
						}
						loading={isLoading || isFetching}
						setPageNumber={setPageNumber}
						pageNumber={pageNumber}
						availablePages={data?.data?.metaData.totalPages}
					/>
				</div>
			</div>
		</div>
	);
};

export default ApplicationSetup;

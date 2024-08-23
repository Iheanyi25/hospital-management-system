import {
	Button,
	CenteredDialog,
	ConfirmationModal,
	Search,
	Spinner,
	TMTable,
	ToggleElement
	// ToggleElement
} from "../../../../../ui_elements";
import styles from "./style.module.css";
import { useCallback, useMemo, useState } from "react";
import { EditApplication, AddApplication } from "./components";
import {
	deleteBusaryFeesUrl,
	getAllServiceTypesUrl,
	getSetUpCategoriesUrl,
	getSundryPaymentBusaryFees,
	toggleBusaryFeesUrl
	// toggleBusaryFeesUrl
} from "../../../../../api/urls";
import { useApiDelete, useApiGet, useApiPut } from "../../../../../api/apiCall";
import { useQueryClient } from "react-query";
import { PAGESIZE, SEARCH_DELAY } from "../../../../../utils/constants";
import { useDebouncedCallback } from "use-debounce";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";

const BusaryFees = () => {
	const [open, setOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [editData, setEditData] = useState({});
	const [openDelete, setOpenDelete] = useState(false);
	const pageSize = PAGESIZE.xl;
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearch = useDebouncedCallback(
		(value) => {
			setSearchTerm(value);
		},
		// delay in ms
		SEARCH_DELAY.sm
	);
	const [pageNumber, setPageNumber] = useState(1);
	const { data, isLoading, isFetching, error } = useApiGet(
		getSundryPaymentBusaryFees({
			pageSize,
			pageNumber,
			searchTerm
		}),
		{
			keepPreviousData: true
		}
	);
	const { data: busaryCategories, isLoading: isLoadingBusaryCategories } =
		useApiGet(getSetUpCategoriesUrl());

	const { data: serviceTypes, isLoading: isLoadingServiceTypes } = useApiGet(
		getAllServiceTypesUrl()
	);

	const allBursaryCategories = formatSelectItems(
		busaryCategories?.data,
		"name",
		"id"
	);

	const allServiceTypes = formatSelectItems(serviceTypes?.data, "name", "id");
	const { mutate, isLoading: isDeleting } = useApiDelete();
	const { mutate: toggle, isLoading: isPosting } = useApiPut();
	const queryClient = useQueryClient();
	const deleteApplication = () => {
		const { id } = editData;
		const requestDet = {
			url: deleteBusaryFeesUrl({ id })
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getSundryPaymentBusaryFees({
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

	const toggleBusaryFees = useCallback(
		(id) => {
			const requestDet = {
				url: toggleBusaryFeesUrl({ id })
			};
			toggle(requestDet, {
				onSuccess: () => {
					queryClient.invalidateQueries(
						getSundryPaymentBusaryFees({
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
				Header: "Bursary Fee Code",
				accessor: "bursaryFeeCode"
			},
			{
				Header: "Bursary Fee Description ",
				accessor: "bursaryFeeDescription"
			},
			{
				Header: "Stamp Duty",
				accessor: "stampDuty"
			},
			{
				Header: "Amount",
				accessor: "amount"
			},
			{
				Header: "Commission",
				accessor: "teneceCommission"
			},
			{
				Header: "Status",
				accessor: "activated",
				Cell: ({ cell: { row } }) => {
					return (
						<>
							<ToggleElement
								id={`cleareance-status-${row.original.id}`}
								checked={row.original.active}
								onChange={() =>
									toggleBusaryFees(row.original.id)
								}
								label={
									row.original.active
										? "Activated"
										: "Deactivated"
								}
								isDisabled={isPosting}
							/>
						</>
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
		[pageSize, pageNumber, isPosting, toggleBusaryFees]
	);

	if (isLoadingBusaryCategories || isLoadingServiceTypes) return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<div className={styles.container}>
			<CenteredDialog
				modalId="add_app"
				isOpen={open}
				closeModal={() => setOpen(false)}
				formTitle="Add New Fee"
			>
				<AddApplication
					busaryCategories={allBursaryCategories}
					serviceType={allServiceTypes}
					closeModal={() => setOpen(false)}
					currentFilterState={{ pageSize, pageNumber, searchTerm }}
					setUploadModal={setOpen}
				/>
			</CenteredDialog>
			<CenteredDialog
				modalId="edit_app"
				isOpen={editOpen}
				closeModal={() => setEditOpen(false)}
				width={705}
				formTitle="Edit bursary fee"
			>
				<EditApplication
					data={editData}
					busaryCategories={allBursaryCategories}
					closeModal={() => setEditOpen(false)}
					currentFilterState={{ pageSize, pageNumber, searchTerm }}
				/>
			</CenteredDialog>
			<ConfirmationModal
				isOpen={openDelete}
				closeModal={() => setOpenDelete(false)}
				handleClick={deleteApplication}
				formTitle="Delete Fee"
				message="Are you sure you want to delete this fee?"
				isLoading={isDeleting}
				buttonLabel="Delete Fee"
			/>
			<div className={styles.page_content}>
				<div className="w-100">
					<TMTable
						columns={columns}
						data={data?.data.items || []}
						title="All Fees"
						additonalTitleData={
							<div className="d-flex align-items-center">
								<Search
									placeholder="Search for fee"
									onChange={(e) => {
										debouncedSearch(e.target.value);
										setPageNumber(1);
									}}
								/>
								<Button
									data-cy="default"
									buttonClass="primary"
									label="Add new fee"
									customClass="ml-3"
									onClick={() => setOpen(true)}
								/>
							</div>
						}
						loading={isLoading || isFetching}
						setPageNumber={setPageNumber}
						availablePages={data?.data?.metaData.totalPages}
					/>
				</div>
			</div>
		</div>
	);
};

export default BusaryFees;

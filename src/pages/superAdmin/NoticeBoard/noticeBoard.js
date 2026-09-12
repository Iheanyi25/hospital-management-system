import React, { useMemo, useState, useCallback } from "react";
import { useQueryClient } from "react-query";
import { useDebouncedCallback } from "use-debounce/lib";
import { useApiGet, useApiDelete, useApiPut } from "../../../api/apiCall";
import {
	getNoticeByIdUrl,
	getNoticeCategoryUrl,
	getNoticesUrl,
	toggleNoticeStatusUrl
} from "../../../api/urls";
import {
	PageTitle,
	Button,
	TMTable,
	LandingBadge,
	ToggleElement,
	CenteredDialog,
	Search,
	Spinner
} from "../../../ui_elements";
import { PAGESIZE, SEARCH_DELAY } from "../../../utils/constants";
import { fullDate } from "../../../utils/formatDate";
import { AddNoticeModal, DeleteNoticeModal } from "./components";
import { formatSelectItems } from "../../../utils/formatSelectItems";
import DOMPurify from "dompurify";
import styles from "./style.module.css";

const NoticeBoard = () => {
	const queryClient = useQueryClient();
	const pageSize = PAGESIZE.sm;
	const [pageNumber, setPageNumber] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [addModal, setAddModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [currentId, setCurrentId] = useState(null);
	const [currentData, setCurrentData] = useState({});
	const debounced = useDebouncedCallback((value) => {
		setSearchTerm(value);
	}, SEARCH_DELAY.sm);

	// get notices
	const { data, isLoading, isFetching } = useApiGet(
		getNoticesUrl({
			pageSize,
			pageNumber,
			searchTerm
		}),
		{
			keepPreviousData: true
		}
	);

	const { data: options, isLoading: noticesIsLoading } = useApiGet(
		getNoticeCategoryUrl()
	);

	const optionsSelect = formatSelectItems(options?.data, "category", "id");

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
			url: getNoticeByIdUrl(currentId)
		};

		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getNoticesUrl({ pageSize, pageNumber })
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
		(id, activate) => {
			const requestDet = {
				url: toggleNoticeStatusUrl(id),
				data: {
					status: !activate
				}
			};

			changeStatus(requestDet, {
				onSuccess: () => {
					queryClient.invalidateQueries(
						getNoticesUrl({ pageSize, pageNumber })
					);
					setCurrentId(null);
					const successFlag = window.AJS.flag({
						type: "success",
						title: "Notice Updated Successfully!",
						body: "Notice was updated successfully"
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
						title: "Notice Updated Failed!",
						body:
							response?.data?.message ||
							`Notice wasn't updated successfully`
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
				Header: "Notice title",
				accessor: "name",
				Cell: ({ cell: { row } }) => {
					return (
						<div className={styles.notice_info}>
							<h3>
								{row?.original?.title
									.split(/(\s+)/)
									.slice(0, 4) ?? "-"}
								...
							</h3>
							<div className="d-flex">
								<p
									dangerouslySetInnerHTML={{
										__html:
											DOMPurify.sanitize(
												row?.original?.description
											).slice(0, 20) ?? "-"
									}}
								></p>
								<span>...</span>
							</div>
						</div>
					);
				}
			},
			{
				Header: "Category",
				accessor: "category",
				Cell: ({ cell: { row } }) => {
					const badgeState = {
						Undergraduate: "undergraduate",
						"Prospective Students": "prospectiveStudent",
						Postgraduate: "bursaryPayments",
						"All Students": "allStudents",
						Staff: "allStaff"
					};
					return (
						<div className="d-flex align-items-center justify-content-center">
							<LandingBadge
								state={
									badgeState[row?.original?.category] || "-"
								}
								message={row?.original?.category || "-"}
							/>
						</div>
					);
				}
			},
			{
				Header: "Start date",
				accessor: "startDate",
				Cell: ({ cell: { row } }) => {
					return (
						<div className={styles.notice_info}>
							{fullDate(row?.original?.startDate)}
						</div>
					);
				}
			},
			{
				Header: "End date",
				accessor: "endDate",
				Cell: ({ cell: { row } }) => {
					return (
						<div className={styles.notice_info}>
							{fullDate(row?.original?.endDate)}
						</div>
					);
				}
			},
			{
				Header: "Status",
				accessor: "status",
				Cell: ({ cell: { row } }) => {
					return (
						<ToggleElement
							checked={row.original.activated}
							onChange={() =>
								statusToggle(
									row.original.id,
									row.original.activated
								)
							}
							isDisabled={isUpdating}
						/>
					);
				}
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => {
					return (
						<div>
							<Button
								label="Edit"
								buttonClass="standard"
								onClick={() =>
									getCurrentNotice(
										row?.original?.id,
										row?.original
									)
								}
							/>
							<Button
								label="Delete"
								buttonClass="standard-danger"
								onClick={() => {
									setDeleteModal(true);
									setCurrentId(row?.original?.id);
								}}
							/>
						</div>
					);
				}
			}
		],
		[pageNumber, pageSize, isUpdating, statusToggle]
	);

	const openAddModal = () => {
		setAddModal(true);
		setCurrentId(null);
		setCurrentData({});
	};

	if (isLoading || noticesIsLoading) {
		return <Spinner />;
	}

	return (
		<>
			<DeleteNoticeModal
				isOpen={deleteModal}
				closeModal={() => setDeleteModal(false)}
				handleDelete={deleteNotice}
				isDeleting={isDeleting}
			/>

			<CenteredDialog
				modalId="add-notice-dialog"
				closeModal={() => setAddModal(false)}
				isOpen={addModal}
				width={705}
				formTitle={currentId ? "Edit notice" : "Add notice"}
			>
				<AddNoticeModal
					currentId={currentId}
					optionsSelect={optionsSelect}
					setCurrentId={setCurrentId}
					closeModal={() => setAddModal(false)}
					isOpen={addModal}
					currentData={currentData}
					filter={getNoticesUrl({ pageSize, pageNumber })}
				/>
			</CenteredDialog>
			<div>
				<PageTitle
					title="Notice Board Setup"
					buttonGroup={
						<Button
							onClick={openAddModal}
							buttonClass="primary"
							label="Add notice"
						/>
					}
				/>
				<div className={styles.tableContainer}>
					<TMTable
						setPageNumber={setPageNumber}
						columns={columns}
						data={data?.data.items || []}
						title="All notice"
						loading={isLoading || isFetching}
						availablePages={data?.data?.metaData?.totalPages || ""}
						additonalTitleData={
							<div className="d-flex align-items-center">
								<Search
									placeholder="Search for notice"
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

export default NoticeBoard;

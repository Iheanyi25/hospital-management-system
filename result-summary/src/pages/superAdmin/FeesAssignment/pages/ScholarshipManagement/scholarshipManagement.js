import { useCallback, useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce/lib";
import { useApiDelete, useApiGet, useApiPut } from "../../../../../api/apiCall";
import {
	deleteScholarshipUrl,
	getScholarshipsUrl,
	toggleScholarshipStatusUrl
} from "../../../../../api/urls";
import {
	Button,
	PageTitle,
	Search,
	TMTable,
	ButtonDropdown,
	ToggleElement,
	CenteredDialog,
	ConfirmationModal
} from "../../../../../ui_elements";
import { PAGESIZE, SEARCH_DELAY } from "../../../../../utils/constants";
import { CreateScholarship, EditScholarship } from "./components";
import styles from "./style.module.css";

const ScholarshipManagement = () => {
	const [open, setOpen] = useState(false);
	const [edit, setEdit] = useState(false);
	const [editData, setEditData] = useState({});
	const [openDelete, setOpenDelete] = useState(false);
	const [pageNumber, setPageNumber] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearch = useDebouncedCallback(
		(value) => {
			setSearchTerm(value);
		},
		// delay in ms
		SEARCH_DELAY.sm
	);
	const pageSize = PAGESIZE.sm;

	const { push } = useHistory();
	const { data, isLoading, isFetching, error } = useApiGet(
		getScholarshipsUrl({
			pageSize,
			pageNumber,
			searchTerm
		}),
		{
			keepPreviousData: true
		}
	);

	const { mutate, isLoading: isDeleting } = useApiDelete();

	const { mutate: toggle, isLoading: isToggling } = useApiPut();

	const queryClient = useQueryClient();

	const toggleStatus = useCallback(
		(id) => {
			const requestDet = {
				url: toggleScholarshipStatusUrl(id)
			};
			toggle(requestDet, {
				onSuccess: () => {
					queryClient.invalidateQueries(
						getScholarshipsUrl({
							pageSize,
							pageNumber,
							searchTerm
						})
					);
					const successFlag = window.AJS.flag({
						type: "success",
						title: "Status Change Success!",
						body: `Scholarship status was changed successfully!`
					});
					setTimeout(() => {
						successFlag.close();
					}, 5000);
				},
				onError: ({ response }) => {
					const errorFlag = window.AJS.flag({
						type: "error",
						title: "Status Change Failure!",
						body:
							response?.data?.message ||
							`Scholarship status change was not successful!`
					});
					setTimeout(() => {
						errorFlag.close();
					}, 5000);
				}
			});
		},
		[pageNumber, pageSize, queryClient, searchTerm, toggle]
	);

	const deleteScholarship = () => {
		const requestDet = {
			url: deleteScholarshipUrl(editData.id)
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getScholarshipsUrl({
						pageSize,
						pageNumber,
						searchTerm
					})
				);
				setOpenDelete(false);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Scholarship Deletion Success!",
					body: "Your scholarship was deleted successfully"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Scholarship Deletion Failed!",
					body:
						response?.data?.message ||
						`Scholarship wasn't deleted successfully`
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
				Header: "Scholarship Name",
				accessor: "name"
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => {
					const { active, id, name, breakdown } = row.original;
					const buttonGroup = [
						{
							name: "View",
							onClick: () => {
								push({
									pathname: `/fees_assignment/scholarship_management/view_scholarship`,
									state: {
										id: row?.original?.id,
										name: row?.original?.name
									}
								});
							}
						},
						{
							name: "Edit",
							onClick: () => {
								setEdit(true);
								setEditData({
									id,
									name,
									breakdown:
										breakdown?.map?.(
											({
												paymentType,
												paymentTypeId,
												paymentPurpose,
												paymentPurposeId
											}) => ({
												feeType: {
													label: paymentPurpose,
													value: paymentPurposeId
												},
												installment: {
													label: paymentType,
													value: paymentTypeId
												}
											})
										) || []
								});
							}
						},
						{
							name: "Delete",
							style: "text-danger",
							onClick: () => {
								setEditData({
									id: row.original.id
								});
								setOpenDelete(true);
							}
						}
					];
					return (
						<div className="d-flex align-items-center">
							<ToggleElement
								id={`cleareance-active-${active}`}
								onChange={() => toggleStatus(id)}
								checked={active}
								isDisabled={isToggling}
							/>
							<ButtonDropdown buttonGroup={buttonGroup} />
						</div>
					);
				}
			}
		],
		[pageSize, pageNumber, isToggling, toggleStatus, push]
	);

	if (error)
		return "An error has occurred: " + error?.response?.data?.message;

	return (
		<>
			<CenteredDialog
				modalId="create_scholarship"
				isOpen={open}
				closeModal={() => setOpen(false)}
				formTitle="Create Scholarship"
			>
				<CreateScholarship
					closeModal={() => setOpen(false)}
					filter={{
						pageSize,
						pageNumber,
						searchTerm
					}}
				/>
			</CenteredDialog>
			<CenteredDialog
				modalId="edit_scholarship"
				isOpen={edit}
				closeModal={() => setEdit(false)}
				formTitle="Edit Scholarship"
			>
				<EditScholarship
					closeModal={() => setEdit(false)}
					editData={editData}
					filter={{
						pageSize,
						pageNumber,
						searchTerm
					}}
				/>
			</CenteredDialog>
			<ConfirmationModal
				isOpen={openDelete}
				closeModal={() => setOpenDelete(false)}
				handleClick={deleteScholarship}
				formTitle="Delete scholarship"
				message="Are you sure you want to delete this scholarship"
				buttonLabel="Delete"
				isLoading={isDeleting}
			/>
			<div className={styles.container}>
				<PageTitle
					buttonGroup={
						<>
							<Button
								data-cy="create"
								label="Create New Scholarship"
								buttonClass="primary"
								onClick={() => setOpen(true)}
							/>
						</>
					}
				/>
				<div className={styles.page_content}>
					<div className="w-100">
						<TMTable
							columns={columns}
							data={data?.data.items || []}
							title="Scholarships"
							additonalTitleData={
								<div className="d-flex align-items-center">
									<Search
										placeholder="Search for scholarship"
										onChange={(e) => {
											debouncedSearch(e.target.value);
											setPageNumber(1);
										}}
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
		</>
	);
};

export default ScholarshipManagement;

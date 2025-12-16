import React, { useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import { useDebouncedCallback } from "use-debounce/lib";
import { useApiGet, useApiDelete } from "../../../../api/apiCall";
import {
	getAllHostelRoomCategories,
	deleteHostelCategoryUrl,
	getUserTypesUrl
} from "../../../../api/urls";
import {
	PageTitle,
	Button,
	TMTable,
	CenteredDialog,
	Search,
	Spinner
} from "../../../../ui_elements";
import { PAGESIZE, SEARCH_DELAY } from "../../../../utils/constants";
import { AddCategoryModal, DeleteCategoryModal } from "./components";
import { formatSelectItems } from "../../../../utils/formatSelectItems";
import styles from "./style.module.css";

const CategoryManagement = () => {
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

	const { data, isLoading, isFetching } = useApiGet(
		getAllHostelRoomCategories({
			pageSize,
			pageNumber,
			searchTerm
		}),
		{
			keepPreviousData: true
		}
	);

	const { data: options, isLoading: noticesIsLoading } = useApiGet(
		getUserTypesUrl()
	);

	const optionsSelect = formatSelectItems(options?.data, "name", "id");

	const getCurrentCategory = (id, data) => {
		setAddModal(true);
		setCurrentId(id);
		setCurrentData(data);
	};
	const { mutate, isLoading: isDeleting } = useApiDelete();

	const deleteCategory = () => {
		const requestDet = {
			url: deleteHostelCategoryUrl(currentId)
		};

		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getAllHostelRoomCategories({ pageSize, pageNumber })
				);
				setDeleteModal(false);
				setCurrentId(null);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Category Deletion Success!",
					body: "Category was deleted successfully"
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
					title: "Category Deletion Failed!",
					body:
						response?.data?.message ||
						`Category wasn't deleted successfully`
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
				Header: "Category Name",
				accessor: "name"
			},
			{
				Header: "Occupant type",
				accessor: "userType"
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
									getCurrentCategory(
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
		[pageNumber, pageSize]
	);

	const openAddModal = () => {
		setAddModal(true);
		setCurrentId(null);
		setCurrentData({});
	};

	if (isLoading || noticesIsLoading) return <Spinner />;

	return (
		<>
			<DeleteCategoryModal
				isOpen={deleteModal}
				closeModal={() => setDeleteModal(false)}
				handleDelete={deleteCategory}
				isDeleting={isDeleting}
			/>

			<CenteredDialog
				modalId="add-notice-dialog"
				closeModal={() => setAddModal(false)}
				isOpen={addModal}
				width={705}
				formTitle={currentId ? "Edit Category" : "Create Category"}
			>
				<AddCategoryModal
					currentId={currentId}
					optionsSelect={optionsSelect}
					setCurrentId={setCurrentId}
					closeModal={() => setAddModal(false)}
					isOpen={addModal}
					currentData={currentData}
					filter={getAllHostelRoomCategories({
						pageSize,
						pageNumber
					})}
				/>
			</CenteredDialog>
			<div>
				<PageTitle
					title="Categories"
					buttonGroup={
						<Button
							onClick={openAddModal}
							buttonClass="primary"
							label="Create Category"
						/>
					}
				/>
				<div className={styles.tableContainer}>
					<TMTable
						setPageNumber={setPageNumber}
						pageNumber={pageNumber}
						columns={columns}
						data={data?.data.items || []}
						title={`Category List`}
						loading={isLoading || isFetching}
						availablePages={data?.data?.metaData?.totalPages || ""}
						additonalTitleData={
							<div className="d-flex align-items-center">
								<Search
									placeholder="Search category"
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

export default CategoryManagement;

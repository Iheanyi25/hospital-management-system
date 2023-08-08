import { useMemo, useState } from "react";

import {
	Button,
	CenteredDialog,
	ConfirmationModal,
	Search,
	TMTable
} from "../../../../../ui_elements";

import { AddMenu, EditMenu } from "./components";

import { deleteMenuUrl, getMenusUrl } from "../../../../../api/urls";

import { useApiDelete, useApiGet } from "../../../../../api/apiCall";
import { useQueryClient } from "react-query";
import { PAGESIZE, SEARCH_DELAY } from "../../../../../utils/constants";
import { useDebouncedCallback } from "use-debounce";

import styles from "./style.module.css";
import { useHistory } from "react-router-dom";

const ManageMenus = () => {
	const [open, setOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [editData, setEditData] = useState({ name: "", id: "" });
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

	const { push } = useHistory();

	const { data, isLoading, isFetching, error } = useApiGet(
		getMenusUrl({
			pageSize,
			pageNumber,
			searchTerm
		}),
		{
			refetchOnWindowFocus: false,
			keepPreviousData: true
		}
	);

	const { mutate, isLoading: isDeleting } = useApiDelete();
	const queryClient = useQueryClient();
	const deleteMenu = () => {
		const requestDet = {
			url: deleteMenuUrl(editData.id)
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getMenusUrl({ pageSize, pageNumber, searchTerm })
				);
				setOpenDelete(false);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Menu Deletion Success!",
					body: "Menu was deleted successfully"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Menu Deletion Failed!",
					body:
						response?.data?.message ||
						`Menu wasn't deleted successfully`
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
				Header: "Menu Name",
				accessor: "name"
			},
			{
				Header: "Claims",
				accessor: "claimCount"
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => (
					<div>
						<Button
							data-cy="edit_menu"
							label="Manage Claims"
							buttonClass="standard"
							onClick={() => {
								push({
									pathname: `/user_management/menus/management`,
									state: {
										id: row?.original?.id,
										name: row?.original?.name
									}
								});
							}}
						/>
						<Button
							data-cy="edit_menu"
							label="Edit "
							buttonClass="standard"
							onClick={() => {
								setEditData({
									name: row.original.name,
									id: row.original.id
								});
								setEditOpen(true);
							}}
						/>
						<Button
							data-cy="delete_menu"
							label="Delete"
							buttonClass="standard-danger"
							onClick={() => {
								setEditData({
									name: row.original.name,
									id: row.original.id
								});
								setOpenDelete(true);
							}}
						/>
					</div>
				)
			}
		],
		[pageSize, pageNumber, push]
	);

	const handleCloseAddModal = () => setOpen(false);
	const handleCloseEditModal = () => setEditOpen(false);

	if (error) return "An error has occurred: " + error.message;

	return (
		<div className={styles.container}>
			<CenteredDialog
				modalId="create_menu"
				isOpen={open}
				closeModal={handleCloseAddModal}
				formTitle="Create Menu"
			>
				<AddMenu
					currentFilterState={{ pageSize, pageNumber, searchTerm }}
					closeModal={handleCloseAddModal}
				/>
			</CenteredDialog>
			<CenteredDialog
				modalId="edit_menu"
				isOpen={editOpen}
				closeModal={handleCloseEditModal}
				formTitle="Edit Menu"
			>
				<EditMenu
					currentFilterState={{ pageSize, pageNumber, searchTerm }}
					closeModal={handleCloseEditModal}
					editMenuData={editData}
				/>
			</CenteredDialog>

			<ConfirmationModal
				isOpen={openDelete}
				closeModal={() => setOpenDelete(false)}
				handleClick={deleteMenu}
				formTitle="Delete Menu"
				message="Are you sure you want to delete this menu"
				buttonLabel="Delete menu"
				isLoading={isDeleting}
			/>
			<div className={styles.page_content}>
				<div className="w-100">
					<TMTable
						columns={columns}
						data={data?.data.items || []}
						title="Menus"
						additonalTitleData={
							<div className="d-flex align-items-center">
								<Search
									placeholder="Search menus"
									onChange={(e) => {
										debouncedSearch(e.target.value);
										setPageNumber(1);
									}}
								/>
								<Button
									data-cy="default"
									buttonClass="primary"
									label="Add New Menu"
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

export default ManageMenus;

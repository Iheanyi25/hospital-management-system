import { useCallback, useMemo, useState } from "react";

import {
	Button,
	CenteredDialog,
	ConfirmationModal,
	Search,
	TMTable
} from "../../../../../ui_elements";

import { AddRole, EditRolePro } from "./components";

import {
	deleteRoleUrl,
	getAllClaimsUrl,
	getRolesUrl
} from "../../../../../api/urls";

import { useApiDelete, useApiGet } from "../../../../../api/apiCall";
import { useQueryClient } from "react-query";
import { PAGESIZE, SEARCH_DELAY } from "../../../../../utils/constants";
import { useDebouncedCallback } from "use-debounce";

import styles from "./style.module.css";

const ManageRoles = () => {
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

	const { data, isLoading, isFetching, error } = useApiGet(
		getRolesUrl({
			pageSize,
			pageNumber,
			searchTerm
		}),
		{
			refetchOnWindowFocus: false,
			keepPreviousData: true
		}
	);

	const {
		data: claimsData,
		isLoading: claimsLoading,
		isFetching: isClaimsFetching,
		error: claimsError
	} = useApiGet(getAllClaimsUrl(), {
		refetchOnWindowFocus: false,
		keepPreviousData: true
	});

	const { mutate, isLoading: isDeleting } = useApiDelete();
	const queryClient = useQueryClient();
	const deleteRole = () => {
		const requestDet = {
			url: deleteRoleUrl(),
			data: { Name: editData.name }
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getRolesUrl({ pageSize, pageNumber, searchTerm })
				);
				setOpenDelete(false);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Role Deletion Success!",
					body: "Role was deleted successfully"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Role Deletion Failed!",
					body:
						response?.data?.message ||
						`Role wasn't deleted successfully`
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
				Header: "Role Name",
				accessor: "name"
			},
			{
				Header: "Permissions",
				accessor: "claimCount"
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => (
					<div>
						<Button
							data-cy="edit_role"
							label="Edit Permissions"
							buttonClass="standard"
							onClick={() => {
								setEditData({
									name: row.original.name
								});
								setEditOpen(true);
							}}
						/>
						<Button
							data-cy="delete_role"
							label="Delete"
							buttonClass="standard-danger"
							onClick={() => {
								setEditData({
									name: row.original.name
								});
								setOpenDelete(true);
							}}
						/>
					</div>
				)
			}
		],
		[pageSize, pageNumber]
	);

	const handleCloseAddModal = useCallback(() => setOpen(false), []);

	if (error) return "An error has occurred: " + error.message;

	return (
		<div className={styles.container}>
			<CenteredDialog
				modalId="create_role"
				isOpen={open}
				closeModal={handleCloseAddModal}
				formTitle="Create Role"
			>
				<AddRole
					currentFilterState={{ pageSize, pageNumber, searchTerm }}
					closeModal={handleCloseAddModal}
				/>
			</CenteredDialog>
			<EditRolePro
				modalId="edit_role"
				isOpen={
					claimsError || isClaimsFetching || claimsLoading
						? false
						: editOpen
				}
				closeModal={() => setEditOpen(false)}
				data={{ ...editData, ...(claimsData || {}) }}
				currentFilterState={{ pageSize, pageNumber, searchTerm }}
			/>
			<ConfirmationModal
				isOpen={openDelete}
				closeModal={() => setOpenDelete(false)}
				handleClick={deleteRole}
				formTitle="Delete Role"
				message="Are you sure you want to delete this role"
				buttonLabel="Delete role"
				isLoading={isDeleting}
			/>
			<div className={styles.page_content}>
				<div className="w-100">
					<TMTable
						columns={columns}
						data={data?.data.items || []}
						title="Roles"
						additonalTitleData={
							<div className="d-flex align-items-center">
								<Search
									placeholder="Search roles"
									onChange={(e) => {
										debouncedSearch(e.target.value);
										setPageNumber(1);
									}}
								/>
								<Button
									data-cy="default"
									buttonClass="primary"
									label="Add New Role"
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

export default ManageRoles;

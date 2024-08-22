import { useCallback, useEffect, useMemo, useState } from "react";

import {
	Breadcrumbs,
	Button,
	CenteredDialog,
	ConfirmationModal,
	PageTitle,
	TMTable
} from "../../../../../ui_elements";

import { AddUserClaim } from "./components";

import { deleteUserClaimUrl, getUserClaimsUrl } from "../../../../../api/urls";

import { useApiDelete, useApiGet } from "../../../../../api/apiCall";
import { useQueryClient } from "react-query";
import { PAGESIZE } from "../../../../../utils/constants";

import styles from "./style.module.css";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

const UserClaimManagement = () => {
	const [open, setOpen] = useState(false);
	const [editData, setEditData] = useState("");
	const [openDelete, setOpenDelete] = useState(false);
	const pageSize = PAGESIZE.sm;
	const [pageNumber, setPageNumber] = useState(1);

	const {
		state: { userId, name }
	} = useLocation();

	const { push } = useHistory();

	useEffect(() => {
		if (!userId) return push("/user_management/users");
	}, [userId, push]);

	const { data, isLoading, isFetching, error } = useApiGet(
		getUserClaimsUrl({ userId, pageSize, pageNumber }),
		{
			refetchOnWindowFocus: false,
			keepPreviousData: true
		}
	);
	const newData = data?.data?.map((item) => ({ claim: item }));
	const { mutate, isLoading: isDeleting } = useApiDelete();
	const queryClient = useQueryClient();

	const deleteClaim = () => {
		const { claim } = editData;
		const requestDet = {
			url: deleteUserClaimUrl(),
			data: {
				userId,
				claim
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getUserClaimsUrl({
						userId,
						pageSize,
						pageNumber
					})
				);
				setOpenDelete(false);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Claim Deletion Success!",
					body: "Claim was deleted successfully"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Claim Deletion Failed!",
					body:
						response?.data?.message ||
						`Claim wasn't deleted successfully`
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
				Header: "Claim Name",
				accessor: "claim"
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => (
					<div>
						<Button
							data-cy="delete_claim"
							label="Remove"
							buttonClass="standard-danger"
							onClick={() => {
								setEditData(row.original);
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

	const crumbItems = [
		{
			name: "Manage Users",
			path: "/user_management/users"
		},
		{
			name,
			path: "/"
		}
	];

	if (error)
		return "An error has occurred: " + error?.response?.data?.message;

	return (
		<div className={styles.container}>
			<CenteredDialog
				modalId="create_claim"
				isOpen={open}
				closeModal={handleCloseAddModal}
				formTitle="Add Claim"
			>
				<AddUserClaim
					currentFilterState={{ userId, pageSize, pageNumber }}
					closeModal={handleCloseAddModal}
					userId={userId}
				/>
			</CenteredDialog>
			<ConfirmationModal
				isOpen={openDelete}
				closeModal={() => setOpenDelete(false)}
				handleClick={deleteClaim}
				formTitle="Delete Claim"
				message="Are you sure you want to delete this claim"
				buttonLabel="Delete claim"
				isLoading={isDeleting}
			/>
			<Breadcrumbs crumbs={crumbItems} />
			<PageTitle
				title={name}
				buttonGroup={
					<>
						<Button
							data-cy="add_claims"
							label="Add Claims"
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
						data={newData || []}
						title="List of Claims"
						loading={isLoading || isFetching}
						setPageNumber={setPageNumber}
					/>
				</div>
			</div>
		</div>
	);
};

export default UserClaimManagement;

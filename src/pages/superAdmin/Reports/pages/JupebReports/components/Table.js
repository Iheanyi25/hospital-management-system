import { useCallback, useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import { useApiPost } from "../../../../../../api/apiCall";
import {
	changeApplicationStatusUrl,
	getAllJupebApplicationsUrl
} from "../../../../../../api/urls";
import {
	TMTable,
	Search,
	Button,
	SecondaryLink,
	Badge,
	ConfirmationModal
} from "../../../../../../ui_elements";

export const Table = ({
	loading,
	data,
	setEditData,
	setPageNumber,
	debouncedSearch,
	hasPerformedQuery,
	paginationProps,
	setEditOpen,
	pageSize,
	filter,
	admissionStatus,
	searchTerm,
	pageNumber
}) => {
	const [openModal, setOpenModal] = useState(false);
	const [updateData, setUpdateData] = useState({});
	const queryClient = useQueryClient();
	const { mutate, isLoading: isPosting } = useApiPost();
	const toggleInvoiceActivation = useCallback(() => {
		const requestDet = {
			url: changeApplicationStatusUrl(updateData?.applicationNumber)
		};
		mutate(requestDet, {
			onSuccess: ({ response }) => {
				queryClient.invalidateQueries(
					getAllJupebApplicationsUrl({
						...filter,
						pageSize,
						pageNumber,
						admissionStatus,
						searchTerm
					})
				);
				setOpenModal(false)
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Application Action Success!",
					body:
						response?.data?.message ||
						`Student was successfully admitted!`
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Application Action Failure!",
					body: response?.data?.message || `Something went wrong!`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	}, [
		queryClient,
		mutate,
		filter,
		pageNumber,
		pageSize,
		searchTerm,
		admissionStatus,
		updateData
	]);
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
				Header: "Application No",
				accessor: "applicationNumber"
			},
			{
				Header: "Fullname",
				accessor: "fullName"
			},
			{
				Header: "Mobile No",
				accessor: "mobileNumber"
			},
			{
				Header: "Status",
				accessor: "status",
				Cell: ({ cell: { row } }) => (
					<Badge
						item={{
							title: row.original.admissionStatus
								? "Approved"
								: "Pending Approval",
							type: !row.original.admissionStatus
								? "warning"
								: "success"
						}}
					/>
				)
			},
			{
				Header: "Documents",
				accessor: "rfl",
				Cell: ({ cell: { row } }) => (
					<div className="d-flex justify-content-center">
						<SecondaryLink
							label="View"
							onClick={() => {
								setEditData(row.original);
								setEditOpen(true);
							}}
						/>
					</div>
				)
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => (
					<div>
						<Button
							label={
								!row.original.admissionStatus
									? "Admit"
									: "Admitted"
							}
							buttonClass="primary"
							onClick={() => {
								setUpdateData(row.original);
								setOpenModal(true);
							}}
							disabled={row.original.admissionStatus}
						/>
					</div>
				)
			}
		],
		[setEditData, setEditOpen, pageSize, pageNumber]
	);
	return (
		<>
			<ConfirmationModal
				isOpen={openModal}
				closeModal={() => setOpenModal(false)}
				handleClick={toggleInvoiceActivation}
				formTitle={`Admit Student`}
				message={`Are you sure you want to admit ${updateData?.fullName} with application number ${updateData?.applicationNumber}?`}
				isLoading={isPosting}
				buttonLabel="Admit Student"
				deleteModal={false}
			/>
			<TMTable
				columns={columns}
				data={data}
				loading={loading || isPosting}
				title=" "
				additonalTitleData={
					<div className="d-flex align-items-center">
						{hasPerformedQuery && (
							<Search
								placeholder="Search for record"
								onChange={(e) => {
									debouncedSearch(e.target.value);
									setPageNumber(1);
								}}
							/>
						)}
					</div>
				}
				setPageNumber={setPageNumber}
				availablePages={paginationProps.totalPages}
			/>
		</>
	);
};

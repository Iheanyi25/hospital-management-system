import React, { useMemo, useState } from "react";
import Avatar from "react-avatar";
import {
	Badge,
	Button,
	CenteredDialog,
	Search,
	TMTable,
	ToggleElement
} from "../../../../../ui_elements";

import { ViewPassport } from "./viewPassport";

export const Table = ({
	data,
	paginationProps,
	setPageNumber,
	pageNumber,
	pageSize,
	searchValue,
	debouncedSearch,
	hasPerformedQuery,
	loading,
	title,
	isPosting,
	onSubmit
}) => {
	const [editOpen, setEditOpen] = useState(false);
	const [editData, setEditData] = useState({});
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
				accessor: "ed",
				Cell: ({ cell: { row } }) => (
					<Avatar
						name={`${row.original.lastname} ${row.original.firstname}`}
						src={row.original.photo}
						size={32}
						round={true}
						maxInitials={2}
					/>
				)
			},
			{
				Header: "Reg No",
				accessor: "regNumber"
			},
			{
				Header: "Surname",
				accessor: "lastname"
			},
			{
				Header: "First Name",
				accessor: "firstname"
			},
			{
				Header: "Middle Name",
				accessor: "middlename"
			},
			{
				Header: "Acceptance fee",
				accessor: "hasPaidAcceptance",
				Cell: ({ cell: { row } }) => {
					return (
						<Badge
							item={{
								title: row.original.hasPaidAcceptance
									? "Paid"
									: "Not Paid",
								type: row.original.hasPaidAcceptance
									? "success"
									: "fail"
							}}
						/>
					);
				}
			},
			{
				Header: "Status",
				accessor: "isCleared",
				Cell: ({ cell: { row } }) => {
					return (
						<Badge
							item={{
								title: row.original.isCleared
									? "Cleared"
									: "Not cleared",
								type: row.original.isCleared
									? "success"
									: "fail"
							}}
						/>
					);
				}
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => {
					const {
						isCleared,
						admissionListId,
						departmentId,
						departmentOptionId = 0
					} = row.original;
					return (
						<div>
							<ToggleElement
								id={`cleareance-status-${isCleared}`}
								checked={isCleared}
								onChange={() =>
									onSubmit({
										admissionListId,
										departmentId,
										departmentOptionId
									})
								}
								isDisabled={isPosting}
							/>
							<Button
								data-cy="view_image"
								label="View"
								buttonClass="standard"
								onClick={() => {
									setEditData(row.original);
									setEditOpen(true);
								}}
							/>
						</div>
					);
				}
			}
		],
		[pageNumber, pageSize, setEditOpen, setEditData, isPosting, onSubmit]
	);

	return (
		<div>
			<CenteredDialog
				modalId="open_image"
				isOpen={editOpen}
				closeModal={() => setEditOpen(false)}
				width={288}
				formTitle="Profile picture"
			>
				<ViewPassport
					data={editData}
					closeModal={() => setEditOpen(false)}
				/>
			</CenteredDialog>
			<TMTable
				pageNumber={pageNumber}
				columns={columns}
				data={data}
				title={hasPerformedQuery ? title : "Students records"}
				additonalTitleData={
					<>
						{hasPerformedQuery && (
							<div className="d-flex align-items-center">
								<Search
									placeholder="Search for student name or JAMB REG NO "
									onChange={(e) => {
										debouncedSearch(e.target.value);
										setPageNumber(1);
									}}
								/>
							</div>
						)}
					</>
				}
				availablePages={paginationProps.totalPages}
				setPageNumber={setPageNumber}
				hasPerformedQuery={hasPerformedQuery}
				searchParams={searchValue}
				loading={loading || isPosting}
			/>
		</div>
	);
};

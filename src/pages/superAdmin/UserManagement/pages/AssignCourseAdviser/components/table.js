import { useMemo } from "react";
import { Button, TMTable } from "../../../../../../ui_elements";

export const Table = ({
	setEditOpen,
	data,
	setEditData,
	paginationProps,
	setPageNumber,
	pageNumber,
	pageSize,
	searchValue,
	hasPerformedQuery,
	loading
}) => {
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
				Header: "Level",
				accessor: "level"
			},
			{
				Header: "Course Adviser",
				accessor: "lecturerName",
				Cell: ({ cell: { row } }) => (
					<>{row.original.lecturerName || "Not set"}</>
				)
			},
			{
				Header: "Email address",
				accessor: "lecturerEmail",
				Cell: ({ cell: { row } }) => (
					<>{row.original.lecturerEmail || "Not set"}</>
				)
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => (
					<div>
						<Button
							label={
								row.original.lecturerName ? "Update" : "Assign"
							}
							buttonClass="standard"
							data-cy="edit_hod"
							onClick={() => {
								setEditData(row.original);
								setEditOpen(true);
							}}
						/>
					</div>
				)
			}
		],
		[setEditOpen, setEditData, pageNumber, pageSize]
	);
	return (
		<TMTable
			columns={columns}
			data={data}
			title={`Course Adviser Details`}
			availablePages={paginationProps.totalPages}
			setPageNumber={setPageNumber}
			hasPerformedQuery={hasPerformedQuery}
			searchParams={searchValue}
			loading={loading}
		/>
	);
};

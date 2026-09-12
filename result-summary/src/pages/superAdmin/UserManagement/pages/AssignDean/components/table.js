import { useMemo } from "react";
import { Button, Search, TMTable } from "../../../../../../ui_elements";

export const Table = ({
	setEditOpen,
	data,
	setEditData,
	paginationProps,
	setPageNumber,
	pageNumber,
	pageSize,
	searchValue,
	debouncedSearch,
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
				Header: "Faculty",
				accessor: "faculty"
			},
			{
				Header: "Dean",
				accessor: "deanOfFaculty",
				Cell: ({ cell: { row } }) => (
					<>{row.original.deanOfFaculty || "Not set"}</>
				)
			},
			{
				Header: "Email address",
				accessor: "email",
				Cell: ({ cell: { row } }) => (
					<>{row.original.email || "Not set"}</>
				)
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => (
					<div>
						<Button
							label={
								row.original.deanOfFaculty ? "Update" : "Assign"
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
			title="Dean details"
			additonalTitleData={
				<>
					{hasPerformedQuery && (
						<div className="d-flex align-items-center">
							<Search
								placeholder="Search for faculty"
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
			pageNumber={pageNumber}
			hasPerformedQuery={hasPerformedQuery}
			searchParams={searchValue}
			loading={loading}
		/>
	);
};

import { useMemo } from "react";
import { TMTable, Search, Button } from "../../../../../../ui_elements";
import numberFormatter from "../../../../../../utils/numberFormatter";

export const SchoolFeesTable = ({
	setEditOpen,
	data,
	pageSize,
	pageNumber,
	paginationProps,
	setPageNumber,
	hasPerformedQuery,
	searchValue,
	debouncedSearch,
	loading,
	setEditData
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
				Header: "Department",
				accessor: "department"
			},
			{
				Header: "Amount",
				accessor: "amount",
				Cell: ({ cell: { row } }) => (
					<>{numberFormatter(row.original.amount)}</>
				)
			},
			{
				Header: "Tenece Commission",
				accessor: "portalCharge",
				Cell: ({ cell: { row } }) => (
					<>{numberFormatter(row.original.portalCharge)}</>
				)
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => (
					<div>
						<Button
							label="Edit"
							buttonClass="standard"
							onClick={() => {
								setEditData(row.original);
								setEditOpen(true);
							}}
						/>
					</div>
				)
			}
		],
		[setEditOpen, pageNumber, pageSize, setEditData]
	);
	return (
		<TMTable
			columns={columns}
			data={data}
			title="School fees summary"
			additonalTitleData={
				<>
					{hasPerformedQuery && (
						<div className="d-flex align-items-center">
							<Search
								placeholder="Search for fees"
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
			loading={loading}
		/>
	);
};

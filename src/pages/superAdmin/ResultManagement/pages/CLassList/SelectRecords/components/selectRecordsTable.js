import React, { useMemo } from "react";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
import { Button, Search, TMTable } from "../../../../../../../ui_elements";

export const SelectRecordsTable = ({
	data,
	paginationProps,
	setPageNumber,
	pageNumber,
	pageSize,
	searchValue,
	hasPerformedQuery,
	debouncedSearch,
	loading,
	sessionId
}) => {
	const { push } = useHistory();
	const parsed = queryString.parse(window.location.search);
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
				Header: "Course Code",
				accessor: "courseCode"
			},
			{
				Header: "Course Title",
				accessor: "course"
			},
			{
				Header: "Course Unit",
				accessor: "courseUnit"
			},
			{
				Header: "Course Type",
				accessor: "courseType"
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => (
					<Button
						data-cy="view_results"
						label="View"
						buttonClass="standard-two"
						disabled={!row.original.active}
						onClick={() =>
							push({
								pathname: "/results/classlist/view",
								state: {
									data: row.original,
									searchParams: parsed,
									sessionId
								}
							})
						}
					/>
				)
			}
		],
		[pageNumber, pageSize, push, parsed, sessionId]
	);

	console.log("Pg Num in STable", pageNumber)

	return (
		<div>
			<TMTable
				columns={columns}
				data={data}
				title="Course List"
				availablePages={paginationProps.totalPages}
				additonalTitleData={
					<>
						{hasPerformedQuery && (
							<div className="d-flex align-items-center">
								<Search
									placeholder="Search for course"
									onChange={(e) => {
										debouncedSearch(e.target.value);
										setPageNumber(1);
									}}
								/>
							</div>
						)}
					</>
				}
				setPageNumber={setPageNumber}
				hasPerformedQuery={hasPerformedQuery}
				searchParams={searchValue}
				loading={loading}
				pageNumber={pageNumber}
			/>
		</div>
	);
};

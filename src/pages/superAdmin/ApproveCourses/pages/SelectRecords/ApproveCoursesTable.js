import React, { useMemo } from "react";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
import { useQueryClient } from "react-query";
import { Button, TMTable, Search, Badge } from "../../../../../ui_elements";
import { getCourseApprovalUrl } from "../../../../../api/urls";

export default function ApproveCoursesTable({
	data,
	paginationProps,
	setPageNumber,
	pageNumber,
	pageSize,
	searchTerm,
	hasPerformedQuery,
	loading,
	debouncedSearch,
	filter
}) {
	const history = useHistory();
	const queryClient = useQueryClient();

	const cacheData = queryClient.getQueryData(
		getCourseApprovalUrl({
			...filter,
			pageNumber,
			searchTerm
		})
	);
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
				Header: "Matric number",
				accessor: "matricNumber"
			},
			{
				Header: "Fullname",
				accessor: "fullName"
			},
			{
				Header: "Status",
				accessor: "status",
				Cell: ({ cell: { row } }) => (
					<Badge
						item={{
							title: row.original.status,
							type:
								row.original.status === "Pending Approval"
									? "warning"
									: row.original.status === "Unapproved"
									? "fail"
									: "success"
						}}
					/>
				)
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => (
					<Button
						data-cy="view"
						label="View"
						buttonClass="standard-two"
						onClick={() =>
							history.push({
								pathname: "/approve_courses/view",
								state: {
									data: row.original,
									searchParams: parsed
								}
							})
						}
					/>
				)
			}
		],
		[history, pageNumber, pageSize, parsed]
	);

	return (
		<div>
			<TMTable
				columns={columns}
				data={data}
				title="Records"
				additonalTitleData={
					<div className="d-flex align-items-center">
						{hasPerformedQuery && (
							<Search
								placeholder="Search for student name or JAMB REG NO "
								onChange={(e) => {
									debouncedSearch(e.target.value);
									setPageNumber(1);
								}}
							/>
						)}
					</div>
				}
				availablePages={paginationProps.totalPages}
				setPageNumber={setPageNumber}
				hasPerformedQuery={hasPerformedQuery}
				searchParams={searchTerm}
				loading={loading && !cacheData}
			/>
		</div>
	);
}

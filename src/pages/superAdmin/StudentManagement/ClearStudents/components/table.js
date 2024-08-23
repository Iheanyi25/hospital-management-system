import React, { useMemo } from "react";
import Avatar from "react-avatar";
import { Badge, Button, Search, TMTable } from "../../../../../ui_elements";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

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
	isPosting
}) => {
	const history = useHistory();
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
					const nextPageCrumbs = [
						{
							name: "Class List",
							path: "/student_management/clear"
						},
						{
							name: title ?? "",
							back: true,
							path: "/student_management/clear"
							
						},
						{
							name: `${row.original.lastname} ${row.original.firstname}`,
							path: "/"
						}
					];
					return (
						<div>
							<Button
								data-cy="view_image"
								label="View"
								buttonClass="standard"
								onClick={() =>
									history.push({
										pathname:
											"/student_management/clear/view",
										state: {
											data: row.original,
											searchParams: parsed,
											crumbs: nextPageCrumbs
										}
									})
								}
							/>
						</div>
					);
				}
			}
		],
		[pageNumber, pageSize, history, parsed, title]
	);

	return (
		<div>
			<TMTable
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

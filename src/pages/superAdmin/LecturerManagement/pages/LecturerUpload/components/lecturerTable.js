import React, { useMemo } from "react";
import {
	Button,
	Search,
	TMTable,
} from "../../../../../../ui_elements";

export const LecturerTable = ({
	data,
	setEditOpen,
	setEditData,
	paginationProps,
	setPageNumber,
	pageNumber,
	pageSize,
	searchValue,
	debouncedSearch,
	hasPerformedQuery,
	loading,
	setCurrentId
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
				Header: "Surname",
				accessor: "lastname",
				Cell: ({ cell: { row } }) => (
					<>{row?.original?.lastname || "-"}</>
				)
			},
			{
				Header: "First name",
				accessor: "firstName",
				Cell: ({ cell: { row } }) => (
					<>{row?.original?.firstName || "-"}</>
				)
			},
			{
				Header: "Middle name",
				accessor: "middlename",
				Cell: ({ cell: { row } }) => (
					<>{row?.original?.middlename || "-"}</>
				)
			},
			{
				Header: "Sex",
				accessor: "gender",
				Cell: ({ cell: { row } }) => (
					<>{row?.original?.gender?.split("")[0] || "-"}</>
				)
			},
			{
				Header: "Email address",
				accessor: "email"
			},
			{
				Header: "Phone number",
				accessor: "mobileNumber"
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => (
					<div>
						<Button
							data-cy="edit_assigned_course"
							label="Edit"
							buttonClass="standard"
							onClick={() => {
								setCurrentId(row.original.userId)
								setEditData(row.original);
								setEditOpen(true);
							}}
						/>
					</div>
				)
			}
		],
		[
			pageNumber,
			pageSize,
			setEditOpen,
			setEditData,
			setCurrentId
		]
	);

	return (
		<div>
			<TMTable
				columns={columns}
				data={data}
				title="Lecturers details"
				additonalTitleData={
					<div className="d-flex align-items-center">
						<Search
							placeholder="Search for lecturer"
							onChange={(e) => {
								debouncedSearch(e.target.value);
								setPageNumber(1);
							}}
						/>
					</div>
				}
				availablePages={paginationProps.totalPages}
				setPageNumber={setPageNumber}
				hasPerformedQuery={hasPerformedQuery}
				searchParams={searchValue}
				loading={loading}
			/>
		</div>
	);
};

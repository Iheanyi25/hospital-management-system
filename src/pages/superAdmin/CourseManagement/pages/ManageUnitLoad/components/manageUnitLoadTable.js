import React, { useMemo } from "react";
import { Button, TMTable } from "../../../../../../ui_elements";

export const ManageUnitLoadTable = ({
	data,
	setEditOpen,
	setEditData,
	paginationProps,
	setPageNumber,
	pageNumber,
	pageSize,
	searchValue,
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
				Header: "Department",
				accessor: "department"
			},
			{
				Header: "Department option",
				accessor: "departmentOption",
				Cell: ({ cell: { row } }) => (
					<>{row.original.departmentOption || "NONE"}</>
				)
			},
			{
				Header: "Maximum unit",
				accessor: "maximumUnit",
				Cell: ({ cell: { row } }) => (
					<>{row.original.maximumUnit || "Not set"}</>
				)
			},
			{
				Header: "Minimum unit",
				accessor: "minimumUnit",
				Cell: ({ cell: { row } }) => (
					<>{row.original.minimumUnit || "Not set"}</>
				)
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => (
					<Button
						data-cy="edit_unit_load"
						label="Edit"
						buttonClass="standard"
						onClick={() => {
							setEditData(row.original);
							setEditOpen(true);
						}}
					/>
				)
			}
		],
		[pageNumber, pageSize, setEditOpen, setEditData]
	);

	return (
		<div>
			<TMTable
				columns={columns}
				data={data}
				title="Manage Unit Load"
				availablePages={paginationProps.totalPages}
				setPageNumber={setPageNumber}
				searchParams={searchValue}
				loading={loading}
			/>
		</div>
	);
};

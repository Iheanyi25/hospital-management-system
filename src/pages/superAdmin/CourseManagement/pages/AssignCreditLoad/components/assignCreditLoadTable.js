import React, { useMemo } from "react";
import { Button, TMTable } from "../../../../../../ui_elements";

export const AssignCreditLoadTable = ({
	data,
	setEditOpen,
	setEditData,
	loading
}) => {
	const columns = useMemo(
		() => [
			{
				Header: "Full name",
				accessor: "fullName",
				Cell: ({ cell: { row } }) => (
					<>{row.original.fullName.toUpperCase() || "NONE"}</>
				)
			},
			{
				Header: "Level",
				accessor: "level",
				Cell: ({ cell: { row } }) => <>{row.original.level || "NONE"}</>
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
						data-cy="edit"
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
		[setEditOpen, setEditData]
	);

	return (
		<div>
			<TMTable
				columns={columns}
				data={data}
				title="Manage Unit Load"
				loading={loading}
			/>
		</div>
	);
};

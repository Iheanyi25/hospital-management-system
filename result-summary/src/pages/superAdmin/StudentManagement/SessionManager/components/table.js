import React, { useMemo } from "react";
import { Checkbox, TMTable } from "../../../../../ui_elements";

export const Table = ({
	data,
	paginationProps,
	setPageNumber,
	deptsActiveSessionsToUpdate,
	searchValue,
	updateChecks = () => {},
	updateAllChecks = () => {},
	loading,
	pageNumber
}) => {
	const columns = useMemo(
		() => [
			{
				Header: (
					<div className="d-flex">
						<Checkbox
							label={""}
							labelClassName="ml-3"
							id={"check_all"}
							checked={data?.every((element) =>
								deptsActiveSessionsToUpdate?.includes(element)
							)}
							onSelect={() => updateAllChecks(data)}
						/>
						<span>Department</span>
					</div>
				),
				accessor: "department",
				Cell: ({ cell: { row } }) => (
					<div className="d-flex">
						<Checkbox
							label={""}
							labelClassName="ml-3"
							id={row.original.departmentId}
							checked={deptsActiveSessionsToUpdate.find(
								(item) =>
									row.original.departmentId ===
									item.departmentId
							)}
							onSelect={() => updateChecks(row.original)}
						/>
						<p>{row.original.department}</p>
					</div>
				)
			},
			{
				Header: "Active Session",
				accessor: "session"
			}
		],
		[updateChecks, updateAllChecks, data, deptsActiveSessionsToUpdate]
	);

	return (
		<div>
			<TMTable
				columns={columns}
				data={data}
				title="Department Active Sessions"
				availablePages={paginationProps.totalPages}
				setPageNumber={setPageNumber}
				pageNumber={pageNumber}
				searchParams={searchValue}
				loading={loading}
			/>
		</div>
	);
};

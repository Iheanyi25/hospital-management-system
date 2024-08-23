import React, { useMemo } from "react";
import { TMTable, ToggleElement } from "../../../../../../ui_elements";

export const Table = ({ data, loading, onSubmit, isPosting }) => {
	const columns = useMemo(
		() => [
			{
				Header: "Semester",
				accessor: "semester"
			},
			{
				Header: "Mode of Entry",
				accessor: "modeOfEntry"
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => {
					const { isOpen, semester, semesterId, modeOfEntryId, id } =
						row.original;
					return (
						<ToggleElement
							id={`open-course-registration-${semester}`}
							checked={isOpen}
							label={isOpen ? "Open" : "Close"}
							onChange={() =>
								onSubmit({
									isOpen: !isOpen ? true : false,
									modeOfEntryId,
									semesterId,
									id
								})
							}
							isDisabled={isPosting}
						/>
					);
				}
			}
		],
		[onSubmit, isPosting]
	);

	return (
		<div>
			<TMTable
				columns={columns}
				data={data}
				title="Course Registration"
				loading={loading}
			/>
		</div>
	);
};

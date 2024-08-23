import React, { useMemo } from "react";
import { TMTable, ToggleElement } from "../../../../../../ui_elements";

export const Table = ({
	data,
	loading,
	hasPerformedQuery,
	onSubmit,
	isPosting,
	sessionName
}) => {
	const columns = useMemo(
		() => [
			{
				Header: "Semester",
				accessor: "semester"
			},
			{
				Header: "Session",
				accessor: "session"
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => {
					const { isOpen, semester } = row.original;
					return (
						<ToggleElement
							id={`open-course-registration-${semester}`}
							checked={isOpen}
							label={isOpen ? "Open" : "Close"}
							onChange={() =>
								onSubmit({
									isOpen: !isOpen ? true : false
								})
							}
							isDisabled={isPosting}
						/>
					);
				}
			}
		],
		[isPosting, onSubmit]
	);

	return (
		<div>
			<TMTable
				columns={columns}
				data={data}
				title={
					hasPerformedQuery
						? `Student Course registration for ${sessionName} session`
						: ""
				}
				loading={loading}
			/>
		</div>
	);
};

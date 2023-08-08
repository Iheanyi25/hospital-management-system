import React, { useMemo } from "react";
import {
	Button,
	Search,
	TMTable,
	ToggleElement
} from "../../../../../../ui_elements";

export const AssignCourseTable = ({
	data,
	setEditOpen,
	setEditData,
	setOpenDelete,
	paginationProps,
	setPageNumber,
	pageNumber,
	pageSize,
	searchValue,
	debouncedSearch,
	hasPerformedQuery,
	loading,
	onSubmit,
	isPosting,
	setOpen
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
				Header: "Course code",
				accessor: "courseCode"
			},
			{
				Header: "Course title",
				accessor: "course"
			},
			{
				Header: "Course type",
				accessor: "courseType"
			},
			{
				Header: "Unit load",
				accessor: "courseUnit"
			},
			{
				Header: "Status",
				accessor: "active",
				Cell: ({ cell: { row } }) => {
					const { active, id } = row.original;
					return (
						<ToggleElement
							id={`open-course-registration-${active}`}
							checked={active}
							label={active ? "Activated" : "Deactivated"}
							onChange={() =>
								onSubmit({
									active: !active ? true : false,
									id
								})
							}
							isDisabled={isPosting}
						/>
					);
				}
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
								setEditData(row.original);
								setEditOpen(true);
							}}
						/>
						<Button
							data-cy="delete_assigned_course"
							label="Delete"
							buttonClass="standard-danger"
							onClick={() => {
								setEditData(row.original);
								setOpenDelete(true);
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
			isPosting,
			onSubmit,
			setOpenDelete
		]
	);

	return (
		<div>
			<TMTable
				columns={columns}
				data={data}
				title="Course List"
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
								<Button
									data-cy="default"
									buttonClass="primary"
									label="Assign course"
									customClass="ml-3"
									onClick={() => setOpen(true)}
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
		</div>
	);
};

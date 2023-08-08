import { useMemo } from "react";
import { TMTable, Search, Button } from "../../../../../../ui_elements";

export const CourseAssignmentTable = ({
	setEditOpen,
	data,
	setEditData,
	pageNumber,
	pageSize,
	debouncedSearch,
	paginationProps,
	setPageNumber,
	searchValue,
	hasPerformedQuery,
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
				Header: "Course Code",
				accessor: "courseCode"
			},
			{
				Header: "Course Title",
				accessor: "courseTitle"
			},
			{
				Header: "Lecturer",
				accessor: "lecturerName"
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => (
					<div>
						<Button
							label="Edit"
							buttonClass="standard"
							onClick={() => {
								setEditData({
									id: row.original.id,
									courseCode: row.original.courseCode,
									courseTitle: row.original.courseTitle,
									Lecturer: row.original.lecturer
								});
								setEditOpen(true);
							}}
						/>
					</div>
				)
			}
		],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[setEditOpen]
	);

	return (
		<TMTable
			columns={columns}
			data={data}
			title="Course Details"
			additonalTitleData={
				<>
					{hasPerformedQuery && (
						<div className="d-flex align-items-center">
							<Search
								placeholder="Search for lecturer"
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
			loading={loading}
		/>
	);
};

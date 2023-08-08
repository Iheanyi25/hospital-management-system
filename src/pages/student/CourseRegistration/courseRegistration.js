import { useMemo } from "react";
import { useHistory } from "react-router";
import { useApiGet } from "../../../api/apiCall";
import { getRegisteredCoursesHistoryUrl } from "../../../api/urls";

import { Button, Spinner } from "../../../ui_elements";
import { CoursesTable, EmptyState } from "./containers";

 const CourseRegistration = () => {
	const history = useHistory();
	const { data: registeredCoursesHistory, isLoading } = useApiGet(
		getRegisteredCoursesHistoryUrl()
	);

	const columns = useMemo(
		() => [
			{
				Header: "Session",
				accessor: "session"
			},
			{
				Header: "Semester",
				accessor: "semester"
			},
			{
				Header: "Level",
				accessor: "level"
			},
			{
				Header: "",
				accessor: "btn",
				Cell: ({ row }) => (
					<div>
						<Button
							data-cy="view_reg"
							label="View"
							buttonClass="standard-two"
							onClick={() =>
								history.push({
									pathname: `/course_registration/${
										row.original.approved
											? "view"
											: "register"
									}`,

									state: row.original
								})
							}
						/>
					</div>
				)
			}
		],
		[history]
	);

	const tableData = {
		header: columns,
		data: registeredCoursesHistory?.data || []
	};

	const registerCourses = () => {
		history.push("/course_registration/session");
	};

	if (isLoading) return <Spinner />;
	return (
		<section>
			{registeredCoursesHistory?.data?.length > 0 ? (
				<CoursesTable registeredCoursesTableData={tableData} />
			) : (
				<EmptyState registerCourses={registerCourses} />
			)}
		</section>
	);
};

export default CourseRegistration;
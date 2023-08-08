import { CourseTable } from ".";
import styles from "./style.module.css";

export const CourseOverviewTable = ({
	courses = [],
	noCourseApprovalStatus
}) => {
	return (
		<div className="mt-5">
			<div
				className={`${styles.course_overview_table_header} d-flex align-items-center justify-content-center`}
			>
				<h4>REGISTERED COURSES</h4>
			</div>

			<CourseTable
				data={courses}
				noCourseApprovalStatus={noCourseApprovalStatus}
			/>
		</div>
	);
};

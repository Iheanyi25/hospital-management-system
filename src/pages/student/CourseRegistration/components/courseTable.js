import styles from "./style.module.css";

export const CourseTable = ({ data, noCourseApprovalStatus }) => {
	const totalRegisteredCourseUnits = getTotalRegisteredCourseUnits(data);
	return (
		<div className={styles.courseTable_container}>
			<table className={styles.courseTable}>
				<thead>
					<tr>
						<th>Course Code</th>
						<th>Course Title</th>
						<th>Course Unit</th>
						<th>Course Type</th>
						{!noCourseApprovalStatus && <th>Approved</th>}
					</tr>
				</thead>
				<tbody>
					{data.map((data, index) => (
						<tr key={index}>
							<td>{data.courseCode}</td>
							<td>{data.courseName}</td>
							<td>{data.unitLoadId}</td>
							<td>{data.courseType?.toUpperCase()}</td>
							{!noCourseApprovalStatus && (
								<td>{data.approved ? "True" : "False"}</td>
							)}
						</tr>
					))}
					<tr>
						<td></td>
						<td>TOTAL</td>
						<td>{totalRegisteredCourseUnits}</td>
						<td></td>
						{!noCourseApprovalStatus && <td></td>}
					</tr>
				</tbody>
			</table>
		</div>
	);
};

const getTotalRegisteredCourseUnits = (data) => {
	return data.reduce((acc, curr) => {
		return acc + parseInt(curr.unitLoadId);
	}, 0);
};

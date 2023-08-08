import { Fragment } from "react";
import "./style.css";

export const ResultTable = ({
	subjects = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
	students = [
		{
			name: "NWANKWO CHIDIMMA JUDITH",
			reg: 2013316001,
			subjects: [
				{
					gr: "A",
					gp: "11.00"
				},
				{
					gr: "A",
					gp: "11.00"
				},
				{
					gr: "A",
					gp: "11.00"
				},
				{
					gr: "A",
					gp: "11.00"
				},
				{
					gr: "A",
					gp: "11.00"
				},
				{
					gr: "A",
					gp: "11.00"
				},
				{
					gr: "A",
					gp: "11.00"
				},
				{
					gr: "A",
					gp: "11.00"
				},
				{
					gr: "A",
					gp: "11.00"
				},
				{
					gr: "A",
					gp: "11.00"
				},
				{
					gr: "A",
					gp: "11.00"
				},
				{
					gr: "A",
					gp: "11.00"
				}
			]
		}
	]
}) => {
	const roundUp = (num) => Math.round(num * 100) / 100;

	const outStandings = (array) => {
		let courses = array.map((course, _) => course?.courseCode);

		if (courses.length > 0) {
			return courses.join(",");
		} else {
			return "NONE";
		}
	};

	return (
		<table className="result-table-th">
			<thead>
				<tr>
					<td></td>
					<td></td>
					{subjects.map((sub, i) => (
						<td
							key={i + 200000}
							colSpan="2"
							className="vertical-td course-fields"
						>
							{/* {sub?.courseTitle}
							<br /> */}
							{sub?.courseCode}
						</td>
					))}
					<td colSpan="3" rowSpan="1" className="td-align-center">
						CURRENT
					</td>
					<td colSpan="3" rowSpan="1" className="td-align-center">
						PREVIOUS
					</td>
					<td colSpan="3" rowSpan="1" className="td-align-center">
						CUMULATIVE
					</td>
					<td rowSpan={2} className="td-align-center vertical-td">
						REM
					</td>
				</tr>
				<tr>
					<td>SN</td>
					<td>MAT. NO.</td>
					{subjects?.map((cred, i) => (
						<td
							key={i + 1000000}
							className="td-align-center"
							colSpan="2"
						>
							{cred?.courseUnit}
						</td>
					))}

					<td>TNU</td>
					<td>TCP</td>
					<td>GPA</td>

					<td>TNU</td>
					<td>TCP</td>
					<td>GPA</td>

					<td>TNU</td>
					<td>TCP</td>
					<td>GPA</td>
				</tr>
			</thead>
			<tbody>
				{students?.map((students) => (
					<Fragment key={students.id}>
						<tr>
							<td rowSpan="2">{students.id}</td>
							<td rowSpan="2">
								{/* {students.name} */}
								{students.regNo}
							</td>
							{students?.subjects?.map((stud) => (
								<td
									colSpan="2"
									className={`text-right ${
										stud.grade === "F"
											? "red_color_text"
											: ""
									}`}
								>
									{stud.grade ? stud.grade : "-"}
								</td>
							))}
							<td rowSpan={2} className="td-align-center">
								{
									students?.currentSemesterDataResponse
										?.creditUnit || "-"
								}
							</td>
							<td rowSpan={2} className="td-align-center">
								{roundUp(
									students?.currentSemesterDataResponse
										?.creditPoint
								) || "-"}
							</td>
							<td rowSpan={2} className="td-align-center">
								{roundUp(
									students?.currentSemesterDataResponse
										?.gradePointAverage
								) || "-"}
							</td>
							<td rowSpan={2} className="td-align-center">
								{
									students?.previousSemesterDataResponse
										?.creditUnit || "-"
								}
							</td>
							<td rowSpan={2} className="td-align-center">
								{roundUp(
									students?.previousSemesterDataResponse
										?.creditPoint
								) || "-"}
							</td>
							<td rowSpan={2} className="td-align-center">
								{roundUp(
									students?.previousSemesterDataResponse
										?.gradePointAverage
								) || "-"}
							</td>
							<td rowSpan={2} className="td-align-center">
								{
									students?.cumulativeSemesterDataResponse
										?.creditUnit || "-"
								}
							</td>
							<td rowSpan={2} className="td-align-center">
								{roundUp(
									students?.cumulativeSemesterDataResponse
										?.creditPoint
								) || "-"}
							</td>
							<td rowSpan={2} className="td-align-center">
								{roundUp(
									students?.cumulativeSemesterDataResponse
										?.gradePointAverage
								) || "-"}
							</td>
							<td rowSpan={2} className="td-align-center">
								{students?.remark}
							</td>
						</tr>
						<tr>
							<td colSpan={subjects.length * 2}>
								<strong className="font-size-for-out">
									OUTSTANDING:
								</strong>
								&nbsp;
								{outStandings(students?.outStandingCourses)}
							</td>
						</tr>
					</Fragment>
				))}
			</tbody>
		</table>
	);
};

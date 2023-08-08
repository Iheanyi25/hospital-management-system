import styles from "./style.module.css";
import logo from "../../assets/svgs/logo.svg";
import { useEffect, useMemo, useState } from "react";
import { TMTable } from "..";

export const ResultPrintOut = ({ resultData }) => {
	const [data, setData] = useState([]);

	function sliceIntoChunks(arr, chunkSize) {
		const res = [];
		for (let i = 0; i < arr?.length; i += chunkSize) {
			const chunk = arr?.slice(i, i + chunkSize);
			res.push(chunk);
		}
		return res;
	}

	useEffect(() => {
		setData(sliceIntoChunks(resultData?.studentGrades, 30));
	}, [resultData]);

	const columns = useMemo(
		() => [
			{
				Header: "S/N",
				accessor: "sn"
			},
			{
				Header: "Students name",
				accessor: "fullName"
			},
			{
				Header: "Matric number",
				accessor: "matricNumber"
			},
			{
				Header: "Quiz & Assi.",
				accessor: "test"
			},
			{
				Header: "Lab",
				accessor: "lab"
			},
			{
				Header: "Exam",
				accessor: "exam"
			},
			{
				Header: "Total",
				accessor: "total"
			},
			{
				Header: "Grade",
				accessor: "grade"
			},
			{
				Header: "Remarks",
				accessor: "remarks"
			}
		],
		[]
	);

	return (
		<>
			{data.map((data, i) => (
				<section key={i} className={styles.section_container}>
					<div class={styles.img_container}>
						<img src={logo} alt="school logo" />
					</div>
					<header class={styles.header_container}>
						<div>
							<div class={styles.student_details_grid}>
								<div>Faculty:</div>
								<div>{resultData?.faculty}</div>
							</div>
							<div class={styles.student_details_grid}>
								<div>Department:</div>
								<div>{resultData?.department}</div>
							</div>
							<div class={styles.student_details_grid}>
								<div>Course title:</div>
								<div>{resultData?.courseTitle}</div>
							</div>
							<div class={styles.student_details_grid}>
								<div>Course code:</div>
								<div>{resultData?.courseCode}</div>
							</div>
						</div>
						<div>
							<div class={styles.student_details_grid}>
								<div>Course unit:</div>
								<div>{resultData?.courseUnit}</div>
							</div>
							<div class={styles.student_details_grid}>
								<div>Programme:</div>
								<div>{resultData?.programme}</div>
							</div>
							<div class={styles.student_details_grid}>
								<div>Session:</div>
								<div>{resultData?.session}</div>
							</div>
							<div class={styles.student_details_grid}>
								<div>Semester:</div>
								<div>{resultData?.semester}</div>
							</div>
						</div>
						<div>
							<div class={styles.student_details_grid}>
								<div>A (70-100%):</div>
								<div>{resultData?.gradeACount}</div>
							</div>
							<div class={styles.student_details_grid}>
								<div>B (60-69%):</div>
								<div>{resultData?.gradeBCount}</div>
							</div>
							<div class={styles.student_details_grid}>
								<div>C (50-59%): </div>
								<div>{resultData?.gradeCCount}</div>
							</div>
							<div class={styles.student_details_grid}>
								<div>D (45-49%):</div>
								<div>{resultData?.gradeDCount}</div>
							</div>
						</div>
						<div>
							<div class={styles.student_details_grid}>
								<div>E (40-44%):</div>
								<div>{resultData?.gradeECount}</div>
							</div>
							<div class={styles.student_details_grid}>
								<div>F (0-39%):</div>
								<div>{resultData?.gradeFCount}</div>
							</div>
						</div>
					</header>
					<div class={styles.course_overview_table_header}>
						<h4 className="text-uppercase">{`${resultData?.session} ${resultData?.semester} Semester Results`}</h4>
					</div>
					{/* <table class={styles.course_table}>
						<tr>
							<th>Course Code</th>
							<th>Students name</th>
							<th>Matric number</th>
							<th>Quiz & Assi. (30%)</th>
							<th>Exam (70%)</th>
							<th>Total (100%)</th>
							<th>Grade</th>
							<th>Remarks</th>
						</tr>
						{data?.map((grade) => (
							<tr key={grade?.sn || "-"}>
								<td>{grade?.sn || "-"}</td>
								<td>{grade?.fullName || "-"}</td>
								<td>{grade?.matricNumber || "-"}</td>
								<td>{grade?.test || "-"}</td>
								<td>{grade?.exam || "-"}</td>
								<td>{grade?.total || "-"}</td>
								<td>{grade?.grade || "-"}</td>
								<td>{grade?.remarks || "-"}</td>
							</tr>
						))}
					</table> */}
					<TMTable columns={columns} data={data} />
					<footer className={styles.footer_container}>
						<div>
							<div
								className={`${styles.lecturer_details_grid} row`}
							>
								<div className="col-6">Name of lecturer</div>
								<div className="col-6">
									________________________
								</div>
							</div>
							<div
								className={`${styles.lecturer_details_grid} row`}
							>
								<div className="col-6">Name of HOD</div>
								<div className="col-6">
									________________________
								</div>
							</div>
						</div>
						<div>
							<div
								className={`${styles.lecturer_details_grid} row`}
							>
								<div className="col-6">Sign</div>
								<div className="col-6">
									________________________
								</div>
							</div>
							<div
								className={`${styles.lecturer_details_grid} row`}
							>
								<div className="col-6">Sign</div>
								<div className="col-6">
									________________________
								</div>
							</div>
						</div>
						<div>
							<div
								className={`${styles.lecturer_details_grid} row`}
							>
								<div className="col-6">Date</div>
								<div className="col-6">
									________________________
								</div>
							</div>
							<div
								className={`${styles.lecturer_details_grid} row`}
							>
								<div className="col-6">Date</div>
								<div className="col-6">
									________________________
								</div>
							</div>
						</div>
					</footer>
				</section>
			))}
		</>
	);
};

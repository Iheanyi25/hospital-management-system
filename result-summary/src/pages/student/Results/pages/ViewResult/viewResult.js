import {
	Breadcrumbs,
	PageTitle,
	Button,
	PersonnelCard,
	CopyrightText
} from "../../../../../ui_elements";
import styles from "./style.module.css";
import barcode from "../../../../../assets/images/barcode.png";
import { useHistory, useLocation } from "react-router-dom";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const pageStyle = `
@page {
// size: 80mm 50mm;
margin-top: 5rem;
}

// @media all {
//   .pagebreak {
//     display: none;
//   }
// }

@media print {
.pagebreak {
// page-break-before: always;

}
}
`;

const ViewResult = () => {
	const ref = useRef();
	const handlePrint = useReactToPrint({
		content: () => ref.current,
		pageStyle: pageStyle
	});
	const { goBack } = useHistory();
	const location = useLocation();
	if (!location.state) goBack();
	const { details: data } = location?.state;
	const details = [
		{
			title: "Full Name",
			value: data?.studentProfileResponse.fullName
		},
		{
			title: "Matric No",
			value: data?.studentProfileResponse.matricNumber
		},
		{ title: "Faculty", value: data?.studentProfileResponse.faculty },
		{
			title: "Department",
			value: data?.studentProfileResponse.department
		},
		{
			title: "Entry Mode",
			value: data?.studentProfileResponse.entryMode
		},
		{ title: "Level", value: data?.studentProfileResponse.level },
		{ title: "Session", value: data?.studentProfileResponse.session },
		{
			title: "Semester",
			value: `${data?.studentProfileResponse.semester} Semester`
		}
	];

	const crumbItems = [
		{
			name: "Results",
			path: "/results"
		},
		{
			name: `${data?.studentProfileResponse.session} ${data?.studentProfileResponse.semester} Semester`,
			path: "/"
		}
	];

	return (
		<section className={styles.course_result_overview}>
			<div>
				<Breadcrumbs crumbs={crumbItems} />
				<PageTitle
					title="Results"
					buttonGroup={
						<Button
							data-cy="print_res"
							buttonClass="success"
							label="Print"
							onClick={handlePrint}
						/>
					}
				/>
			</div>
			<div className={styles.page_content} ref={ref}>
				<PersonnelCard
					details={details}
					user={data?.studentProfileResponse}
				/>
				<div className="mt-5">
					<div
						className={`${styles.course_overview_table_header} d-flex align-items-center justify-content-center`}
					>
						<h4 className="text-uppercase">
							{`${data?.studentProfileResponse.session} ${data?.studentProfileResponse.semester} Semester Results`}
						</h4>
					</div>
					<div className={styles.table_content}>
						<table className={styles.course_table}>
							<thead>
								<tr>
									<th>Course Code</th>
									<th>Course Title</th>
									<th>Course Unit</th>
									<th>Test Score</th>
									<th>Exam Score</th>
									<th>Total</th>
									<th>Grade</th>
								</tr>
							</thead>
							<tbody>
								{data?.studentCourseResponse.map(
									(data, index) => (
										<tr key={index}>
											<td>{data.courseCode}</td>
											<td>{data.courseTitle}</td>
											<td>{data.courseUnit}</td>
											<td>{data.testScore}</td>
											<td>{data.examScore}</td>
											<td>{data.totalScore}</td>
											<td>{data.grade}</td>
										</tr>
									)
								)}
								<tr>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td>GPA</td>
									<td>{data?.gpa?.toFixed(2)}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="d-flex align-items-center justify-content-center my-4">
						<img src={barcode} alt={""} />
					</div>
					<div className="mt-4 p-4 border-top">
						<CopyrightText />
					</div>
				</div>
			</div>
		</section>
	);
};

export default ViewResult;

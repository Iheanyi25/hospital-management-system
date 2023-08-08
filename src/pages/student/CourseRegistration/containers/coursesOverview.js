import { useRef, useEffect } from "react";
import {
	PageTitle,
	Breadcrumbs,
	PersonnelCard,
	Spinner,
	Button,
	CopyrightText
} from "../../../../ui_elements";
import { CourseOverviewTable, Note } from "../components";
import styles from "../style.module.css";

import barcode from "../../../../assets/images/barcode.png";
import { useHistory, useLocation } from "react-router-dom";
import { useApiGet } from "../../../../api/apiCall";
import { getRegisteredCoursesUrl } from "../../../../api/urls";
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

const CourseOverview = () => {
	const location = useLocation();
	const history = useHistory();
	const ref = useRef();
	const handlePrint = useReactToPrint({
		content: () => ref.current,
		pageStyle: pageStyle
	});

	const {
		data: registeredCourses,
		isLoading,
		error
	} = useApiGet(
		getRegisteredCoursesUrl({
			semester: location?.state?.semester,
			sessionId: location?.state?.sessionId,
			yearOfStudyId:
				location?.state?.yearOfStudyId || location?.state?.levelId
		})
	);

	useEffect(() => {
		if (
			location?.state?.from === "course_register" &&
			registeredCourses?.data?.courses?.length > 0
		) {
			const successFlag = window.AJS.flag({
				type: "success",
				title: "Course Registration Successful",
				body: `You have successfully registered your ${registeredCourses?.data?.studentData?.session} courses. `
			});
			setTimeout(() => {
				successFlag.close();
			}, 5000);
		}
	}, [location?.state?.from, registeredCourses?.data]);

	//if data was not passed through route, take the user back
	if (!(location?.state?.semester || location?.state?.sessionId)) {
		history.push("/course_registration");
	}

	let details = [];

	if (registeredCourses?.data) {
		const { studentData } = registeredCourses.data;
		const {
			department,
			fullname,
			faculty,
			studentModeOfEntry,
			matricNumber,
			semester,
			session,
			level
		} = studentData;
		details = [
			{ title: "Full Name", value: fullname },
			{ title: "Matric No", value: matricNumber },
			{ title: "Faculty", value: faculty },
			{ title: "Department", value: department },
			{ title: "Entry Mode", value: studentModeOfEntry },
			{ title: "Level", value: level },
			{ title: "Session", value: session },
			{ title: "Semester", value: semester }
		];
	}

	const crumbs = [
		{
			name: "Course Registration",
			path: "/course_registration"
		},
		{
			name: `${registeredCourses?.data?.studentData?.session} Session`,
			path: ""
		}
	];
	if (isLoading) return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<section>
			<Breadcrumbs crumbs={crumbs} />
			<PageTitle
				title={"Course Registration"}
				buttonGroup={
					<Button
						data-cy="print"
						buttonClass="success"
						label="Print"
						onClick={handlePrint}
					/>
				}
			/>
			<div ref={ref} className={styles.course_container_card}>
				<div className={styles.personnel_card_align}>
					<PersonnelCard
						details={details}
						user={registeredCourses?.data?.studentData}
					/>
				</div>
				<CourseOverviewTable
					courses={registeredCourses?.data?.courses || []}
				/>
				<div>
					<div
						className={`${styles.credibility_container} d-flex flex-row justify-content-around`}
					>
						<aside>
							<input />
							<h4>Student Signature:</h4>
						</aside>
						<aside>
							<input />
							<h4>Date:</h4>
						</aside>
					</div>
					<div className={styles.credibility_container}>
						<aside className="">
							<input />
							<h4>Academic Adviser's Signature</h4>
						</aside>
					</div>
				</div>
				<Note>
					<div className="d-flex align-items-center justify-content-center">
						<img src={barcode} alt={""} />
					</div>
				</Note>
				<div className="mt-5">
					<CopyrightText />
				</div>
			</div>
		</section>
	);
};

export default CourseOverview;

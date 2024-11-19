import { PersonnelCard, CopyrightText } from "../../../../ui_elements";
import { CourseOverviewTable, Note } from "../components";
import styles from "../style.module.css";

import barcode from "../../../../assets/images/barcode.png";

const CourseRegPrintout = ({ dataRef, registeredCourses }) => {
	let details = [];
	let profile = "";
	if (registeredCourses?.data) {
		profile = registeredCourses?.data?.studentProfile;
		const { studentProfile } = registeredCourses.data;
		const {
			department,
			fullname,
			faculty,
			modeOfEntry,
			matricNumber
			// level
		} = studentProfile;
		details = [
			{ title: "Full Name", value: fullname },
			{ title: "Matric No", value: matricNumber },
			{ title: "Faculty", value: faculty },
			{ title: "Department", value: department },
			{ title: "Entry Mode", value: modeOfEntry },
			{ title: "Level", value: registeredCourses?.data?.level },
			{ title: "Session", value: registeredCourses?.data?.session },
			{ title: "Semester", value: registeredCourses?.data?.semester }
		];
	}

	return (
		<div ref={dataRef} className={styles.course_container_card}>
			<div className={styles.personnel_card_align}>
				<PersonnelCard details={details} user={profile} />
			</div>

			<CourseOverviewTable
				courses={registeredCourses?.data?.registerableCourses || []}
			/>
			<div className="d-flex">
				<div className={styles.credibility_container}>
					<aside>
						<input />
						<h4>Student Signature:</h4>
					</aside>
					<aside>
						<input />
						<h4>Academic Adviser's Name</h4>
					</aside>
					<aside>
						<input />
						<h4>HOD's Name</h4>
					</aside>
					<aside>
						<input />
						<h4>Faculty Office's Name</h4>
					</aside>
				</div>

				<div className={styles.credibility_container}>
					<aside>
						<input />
						<h4>Date:</h4>
					</aside>
					<aside>
						<input />
						<h4>Academic Adviser's Signature</h4>
					</aside>
					<aside>
						<input />
						<h4>HOD's Signature</h4>
					</aside>
					<aside>
						<input />
						<h4>Faculty Office's Signature</h4>
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
	);
};

export default CourseRegPrintout;

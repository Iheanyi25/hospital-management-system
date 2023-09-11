import styles from "../style.module.css";
import bigLogo from "../../../../../../assets/svgs/bigLogo.svg";

export const SenateSheet = ({ data, info }) => {
	return (
		<div className={styles.senate_sheet_container}>
			<SenateResultSection data={data} info={info} />
		</div>
	);
};

const SenateResultSection = ({ data, info }) => {
	const roundUp = (num) => Math.round(num * 100) / 100;

	const outStandings = (array) => {
		if (array) {
			let courses = array?.map((course, _) => course?.courseCode);

			if (courses.length > 0) {
				return courses.join(",");
			} else {
				return "NONE";
			}
		}
	};

	return (
		<>
			<p className={`text-center ${styles.senate_result_section_header}`}>
				AKWAPOLY Result Sheet [Senate Format]
			</p>
			<div className={`mt-3 ${styles.senate_small_header}`}>
				<img src={bigLogo} alt="" />
			</div>
			<h5 className="text-center mt-3">
				FEDERAL UNIVERSITY OF PETROLEUM RESOURCES, EFFURUN
				<br /> SENATE FORMAT FOR DEGREE PROGRAMMES
				<br /> PRESENTATION OF {info?.Session?.label + " "}
				{info?.Semester?.label + " "}
				SEMESTER EXAMINATION RESULT TO SENATE
			</h5>

			<div className={styles.senate_result_section_body}>
				<h5 className="text-left mt-3 h5 text-uppercase text-uppercase">
					{info?.StudentType?.label} PROGRAMME
					<br />
					COLLEGE OF SCIENCE <br />
					DEPARTMENT OF {info?.Department?.label} <br />
					{info?.Level?.label} <br />
					EXAMINATION DATE:
				</h5>
				<p className={`mt-2 ${styles.senate_result_section_body_p}`}>
					On behalf of the Board of Studies, College of Science and
					its Board of Examiners, I present to Senate the result of
					the {info?.Semester?.label}
					<br />
					Semester examination held in the College in the{" "}
					{info?.Session?.label + " "}
					Session, together with the recommendations arising there
					from
					<br /> consideration and approval.
				</p>
				<h5 className="mt-4 h5">(A) SUCCESSFUL STUDENTS </h5>
				<p className={`mt-2 ${styles.senate_result_section_body_p}`}>
					The following {data?.successfulStudents?.length || "0"}{" "}
					student(s) have satisfied the Examiners in all the courses
					which they registered for in the{" "}
					{info?.Session?.label + " "}
					session and have earned all the assigned credit points.
				</p>
				<table className={`mt-4 ${styles.senate_result_table}`}>
					<thead>
						<tr>
							<th>SN</th>
							<th>MATRIC NO</th>
							<th>FULL NAME</th>
							<th>GPA</th>
							<th>CGPA</th>
						</tr>
					</thead>
					<tbody>
						{data?.successfulStudents?.length > 0 ? (
							data?.successfulStudents?.map((details, i) => (
								<tr key={details?.matricNumber}>
									<td>{i + 1}</td>
									<td>{details?.matricNumber} </td>
									<td>{details?.fullName}</td>
									<td>{roundUp(details?.gpa)}</td>
									<td> {roundUp(details?.cgpa)} </td>
								</tr>
							))
						) : (
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						)}
					</tbody>
				</table>

				<h5 className="mt-5 h5">
					(B) STUDENTS WITH CARRY OVER COURSES{" "}
				</h5>
				<p className={`mt-2 ${styles.senate_result_section_body_p}`}>
					The following {data?.studentsWithCarryOver?.length || "0"}{" "}
					student(s) have obtained the CGPA {">="} 1.00 minimum
					requirement to remain in the College, but failed some
					courses which they are allowed to carry over to the next
					session.
				</p>
				<table className={`mt-4 ${styles.senate_result_table}`}>
					<thead>
						<tr>
							<th>SN</th>
							<th>MATRIC NO</th>
							<th>FULL NAME</th>
							<th>GPA</th>
							<th>CGPA</th>
							<th>OUTSTANDING COURSES</th>
						</tr>
					</thead>
					<tbody>
						{data?.studentsWithCarryOver?.length > 0 ? (
							data?.studentsWithCarryOver.map((details, i) => (
								<tr key={details?.matricNumber}>
									<td>{i + 1}</td>
									<td>{details?.matricNumber}</td>
									<td>{details?.fullName}</td>
									<td>{roundUp(details?.gpa)}</td>
									<td> {roundUp(details?.cgpa)} </td>
									<td>
										{outStandings(
											details?.outstandingCourses
										)}
									</td>
								</tr>
							))
						) : (
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						)}
					</tbody>
				</table>

				<h5 className="mt-5 h5">(C) STUDENTS FOR PROBATION</h5>
				<p className={`mt-2 ${styles.senate_result_section_body_p}`}>
					The following {data?.studentsForProbation?.length || "0"}{" "}
					student(s) have CGPA {"<"} 1.00 minimum requirement and are
					to be on probation in the following semester while they also
					carry over failed courses to the next session.
				</p>
				<table className={`mt-4 ${styles.senate_result_table}`}>
					<thead>
						<tr>
							<th>SN</th>
							<th>MATRIC NO</th>
							<th>FULL NAME</th>
							<th>GPA</th>
							<th>CGPA</th>
							<th>OUTSTANDING COURSES</th>
						</tr>
					</thead>
					<tbody>
						{data?.studentsForProbation?.length > 0 ? (
							data?.studentsForProbation.map((details, i) => (
								<tr key={details?.matricNumber}>
									<td>{i + 1}</td>
									<td>{details?.matricNumber}</td>
									<td>{details?.fullName}</td>
									<td>{roundUp(details?.gpa)}</td>
									<td> {roundUp(details?.cgpa)} </td>
									<td>
										{outStandings(
											details?.outstandingCourses
										)}
									</td>
								</tr>
							))
						) : (
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						)}
					</tbody>
				</table>

				<h5 className="mt-5 h5">(D) STUDENTS FOR TRANSFER</h5>
				<p className={`mt-2 ${styles.senate_result_section_body_p}`}>
					The following {data?.studentsForTransfer?.length || "0"}{" "}
					student(s) have CGPA {"<"} 1.00 minimum requirement and have
					requested for transfer or have been transferred as indicated
					with effect from the next session while they also carry over
					failed courses to the next session.
				</p>
				<table className={`mt-4 ${styles.senate_result_table}`}>
					<thead>
						<tr>
							<th>SN</th>
							<th>MATRIC NO</th>
							<th>FULL NAME</th>
							<th>GPA</th>
							<th>CGPA</th>
							<th>OUTSTANDING COURSES</th>
						</tr>
					</thead>
					<tbody>
						{data?.studentsForTransfer?.length > 0 ? (
							data?.studentsForTransfer.map((details, i) => (
								<tr key={details?.matricNumber}>
									<td>{i + 1}</td>
									<td>{details?.matricNumber}</td>
									<td>{details?.fullName}</td>
									<td>{roundUp(details?.gpa)}</td>
									<td> {roundUp(details?.cgpa)} </td>
									<td>
										{outStandings(
											details?.outstandingCourses
										)}
									</td>
								</tr>
							))
						) : (
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						)}
					</tbody>
				</table>

				<h5 className="mt-5 h5">(E) STUDENTS FOR WITHDRAWAL</h5>
				<p className={`mt-2 ${styles.senate_result_section_body_p}`}>
					The following {data?.studentsForWithdrawal?.length || "0"}{" "}
					student(s) who had been on probation/transfer in the
					previous semester based on the CGPA {"<"} 1.00 minimum now
					have CGPA {"<"} 1.00 again are therefore, required to
					withdraw from the University.
				</p>
				<table className={`mt-4 ${styles.senate_result_table}`}>
					<thead>
						<tr>
							<th>SN</th>
							<th>MATRIC NO</th>
							<th>FULL NAME</th>
							<th>GPA</th>
							<th>CGPA</th>
							<th>OUTSTANDING COURSES</th>
						</tr>
					</thead>
					<tbody>
						{data?.studentsForWithdrawal?.length > 0 ? (
							data?.studentsForWithdrawal.map((details, i) => (
								<tr key={details?.matricNumber}>
									<td>{i + 1}</td>
									<td>{details?.matricNumber}</td>
									<td>{details?.fullName}</td>
									<td>{roundUp(details?.gpa)}</td>
									<td> {roundUp(details?.cgpa)} </td>
									<td>
										{outStandings(
											details?.outstandingCourses
										)}
									</td>
								</tr>
							))
						) : (
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						)}
					</tbody>
				</table>

				<h5 className="mt-5 h5">(F) MEDICAL CASES</h5>
				<p className={`mt-2 ${styles.senate_result_section_body_p}`}>
					The following{" "}
					{data?.studentsWithMedicalCases?.length || "0"} student(s)
					who were absent from some or all the course examinations in
					the College have CGPA {"<"} 1.00 minimum requirement and
					have provided medical reports. Subject to the confirmation
					of the reports by the Director of Health Services, they are
					to repeat the courses next semester.
				</p>
				<table className={`mt-4 ${styles.senate_result_table}`}>
					<thead>
						<tr>
							<th>SN</th>
							<th>MATRIC NO</th>
							<th>FULL NAME</th>
							<th>GPA</th>
							<th>CGPA</th>
							<th>OUTSTANDING COURSES</th>
						</tr>
					</thead>
					<tbody>
						{data?.studentsWithMedicalCases?.length > 0 ? (
							data?.studentsWithMedicalCases.map((details, i) => (
								<tr key={details?.matricNumber}>
									<td>{i + 1}</td>
									<td>{details?.matricNumber}</td>
									<td>{details?.fullName}</td>
									<td>{roundUp(details?.gpa)}</td>
									<td> {roundUp(details?.cgpa)} </td>
									<td>
										{outStandings(
											details?.outstandingCourses
										)}
									</td>
								</tr>
							))
						) : (
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						)}
					</tbody>
				</table>

				<h5 className="mt-5 h5">(G) ABSENCE FROM EXAMINATIONS</h5>
				<p className={`mt-2 ${styles.senate_result_section_body_p}`}>
					The following {data?.studentsAbsentFromExam?.length || "0"}{" "}
					student(s) who were absent from some or all the course
					examinations in the College have CGPA {"<"} 1.00 minimum
					requirement twice and have not provided medical report in
					respect of the missed course examinations. They are deemed
					to have failed such courses and are required to withdraw
					from the University.
				</p>
				<table className={`mt-4 ${styles.senate_result_table}`}>
					<thead>
						<tr>
							<th>SN</th>
							<th>MATRIC NO</th>
							<th>FULL NAME</th>
							<th>GPA</th>
							<th>CGPA</th>
							<th>OUTSTANDING COURSES</th>
						</tr>
					</thead>
					<tbody>
						{data?.studentsAbsentFromExam?.length > 0 ? (
							data?.studentsAbsentFromExam.map((details, i) => (
								<tr key={details?.matricNumber}>
									<td>{i + 1}</td>
									<td>{details?.matricNumber}</td>
									<td>{details?.fullName}</td>
									<td>{roundUp(details?.gpa)}</td>
									<td> {roundUp(details?.cgpa)} </td>
									<td>
										{outStandings(
											details?.outstandingCourses
										)}
									</td>
								</tr>
							))
						) : (
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						)}
					</tbody>
				</table>

				<h5 className="mt-5 h5">(H) WITHHELD RESULTS</h5>
				<p className={`mt-2 ${styles.senate_result_section_body_p}`}>
					The results of the following{" "}
					{data?.studentsWithWitheldResult?.length || "0"} student(s)
					who have disciplinary or examination misconduct cases have
					been withheld pending the outcome of their cases.
				</p>
				<table className={`mt-4 ${styles.senate_result_table}`}>
					<thead>
						<tr>
							<th>SN</th>
							<th>MATRIC NO</th>
							<th>FULL NAME</th>
							<th>REMARKS (IF ANY)</th>
						</tr>
					</thead>
					<tbody>
						{data?.studentsWithWitheldResult?.length > 0 ? (
							data?.studentsWithWitheldResult.map(
								(details, i) => (
									<tr key={details?.matricNumber}>
										<td>{i + 1}</td>
										<td>{details?.matricNumber}</td>
										<td>{details?.fullName}</td>
										<td>{details?.remarks}</td>
									</tr>
								)
							)
						) : (
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						)}
					</tbody>
				</table>

				<h5 className="mt-5 h5">
					(I) EXPELLED/RUSTICATED/SUSPENDED STUDENTS
				</h5>
				<p className={`mt-2 ${styles.senate_result_section_body_p}`}>
					The following{" "}
					{data?.expelledRusticatedSuspendedStudents?.length || "0"}{" "}
					student(s) who had disciplinary or examination misconduct
					cases have been expelled/rusticated/suspended as shown
					against each student.
				</p>
				<table className={`mt-4 ${styles.senate_result_table}`}>
					<thead>
						<tr>
							<th>SN</th>
							<th>MATRIC NO</th>
							<th>FULL NAME</th>
							<th>
								Disciplinary action (indicate exact period of
								suspension/rustication)
							</th>
						</tr>
					</thead>
					<tbody>
						{data?.expelledRusticatedSuspendedStudents?.length >
						0 ? (
							data?.expelledRusticatedSuspendedStudents.map(
								(details, i) => (
									<tr key={details?.matricNumber}>
										<td>{i + 1}</td>
										<td>{details?.matricNumber}</td>
										<td>{details?.fullName}</td>
										<td>{details?.remarks}</td>
									</tr>
								)
							)
						) : (
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						)}
					</tbody>
				</table>

				<h5 className="mt-5 h5">
					(J) TEMPORARY WITHDRAWAL/DEFERMENT OF ADMISSION
				</h5>
				<p className={`mt-2 ${styles.senate_result_section_body_p}`}>
					The following
					{data?.temporaryWithdrawalOrAdmissionDeferment?.length ||
						"0"}
					student(s) were granted temporary withdrawal from the
					University and are to resume studies at the beginning of
					next session.
				</p>
				<table className={`mt-4 ${styles.senate_result_table}`}>
					<thead>
						<tr>
							<th>SN</th>
							<th>MATRIC NO</th>
							<th>FULL NAME</th>
							<th>Reason for Temporal Withdrawal/Deferment</th>
						</tr>
					</thead>
					<tbody>
						{data?.temporaryWithdrawalOrAdmissionDeferment?.length >
						0 ? (
							data?.temporaryWithdrawalOrAdmissionDeferment.map(
								(details, i) => (
									<tr key={details?.matricNumber}>
										<td>{i + 1}</td>
										<td>{details?.matricNumber}</td>
										<td>{details?.fullName}</td>
										<td>{details?.remarks}</td>
									</tr>
								)
							)
						) : (
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						)}
					</tbody>
				</table>

				<h5 className="mt-5 h5">(K) UNREGISTERED STUDENTS</h5>
				<p className={`mt-2 ${styles.senate_result_section_body_p}`}>
					The following {data?.unregisteredStudents?.length || "0"}{" "}
					student(s) who failed to register for the session are deemed
					to have withdrawn voluntarily from the University.
				</p>
				<table className={`mt-4 ${styles.senate_result_table}`}>
					<thead>
						<tr>
							<th>SN</th>
							<th>MATRIC NO</th>
							<th>FULL NAME</th>
							<th>REMARKS (IF ANY)</th>
						</tr>
					</thead>
					<tbody>
						{data?.unregisteredStudents?.length > 0 ? (
							data?.unregisteredStudents.map((details, i) => (
								<tr key={details?.matricNumber}>
									<td>{i + 1}</td>
									<td>{details?.matricNumber}</td>
									<td>{details?.fullName}</td>
									<td>{details?.remarks}</td>
								</tr>
							))
						) : (
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						)}
					</tbody>
				</table>
				<SignatureSection />
			</div>
		</>
	);
};

const SignatureSection = () => {
	return (
		<div className="w-100 mt-5">
			<div className={styles.signature_container_senate_result}>
				<p className={styles.range_current_text}>Name of Dean:</p>
				<main className={styles.signature_container_space}></main>
			</div>
			<div className="row">
				<div
					className={`col-7 ${styles.signature_container_senate_result}`}
				>
					<p className={styles.range_current_text}>Signature:</p>
					<main className={styles.signature_container_space}></main>
				</div>
				<div
					className={`col-5 ${styles.signature_container_senate_result}`}
				>
					<p className={styles.range_current_text}>Date:</p>
					<main className={styles.signature_container_space}></main>
				</div>
			</div>
		</div>
	);
};

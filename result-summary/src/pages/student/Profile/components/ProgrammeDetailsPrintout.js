import React from "react";
import styles from "../style.module.css";
import { STUDENT_TYPES } from "../../../../utils/constants";

export default function ProgrammeDetailsPrintout({
	programmeDetail,
	personalData
}) {
	const {
		department,
		departmentOption,
		entryYear,
		graduationYear,
		jambRegNumber,
		matricNumber,
		schoolProgramme,
		studentMode,
		modeOfEntry,
		modeOfStudy,
		studentType,
		level
	} = programmeDetail;
	const isPGStudent =
		programmeDetail?.studentTypeId === STUDENT_TYPES.POSTGRADUATE;
	return (
		<div className={styles.print_out__section}>
			<div className={styles.grid_header}>Programme details</div>
			<div className={styles.print_out__grid}>
				<div className={styles.print_out__grid_col}>
					<div>
						<div>Department</div>
						<div>{department}</div>
					</div>
					<div>
						{isPGStudent ? (
							<div>Area of Specialization</div>
						) : (
							<div>Option</div>
						)}
						<div>{departmentOption || "nil"}</div>
					</div>
					<div>
						<div>Student Type</div>
						<div>{studentType}</div>
					</div>
					{!isPGStudent && (
						<div>
							<div>Programme</div>
							<div>{schoolProgramme}</div>
						</div>
					)}
					{isPGStudent && (
						<div>
							<div>
								<b>Staff Status</b>
							</div>
							<div>
								<b>
									{personalData?.isStaff
										? "Staff"
										: "Non staff"}
								</b>
							</div>
						</div>
					)}
				</div>
				<div className={styles.print_out__grid_col}>
					<div>
						{!isPGStudent ? (
							<div>Matric No</div>
						) : (
							<div>Application No</div>
						)}
						{isPGStudent ? (
							<div>{jambRegNumber}</div>
						) : (
							<div>{matricNumber}</div>
						)}
					</div>
					<div>
						{isPGStudent ? (
							<div>Resigstration No</div>
						) : (
							<div>JAMB No</div>
						)}
						{isPGStudent ? (
							<div>{matricNumber}</div>
						) : (
							<div>{jambRegNumber}</div>
						)}
					</div>
					{!isPGStudent && (
						<div>
							<div>Mode of Entry</div>
							<div>{modeOfEntry}</div>
						</div>
					)}
					{!isPGStudent && (
						<div>
							<div>Student Mode</div>
							<div>{studentMode}</div>
						</div>
					)}

					{isPGStudent && (
						<div>
							<div>Year of Graduation </div>
							<div>{graduationYear}</div>
						</div>
					)}
				</div>
				<div className={styles.print_out__grid_col}>
					<div>
						<div>Mode of Study</div>
						<div>{modeOfStudy}</div>
					</div>
					<div>
						<div>Entry Year</div>
						<div>{entryYear}</div>
					</div>
					{!isPGStudent && (
						<div>
							<div>Year of Graduation </div>
							<div>{graduationYear}</div>
						</div>
					)}
					{!isPGStudent && (
						<div>
							<div>Year of Study</div>
							<div>{level}</div>
						</div>
					)}
					{isPGStudent && (
						<div>
							<div>Programme</div>
							<div>{schoolProgramme}</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

import React from "react";
import styles from "../style.module.css";

export default function ProgrammeDetailsPrintout({ programmeDetail }) {
	const {
		department,
		departmentOption,
		entryYear,
		graduationYear,
		jambRegNumber,
		matricNumber,
		schoolProgramme,
		studentMode,
		studentModeOfEntry,
		studentModeOfStudy,
		studentType,
		level
	} = programmeDetail;

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
						<div>Option</div>
						<div>{departmentOption || "nil"}</div>
					</div>
					<div>
						<div>Student Type</div>
						<div>{studentType}</div>
					</div>
					<div>
						<div>Programme</div>
						<div>{schoolProgramme}</div>
					</div>
				</div>
				<div className={styles.print_out__grid_col}>
					<div>
						<div>Matric No</div>
						<div>{matricNumber}</div>
					</div>
					<div>
						<div>JAMB No</div>
						<div>{jambRegNumber}</div>
					</div>
					<div>
						<div>Mode of Entry</div>
						<div>{studentModeOfEntry}</div>
					</div>
					<div>
						<div>Student Mode</div>
						<div>{studentMode}</div>
					</div>
				</div>
				<div className={styles.print_out__grid_col}>
					<div>
						<div>Mode of Study</div>
						<div>{studentModeOfStudy}</div>
					</div>
					<div>
						<div>Entry Year</div>
						<div>{entryYear}</div>
					</div>
					<div>
						<div>Year of Graduation </div>
						<div>{graduationYear}</div>
					</div>
					<div>
						<div>Year of Study</div>
						<div>{level}</div>
					</div>
				</div>
			</div>
		</div>
	);
}

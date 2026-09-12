import React from "react";
import { Hat } from "../../../../../assets/svgs";
import { Note } from "../../../../../ui_elements";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

import styles from "../components.module.css";

export const StatusFailure = () => {
	const { state } = useLocation();
	const { push } = useHistory();

	if (!state || state?.type !== "noAdmission") {
		push("/prospective_students");
	}

	return (
		<div className={`${styles.container} px-4 pt-4 pb-5`}>
			<div className="d-flex justify-content-center">
				<Hat className="text-center" />
			</div>
			<h1 className={`${styles.header} my-5`}>Check Admission Status</h1>
			<Note
				blueVariant={true}
				paragraph={`Hello ${state?.fullName}, you have not been offered admission.`}
			/>
		</div>
	);
};

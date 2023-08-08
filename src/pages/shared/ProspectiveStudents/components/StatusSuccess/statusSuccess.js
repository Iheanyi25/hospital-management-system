import React from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Box } from "../../../../../assets/svgs";

import styles from "../components.module.css";

export const StatusSuccess = () => {
	const { state } = useLocation();
	const { push } = useHistory();

	if (!state || state?.type !== "success") {
		push("/prospective_students");
	}

	return (
		<div className={`${styles.container} pt-1`}>
			<div className="px-5">
				<div className="d-flex justify-content-center">
					<Box />
				</div>
				<div className="my-5">
					<h1 className={`${styles.header} `}>Congratulations!!</h1>
					<p className={`${styles.paragraph} mt-2`}>
						You have been offered admission into the university, for
						the academic year {state?.session}.
					</p>
				</div>
				<div className={`${styles.details} p-3`}>
					<ul>
						<li>{`Name: ${state?.fullName}`}</li>
						<li>{`Reg No: ${state?.jambRegNumber}`}</li>
						<li>{`Course: ${state?.department}`}</li>
					</ul>
				</div>
			</div>
			<div
				className={`${styles.footer} mt-4 py-4 d-flex justify-content-center`}
			>
				<Link to="/verify_account">
					Click here to verify and log into your account.
				</Link>
			</div>
		</div>
	);
};

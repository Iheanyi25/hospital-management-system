import React from "react";
import { SCHOOL_DETAILS } from "../../utils/constants";
import AuthPageWrapper from "./AuthPageWrapper";
import styles from "./auth_style.module.css";

const VerifyConfirmation = () => {
	return (
		<AuthPageWrapper>
			<h1 className={`${styles.auth_main_header} pt-5 mb-4`}>
				{`Welcome to ${SCHOOL_DETAILS.shortForm} portal!`}
			</h1>
			<p className={`${styles.auth_sub_header}`}>
				A verification link has been sent to your email.
			</p>
			<p className={`${styles.auth_sub_header} mb-5 pb-5`}>
				Click the link to create your password
			</p>
		</AuthPageWrapper>
	);
};

export default VerifyConfirmation;
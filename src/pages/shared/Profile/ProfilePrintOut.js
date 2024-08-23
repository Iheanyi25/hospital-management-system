import React from "react";
import Logo from "../../../assets/images/sideLogo.png";
import Avatar from "react-avatar";
import styles from "./style.module.css";
import { SCHOOL_DETAILS } from "../../../utils/constants";
const { name } = SCHOOL_DETAILS;

export default function ProfilePrintOut({ userData }) {
	const date = new Date();

	return (
		<div>
			<div className={styles.logo_container}>
				<img src={Logo} alt="logo" />
			</div>
			<div
				className={`${styles.printout_container} d-flex justify-content-center`}
			>
				<h3 className={`text-center ${styles.printout_header}`}>
					STAFF HOUSING FORM PRINT OUT
				</h3>
			</div>
			<div
				className={`${styles.avatar_container} mt-5 d-flex justify-content-center`}
			>
				<Avatar
					className="info-avatar"
					name={`${userData?.lastName} ${userData?.firstName}`}
					size="225"
					src={userData?.passport}
					round={false}
					maxInitials={2}
					// color="#00875a"
				/>
			</div>

			<div className={`mt-5 ${styles.info_container}`}>
				<div className="d-flex align-items-center mb-2">
					<p className={`col-6 text-bold ${styles.text_size}`}>
						Surname:
					</p>
					<p className={`col-6 ${styles.text_size}`}>
						{userData?.lastName}
					</p>
				</div>
				<div className="d-flex align-items-center mb-2">
					<p className={`col-6 text-bold ${styles.text_size}`}>
						Firstname:
					</p>
					<p className={`col-6 ${styles.text_size}`}>
						{userData?.firstName}
					</p>
				</div>
				<div className="d-flex align-items-center mb-2">
					<p className={`col-6 text-bold ${styles.text_size}`}>
						Middle Name
					</p>
					<p className={`col-6 ${styles.text_size}`}>
						{userData?.middleName || "-"}
					</p>
				</div>
				<div className="d-flex align-items-center mb-2">
					<p className={`col-6 text-bold ${styles.text_size}`}>
						Email:
					</p>
					<p className={`col-6 ${styles.text_size}`}>
						{userData?.email || "-"}
					</p>
				</div>
				<div className="d-flex align-items-center mb-2">
					<p className={`col-6 text-bold ${styles.text_size}`}>
						Marital Status:
					</p>
					<p className={`col-6 ${styles.text_size}`}>
						{userData?.maritalStatus || "-"}
					</p>
				</div>
				<div className="d-flex align-items-center mb-2">
					<p className={`col-6 text-bold ${styles.text_size}`}>
						Current Rank:
					</p>
					<p className={`col-6 ${styles.text_size}`}>
						{userData?.rank || "-"}
					</p>
				</div>
				<div className="d-flex align-items-center mb-2">
					<p className={`col-6 text-bold ${styles.text_size}`}>
						Live on Campus:
					</p>
					<p className={`col-6 ${styles.text_size}`}>
						{userData?.accommodationType || "-"}
					</p>
				</div>
				<div className="d-flex align-items-center mb-2">
					<p className={`col-6 text-bold ${styles.text_size}`}>
						Address:
					</p>
					<p className={`col-6 ${styles.text_size}`}>
						{userData?.address || "-"}
					</p>
				</div>
				<div className="d-flex align-items-center mb-2">
					<p className={`col-6 text-bold ${styles.text_size}`}>
						Staff Number:
					</p>
					<p className={`col-6 ${styles.text_size}`}>
						{userData?.staffType || "-"}
					</p>
				</div>
			</div>

			<footer className={`${styles.print_out_footer} w-100 d-flex justify-content-center mt-5 text-center`}>
				{`Copyright ©️ ${date.getFullYear()} ${name}. Powered by
				Tenece Professional Services`}
			</footer>
		</div>
	);
}

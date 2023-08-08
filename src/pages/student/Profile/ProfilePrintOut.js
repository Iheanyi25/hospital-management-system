import React from "react";
import Logo from "../../../assets/images/logo.png";
import Avatar from "react-avatar";
import PersonalInfoPrintOut from "./components/PersonalInfoPrintOut";
import SponsorAndNokDetailsPrintout from "./components/SponsorAndNokDetailsPrintout";
import ProgrammeDetailsPrintout from "./components/ProgrammeDetailsPrintout";
import MedicalHistoryPrintout from "./components/MedicalHistoryPrintout";
import styles from "./style.module.css";
import { SCHOOL_DETAILS } from "../../../utils/constants";
const { name } = SCHOOL_DETAILS;

export default function ProfilePrintOut({ userData }) {
	const {
		studentPersonalData,
		studentProgrammeDetail,
		studentNextOfKin,
		studentSponsor
	} = userData;
	const date = new Date();
	return (
		<div>
			<div className={styles.logo_container}>
				<img src={Logo} alt="logo" />
			</div>
			<div className={styles.avatar_container}>
				<Avatar
					className="info-avatar"
					name={`${studentPersonalData.lastname} ${studentPersonalData.firstname}`}
					size="225"
					src={studentPersonalData.passport}
					round={false}
					maxInitials={2}
					color="#00875a"
				/>
			</div>

			<PersonalInfoPrintOut personalData={studentPersonalData} />
			<SponsorAndNokDetailsPrintout
				studentNextOfKin={studentNextOfKin}
				studentSponsor={studentSponsor}
				sponsorNextOfKin={{ ...studentNextOfKin, ...studentSponsor }}
			/>
			<ProgrammeDetailsPrintout
				programmeDetail={studentProgrammeDetail}
			/>
			<MedicalHistoryPrintout
				medicalRecords={studentPersonalData?.medicalRecords}
			/>

			<footer className={styles.print_out_footer}>
			{`Copyright ©️ ${date.getFullYear()} ${name}. Powered by
				Tenece Professional Services`}
			</footer>
		</div>
	);
}

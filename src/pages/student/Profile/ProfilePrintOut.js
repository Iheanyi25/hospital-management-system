import React from "react";
import Logo from "../../../assets/images/sideLogo.png";
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
		personalData,
		programmeDetail,
		nextOfKin,
		sponsor,
		medicalRecords
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
					name={`${personalData?.lastname} ${personalData?.firstname}`}
					size="225"
					src={personalData?.passport}
					round={false}
					maxInitials={2}
					color="#00875a"
				/>
			</div>

			<PersonalInfoPrintOut personalData={personalData} />
			<SponsorAndNokDetailsPrintout
				studentNextOfKin={nextOfKin}
				studentSponsor={sponsor}
				sponsorNextOfKin={{ ...nextOfKin, ...sponsor }}
			/>
			<ProgrammeDetailsPrintout
				programmeDetail={programmeDetail}
				personalData={personalData}
			/>
			{medicalRecords && (
				<MedicalHistoryPrintout medicalRecords={medicalRecords} />
			)}
			<footer className={styles.print_out_footer}>
				{`Copyright ©️ ${date.getFullYear()} ${name}. Powered by
				Tenece Professional Services`}
			</footer>
		</div>
	);
}

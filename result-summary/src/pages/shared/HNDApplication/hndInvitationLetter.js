import logo from "../../../assets/images/sideLogo.png";
import { SCHOOL_DETAILS } from "../../../utils/constants";
import { shortDate } from "../../../utils/formatDate";
import { UserCard } from "./PutmeApplicationDetails/components";
import styles from "./style.module.css";

export const HNDInvitationLetter = ({ componentRef, details }) => {
	const applicationDetails = [
		{
			title: "Full Name",
			value: `${details?.personalInfoResponse?.surname ?? ""} ${
				details?.personalInfoResponse?.firstname ?? ""
			} ${details?.personalInfoResponse?.middlename ?? ""},`
		},
		{
			title: "Applicant ID",
			value: details?.personalInfoResponse?.applicationNo
		},
		{ title: "Registration Number", value: details?.regNumber },
		{
			title: "Email Address",
			value: details?.personalInfoResponse?.email
		},
		{
			title: "1st Choice Course of Study",
			value: details?.programmeInfoResponse?.department
		},
		{
			title: "Date of Birth",
			value: shortDate(details?.personalInfoResponse?.dateOfBirth)
		}
	];
	return (
		<div className={styles.putme_form_container} ref={componentRef}>
			<div className="d-flex justify-content-center align-items-center shared_img_container">
				<img src={logo} alt="Logo" />
			</div>
			<div
				className={`d-flex flex-column align-items-center ${styles.putme_form_title}`}
			>
				<p className="text-uppercase">{SCHOOL_DETAILS.pmb}</p>
				<h3 className="text-uppercase">
					Invitation Letter for Pre-Admission Screening
				</h3>
			</div>
			<UserCard
				details={applicationDetails}
				user={{
					fullName: `${details?.surname ?? ""} ${
						details?.firstname ?? ""
					} ${details?.middlename ?? ""},`.toUpperCase(),
					passport: details?.passport
				}}
				noLogo
			/>
			<div className={`${styles.putme_form_body} mt-5`}>
				<p>
					Dear <b>Amanda Ogheneochuko Onoge</b>,
				</p>
				<br />
				<p>
					{`You are invited for your ${SCHOOL_DETAILS.shortForm} Admission Screening Exercise
					on`}
					:{" "}
				</p>
				<p>
					<b>{details?.screeningDate}</b>
				</p>
				<p>Please bring along this letter of invitation to the</p>
				<p>
					<b>{details?.screeningVenue}</b>
				</p>
				<p>on your screening date.</p>
				<br />
				<p>
					Signed,
					<br /> The Registrar
				</p>
			</div>
		</div>
	);
};

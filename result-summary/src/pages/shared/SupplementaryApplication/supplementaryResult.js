import logo from "../../../assets/images/sideLogo.png";
import { SCHOOL_DETAILS } from "../../../utils/constants";
import { shortDate } from "../../../utils/formatDate";
import { UserCard } from "./SupplementaryApplicationDetails/components/userCard";
import styles from "./style.module.css";

export const SupplementaryResult = ({ componentRef, details }) => {
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
	const totalUtmeScore = 60;
	return (
		<div className={styles.putme_form_container} ref={componentRef}>
			<div className="d-flex justify-content-center align-items-center shared_img_container">
				<img src={logo} alt="Logo" />
			</div>
			<div
				className={`d-flex flex-column align-items-center ${styles.putme_form_title}`}
			>
				<p className="text-uppercase">{SCHOOL_DETAILS.pmb}</p>
				<h3 className="text-uppercase">POST UTME RESULT SLIP</h3>
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
			<div
				className={`${styles.putme_form_body} d-flex justify-content-center mt-5`}
			>
				<div className="d-flex justify-content-center">
					<div className="">
						<div className="d-flex justify-content-between">
							<h2 className="mr-4">POST UTME SCORE:</h2>
							<h2>
								{`${details?.programmeInfoResponse?.putmeScore}/${totalUtmeScore}`}
							</h2>
						</div>
						<div className="d-flex justify-content-between">
							<h2 className="mr-4">PERCENTAGE (%):</h2>
							<h2>
								{(
									(details?.programmeInfoResponse
										?.putmeScore /
										totalUtmeScore) *
									100
								).toFixed(2)}
							</h2>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

import logo from "../../../assets/images/sideLogo.png";
import { SCHOOL_DETAILS } from "../../../utils/constants";
import { shortDate } from "../../../utils/formatDate";
import { UserCard } from "./PutmeApplicationDetails/components";
import styles from "./style.module.css";

export const PutmeResult = ({ componentRef, details }) => {
	const applicationDetails = [
		{
			title: "Full Name",
			value: `${details?.postUtmeResponse?.fullName ?? ""}`
		},
		{ title: "Jamb No", value: details?.postUtmeResponse?.jambNumber },
		{ title: "Sex", value: details?.personalInfoResponse?.gender },
		{
			title: "Department",
			value: details?.postUtmeResponse?.department
		},
		{
			title: "Date of Birth",
			value: shortDate(details?.personalInfoResponse?.dateOfBirth)
		},
		{
			title: "UTME Subjects",
			value: `${details?.programmeInfoResponse?.firstSubject}, ${details?.programmeInfoResponse?.secondSubject}, ${details?.programmeInfoResponse?.thirdSubject}, ${details?.programmeInfoResponse?.fourthSubject}; `
		},
		{
			title: "UTME Score",
			value: details?.postUtmeResponse?.utmeScore
		},
		{
			title: "O'Level Score",
			value: details?.postUtmeResponse?.oLevelScore
		},
		{
			title: "PUTME Score",
			value: details?.postUtmeResponse?.finalUtmeScore
		},
		{
			title: "Aggregate",
			value: details?.postUtmeResponse?.aggregate
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
				<h3 className="text-uppercase">POST UTME RESULT SLIP</h3>
			</div>
			<UserCard
				details={applicationDetails}
				user={{
					fullName: `${
						details?.personalInfoResponse?.surname ?? ""
					} ${details?.personalInfoResponse?.firstname ?? ""} ${
						details?.personalInfoResponse?.middlename ?? ""
					},`.toUpperCase(),
					passport: details?.passport
				}}
				noLogo
			/>
		</div>
	);
};

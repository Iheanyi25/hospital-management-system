import logo from "../../../assets/images/invoice-logo.png";
import { Jumbotron, PageTitle } from "../../../ui_elements";
import { SCHOOL_DETAILS } from "../../../utils/constants";
import styles from "./style.module.css";

export const PGRefereeFormPrintout = ({ componentRef, formDetails }) => {
	return (
		<div className={styles.pg_referee_form_container} ref={componentRef}>
			<div className="d-flex justify-content-center align-items-center shared_img_container">
				<img src={logo} alt="Logo" />
			</div>
			<div className="d-flex mt-3 flex-column align-items-center mb-5">
				<div className="mb-2">
					<PageTitle title={SCHOOL_DETAILS.name} />
				</div>
				<PageTitle title="COLLEGE OF POSTGRADUATE STUDIES" />
			</div>
			<Jumbotron footerStyle="d-flex justify-content-end">
				<div className={`my-4 ${styles.jumboHeader}`}>
					<h6>{`APPLICATION NO : ${formDetails?.applicationNumber}`}</h6>
					<h6>
						REFEREE'S CONFIDENTIAL REPORT ON A CANDIDATE FOR
						ADMISSION TO HIGHER DEGREE STUDIES
					</h6>
				</div>
				<div className="border-top border-bottom px-4 py-3 jumbotron-header jumbo-header">
					<strong>A. PERSONAL DATA</strong> (To be completed by the
					Candidate)
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-4 d-flex align-items-center">
							<label htmlFor="full_name">
								1. Name of Candidate:
							</label>
						</div>
						<div className="col-8">
							<p className="text-uppercase">{`${formDetails?.applicantLastame} ${formDetails?.applicantFirstname} ${formDetails?.applicantMiddlename}`}</p>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-4 d-flex align-items-center">
							<label htmlFor="full_name">
								2. Department of the University to which the
								application is being made:
							</label>
						</div>
						<div className="col-8">
							<p className="text-uppercase">
								{formDetails?.department ?? "-"}
							</p>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-4 d-flex align-items-center">
							<label htmlFor="full_name">
								3. Area of Specialization:
							</label>
						</div>
						<div className="col-8">
							<p className="text-uppercase">
								{formDetails?.applicantProgrammeDept}
							</p>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-4 d-flex align-items-center">
							<label htmlFor="full_name">4. Mode of Study:</label>
						</div>
						<div className="col-8">
							<p className="text-uppercase">
								{formDetails?.modeOfStudy}
							</p>
						</div>
					</div>
				</div>
				<div className="border-top border-bottom px-4 py-3 jumbotron-header jumbo-header">
					<strong>B. REFERENCE</strong> (To be completed by the
					Referee)
				</div>
				<div className="container-fluid my-4">
					<p className={styles.welcome_text}>
						The above-named candidate has applied for admission to
						the {SCHOOL_DETAILS.name}, College Of Postgraduate
						Studies, and has given your name as a referee.
						<br /> Please you are hereby requested to rate the
						candidate with respect to the following
					</p>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-4  d-flex align-items-center">
							<label htmlFor="intellectualId">
								1. Intellectual Capacity
							</label>
						</div>
						<div className={`col-8 pb-2 border-bottom`}>
							<p className={styles.item_form_body}>
								{formDetails?.applicantIntellectual ?? "-"}
							</p>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-4  d-flex align-items-center">
							<label htmlFor="maturityId">
								2. Emotional Maturity and Stability
							</label>
						</div>
						<div className={`col-8 pb-2 border-bottom`}>
							<p className={styles.item_form_body}>
								{formDetails?.applicantMaturity ?? "-"}
							</p>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-4  d-flex align-items-center">
							<label htmlFor="workCapabilityId">
								3. Capability to work without supervision
							</label>
						</div>
						<div className={`col-8 pb-2 border-bottom`}>
							<p className={styles.item_form_body}>
								{formDetails?.applicantWorkCapability ?? "-"}
							</p>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-4  d-flex align-items-center">
							<label htmlFor="honestyAndIntegrityId">
								4. Honesty and Integrity
							</label>
						</div>
						<div className={`col-8 pb-2 border-bottom`}>
							<p className={styles.item_form_body}>
								{formDetails?.applicantHonestyAndIntegrity ??
									"-"}
							</p>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-4  d-flex align-items-center">
							<label htmlFor="physicalFitnessId">
								5. Physical fitness for Postgraduate Work
							</label>
						</div>
						<div className={`col-8 pb-2 border-bottom`}>
							<p className={styles.item_form_body}>
								{formDetails?.applicantPhysicalFitness ?? "-"}
							</p>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-4  d-flex align-items-center">
							<label htmlFor="motivationId">6. Motivation</label>
						</div>
						<div className={`col-8 pb-2 border-bottom`}>
							<p className={styles.item_form_body}>
								{formDetails?.applicantMotivation ?? "-"}
							</p>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-4">
							<label htmlFor="initiativeAbilityId">
								7. Ability to take Initiative
							</label>
						</div>
						<div className={`col-8 pb-2 border-bottom`}>
							<p className={styles.item_form_body}>
								{formDetails?.applicantInitiativeAbility ?? "-"}
							</p>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-4">
							<label htmlFor="overallRatingId">
								8. Overall Rating with Respect to other Students
								you have known
							</label>
						</div>
						<div className={`col-8 pb-2 border-bottom`}>
							<p className={styles.item_form_body}>
								{formDetails?.applicantOverallRating ?? "-"}
							</p>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-4">
							<label htmlFor="knownCandidate">
								9. How long and in what capacity have you known
								the candidate?
							</label>
						</div>
						<div className={`col-8 pb-2 border-bottom`}>
							<p className={styles.item_form_body}>
								{formDetails?.knownCandidate ?? "-"}
							</p>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<p className={styles.welcome_text}>
						10. If the candidate were to apply for a higher degree
						programme, would you be willing to accept him/her as a
						research student?
					</p>
					<div className={`ps-2 mb-3 py-2 border-bottom`}>
						<p className={styles.item_form_body}>
							{formDetails?.acceptGraduate === true
								? "YES"
								: "N0"}
						</p>
					</div>
					<div className={`ps-2 pb-2 border-bottom`}>
						<p className={styles.item_form_body}>
							<strong>Reasons:</strong>{" "}
							{` ${formDetails?.noAcceptanceReason ?? "_"}`}
						</p>
					</div>
				</div>
				<div className="container-fluid px-4 mt-4 mb-5">
					<p className={styles.welcome_text}>
						11. Give any other information about the strength and
						weakness of the candidate which you consider relevant to
						this application
					</p>
					<div className={`ps-2 pb-2 pt-3 border-bottom`}>
						<p className={styles.item_form_body}>
							<strong>Comments:</strong>{" "}
							{` ${formDetails?.otherInformation ?? "_"}`}
						</p>
					</div>
				</div>
				<div className="border-top border-bottom mt-5 px-4 py-3 jumbotron-header jumbo-header">
					Referee’s Details
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-2 d-flex align-items-center">
							<label htmlFor={`name`}>{`Name`}</label>
						</div>
						<div className={`col-10 pb-2 border-bottom`}>
							<p className={styles.item_form_body}>
								{formDetails?.refereeFullName ?? "-"}
							</p>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-2 d-flex align-items-center">
							<label htmlFor={`email.`}>Email</label>
						</div>
						<div className={`col-10 pb-2 border-bottom`}>
							<p className={styles.item_form_body}>
								{formDetails?.refereeEmail ?? "-"}
							</p>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-2 d-flex align-items-center">
							<label htmlFor={`mobilNumber`}>Phone Number</label>
						</div>
						<div className={`col-10 pb-2 border-bottom`}>
							<p className={styles.item_form_body}>
								{formDetails?.refereePhoneNumber ?? "-"}
							</p>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-2 d-flex align-items-center">
							<label htmlFor={`address`}>Address</label>
						</div>
						<div className={`col-10 pb-2 border-bottom`}>
							<p className={styles.item_form_body}>
								{formDetails?.refereeAddress ?? "-"}
							</p>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-2">
							<label htmlFor="organization">Organization</label>
						</div>
						<div className={`col-10 pb-2 border-bottom`}>
							<p className={styles.item_form_body}>
								{formDetails?.organization ?? "-"}
							</p>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-2">
							<label htmlFor="rank">Rank</label>
						</div>
						<div className={`col-10 pb-2 border-bottom`}>
							<p className={styles.item_form_body}>
								{formDetails?.refereeRank ?? "-"}
							</p>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row align-items-center">
						<div className="col-2">
							<label htmlFor="signature">Signature</label>
						</div>
						<div
							className={`col-10 px-0 pb-2 ${styles.imgContainer}`}
						>
							<img src={formDetails?.signature} alt="signature" />
						</div>
					</div>
				</div>
			</Jumbotron>
		</div>
	);
};

import logo from "../../../assets/images/logo.png";
import { Jumbotron } from "../../../ui_elements";
import { SCHOOL_DETAILS } from "../../../utils/constants";
import styles from "./style.module.css";

export const PGRefereeFormPrintout = ({ componentRef, formDetails }) => {
	return (
		<div className={styles.pg_referee_form_container} ref={componentRef}>
			<div className="d-flex justify-content-center align-items-center shared_img_container">
				<img src={logo} alt="Logo" />
			</div>
			<div
				className={`d-flex flex-column align-items-center ${styles.pg_referee_form_title}`}
			>
				<h1>School Of Postgraduate studies</h1>
			</div>
			<Jumbotron
				headerText="REFEREE'S CONFIDENTIAL REPORT ON A CANDIDATE FOR
				ADMISSION TO HIGHER DEGREE STUDIES"
			>
				<div className="container-fluid my-4">
					<p className={styles.welcome_text}>
						{`The candidate whose name is given below
									wishes to undertake a postgraduate degree
									studies in ${SCHOOL_DETAILS.name}. Your comments (which will be
									treated in strict confidence) on the
									candidate's suitability for the studies
									would be appreciated.`}
					</p>
				</div>
				<div className="container-fluid px-4 my-4">
					<p className={styles.welcome_heading}>
						PERSONAL DATA (As completed by the Candidate)
					</p>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className={`row align-items-center`}>
						<div className="col-3">
							<p className={styles.item_form_title}>
								1. Name in Full
							</p>
						</div>
						<div className="col-9">
							<div className="border-bottom p-2">
								<p className={styles.item_form_body}>
									{`${formDetails?.applicantSurname?.toUpperCase()} ${formDetails?.applicantFirstname?.toUpperCase()} ${formDetails?.applicantMiddlename?.toUpperCase()}`}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className={`row align-items-center`}>
						<div className="col-3">
							<p className={styles.item_form_title}>
								Application Number
							</p>
						</div>
						<div className="col-9">
							<div className="border-bottom p-2">
								<p className={styles.item_form_body}>
									{formDetails?.applicationNo ?? "NIL"}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className={`row align-items-center`}>
						<div className="col-3">
							<p className={styles.item_form_title}>
								2. Programme and Department
							</p>
						</div>
						<div className="col-9">
							<div className="border-bottom p-2">
								<p className={styles.item_form_body}>
									{formDetails?.applicantProgrammeDept ??
										"NIL"}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<p className={styles.welcome_heading}>
						(To be completed by Referee)
					</p>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className={`row align-items-center`}>
						<div className="col-6">
							<p className={styles.item_form_title}>
								3. How long, and what capacity have you known
								the candidate?
							</p>
						</div>
						<div className="col-6">
							<div className="border-bottom p-2">
								<p className={styles.item_form_body}>
									{formDetails?.knownApplicant ?? "NIL"}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className={`row align-items-center`}>
						<div className="col-12">
							<p className={styles.item_form_title}>
								4. Please, evaluate the candidate in terms of
								the qualities below in comparison with other
								students. (Please, select as apapropriate):
							</p>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className={`row align-items-center`}>
						<div className="col-6">
							<p className={styles.item_form_title}>
								Intellectual Capacity
							</p>
						</div>
						<div className="col-6">
							<div className="border-bottom p-2">
								<p className={styles.item_form_body}>
									{formDetails?.applicantIntellectual ??
										"NIL"}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className={`row align-items-center`}>
						<div className="col-6">
							<p className={styles.item_form_title}>
								Capacity for persistent and independent academic
								Study
							</p>
						</div>
						<div className="col-6">
							<div className="border-bottom p-2">
								<p className={styles.item_form_body}>
									{formDetails?.applicantPersistence ?? "NIL"}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className={`row align-items-center`}>
						<div className="col-6">
							<p className={styles.item_form_title}>
								Ability for imaginative thought
							</p>
						</div>
						<div className="col-6">
							<div className="border-bottom p-2">
								<p className={styles.item_form_body}>
									{formDetails?.applicantImaginative ?? "NIL"}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className={`row align-items-center`}>
						<div className="col-6">
							<p className={styles.item_form_title}>
								Promise of productive scholarship
							</p>
						</div>
						<div className="col-6">
							<div className="border-bottom p-2">
								<p className={styles.item_form_body}>
									{formDetails?.applicantProductive ?? "NIL"}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className={`row align-items-center`}>
						<div className="col-6">
							<p className={styles.item_form_title}>
								Quality of previous work (if any)
							</p>
						</div>
						<div className="col-6">
							<div className="border-bottom p-2">
								<p className={styles.item_form_body}>
									{formDetails?.applicantQuality ?? "NIL"}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className={`row align-items-center`}>
						<div className="col-6">
							<p className={styles.item_form_title}>
								Ability for oral and written expression in
								English
							</p>
						</div>
						<div className="col-6">
							<div className="border-bottom p-2">
								<p className={styles.item_form_body}>
									{formDetails?.applicantExpression ?? "NIL"}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className={`row align-items-center`}>
						<div className="col-12">
							<p className={styles.item_form_title}>
								5. Please comment on the personality with
								particular reference to his/her moral character,
								emotional and physical stability? *
							</p>
						</div>
						<div className="col-12 mt-2">
							<div className="border-bottom p-2">
								<p className={styles.item_form_body}>
									{formDetails?.applicantPersonality ?? "NIL"}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className={`row align-items-center`}>
						<div className="col-9">
							<p className={styles.item_form_title}>
								6. Should situation arise, would you be able to
								accept the candidate as a research student?
							</p>
						</div>
						<div className="col-3">
							<div className="border-bottom p-2">
								<p className={styles.item_form_body}>
									{formDetails?.acceptGraduate ? "Yes" : "No"}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className={`row align-items-center`}>
						<div className="col-5">
							<p className={styles.item_form_title}>
								7. Please rate this applicant's overall
								performance
							</p>
						</div>
						<div className="col-7">
							<div className="border-bottom p-2">
								<p className={styles.item_form_body}>
									{formDetails?.applicantOverallPremise ??
										"NIL"}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className={`row align-items-center`}>
						<div className="col-9">
							<p className={styles.item_form_title}>
								8. Any other relevant information which would
								help in determining the applicant's suitability.
							</p>
						</div>
						<div className="col-3">
							<div className="border-bottom p-2">
								<p className={styles.item_form_body}>
									{formDetails?.otherInformation ?? "NIL"}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className={`row align-items-center`}>
						<div className="col-12">
							<p className={styles.item_form_title}>
								9. Have you any objection to the contents of
								this evaluation being disclosed to any award
								giving body if the need arises?
							</p>
						</div>
						<div className="col-12 mt-2">
							<div className="border-bottom p-2">
								<p className={styles.item_form_body}>
									{formDetails?.refereeObjection ?? "NIL"}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="border-top border-bottom px-4 py-4 jumbotron-header jumbo-header">
					Referee’s Details
				</div>
				<div className="container-fluid px-4 my-4">
					<div className={`row align-items-center`}>
						<div className="col-2">
							<p className={styles.item_form_title}>Full Name</p>
						</div>
						<div className="col-10">
							<div className="border-bottom p-2">
								<p className={styles.item_form_body}>
									{formDetails?.refereeFullName ?? "NIL"}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className={`row align-items-center`}>
						<div className="col-2">
							<p className={styles.item_form_title}>Email</p>
						</div>
						<div className="col-10">
							<div className="border-bottom p-2">
								<p className={styles.item_form_body}>
									{formDetails?.refereeEmail ?? "NIL"}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className={`row align-items-center`}>
						<div className="col-2">
							<p className={styles.item_form_title}>
								Organization
							</p>
						</div>
						<div className="col-10">
							<div className="border-bottom p-2">
								<p className={styles.item_form_body}>
									{formDetails?.refereeOrganisation ?? "NIL"}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className={`row align-items-center`}>
						<div className="col-2">
							<p className={styles.item_form_title}>Rank</p>
						</div>
						<div className="col-10">
							<div className="border-bottom p-2">
								<p className={styles.item_form_body}>
									{formDetails?.refereeRank ?? "NIL"}
								</p>
							</div>
						</div>
					</div>
				</div>
			</Jumbotron>
		</div>
	);
};

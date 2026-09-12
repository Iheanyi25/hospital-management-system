import logo from "../../../assets/images/logo.png";
import { SCHOOL_DETAILS } from "../../../utils/constants";
import styles from "./style.module.css";

const { name, pmb } = SCHOOL_DETAILS;
export const PGTranscriptRequestForm = ({
	componentRef,
	transcriptRequest
}) => {
	return (
		<div className={styles.pg_form_container} ref={componentRef}>
			<div className="d-flex justify-content-center align-items-center shared_img_container">
				<img src={logo} alt="Logo" />
			</div>
			<div
				className={`d-flex flex-column align-items-center ${styles.pg_form_title}`}
			>
				<p className="text-uppercase">{pmb}</p>
				<h3>APPLICATION FOR GRADUATE ADMISSION</h3>
				<h5>INFORMATION ON APPLICANT</h5>
			</div>
			<div className={styles.pg_form_body}>
				<p>
					ALL CANDIDATES ARE TO ATTACH THIS SLIP TO THEIR REQUEST FOR
					TRANSCRIPT. PLEASE NOTE THAT INABILITY TO TRACE YOUR
					TRANSCRIPT MAY ADVERSELY AFFECT YOUR ADMISSION.
				</p>
				<div>
					<div className={`row align-items-center`}>
						<div className="col-4">
							<p className={styles.item_form_title}>
								1. Name in Full:
							</p>
						</div>
						<div className="col-8">
							<div className="border-bottom p-2">
								<p className={styles.item_form_body}>
									{transcriptRequest?.applicantFullname?.toUpperCase()}
								</p>
							</div>
						</div>
					</div>
					<div className={`row align-items-center mt-3`}>
						<div className="col-4">
							<p className={styles.item_form_title}>
								2. State Any change of Name/Maiden Name:
							</p>
						</div>
						<div className="col-8">
							<div className="border-bottom p-2">
								<p className={styles.item_form_body}>
									{transcriptRequest?.applicantMaidenName?.toUpperCase() ??
										"-"}
								</p>
							</div>
						</div>
					</div>
					<div className={`row align-items-center mt-3`}>
						<div className="col-4">
							<p className={styles.item_form_title}>
								3. Application Number:
							</p>
						</div>
						<div className="col-8">
							<div className="border-bottom p-2">
								<p className={styles.item_form_body}>
									{transcriptRequest?.applicationNo}
								</p>
							</div>
						</div>
					</div>
					<div className={`row align-items-center mt-3`}>
						<div className="col-4">
							<p className={styles.item_form_title}>
								4. Proposed Programme:
							</p>
						</div>
						<div className="col-8">
							<div className="border-bottom p-2">
								<p className={styles.item_form_body}>
									{transcriptRequest?.proposedProgramme}
								</p>
							</div>
						</div>
					</div>
					<div className={`row align-items-center mt-3`}>
						<div className="col-4">
							<p className={styles.item_form_title}>
								5. Proposed Faculty:
							</p>
						</div>
						<div className="col-8">
							<div className="border-bottom p-2">
								<p className={styles.item_form_body}>
									{transcriptRequest?.proposedFaculty}
								</p>
							</div>
						</div>
					</div>
					<div className={`row align-items-center mt-3`}>
						<div className="col-4">
							<p className={styles.item_form_title}>
								6. Proposed Department:
							</p>
						</div>
						<div className="col-8">
							<div className="border-bottom p-2">
								<p className={styles.item_form_body}>
									{transcriptRequest?.proposedDepartment}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div
					className={`d-flex align-items-center flex-column ${styles.pg_form_footer}`}
				>
					<h2>
						NOTE TO THE REGISTRAR OF THE CANDIDATE's
						UNIVERSITY/INSTITUTION
					</h2>
					<h1>
						KINDLY ATTACH THIS SLIP TO THE STUDENT'S TRANSCRIPT
						WHICH YOU ARE FORWARDING TO US. THANK YOU
					</h1>
					<div className={styles.pg_form_sign}>
						<p>Secretary</p>
						<p>School of Postgraduate Studies,</p>
						<p>{name}</p>
						<p>{pmb}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

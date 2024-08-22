import styles from "./style.module.css";
import { TransferApplicationPreviewWrapper } from "./UniTransferStudents/components";

export const UniTransferRefereeLetter = ({ componentRef, formDetails }) => {
	const {personalInfoResponse,programmeInfo} = formDetails
	return (
		<div>
			<TransferApplicationPreviewWrapper
				componentRef={componentRef}
				previewHeader={``}
			>
				<div className={`${styles.preview_container} px-4`}>
					<div className={`d-flex align-items-center justify-content-center border-bottom-0 ${styles.referee_header}`}>
						<h4 className="text-center fs-4">APPLICATION FOR INTER UNIVERSITY - REFEREE'S FORM</h4>
					</div>

					<p className={'mb-4'}>
						Candidate's Name: {personalInfoResponse?.firstname} {personalInfoResponse?.middlename} {personalInfoResponse?.surname} <br />
						Intended Course: FACULTY OF {programmeInfo?.faculty}, DEPARTMENT OF {programmeInfo?.department}
					</p>
					<p className={"mb-2"}>THE FORM SHOULD BE FORWARDED ONLY TO THE REGISTRAR OF THE CANDIDATE’S PRESENT
						UNIVERSITY PLEASE NOTE PERSONS TO WHOM THIS FORM IS PRESENTED FOR COMPLETION ARE REQUESTED TO
						BE AS EXHAUSTIVE AS POSSIBLE IN THEIR ANSWERS TO THE QUESTIONS BELOW AND TO SEND THE COMPLETED
						REPORT UNDER CONFIDENTIAL COVER TO:
					</p>

					<p className="mt-5 mb-5">The Registrar (Admissions Office)<br />
						University of Nigeria <br />
						Nsukka
					</p>
					<ol className={"mt-4"}>
						<div className="row align-items-center mb-3">
							<div className="col-6">
								<li className="mb-0">During What Period did the candidate attend your institution?</li>
							</div>
							<div className="col-6">
								<div className={`${styles.underline} w-100`}></div>
							</div>
						</div>

						<div className="row align-items-center mb-3">
							<div className="col-6">
								<li className="mb-0">What was the candidate's character like during that time?</li>
							</div>
							<div className="col-6">
								<div className={`${styles.underline} w-100`}></div>
							</div>
						</div>

						<div className="row align-items-center mb-3">
							<div className="col-6">
								<li className="mb-0">What, according to your records, is the candidate's date of birth?</li>
							</div>
							<div className="col-6">
								<div className={`${styles.underline} w-100`}></div>
							</div>
						</div>

						<div className="row align-items-center mb-3">
							<div className="col-6">
								<li className="mb-0">Was the candidate's academic performance slightly above average or below average?</li>
							</div>
							<div className="col-6">
								<div className={`${styles.underline} w-100`}></div>
							</div>
						</div>

						<div className="row align-items-center mb-3">
							<div className="col-6">
								<li className="mb-0">Do you think that the candidate can successfully cope with the course indicated above?</li>
							</div>
							<div className="col-6">
								<div className={`${styles.underline} w-100`}></div>
							</div>
						</div>

						<div className="row align-items-center mb-3">
							<div className="col-6">
								<li className="mb-0">Please list the strong or weak points of the candidate while attending your institution?</li>
							</div>
							<div className="col-6">
								<div className={`${styles.underline} w-100`}></div>
							</div>
						</div>

						<div className="row align-items-center">
							<div className="col-6">
								<li className="mb-0">Do you have any other information that will help the university ascertain the candidate's suitability for admission? Please use a separate sheet if necessary.</li>
							</div>
							<div className="col-6">
								<div className={`${styles.underline} w-100`}></div>
							</div>
						</div>
					</ol>

					<div className={`${styles.mt}`}>
						<h5>
							Declaration
						</h5>
						<i>I certify that the information given in this form is, to the best of my knowledge and belief, correct and complete</i>
					</div>

					<div>
						<div className="row align-items-end mt-4 mb-3">
							<div className="col-2">
								<p className="mb-0">Full Name</p>
							</div>
							<div className="col-4">
								<div className={`${styles.underline} w-100`}></div>
							</div>
						</div>

						<div className="row align-items-end mb-3">
							<div className="col-2">
								<p className="mb-0">Official Designation</p>
							</div>
							<div className="col-4">
								<div className={`${styles.underline} w-100`}></div>
							</div>
						</div>
						<div className="row align-items-end mb-3">
							<div className="col-2">
								<p className="mb-0">Address</p>
							</div>
							<div className="col-4">
								<div className={`${styles.underline} w-100`}></div>
							</div>
						</div>

						<div className=" row d-flex w-100">
							<div className="row col-6 align-items-end">
								<div className="col-3">
									<p className="mb-0">Signature</p>
								</div>
								<div className="col-8">
									<div className={`${styles.underline} w-100`}></div>
								</div>
							</div>

							<div className="row col-6 align-items-end">
								<div className="col-1">
									<p className="mb-0">Date</p>
								</div>
								<div className="col-9">
									<div className={`${styles.underline} w-100`}></div>
								</div>
							</div>

						</div>
					</div>
				</div>
			</TransferApplicationPreviewWrapper>
		</div>
	);
};

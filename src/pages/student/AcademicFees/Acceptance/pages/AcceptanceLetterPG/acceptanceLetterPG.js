import {
	Breadcrumbs,
	PageTitle,
	Button,
	Spinner,
	ProfileContext
} from "../../../../../../ui_elements";
import styles from "./style.module.css";
import { useApiGet } from "../../../../../../api/apiCall";
// import logo from "../../../../../../assets/images/logoSimple.png";
// import signature from "../../../../../../assets/images/dept_registrar_signature.png";
import { getFeeRecieptUrl } from "../../../../../../api/urlCategories/Payment";
import { useContext, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useHistory, useLocation } from "react-router-dom";
import {
	POST_GRADUATE_DETAILS,
	SCHOOL_DETAILS
} from "../../../../../../utils/constants";
import { shortDate } from "../../../../../../utils/formatDate";
import Barcode from "react-barcode";

const pageStyle = `
@page {
// size: 80mm 50mm;
margin-top: 10rem;
margin-left: 5rem;
margin-right: 5rem;
}

// @media all {
//   .pagebreak {
//     display: none;
//   }
// }

@media print {
.pagebreak {
// page-break-before: always;

}
}
`;

const AcceptanceLetterPG = () => {
	const { push } = useHistory();
	const { state } = useLocation();
	const ref = useRef();
	const handlePrint = useReactToPrint({
		content: () => ref.current,
		pageStyle: pageStyle
	});
	const { data, isLoading, error } = useApiGet(
		getFeeRecieptUrl({
			sessionId: state?.sessionId,
			levelId: state?.levelId,
			paymentTypeId: state?.paymentTypeId,
			paymentPurposeId: state?.paymentPurposeId
		})
	);
	const crumbItems = [
		{
			name: "Acceptance",
			path: "/academic_fees/acceptance"
		},
		{
			name: "Print Acceptance Letter",
			path: "/"
		}
	];

	if (!(state?.sessionId || state?.levelId)) {
		push("/academic_fees/school_fees");
	}

	if (isLoading) return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;

	return (
		<div className="row">
			<div className="col-12 col-md-1"></div>
			<div className="col-12 col-md-10">
				<div>
					<Breadcrumbs crumbs={crumbItems} />
					<PageTitle
						title="Acceptance Letter"
						buttonGroup={
							<>
								{data?.data && (
									<Button
										data-cy="print"
										buttonClass="success"
										label="Print"
										onClick={handlePrint}
									/>
								)}
							</>
						}
					/>
				</div>
				<div className={styles.page_content}>
					<ViewAcceptanceLetterPG
						details={data?.data}
						currentRef={ref}
					/>
				</div>
			</div>
			<div className="col-12 col-md-1"></div>
		</div>
	);
};

const ViewAcceptanceLetterPG = ({ details, currentRef }) => {
	const data = useContext(ProfileContext);

	return (
		<div ref={currentRef} className="px-2 px-sm-4">
			<header className={`${styles.header} mb-5`}>
				<div className="d-flex align-items-center">
					{/* <img src={logo} alt="logo" className="mr-3" /> */}
					<h2 className="text-uppercase">{SCHOOL_DETAILS.name}</h2>
				</div>
				<h4 className="text-uppercase mb-3 mt-3">
					COLLEGE OF POSTGRADUATE STUDIES
				</h4>
			</header>
			<main className={styles.body}>
				<section className="d-flex justify-content-between">
					<aside className={styles.asideWithVCDetails}>
						<p className="mt-1">
							<span className="text-bold">Our Ref: </span>
							{details?.jambRegNumber}
						</p>
						<p className="mt-1">
							<span className="text-bold">Vice-Chancellor: </span>
							{POST_GRADUATE_DETAILS.deputyRegister}
						</p>
					</aside>
					<aside>
						<p>Date: {shortDate(details?.paymentDate)}</p>
						<p className="mt-1">Phone: (+234) 7088617000</p>
					</aside>
				</section>
				<section
					className={`d-flex justify-content-between align-items-center mt-4 pt-4 border-top`}
				>
					<div className="d-flex justify-content-between w-100">
						<div className="d-flex flex-column justify-content-between">
							<div>
								<p className="mb-1">
									{data?.profileData?.personalData?.fullname}
								</p>
								<p>
									{
										data?.profileData?.personalData
											?.contactAddress
									}
								</p>
							</div>
							<p className="mt-3">Dear Sir/Madam</p>
						</div>
						<img
							src={data?.profileData?.personalData?.passport}
							alt="profile-img"
							className={styles.profile_img}
						/>
					</div>
				</section>
				<section className={styles.content}>
					<div className="d-flex justify-content-center">
						<h4 className="text-uppercase text-bold">
							{`PROVISIONAL ADMISSION FOR POSTGRADUATE PROGRAMME`}
						</h4>
					</div>
					<p className={styles.textIndent}>
						With reference to your application for admission to a
						postgraduate programme of this university, I am pleased
						to inform you that you have been offered provisional
						admission to pursue a{" "}
						<span className="text-uppercase">
							{data?.profileData?.programmeDetail?.modeOfStudy}
						</span>{" "}
						programme leading to the award of{" "}
						{data?.profileData?.programmeDetail?.schoolProgramme} in{" "}
						<span className="text-bold text-uppercase">
							Department of {details.department}
						</span>{" "}
						of the {SCHOOL_DETAILS.location} with immediate effect
						from the {details.session} Academic Session.
					</p>
					<p className={styles.textIndent}>
						You are to confirm your acceptance of this offer using
						the enclosed Acceptance Form which must be returned to
						the Registrar, Akwa Ibom State Polytechnic, Ikot Osurua,
						P.M.B 1200, Ikot Ekpene within ONE WEEK from the date of
						resumption. FAILURE TO CONFIRM ACCEPTANCE WITHIN THE
						STIPULATED PERIOD MAY RESULT IN THE CANCELLATION OF THE
						OFFER.
					</p>
					<p>
						All new students are advised to make themselves
						available at the Pre-Registration and Orientation
						briefing which will take place on the above date. The
						original copies of the following documents shall be
						required at the time of the registration:
					</p>
					<ol className={`${styles.requirement_list} mt-4 mb-4`}>
						<li>
							The original copies of your Certificate/Statement of
							Result
						</li>
						<li>Letter of Provisional Admission</li>
						<li>
							Four (4) recent passport size photographs of
							yourself
						</li>
						<li>Birth Certificate or Sworn Declaration of Age</li>
						<li>
							Evidence of good conduct from the Principal of last
							School attended/ Employer/Senior Public Servant
						</li>
					</ol>
					<p>
						The normal period of registration is four weeks from the
						beginning of the session. Candidates who register late
						shall pay late registration fee of{" "}
						<span>NGN 5,000.</span> The offer of admission lapses if
						a candidate fails to register within 8 (eight) weeks
						from the beginning of the session.
					</p>
					<p>
						Failure to comply with the condition is paragraphs 2 and
						3 of this letter will automatically lead to withdrawal
						of the offer of admission at any point in time
					</p>
					<div className="mt-5">
						<p>
							Your renewal of registration by paying the
							appropriate fees every session is mandatory.
						</p>
						<p>
							Please find enclosed, THE PARTICULARS OF YOUR
							ADMISSION.
						</p>
						<p>
							Congratulations on your admission and best wishes
							for a successful programme.
						</p>
						<p>Yours sincerely,</p>
					</div>
				</section>
				<section className={`${styles.closingSection}`}>
					{/* <img src={signature} alt="signature" /> */}
					<p className="text-bold mt-3">
						{POST_GRADUATE_DETAILS.deputyRegister}
					</p>
					<p>Acting Registrar</p>
					{/* <p>College of Postgraduate Studies</p> */}
				</section>
				<section
					className={`mt-5 border-top pt-2 d-flex flex-wrap justify-content-between ${styles.closingSection}`}
				>
					<div>
						<p className="mt-3 font-italic">
							<span className="text-bold">Correspondence: </span>
							{POST_GRADUATE_DETAILS.correspondence}
						</p>
						<p className="font-italic">
							Email: {POST_GRADUATE_DETAILS.correspondenceEmail}
						</p>
						{/* <p className="font-italic">
							<span className="text-bold">Provost: </span>
							{POST_GRADUATE_DETAILS.provost}
						</p>
						<p className="font-italic">
							Email: {POST_GRADUATE_DETAILS.provostEmail}
						</p> */}
					</div>
					<aside className={styles.barcode_img}>
						<Barcode value={details?.rrr} />
					</aside>
				</section>
			</main>
		</div>
	);
};

export default AcceptanceLetterPG;

import {
	Breadcrumbs,
	PageTitle,
	Button,
	Spinner,
	ProfileContext
} from "../../../../../../ui_elements";
import styles from "./style.module.css";
import { useApiGet } from "../../../../../../api/apiCall";
import logo from "../../../../../../assets/images/sideLogo.png";
// import signature from "../../../../../../assets/images/registrar_signature.jpeg";
import { getFeeRecieptUrl } from "../../../../../../api/urlCategories/Payment";
import { useContext, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useHistory, useLocation } from "react-router-dom";
import Barcode from "react-barcode";
import { SCHOOL_DETAILS } from "../../../../../../utils/constants";

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

const AcceptanceLetter = () => {
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
					<ViewAcceptanceLetter
						details={data?.data}
						currentRef={ref}
					/>
				</div>
			</div>
			<div className="col-12 col-md-1"></div>
		</div>
	);
};

const ViewAcceptanceLetter = ({ details, currentRef }) => {
	const data = useContext(ProfileContext);

	return (
		<div ref={currentRef} className="px-2">
			<header className={`${styles.header}`}>
				<div className="d-flex justify-content-left">
					<img src={logo} alt="logo" />
				</div>
			</header>
			<main className={styles.body}>
				<section className="d-flex justify-content-between">
					<aside>
						<p className="mt-1">
							VICE CHANCELLOR : PROF. CHARLES A. IGWE{" "}
						</p>
						<p className="mt-1">
							FSSN, RSS, NC 2014, JP B.AGRIC, MSc.(NIG)
						</p>
						<p className="mt-1">PGD(BELGIUM);PH.D(UNN)</p>
						<p className="mt-1">
							REGISTRAR : DR MRS NGOZI NNEBEDUM
						</p>
						<p className="mt-1">FIIA. FCAI. MAIEA. MAUA(UK)</p>
					</aside>
					<aside>
						<p className="mt-1">{SCHOOL_DETAILS.pmb}</p>
						<p className="mt-1">
							E-mail:registrar@unn.edu.ng,
						</p>{" "}
						{/* <p className="mt-1">nnabuchjohn1962@yahoo.com </p> */}
						<p className="mt-1">Website: www.unn.edu.ng</p>
					</aside>
				</section>
				<section
					className={`d-flex justify-content-between align-items-center mt-3`}
				>
					<aside>
						<img
							src={data?.profileData?.personalData?.passport}
							alt="profile-img"
							className={styles.profile_img}
						/>
					</aside>
					<aside className={styles.barcode_img}>
						<Barcode value={details?.rrr} />
					</aside>
				</section>
				<section className={styles.content}>
					<div className="d-flex justify-content-center">
						<h4 className="text-uppercase text-decoration-underline">
							{`PROVISIONAL OFFER OF ADMISSION : ${details.session} SESSION`}
						</h4>
					</div>
					<p>
						Dear {data?.profileData?.personalData?.fullname}, JAMB
						REG. NO :{details?.jambRegNumber}
					</p>
					<p>
						I am pleased to inform you that you have been offered
						Provisional Admission into the FACULTY OF{" "}
						<span className="text-uppercase">
							{details.faculty}
						</span>
						, Department of{" "}
						<span className="text-uppercase">
							{details.department}
						</span>{" "}
						for the {details.session} Academic year. Candidates who
						do not meet the entry requirements and / or candidates
						with falsified results will be required to withdraw from
						the University.{" "}
					</p>{" "}
					<p>
						The offer of admission is made subject to the following
						conditions :
					</p>
					<ol className={styles.requirement_list}>
						<li>
							{" "}
							That you will be registered only after presenting
							your oriiginal credentials for scrutiny and that all
							particulars provided on your application form are
							true and correct.{" "}
						</li>
						<li>
							{" "}
							That if at the time of registration, during or after
							the programme of your studies, it is discovered that
							you do not satisfy the minimum requirements
							prescribed because the qualifications you claimed to
							possess are false, incorrect or intentionally
							misquoted or altered or that any other information
							you provided is false, you will be asked to
							withdraw/forfeit the certificate as the case may be.
						</li>
						<li>
							{" "}
							That you are certified to be physically and mentally
							fit by a Government recognized Medical Officer.{" "}
						</li>
						<li>
							{" "}
							That before you are registered, you will settle in
							full, the fees payable for the programme into which
							you have been admitted.{" "}
						</li>
						<li>
							{" "}
							That you will be responsible for your accommodation
							and feeding.{" "}
						</li>
						<li>
							{" "}
							That you will not engage in Secret Cult and other
							illegal associations.
						</li>
						<li>
							{" "}
							That you will be required to sign an
							undertaking/produce written acceptance that you will
							be of good behavior and abide by the University
							Rules and Regulations.{" "}
						</li>
						<li>
							{" "}
							That you will be expected to register within two
							weeks from the date of resumption of the academic
							session. Failure to register within the stipulated
							periods of two (2) weeks will render the admission
							invalid. Congratulations on your admission
						</li>
					</ol>
				</section>
				<section className={styles.comment}>
					{/* <img src={signature} alt="signature" /> */}
					<h5 className="text-muted">DR MRS NGOZI NNEBEDUM</h5>
					<h5>
						<b className="text-uppercase">REGISTRAR</b>
					</h5>
				</section>
			</main>
		</div>
	);
};

export default AcceptanceLetter;

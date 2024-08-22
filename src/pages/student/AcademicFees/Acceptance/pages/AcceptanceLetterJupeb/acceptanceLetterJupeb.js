import {
	Breadcrumbs,
	PageTitle,
	Button,
	Spinner,
	ProfileContext
} from "../../../../../../ui_elements";
import styles from "./style.module.css";
import { useApiGet } from "../../../../../../api/apiCall";
import { getFeeRecieptUrl } from "../../../../../../api/urlCategories/Payment";
import { useContext, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useHistory, useLocation } from "react-router-dom";
import { PrintOutLogo } from "../../../../DevelopmentLevy/pages/DocumentPage/components/logo";
import signatue from "../../../../../../assets/images/jupebSignature.jpeg";
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
				<div className="d-flex justify-content-left mt-3">
					<PrintOutLogo
						office={"CENTRE FOR CONTINUING EDUCATION(CCE)"}
					/>
				</div>
			</header>
			<main className={styles.body}>
				<section className="d-flex justify-content-between">
					<aside>
						<p className="mt-1">
							VICE CHANCELLOR : PROF. (MRS.) NNENNA N. OTI{" "}
						</p>
						<p className="mt-1">
							FSSN, RSS, NC 2014, JP B.AGRIC, MSc.(NIG)
						</p>
						<p className="mt-1">PGD(BELGIUM);PH.D</p>
						<p className="mt-1">
							REGISTRAR : DR MRS NGOZI NNEBEDUM
						</p>
						<p className="mt-1">
							DIRECTOR: PROF. BENEDICT A. OZURUMBA
						</p>
						<p className="mt-1">Ref FUTO/CCE/JUPEB/1/VO1.1</p>
					</aside>
					<aside>
						<p className="mt-1">{SCHOOL_DETAILS.pmbWithoutState}</p>
						<p className="mt-1">{SCHOOL_DETAILS.pmbStateOnly}</p>
						<p className="mt-1">Phone: 083430999</p>
						<p className="mt-1">Telegrams : FEDUNITECH</p>
						<p className="mt-1">E-mail: jupeb@futo.edu.ng</p>{" "}
						<p className="mt-1">director.cce@futo.edu.ng</p>
						<p className="mt-1">Website: www.futo.edu.ng</p>
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
				</section>
				<section className={styles.content}>
					<div className="d-flex justify-content-center">
						<h4 className="text-uppercase text-decoration-underline">
							{`PROVISIONAL OFFER OF ADMISSION : ${details.session} SESSION CCE ONE-YEAR BASIC STUDIES PROGRAMME OF THE JOINT UNIVERSITIES PRELIMINARY EXAMINATION BOARD (JUPEB)`}
						</h4>
					</div>
					<p>
						Dear {data?.profileData?.personalData?.fullname},
						Application Number: {details?.jambRegNumber}
					</p>
					<p>
						I am pleased to inform you that you have been offered
						Provisional admission into the {details.session}{" "}
						One-Year CCE Basic Studies Programme of the Joint
						Universities Preliminary Examination Board (JUPEB).
					</p>{" "}
					<p>Please take the following steps:</p>
					<ol className={styles.requirement_list}>
						<li>
							Visit FUTO website(www.futo.edu.ng) for details on
							fee payment procedure.
						</li>
						<li>
							Submit a copy of the acceptance fee's receipt to the
							Deputy Registrar, Centre for Continuing Education
							and obtain guidelines for registration
						</li>
						<li>
							Note that you will be registered after presenting
							the original copies of your credentials for scrutiny
							and evidence of School fees payment
						</li>
						<li>
							Please note that classes will commence on Monday
							26th September 2022 and you are expected to complete
							your registration before commencement of classes
						</li>
					</ol>
					<p>Congratulations on your Admission</p>
					<h4 className="text-left">{details?.jambRegNumber}</h4>
				</section>
				<section className={styles.comment}>
					<img src={signatue} alt="signature" />
					<h5 className="text-muted">Deputy Registrar, CCE</h5>
					<h5>
						<b className="text-uppercase">For: Registrar</b>
					</h5>
				</section>
			</main>
		</div>
	);
};

export default AcceptanceLetter;

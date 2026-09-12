import {
	Breadcrumbs,
	PageTitle,
	Button,
	Spinner,
	ProfileContext
} from "../../../../../ui_elements";
import styles from "./style.module.css";
import { useApiGet } from "../../../../../api/apiCall";
import { getFeeRecieptUrl } from "../../../../../api/urlCategories/Payment";
import { useContext, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useHistory } from "react-router-dom";
import { PrintOutLogo } from "../DocumentPage/components/logo";
import { SCHOOL_DETAILS } from "../../../../../utils/constants";

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

const AdmissionParticulars = ({ componentRef, state }) => {
	const { push } = useHistory();
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
			name: "Development Levy",
			path: "/development_levy"
		},
		{
			name: "Print Development Levy",
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
						title="Development Levy"
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
					<ViewAdmissionParticulars
						details={data?.data}
						currentRef={componentRef}
					/>
				</div>
			</div>
			<div className="col-12 col-md-1"></div>
		</div>
	);
};

const ViewAdmissionParticulars = ({ details, currentRef }) => {
	const data = useContext(ProfileContext);

	return (
		<div ref={currentRef} className="px-5">
			<header className={`${styles.header} mt-4`}>
				<div className="d-flex justify-content-left">
					<PrintOutLogo office={"UNIVERSITY ADMISSIONS OFFICE"} />
				</div>
			</header>
			<main className={styles.body}>
				<section className="d-flex justify-content-end">
					<aside>
						<p className="mt-1">{SCHOOL_DETAILS.pmb}</p>
						<p className="mt-1">Telegrams : FEDUNITECH</p>
						<p className="mt-1">
							E-mail:registrar@futo.edu.ng,
						</p>{" "}
						<p className="mt-1">nnabuchjohn1962@yahoo.com </p>
						<p className="mt-1">Website: www.futo.edu.ng</p>
					</aside>
				</section>
				<section className={`d-flex justify-content-between mt-5`}>
					<aside className={styles.profile_img}>
						<img
							src={data?.profileData?.personalData?.passport}
							alt="profile-img"
						/>
					</aside>
				</section>
				<section className={styles.content}>
					<div className="d-flex justify-content-center">
						<h4 className="text-uppercase">
							{`CONFIRMATION OF ADMISSION ${details.session} SESSION`}
						</h4>
					</div>
					<p>
						I hereby confirm the admission of{" "}
						{data?.profileData?.personalData?.fullname} into the
						Department of {details.department}.
					</p>
					<p> His/Her particulars are as follows:</p>
					<ol className={styles.requirement_list}>
						<li>Reg No: {details.jambRegNumber}</li>
						<li>State: {details.state}</li>
						<li>Sex: {details.gender}</li>
					</ol>
					<p> Kindly clear/register him/her as appropriate.</p>
				</section>
				<section className={styles.comment}>
					<aside
						className={styles.admission_signature_confirmation}
					></aside>
					<h5 className="text-muted">PROF. (MRS.) J. C. ORJI</h5>
					<h5>
						<b className="text-uppercase">
							University Admissions Officer
						</b>
					</h5>
				</section>
			</main>
		</div>
	);
};

export default AdmissionParticulars;

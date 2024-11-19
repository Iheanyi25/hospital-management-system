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
import { getCurrentDate } from "../../../../../utils/formatDate";
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

const currentDate = getCurrentDate();

const Form18 = ({ state, componentRef }) => {
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
					<ViewForm18
						details={data?.data}
						currentRef={componentRef}
					/>
				</div>
			</div>
			<div className="col-12 col-md-1"></div>
		</div>
	);
};

const ViewForm18 = ({ details, currentRef }) => {
	const data = useContext(ProfileContext);

	return (
		<div ref={currentRef} className="px-2">
			<header className={`${styles.header} mt-4`}>
				<div className="d-flex justify-content-left">
					<PrintOutLogo
						office={`OFFICE OF THE REGISTRAR (ADMISSION) ${SCHOOL_DETAILS.pmb}.`}
					/>
				</div>
			</header>
			<main className={styles.body}>
				<section className="d-flex justify-content-end">
					<aside className={styles.address_container}>
						<p className="mt-2">
							Student Name (Surname First):{" "}
							{data?.profileData?.personalData?.lastname},{" "}
							{data?.profileData?.personalData?.firstname}{" "}
							{data?.profileData?.personalData?.middlename}{" "}
						</p>
						<p className="mt-2">
							Address:{" "}
							{data?.profileData?.personalData?.contactAddress},
						</p>
						<p className="mt-2">
							{`${details?.state}.`} Date: {currentDate} Mode of
							Admission (Tick ✓): □ MERIT □ SUPPLEMENTARY
						</p>{" "}
					</aside>
				</section>
				<section className={`d-flex justify-content-between mt-5`}>
					<aside>
						<p className="mt-1">The Registrar, </p>
						<p className="mt-1">{SCHOOL_DETAILS.name},</p>
						<p className="mt-1">{SCHOOL_DETAILS.pmbWithoutState}</p>
						<p className="mt-1">{SCHOOL_DETAILS.pmbStateOnly}</p>
						<p className="mt-1">Nigeria.</p>
					</aside>
				</section>
				<section className={styles.content}>
					<div className="d-flex justify-content-center">
						<h4 className="text-uppercase">
							{`ACCEPTANCE OF PROVISIONAL OFFER OF ADMISSION INTO ${data?.profileData?.programmeDetail?.studentType} PROGRAMME OF ${SCHOOL_DETAILS.name}`}
						</h4>
					</div>
					<p>
						I write to accept the Provisional offer of admission
						made to me in the faculty of{" "}
						<span>{details.faculty}</span> under the department of{" "}
						<span>{details.department}</span>.
					</p>
					<p>
						{" "}
						I hereby accept the condition that if iti is discovered
						at any time that I fail to meet the minimum academic
						requirement and/or the special departmental
						requirements, I shall automatically forfeit the
						admission and withdraw from the University.
					</p>
					<p>
						I attach herewith a photocopy of (non-refundable)
						Acceptance and Development Fees Receipt
					</p>
					<p>
						No:
						..............................................................
						of
						......................................................................
						as evidence of Acceptance of offer.
					</p>
				</section>
				<section className={styles.comment}>
					<h5 className="text-muted">Yours faithfully,</h5>
					<aside
						className={styles.admission_signature_confirmation}
					></aside>
					<p>Signature</p>
				</section>
			</main>
		</div>
	);
};

export default Form18;

import {
	Breadcrumbs,
	PageTitle,
	Button,
	Spinner
} from "../../../../../ui_elements";
import styles from "./style.module.css";
import logo from "../../../../../assets/images/sideLogo.png";
import { shortDate } from "../../../../../utils/formatDate";
import numberFormatter from "../../../../../utils/numberFormatter";
import { toWords } from "number-to-words";
import { useApiGet } from "../../../../../api/apiCall";
import { getFeeRecieptUrl } from "../../../../../api/urlCategories/Payment";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useHistory, useLocation } from "react-router-dom";
import { SCHOOL_DETAILS } from "../../../../../utils/constants";

const { name } = SCHOOL_DETAILS;

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
	const { state } = useLocation();
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
			name: "Acceptance",
			path: "/acceptance"
		},
		{
			name: "Print Acceptance Letter",
			path: "/"
		}
	];

	if (!(state?.sessionId || state?.levelId)) {
		push("/school_fees");
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

const ViewAcceptanceLetter = ({ details, currentRef }) => (
	<div ref={currentRef}>
		<p>{`Date: ${shortDate(details?.datePrinted)}`}</p>
		<header className={`${styles.header}`}>
			<div className="d-flex justify-content-center">
				<img src={logo} alt="Logo" />
			</div>
		</header>
		<main className={styles.body}>
			<section className={styles.address}>
				<h5 className="text-uppercase mb-3">Office of the Registrar</h5>
				<h6 className="text-capitalize mb-2">The Registrar,</h6>
				<h6 className="text-capitalize">{name}</h6>
				<h4>Dear Sir,</h4>
			</section>
			<section className={styles.content}>
				<div className="d-flex justify-content-center">
					<h4 className="text-uppercase">
						{`Letter of Acceptance to ${SCHOOL_DETAILS.shortForm}`}
					</h4>
				</div>
				<p>
					I,
					<b className="text-uppercase">
						{" "}
						{`${details?.fullName}`}
					</b>{" "}
					of{" "}
					<b className="text-uppercase">{`${
						details?.localGovernment ?? ""
					} ${details.localGovernment && "LGA"}`}</b>{" "}
					in <b className="text-uppercase">{details?.state}</b>{" "}
					{`State
					of ${details?.country ?? ""} hereby accept the offer of admission into the
					University to pursue a Degree course`}{" "}
					<b className="text-uppercase">{details?.department}</b> in
					the Faculty of
					<b className="text-uppercase"> {details?.faculty}</b> under
					the condition stipulated in your letter of admission,
					registration No.{" "}
					<b className="text-uppercase">{details?.jambRegNumber}</b>{" "}
					dated
					<b> {shortDate(details?.paymentDate)}</b>.
				</p>
				<p>
					I accept to abide by all existing regulations and those that
					the University will make from time to time concerning fees,
					academic programmes and other University matters.
				</p>
				<p>
					I accept that, if any time after admission, it is discovered
					that I do not possess any of the qualifications or satisfy
					other conditions, including entry requirements, on which the
					admission was based, I shall withdraw from the University if
					and when I am required to do so.
				</p>
				<p>
					I enclose herewith, a non-refundable acceptance fee of{" "}
					<b className="text-capitalize">
						{`${numberFormatter(details?.amount)} (${toWords(
							details?.amount
						)}`}
					</b>{" "}
					<b>only)</b> with Receipt No. <b>{details?.rrr}</b>.
				</p>
			</section>
			<section className={styles.comment}>
				<h5>Yours Faithfully,</h5>
				<h5 className="text-muted">Signature</h5>
				<h5>
					<b className="text-uppercase">{details?.fullName}</b>
				</h5>
			</section>
		</main>
	</div>
);

export default AcceptanceLetter;

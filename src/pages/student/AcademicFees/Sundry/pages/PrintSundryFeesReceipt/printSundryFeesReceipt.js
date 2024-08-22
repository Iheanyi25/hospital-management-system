import {
	Breadcrumbs,
	PageTitle,
	Button,
	CopyrightText,
	Spinner
} from "../../../../../../ui_elements";
import styles from "./style.module.css";
import logo from "../../../../../../assets/images/sideLogo.png";
import numberFormatter from "../../../../../../utils/numberFormatter";
import barcode from "../../../../../../assets/images/barcode.png";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { shortDate } from "../../../../../../utils/formatDate";
import { useHistory, useLocation } from "react-router-dom";
import { useApiGet } from "../../../../../../api/apiCall";
import { getFeeRecieptUrl } from "../../../../../../api/urlCategories/Payment";
import { SCHOOL_DETAILS } from "../../../../../../utils/constants";
const { name, location } = SCHOOL_DETAILS;

const pageStyle = `
@page {
// size: 80mm 50mm;
margin-top: 5rem;
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

const PrintSundryFeesReceipt = () => {
	const { state } = useLocation();
	const { push } = useHistory();
	const { data, isLoading, error } = useApiGet(
		getFeeRecieptUrl({
			sessionId: state?.sessionId,
			levelId: state?.levelId,
			paymentTypeId: state?.paymentTypeId,
			paymentPurposeId: state?.paymentPurposeId
		})
	);
	const ref = useRef();
	const handlePrint = useReactToPrint({
		content: () => ref.current,
		pageStyle: pageStyle
	});
	const crumbItems = [
		{
			name: "Sundry Fees",
			path: "/sundry"
		},
		{
			name: "Sundry Fees Reciept",
			path: "/"
		}
	];

	const contents = [
		{
			title: "Date of Payment",
			details: shortDate(data?.data?.paymentDate)
		},
		{
			title: "Date of Printing",
			details: shortDate(data?.data?.datePrinted)
		},
		{ title: "Breakdown", details: "-" },
		{
			title: "Amount Paid",
			details: <>&#8358;{numberFormatter(data?.data?.amount)}</>
		},
		{ title: "Concerned Session", details: data?.data?.session },
		{ title: "Student Name", details: data?.data?.fullName },
		{ title: "Matriculation Number", details: data?.data?.matricNumber },
		{
			title: "JAMB Registration Number",
			details: data?.data?.jambRegNumber
		},
		{ title: "Student Type", details: data?.data?.studentType },
		{ title: "Faculty", details: data?.data?.faculty },
		{ title: "Department", details: data?.data?.department },
		{ title: "Sex", details: data?.data?.gender },
		{ title: "Student Level", details: data?.data?.level },
		{ title: "Payment Type", details: data?.data?.paymentType },
		{ title: "Student Reference Number", details: data?.data?.rrr }
	];

	if (!(state?.sessionId || state?.yearofStudyId)) {
		push("/academic_fees/sundry");
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
						title="Sundry Fees Reciept"
						buttonGroup={
							data?.data && (
								<Button
									data-cy="print"
									buttonClass="success"
									label="Print"
									onClick={handlePrint}
								/>
							)
						}
					/>
				</div>
				<div className={styles.page_content} ref={ref}>
					<div className={styles.reciept_content}>
						<div className="row">
							<div className="col-7 d-flex align-items-center">
								<img
									src={logo}
									alt="Logo"
									className={styles.img}
								/>
							</div>
							<div className="col-5 d-flex align-items-center">
								<h5 className="text-uppercase">
									{`${name}, ${location}
										${data?.data?.paymentPurpose} FEES RECEIPT (${data?.data?.paymentType})`}
								</h5>
							</div>
						</div>
						<div className={`row ${styles.header}`}>
							<div className="col-7 d-flex align-items-center">
								<h6>Title</h6>
							</div>
							<div className="col-5 d-flex align-items-center">
								<h6>Details</h6>
							</div>
						</div>
						<div>
							{contents?.map((content, index) => (
								<div
									className={`row ${styles.body} border-bottom`}
									key={index}
								>
									<div className="col-7 d-flex align-items-center">
										<p>{content?.title}</p>
									</div>
									<div className="col-5 d-flex align-items-center border-left">
										<p className="text-uppercase">
											{content?.details}
										</p>
									</div>
								</div>
							))}
						</div>
						<div className={styles.code}>
							<img src={barcode} alt={""} />
						</div>
						<div className="border-top border-bottom py-3 invoice-important">
							<p className="m-0">
								The Student indicated in this Online Receipt has
								successfully paid the fees stated above.
							</p>
						</div>
						<div className="invoice-powered">
							<CopyrightText />
						</div>
					</div>
				</div>
			</div>
			<div className="col-12 col-md-1"></div>
		</div>
	);
};

export default PrintSundryFeesReceipt;

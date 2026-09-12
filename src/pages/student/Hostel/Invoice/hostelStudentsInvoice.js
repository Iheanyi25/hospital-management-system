import styles from "./style.module.css";
import {
	Breadcrumbs,
	Button,
	PageTitle,
	Invoice
} from "../../../../ui_elements";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const pageStyle = `
@page {
  // size: 80mm 50mm;
  margin-top: 1rem;
  margin-left: 3rem;
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
const HostelStudentsInvoice = () => {
	const componentRef = useRef();
	const location = useLocation();
	const { goBack } = useHistory();
	if (!location.state) goBack();

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
		pageStyle
	});

	const crumbItems = [
		{
			name: "Hostel",
			path: "/hostel"
		},
		{
			name: "Generate Invoice"
		}
	];
	const { data } = location?.state;

	const details = {
		fullName: data?.fullname,
		rrr: data?.rrr,
		transactionRef: data?.transactionReference,
		invoiceNumber: data?.invoiceCode,
		matricNumber: data?.matricNumber,
		level: data?.level,
		department: data?.department,
		studentType: data?.studentType,
		date: data?.dateGenerated,
		cardPaymentLink: data?.cardPaymentLink,
		isPaid: data?.paymentStatus,
		schoolName: data?.schoolName,
		recieptItems: [
			{
				paymentPurposeId: data?.paymentPurposeId,
				description: data?.description,
				amount: data?.amount,
				paymentType: data?.paymentType
			}
		],
		total: data?.amount
	};

	return (
		<div className="row">
			<div className="col-12 col-md-1"></div>
			<div className="col-12 col-md-10">
				<div>
					<Breadcrumbs crumbs={crumbItems} />
					<PageTitle
						title="Invoice"
						buttonGroup={
							<>
								<Button
									data-cy="print"
									buttonClass="primary"
									label="Print"
									onClick={handlePrint}
								/>
							</>
						}
					/>
				</div>
				<div className={styles.page_content} ref={componentRef}>
					<Invoice details={details} noRedirect={true} />
					<p className="text-center text-danger mt-3">
						NB: Any student who fails to pay within three (3)days
						will forfeit the allocation.
					</p>
				</div>
			</div>
		</div>
	);
};

export default HostelStudentsInvoice;

import styles from "./style.module.css";
import {
	Breadcrumbs,
	Button,
	Invoice,
	PageTitle
} from "../../../../../ui_elements";
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
const JupebStudentsInvoice = () => {
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
			name: "Generate Sub-degree Invoice",
			path: "/generate_sub_degree_invoice"
		},
		{
			name: "Invoice"
		}
	];
	const { data } = location?.state;

	const details = {
		fullName: data?.fullName,
		rrr: data?.rrr,
		transactionRef: data?.paymentReference,
		invoiceNumber: data?.invoiceNo,
		date: data?.invoiceDate,
		cardPaymentLink: data?.cardPaymentLink,
		isPaid: data?.paymentStatus,
		schoolName: data?.schoolName,
		recieptItems: [
			{
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
				</div>
			</div>
		</div>
	);
};

export default JupebStudentsInvoice;

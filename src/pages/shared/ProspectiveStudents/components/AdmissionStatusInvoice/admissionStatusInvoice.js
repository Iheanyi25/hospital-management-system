import { useRef } from "react";
import styles from "./style.module.css";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
	Breadcrumbs,
	Button,
	Invoice,
	PageTitle
} from "../../../../../ui_elements";
import { useReactToPrint } from "react-to-print";

const pageStyle = `
@page {
// size: 80mm 50mm;
margin-top: 15rem;
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

const AdmissionStatusInvoice = () => {
	const ref = useRef();
	const handlePrint = useReactToPrint({
		content: () => ref.current,
		pageStyle: pageStyle
	});
	const location = useLocation();
	const { goBack } = useHistory();
	if (!location.state) goBack();

	const crumbItems = [
		{
			name: "Prospective Students",
			path: "/prospective_students"
		},
		{
			name: "Invoice",
			path: "/"
		}
	];
	const { data } = location?.state;
	const details = {
		fullName: data?.data?.fullName,
		rrr: data?.data?.rrr,
		transactionRef: data?.data?.paymentReference,
		invoiceNumber: data?.data?.invoiceNo ?? "",
		date: data?.data?.invoiceDate,
		cardPaymentLink: data?.data?.cardPaymentLink,
		isPaid: data?.data?.paymentStatus,
		recieptItems: [
			{
				description: data?.data?.description,
				amount: data?.data?.amount,
				paymentType: data?.data?.paymentType
			}
		],
		total: data?.data?.amount
	};

	return (
		<div className="row">
			<div className="col-12 col-md-1"></div>
			<div className="col-12 col-md-10">
				<div>
					<Breadcrumbs crumbs={crumbItems} />
					<PageTitle
						title="Admission checking invoice"
						buttonGroup={
							<Button
								data-cy="print"
								buttonClass="primary"
								label="Print"
								onClick={handlePrint}
							/>
						}
					/>
				</div>
				<div className={styles.page_content} ref={ref}>
					<Invoice details={details} noRedirect={true} />
				</div>
			</div>
		</div>
	);
};

export default AdmissionStatusInvoice;

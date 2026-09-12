import styles from "./style.module.css";
import {
	Breadcrumbs,
	Button,
	Invoice,
	PageTitle
} from "../../../../ui_elements";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
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

const PostUmeSlipRequestInvoice = () => {
	const ref = useRef();
	const handlePrint = useReactToPrint({
		content: () => ref.current,
		pageStyle: pageStyle
	});
	const location = useLocation();
	const { goBack } = useHistory();
	if (!location.state) goBack();

	const { data } = location?.state;

	const crumbItems = [
		{
			name: `Generate ${data.paymentType} Invoice`,
			path: "/putme_login",
		},
		{
			name: "Invoice"
			// path: "/"
		}
	];

	const details = {
		fullName: data?.fullName,
		rrr: data?.rrr,
		transactionRef: data?.paymentReference,
		invoiceNumber: data?.invoiceNumber,
		date: data?.dateGenerated,
		cardPaymentLink: data?.cardPaymentLink,
		isPaid: data?.paymentStatus,
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

export default PostUmeSlipRequestInvoice;

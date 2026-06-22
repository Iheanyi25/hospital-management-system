import {
	Breadcrumbs,
	PageTitle,
	Button,
	Invoice,
	Spinner,
	DefaultScreen
} from "../../../../../ui_elements";
import { useParams } from "react-router-dom";
import { useApiGet } from "../../../../../api/apiCall";
import { getInvoiceUrl } from "../../../../../api/urlCategories/Payment";
import { useReactToPrint } from "react-to-print";
import styles from "./style.module.css";
import { useRef } from "react";

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

const ViewAcceptanceInvoice = () => {
	const { rrr } = useParams();
	const { data, isLoading, error } = useApiGet(getInvoiceUrl(rrr));
	const ref = useRef();
	const handlePrint = useReactToPrint({
		content: () => ref.current,
		pageStyle: pageStyle
	});
	const crumbItems = [
		{
			name: "Development Levy",
			path: "/development_levy"
		},
		{
			name: "Development Levy Invoice",
			path: "/"
		}
	];
	const details = {
		fullName: data?.data?.fullname,
		rrr,
		transactionRef: data?.data?.transactionReference,
		invoiceNumber: data?.data?.invoiceCode,
		matricNumber: data?.matricNumber,
		level: data?.data?.level,
		department: data?.data?.department,
		studentType: data?.data?.studentType,
		schoolName: data?.data?.schoolName,
		date: data?.data?.dateGenerated,
		cardPaymentLink: data?.data?.cardPaymentLink,
		isPaid: data?.data?.isPaid,
		recieptItems: [
			{
				description: data?.data?.description,
				amount: data?.data?.amount,
				paymentType: data?.data?.paymentType
			}
		],
		total: data?.data?.amount
	};

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
						title="Development Levy Invoice"
						buttonGroup={
							data.data && (
								<>
									<Button
										data-cy="print"
										buttonClass="success"
										label="Print"
										onClick={handlePrint}
									/>
								</>
							)
						}
					/>
				</div>
				<div className={styles.page_content} ref={ref}>
					{!data?.data ? (
						<div className="d-flex justify-content-center">
							<DefaultScreen
								title="An Error Occurred"
								message="No Invoice with this Reference number was found"
							/>
						</div>
					) : (
						<Invoice details={details} />
					)}
				</div>
			</div>
			<div className="col-12 col-md-1"></div>
		</div>
	);
};

export default ViewAcceptanceInvoice;

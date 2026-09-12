import styles from "../style.module.css";
import {
	Breadcrumbs,
	Button,
	Invoice,
	PageTitle
} from "../../../../ui_elements";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useHistory, useLocation } from "react-router-dom";

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


const ExternalCoursesFeeInvoice = () => {
	const { state } = useLocation();
	const { goBack } = useHistory();

	if (!state?.fromVerify) goBack();
	const ref = useRef();
	const handlePrint = useReactToPrint({
		content: () => ref.current,
		pageStyle: pageStyle
	});
	const crumbs = [
		{
			name: "Course Registration",
			path: "/course_registration"
		},
		{
			name: "Courses Invoice",
			path: ""
		}
	];
	const details = {
		fullName: state?.details?.fullname,
		rrr: state?.details?.rrr,
		transactionRef: state?.details?.transactionReference,
		invoiceNumber: state?.details?.invoiceCode,
		matricNumber: state?.details?.matricNumber,
		level: state?.details?.level,
		department: state?.details?.department,
		studentType: state?.details?.studentType,
		schoolName: state?.details?.schoolName,
		date: state?.details?.dateGenerated,
		cardPaymentLink: state?.details?.cardPaymentLink,
		isPaid: state?.details?.paymentStatus,
		recieptItems: [
			{
				paymentPurposeId: state?.details?.paymentPurposeId,
				description: state?.details?.description,
				amount: state?.details?.amount,
				paymentType: state?.details?.paymentType
			}
		],
		total: state?.details?.amount
	};
	return (
		<div className="row">
			<div className="col-12 col-md-1"></div>
			<div className="col-12 col-md-10">
				<div>
					<Breadcrumbs crumbs={crumbs} />
					<PageTitle
						title="Course Registration Invoice"
						buttonGroup={
							<>
								<Button
									data-cy="print"
									buttonClass="success"
									label="Print"
									onClick={handlePrint}
								/>
							</>
						}
					/>
				</div>
				<div className={styles.page_content} ref={ref}>
					<Invoice details={details} noRedirect={true}/>
				</div>
			</div>
		</div>
	);
};

export default ExternalCoursesFeeInvoice;

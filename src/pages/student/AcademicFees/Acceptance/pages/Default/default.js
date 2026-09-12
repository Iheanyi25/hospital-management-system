import { createRef, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useApiGet } from "../../../../../../api/apiCall";
import {
	getMyInvoicesUrl,
	initiateAcceptanceFeePaymentUrl
} from "../../../../../../api/urlCategories/Payment";
import {
	DefaultScreen,
	PageTitle,
	Button,
	Spinner
} from "../../../../../../ui_elements";
import {
	PAYMENTIDENTIFIER,
	SCHOOL_DETAILS,
	STUDENT_TYPES
} from "../../../../../../utils/constants";
import styles from "./style.module.css";
// import { useReactToPrint } from "react-to-print";
import { ParticularsOfAdmission } from "../ParticualrsOfAdmission/particularsOfAdmission";

// const pageStyle = `
// @page {
// // size: 80mm 50mm;
// margin-top: 10rem;
// margin-left: 5rem;
// margin-right: 5rem;
// }

// // @media all {
// //   .pagebreak {
// //     display: none;
// //   }
// // }

// @media print {
// .pagebreak {
// // page-break-before: always;

// }
// }
// `;

const AcceptanceFeeDefault = () => {
	const { data, isLoading, error } = useApiGet(
		getMyInvoicesUrl(PAYMENTIDENTIFIER.acceptance)
	);
	const { push } = useHistory();
	const [makeRequest, setMakeRequest] = useState(false);
	const ref = createRef();

	// const handlePrint = useReactToPrint({
	// 	content: () => ref.current,
	// 	pageStyle: pageStyle
	// });

	const {
		data: invoiceData,
		isLoading: isLoadingAcceptanceFeePayment,
		error: requestError
	} = useApiGet(initiateAcceptanceFeePaymentUrl(), {
		enabled: makeRequest,
		refetchOnWindowFocus: false,
		retry: false
	});
	useEffect(() => {
		if (invoiceData?.success && makeRequest && !isLoading) {
			push({
				pathname: "/academic_fees/acceptance/generate_invoice",
				state: { details: invoiceData?.data, fromVerify: true }
			});
		}
		if (requestError && makeRequest && !isLoading) {
			setMakeRequest(false);
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Invalid Action!",
				body:
					requestError?.response?.data?.message ||
					`Invalid action, please enter correct details`
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		}
	}, [data, requestError, push, makeRequest, invoiceData, isLoading]);

	const scenario = {
		firstTime: {
			title: "Welcome!",
			message: `Welcome to ${SCHOOL_DETAILS.shortForm}. It’s time to pay your acceptance fee`,
			buttonGroup: (
				<>
					<Button
						data-cy="generate_invoice"
						label="Generate Invoice"
						buttonClass="primary"
						loading={isLoadingAcceptanceFeePayment}
						onClick={() => setMakeRequest(true)}
					/>
					<Button
						data-cy="print_accpt"
						label="Print Acceptance Reciept"
						buttonClass="standard"
						onClick={() => push("/academic_fees/acceptance/letter")}
						disabled
					/>
				</>
			)
		},
		pending: {
			title: "Welcome!",
			message: `Invoice for ${data?.data?.[0]?.session} Acceptance Fee has been successfully generated. Kindly reprint Invoice if payment is yet to be reflected and pay with either your ATM Card or through Bank.`,
			buttonGroup: (
				<div className="d-flex justify-content-center flex-wrap gap-4">
					<Button
						data-cy="print_inv_accp"
						label="Reprint Invoice"
						buttonClass="primary"
						onClick={() =>
							push(
								`/academic_fees/acceptance/invoice/${data?.data[0].rrr}`
							)
						}
					/>
					<Button
						data-cy="print_accpt"
						label={` ${
							data?.data?.[0]?.studentTypeId ===
							STUDENT_TYPES.POSTGRADUATE
								? "Print Admission Letter"
								: "Print Acceptance Reciept"
						}`}
						buttonClass="standard"
						onClick={() =>
							push({
								pathname: `/academic_fees/acceptance/fee_receipt`,
								state: data?.data?.[0]
							})
						}
						disabled={!data?.data[0]?.paymentStatus}
					/>
					{/* {data?.data?.[0]?.studentTypeId ===
						STUDENT_TYPES.POSTGRADUATE && (
							<Button
								data-cy="print_particulars"
								label={`Print Particulars Of Admission`}
								buttonClass="primary"
								onClick={handlePrint}
								disabled={!data?.data[0]?.paymentStatus}
							/>
						)
							: (
							<Button
								data-cy="print_particulars"
								label={`Print Acceptance Letter`}
								buttonClass="primary"
								onClick={handlePrint}
								disabled={!data?.data[0]?.paymentStatus}
							/>
						)
					} */}
				</div>
			)
		}
	};

	if (isLoading) return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<div className={styles.container}>
			<div className="d-none">
				<ParticularsOfAdmission ref={ref} details={data?.data?.[0]} />
			</div>
			<PageTitle title="Acceptance Fee" />
			<div className={styles.page_content}>
				{data?.data.length === 0 ? (
					<DefaultScreen
						title={scenario.firstTime.title}
						message={scenario.firstTime.message}
						buttonGroup={scenario.firstTime.buttonGroup}
					/>
				) : (
					<DefaultScreen
						title={scenario.pending.title}
						message={scenario.pending.message}
						buttonGroup={scenario.pending.buttonGroup}
					/>
				)}
			</div>
		</div>
	);
};

export default AcceptanceFeeDefault;

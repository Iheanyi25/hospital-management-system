import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useApiGet } from "../../../../../api/apiCall";
import {
	getMyInvoicesUrl,
	initiateDevelopmentLevyPaymentUrl
} from "../../../../../api/urlCategories/Payment";
import {
	DefaultScreen,
	PageTitle,
	Button,
	Spinner
} from "../../../../../ui_elements";
import {
	PAYMENTIDENTIFIER,
	SCHOOL_DETAILS
} from "../../../../../utils/constants";
import styles from "./style.module.css";

const AcceptanceFeeDefault = () => {
	const { data, isLoading, error } = useApiGet(
		getMyInvoicesUrl(PAYMENTIDENTIFIER.acceptance)
	);
	const { push } = useHistory();
	const [makeRequest, setMakeRequest] = useState(false);

	const {
		data: invoiceData,
		isLoading: isLoadingAcceptanceFeePayment,
		error: requestError
	} = useApiGet(initiateDevelopmentLevyPaymentUrl(), {
		enabled: makeRequest,
		refetchOnWindowFocus: false,
		retry: false
	});
	useEffect(() => {
		if (invoiceData?.success && makeRequest && !isLoading) {
			push({
				pathname: "/development_levy/generate_invoice",
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
			message: `Welcome to ${SCHOOL_DETAILS.shortForm}. It’s time to pay your development levy`,
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
						label="Print Development Levy"
						buttonClass="standard"
						onClick={() => push("/development_levy/letter")}
						disabled
					/>
				</>
			)
		},
		pending: {
			title: "Welcome!",
			message: `Invoice for ${data?.data?.[0]?.session} Development Levy has been successfully generated. Kindly reprint Invoice if payment is yet to be reflected and pay with either your ATM Card or through Bank.`,
			buttonGroup: (
				<>
					<Button
						data-cy="print_inv_accp"
						label="Reprint Invoice"
						buttonClass="primary"
						onClick={() =>
							push(
								`/development_levy/invoice/${data?.data[0].rrr}`
							)
						}
					/>
					<Button
						data-cy="print_accpt"
						label="Print Admission Documents"
						buttonClass="standard"
						onClick={() =>
							push({
								// pathname: "/development_levy/letter",
								pathname: "/development_levy/document_page",
								state: data?.data?.[0]
							})
						}
						disabled={!data?.data[0]?.paymentStatus}
					/>
				</>
			)
		}
	};

	if (isLoading) return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<div className={styles.container}>
			<PageTitle title="Development Levy" />
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

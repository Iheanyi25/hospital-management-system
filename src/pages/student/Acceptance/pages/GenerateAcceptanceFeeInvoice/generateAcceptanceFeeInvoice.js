import {
	Breadcrumbs,
	PageTitle,
	GenerateInvoiceForm
} from "../../../../../ui_elements";
import styles from "./style.module.css";
import {
	generateFeesInvoiceUrl,
	getMyInvoicesUrl
} from "../../../../../api/urlCategories/Payment";
import { useApiPost } from "../../../../../api/apiCall";
import numberFormatter from "../../../../../utils/numberFormatter";
import { PAYMENTIDENTIFIER } from "../../../../../utils/constants";
import { useQueryClient } from "react-query";
import { useHistory, useLocation } from "react-router-dom";

const GenerateAcceptanceFeeInvoice = () => {
	const { mutate, isLoading: generating } = useApiPost();
	const { state } = useLocation();
	const queryClient = useQueryClient();
	const { push, goBack } = useHistory();
	if (!state?.fromVerify) goBack();
	const crumbItems = [
		{
			name: "Acceptance",
			path: "/acceptance"
		},
		{
			name: "Generate Invoice",
			path: "/"
		}
	];
	
	const invoiceDetails = [
		{ title: "Fullname", value: state?.details?.fullname?.toUpperCase() },
		{ title: "Matric Number", value: state?.details?.matricNumber },
		{ title: "Mobile Number", value: state?.details?.mobileNumber },
		{ title: "Academic Session", value: state?.details?.session },
		{ title: "Payment Purpose", value: state?.details?.paymentPurpose },
		{ title: "Student Type", value: state?.details?.studentType },
		{ title: "Payment Type", value: state?.details?.paymentType },
		{ title: "Level", value: state?.details?.level },
		{ title: "Amount", value: numberFormatter(state?.details?.amount) }
	];

	const generateInvoice = () => {
		const reqData = {
			amount: state?.details?.amount,
			sessionId: state?.details?.sessionId,
			paymentTypeId: state?.details?.paymentTypeId,
			paymentPurposeId: state?.details?.paymentPurposeId
		};
		const requestBody = {
			url: generateFeesInvoiceUrl(),
			data: reqData
		};
		mutate(requestBody, {
			onSuccess: (data) => {
				queryClient.invalidateQueries(
					getMyInvoicesUrl(PAYMENTIDENTIFIER.acceptance)
				);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Invoice successfully generated",
					body: "You generated an invoice for payment of your acceptance fee"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				push(`/acceptance/invoice/${data?.data?.data?.rrr}`);
			},
			onError: () => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Invoice generation failed",
					body: `Something went wrong while generating invoice for your Acceptance Fee.`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	return (
		<div className="row">
			<div className="col-12 col-md-1"></div>
			<div className="col-12 col-md-10">
				<div>
					<Breadcrumbs crumbs={crumbItems} />
					<PageTitle title="Generate Invoice" />
				</div>
				<div className={styles.page_content}>
					<GenerateInvoiceForm
						details={invoiceDetails}
						onClick={generateInvoice}
						loading={generating}
					/>
				</div>
			</div>
			<div className="col-12 col-md-1"></div>
		</div>
	);
};

export default GenerateAcceptanceFeeInvoice;

import styles from "./style.module.css";
import {
	Breadcrumbs,
	PageTitle,
	GenerateInvoiceForm
} from "../../../../../../ui_elements";
import { useHistory, useLocation } from "react-router-dom";
import numberFormatter from "../../../../../../utils/numberFormatter";
import { useApiPost } from "../../../../../../api/apiCall";
import {
	generateFeesInvoiceUrl,
	getMyInvoicesUrl
} from "../../../../../../api/urls";
import { useQueryClient } from "react-query";
import { PAYMENTIDENTIFIER } from "../../../../../../utils/constants";

const GenerateSchoolFeesInvoice = () => {
	const { push } = useHistory();
	const { state } = useLocation();
	const { mutate, isLoading } = useApiPost();
	const queryClient = useQueryClient();
	const crumbItems = [
		{
			name: "School Fees",
			path: "/academic_fees/school_fees"
		},
		{
			name: "Select Session",
			path: "/academic_fees/school_fees/session"
		},
		{
			name: "Invoice",
			path: "/"
		}
	];
	const invoiceDetails = [
		{ title: "Fullname", value: state?.fullname },
		{ title: "Matric Number", value: state?.matricNumber },
		{ title: "Mobile Number", value: state?.mobileNumber },
		{ title: "Academic Session", value: state?.session },
		{ title: "Payment Purpose", value: state?.paymentPurpose },
		{ title: "Student Type", value: state?.studentType },
		{ title: "Fee Type", value: state?.paymentType },
		{ title: "Level", value: state?.level },
		{ title: "Amount", value: numberFormatter(state?.amount) }
	];
	const generateInvoice = () => {
		const data = {
			amount: state?.amount,
			sessionId: state?.sessionId,
			paymentTypeId: state?.paymentTypeId,
			paymentPurposeId: state?.paymentPurposeId,
			levelId: state?.levelId
		};
		const requestBody = {
			url: generateFeesInvoiceUrl(),
			data
		};
		mutate(requestBody, {
			onSuccess: (data) => {
				queryClient.invalidateQueries(
					getMyInvoicesUrl(PAYMENTIDENTIFIER.schoolFees)
				);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Invoice successfully generated",
					body: "You generated an invoice for payment of your school fees"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				push({
					pathname: "/academic_fees/school_fees/invoice",
					state: { details: data?.data?.data, fromVerify: true }
				});
			},
			onError: (error) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Invoice generation failed",
					body:
						error?.response?.data?.message ||
						`Something went wrong while generating invoice for ${state?.sessionName} School Fees.`
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
						loading={isLoading}
					/>
				</div>
			</div>
			<div className="col-12 col-md-1"></div>
		</div>
	);
};

export default GenerateSchoolFeesInvoice;

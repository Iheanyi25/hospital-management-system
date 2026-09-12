import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";
import {
	DefaultScreen,
	PageTitle,
	Button,
	TMTable,
	Spinner,
	ProfileContext
} from "../../../../../../ui_elements";
import styles from "./style.module.css";
import numberFormatter from "../../../../../../utils/numberFormatter";
import { useApiGet, useApiPost } from "../../../../../../api/apiCall";
import {
	generateSchoolFeesBalanceInvoiceUrl,
	getInvoiceWithInvoiceNumberUrl,
	getMyInvoicesUrl
} from "../../../../../../api/urls";
import {
	PAYMENTIDENTIFIER,
	STUDENT_TYPES
} from "../../../../../../utils/constants";

const Default = () => {
	const { mutate, isLoading: isPosting } = useApiPost();
	const { data, isLoading, error } = useApiGet(
		getMyInvoicesUrl(PAYMENTIDENTIFIER.schoolFees)
	);
	const { push } = useHistory();
	const profileData = useContext(ProfileContext);

	const [makeRequest, setMakeRequest] = useState(false);
	const [rrr, setRRR] = useState("");
	const [invoiceCode, setInvoiceCode] = useState("");

	const {
		data: invoiceData,
		isLoading: isLoadingAcceptanceFeePayment,
		error: requestError
	} = useApiGet(getInvoiceWithInvoiceNumberUrl(invoiceCode), {
		enabled: makeRequest,
		refetchOnWindowFocus: false,
		retry: false
	});
	useEffect(() => {
		if (invoiceData?.success && makeRequest && !isLoading) {
			push({
				pathname: "/academic_fees/school_fees/invoice",
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

	const onSubmit = (invoiceCode) => {
		setInvoiceCode(invoiceCode);
		setMakeRequest(true);
	};
	const generateBalanceInvoice = useCallback(
		(values) => {
			setRRR(values?.rrr);
			const data = {
				amount: values?.balanceAmount,
				sessionId: values?.sessionId,
				paymentTypeId: values?.paymentTypeId,
				levelId: values?.levelId,
				paymentPurposeId: values?.paymentPurposeId
			};
			const requestBody = {
				url: generateSchoolFeesBalanceInvoiceUrl(),
				data
			};
			mutate(requestBody, {
				onSuccess: (data) => {
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
							`Something went wrong while generating balance invoice for School Fees.`
					});
					setTimeout(() => {
						errorFlag.close();
					}, 5000);
				}
			});
		},
		[mutate, push]
	);

	const scenario = {
		firstTime: {
			title: "Pay your school fees",
			message: "Make sure your fees are up to date",
			buttonGroup: (
				<Button
					data-cy="new_invoice"
					label="Generate Invoice"
					buttonClass="primary"
					onClick={() => push("/academic_fees/school_fees/session")}
				/>
			)
		}
	};
	const columns = useMemo(
		() => [
			{
				Header: "Invoice #",
				accessor: "invoiceCode"
			},
			{
				Header: <>Amount &#8358;</>,
				accessor: "amount",
				Cell: ({ cell: { row } }) => (
					<div>
						<p
							className={
								row.original.hasBalanceToPay
									? "text-danger"
									: ""
							}
						>
							{numberFormatter(row.original.amount) || "-"}
						</p>
						{row.original.balanceAmount > 0 &&
						!row.original.hasBalanceToPay ? (
							<small>
								Paid balance of {row.original.balanceAmount}
							</small>
						) : row.original.hasBalanceToPay &&
						  row.original.balanceAmount > 0 ? (
							<small>
								Pay balance of {row.original.balanceAmount}
							</small>
						) : null}
					</div>
				)
			},
			{
				Header: "Level",
				accessor: "level"
			},
			{
				Header: "Payment Type",
				accessor: "paymentType"
			},
			{
				Header: "Session",
				accessor: "session"
			},
			{
				Header: "",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => (
					<div>
						{row.original.hasBalanceToPay ? (
							<Button
								data-cy="print_invoice"
								label="Generate Balance Invoice"
								buttonClass="primary"
								loading={isPosting && row.original.rrr === rrr}
								onClick={() =>
									generateBalanceInvoice(row.original)
								}
							/>
						) : (
							<Button
								data-cy="print_invoice"
								label="Print Invoice"
								buttonClass="standard"
								loading={
									isLoadingAcceptanceFeePayment &&
									row.original.invoiceCode === invoiceCode
								}
								onClick={() =>
									onSubmit(row.original.invoiceCode)
								}
							/>
						)}
						<Button
							data-cy="print_reciept"
							label="Print Receipt"
							buttonClass="standard-two"
							onClick={() =>
								push({
									pathname:
										"/academic_fees/school_fees/receipt",
									state: {
										sessionId: row.original.sessionId,
										levelId: row.original.levelId,
										paymentTypeId:
											row.original.paymentTypeId,
										paymentPurposeId:
											row.original.paymentPurposeId
									}
								})
							}
							disabled={
								!row.original.paymentStatus ||
								row.original.hasBalanceToPay
							}
						/>
						{profileData.profileData?.programmeDetail
							?.studentTypeId === STUDENT_TYPES.PREDEGREE ? (
							<Button
								data-cy="print_form_11"
								label="Form 11"
								buttonClass="standard-two"
								onClick={() =>
									push({
										pathname:
											"/academic_fees/school_fees/form11",
										state: {
											sessionId: row.original.sessionId,
											levelId: row.original.levelId,
											paymentTypeId:
												row.original.paymentTypeId,
											paymentPurposeId:
												row.original.paymentPurposeId
										}
									})
								}
							/>
						) : (
							""
						)}
					</div>
				)
			}
		],
		[
			push,
			isLoadingAcceptanceFeePayment,
			isPosting,
			invoiceCode,
			generateBalanceInvoice,
			rrr,
			profileData
		]
	);
	if (isLoading) return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;

	return (
		<div className={styles.container}>
			<PageTitle
				title="School Fees"
				buttonGroup={
					<>
						{data?.data.length !== 0 && (
							<Button
								data-cy="new_invoice"
								label="New Invoice"
								buttonClass="primary"
								onClick={() =>
									push("/academic_fees/school_fees/session")
								}
							/>
						)}
					</>
				}
			/>
			{data?.data.length === 0 ? (
				<div className={styles.page_content}>
					<DefaultScreen
						title={scenario.firstTime.title}
						message={scenario.firstTime.message}
						buttonGroup={scenario.firstTime.buttonGroup}
					/>
				</div>
			) : (
				<div className={styles.content}>
					<TMTable
						columns={columns}
						data={data?.data}
						title="School Fees History"
					/>
				</div>
			)}
		</div>
	);
};

export default Default;

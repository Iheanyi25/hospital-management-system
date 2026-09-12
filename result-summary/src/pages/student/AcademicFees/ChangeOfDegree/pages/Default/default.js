import { useMemo, useState } from "react";
import { useHistory } from "react-router";
import {
	DefaultScreen,
	PageTitle,
	Button,
	TMTable,
	Spinner,
	Badge
} from "../../../../../../ui_elements";
import styles from "./style.module.css";
import { useApiGet } from "../../../../../../api/apiCall";
import {
	getInvoiceWithInvoiceNumberUrl,
	getMyInvoicesUrl
} from "../../../../../../api/urls";
import { PAYMENTIDENTIFIER } from "../../../../../../utils/constants";
import { formatDateFromAPI } from "../../../../../../utils/formatDate";
import { useEffect } from "react";

const Default = () => {
	const [makeRequest, setMakeRequest] = useState(false);
	const { data, isFetching, error } = useApiGet(
		getMyInvoicesUrl(PAYMENTIDENTIFIER.changeOfDepartment)
	);
	const { push } = useHistory();
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
		if (invoiceData?.success && makeRequest) {
			push({
				pathname: "/academic_fees/change_of_degree/invoice",
				state: { details: invoiceData?.data, fromVerify: true }
			});
		}
		if (requestError && makeRequest) {
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
	}, [data, requestError, push, makeRequest, invoiceData]);

	const onSubmit = (invoiceCode) => {
		setInvoiceCode(invoiceCode);
		setMakeRequest(true);
	};

	const scenario = {
		firstTime: {
			title: "Generate Invoice",
			message:
				"Before you can access the Change of Degree Form, you'll need to generate an invoice. This is a necessary step to ensure all your fees are accounted for.",
			buttonGroup: (
				<Button
					data-cy="new_invoice"
					label="Generate Invoice"
					buttonClass="primary"
					onClick={() =>
						push("/academic_fees/change_of_degree/session")
					}
				/>
			)
		}
	};
	const columns = useMemo(
		() => [
			{
				Header: "Department",
				accessor: "department"
			},
			{
				Header: "Year of Study",
				accessor: "level"
			},
			{
				Header: "Department to Transfer to",
				accessor: "newDepartment"
			},
			{
				Header: "Date Submitted",
				accessor: "dateSubmitted",
				Cell: ({ cell: { row } }) => (
					<div>
						<p>
							{formatDateFromAPI(
								row?.original?.changeOfDegreeDateSubmitted ?? ""
							) || "-"}
						</p>
					</div>
				)
			},
			{
				Header: "Status",
				accessor: "status",
				Cell: ({ cell: { row } }) => {
					return row?.original?.changeOfDegreeStatus ? (
						<Badge
							item={{
								title: row?.original?.changeOfDegreeStatus,
								type: statusOptions[
									row?.original?.changeOfDegreeStatus
								]
							}}
						/>
					) : (
						<Badge
							item={{
								title: "Not Submitted",
								type: statusOptions["Not Submitted"]
							}}
						/>
					);
				}
			},
			{
				Header: "",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => (
					<div>
						{!row.original.paymentStatus ? (
							<Button
								data-cy="reprint_invoice"
								label="Reprint Invoice"
								buttonClass="primary"
								loading={
									isLoadingAcceptanceFeePayment &&
									row.original.invoiceCode === invoiceCode
								}
								onClick={() =>
									onSubmit(row.original.invoiceCode)
								}
							/>
						) : (
							<>
								{row.original.changeOfDegreeStatusId === 0 ||
								row.original.changeOfDegreeStatusId === 1 ? (
									<Button
										data-cy="continue_application"
										label="Continue Application"
										buttonClass="standard"
										onClick={() =>
											push({
												pathname:
													"/change_of_department_application",
												state: {
													sessionId:
														row.original.sessionId,
													session:
														row.original.session,
													rrr: row.original.rrr
												}
											})
										}
									/>
								) : (
									<Button
										data-cy="print_application_slip"
										label="Print Slip"
										buttonClass="primary"
										onClick={() =>
											push({
												pathname:
													"/change_of_department_application_details",
												state: {
													departmentId:
														row.original
															.newDepartment,
													departmentOptionId:
														row?.original
															?.newDepartmentOption,
													reason: row.original
														.changeOfDegreeReason,
													session:
														row.original.session,
													rrr: row.original.rrr
												}
											})
										}
									/>
								)}
							</>
						)}
					</div>
				)
			}
		],
		[push, invoiceCode, isLoadingAcceptanceFeePayment]
	);

	if (isFetching) return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;

	return (
		<div className={styles.container}>
			<PageTitle
				title="Change of Degree"
				buttonGroup={
					<>
						{data?.data.length !== 0 && (
							<Button
								data-cy="new_invoice"
								label="New Invoice"
								buttonClass="primary"
								onClick={() =>
									push(
										"/academic_fees/change_of_degree/session"
									)
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
						title="Change of Degree History"
					/>
				</div>
			)}
		</div>
	);
};

const statusOptions = {
	"Not Submitted": "notsubmitted",
	Approved: "success",
	Submitted: "warning"
};

export default Default;

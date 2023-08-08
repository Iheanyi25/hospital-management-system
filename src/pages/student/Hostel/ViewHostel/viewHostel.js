import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useApiGet } from "../../../../api/apiCall";
import { getInvoiceUrl, getMyInvoicesUrl } from "../../../../api/urls";
import {
	Badge,
	Button,
	PageTitle,
	Spinner,
	TMTable
} from "../../../../ui_elements";
import { PAYMENTIDENTIFIER } from "../../../../utils/constants";
import { shortDate } from "../../../../utils/formatDate";
import numberFormatter from "../../../../utils/numberFormatter";

const ViewHostel = () => {
	const [makeRequest, setMakeRequest] = useState(false);
	const [rrr, setRRR] = useState(null);

	const { push } = useHistory();

	const { data, isLoading, error } = useApiGet(
		getMyInvoicesUrl(PAYMENTIDENTIFIER.hostel)
	);

	const {
		data: invoiceData,
		isFetching: isLoadingInvoices,
		error: requestError
	} = useApiGet(getInvoiceUrl(rrr), {
		enabled: makeRequest,
		refetchOnWindowFocus: false
	});

	useEffect(() => {
		if (invoiceData?.success && makeRequest && !isLoadingInvoices) {
			push({
				pathname: `/hostel/invoice`,
				state: { data: invoiceData?.data }
			});
		}
		if (requestError && makeRequest && !isLoadingInvoices) {
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
	}, [invoiceData, requestError, push, makeRequest, isLoadingInvoices]);

	const generateInvoice = (rrr) => {
		setRRR(rrr);
		setMakeRequest(true);
	};

	const columns = useMemo(
		() => [
			{
				Header: "S/N",
				accessor: "serialNo",
				Cell: ({ cell: { row } }) => (
					<div>
						<span>{row.index + 1}</span>
					</div>
				)
			},
			{
				Header: "Hostel Name",
				accessor: "hostel"
			},
			{
				Header: "Room",
				accessor: "hostelRoom"
			},
			{
				Header: "Amount",
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
				Header: "Session",
				accessor: "session"
			},
			{
				Header: "Status",
				accessor: "status",
				Cell: ({ cell: { row } }) => (
					<div>
						<Badge
							item={{
								title: row.original.paymentStatus
									? "Assigned"
									: "Pending Payment",
								type: row.original.paymentStatus
									? "success"
									: "warning"
							}}
						/>
					</div>
				)
			},
			{
				Header: "Payment date",
				accessor: "dateGenerated",
				Cell: ({ cell: { row } }) => (
					<p>{shortDate(row.original.dateGenerated)}</p>
				)
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => (
					<div>
						{row.original.paymentStatus ? (
							<Button
								data-cy="edit_course"
								label="Print Receipt"
								buttonClass="standard"
								onClick={() => {
									push({
										pathname: "/hostel_fees/receipt",
										state: {
											sessionId: row.original.sessionId,
											levelId: row.original.levelId,
											paymentTypeId:
												row.original.paymentTypeId,
											paymentPurposeId:
												row.original.paymentPurposeId
										}
									});
								}}
							/>
						) : (
							<Button
								data-cy="edit_course"
								label="Print Invoice"
								buttonClass="standard"
								loading={isLoadingInvoices}
								onClick={() =>
									generateInvoice(row.original.rrr)
								}
							/>
						)}
					</div>
				)
			}
		],
		[push, isLoadingInvoices]
	);

	if (isLoading) return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;

	return (
		<>
			<PageTitle
				title="Hostel Records"
				buttonGroup={
					<Button
						disabled={data?.data?.length > 0 ? true : false}
						buttonClass="primary"
						label="Book Hostel"
						onClick={() => push("/hostel/book_hostel")}
					/>
				}
			/>
			<div className="mt-5">
				<TMTable
					title={"Hostel History"}
					columns={columns}
					data={data?.data || []}
				/>
			</div>
		</>
	);
};

export default ViewHostel;

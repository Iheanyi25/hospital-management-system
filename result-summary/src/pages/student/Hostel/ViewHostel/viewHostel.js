import { useCallback, useContext, useMemo, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useApiGet, useApiPost } from "../../../../api/apiCall";
import { generateFeesInvoiceUrl, getMyInvoicesUrl } from "../../../../api/urls";
import {
	Badge,
	Button,
	PageTitle,
	Spinner,
	ProfileContext,
	TMTable
} from "../../../../ui_elements";
import { PAYMENTIDENTIFIER } from "../../../../utils/constants";
import { shortDate } from "../../../../utils/formatDate";
import numberFormatter from "../../../../utils/numberFormatter";

const ViewHostel = () => {
	const profileData = useContext(ProfileContext);
	const { push } = useHistory();
	const [invoiceCode, setInvoiceCode] = useState("");

	const { data, isLoading, error } = useApiGet(
		getMyInvoicesUrl(PAYMENTIDENTIFIER.hostel)
	);

	const { mutate, isLoading: isPosting } = useApiPost();

	const onSubmit = useCallback(
		(data) => {
			setInvoiceCode(data.invoiceCode);
			const requestDet = {
				url: generateFeesInvoiceUrl(),
				data: {
					amount: data?.amount,
					hostelBedId: data?.id,
					sessionId: data?.sessionId,
					levelId: profileData?.profileData?.programmeDetail?.levelId,
					paymentPurposeId: PAYMENTIDENTIFIER?.hostel,
					paymentTypeId: "Full"
				}
			};

			mutate(requestDet, {
				onSuccess: (data) => {
					push({
						pathname: `/hostel/invoice`,
						state: { data: data?.data?.data }
					});
					const successFlag = window.AJS.flag({
						type: "success",
						title: "Invoice Action Successful!",
						body: "Invoice generated successfully!"
					});
					setTimeout(() => {
						successFlag.close();
					}, 3000);
				},
				onError: ({ response }) => {
					const errorFlag = window.AJS.flag({
						type: "error",
						title: "Invoice Action Failed!",
						body:
							response?.data?.message ||
							`Invoice generated failed!!`
					});
					setTimeout(() => {
						errorFlag.close();
					}, 3000);
				}
			});
		},
		[mutate, profileData?.profileData?.programmeDetail?.levelId, push]
	);

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
						<Button
							data-cy="edit_course"
							label="Print Invoice"
							buttonClass="standard"
							loading={
								isPosting &&
								row.original.invoiceCode === invoiceCode
							}
							onClick={() => onSubmit(row.original)}
						/>
						<Button
							data-cy="edit_course"
							label="Print Receipt"
							buttonClass="standard-two"
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
					</div>
				)
			}
		],
		[push, invoiceCode, isPosting, onSubmit]
	);
	if (isLoading) return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;

	return (
		<>
			<PageTitle
				title="Hostel Records"
				buttonGroup={
					<>
						<Button
							disabled={
								data?.data?.length > 0 &&
								!data?.data?.some((item) => item.canBookHostel)
							}
							buttonClass="primary"
							label="Book Hostel"
							onClick={() =>
								window.open(
									"https://schmgr.unn.edu.ng/LoginHostel.aspx?sent=e01a1733-1f93-4214-b6a5-7964ae2eda24"
								)
							}
						/>
						<Button
							// add check for canPayArrears
							// disabled={
							// 	data?.data?.length > 0 &&
							// 	!data?.data?.some((item) => item.canBookHostel)
							// }
							buttonClass="standard"
							label="Pay Arrears"
							onClick={() => push("/hostel/arrears_payment")}
						/>
					</>
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

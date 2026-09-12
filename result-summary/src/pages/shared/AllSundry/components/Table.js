import { useMemo } from "react";
import { TMTable, Button } from "../../../../ui_elements";
import numberFormatter from "../../../../utils/numberFormatter";
import { useHistory } from "react-router-dom";

export const Table = ({
	loading,
	data,
	setPageNumber,
	pageSize,
	pageNumber,
	filter,
	paginationProps,
	setNewInvoice
}) => {
	const { push } = useHistory();

	const columns = useMemo(
		() => [
			{
				Header: "S/N",
				accessor: "serialNo",
				Cell: ({ cell: { row } }) => (
					<div>
						<span>
							{pageSize * (pageNumber - 1) + (row.index + 1)}
						</span>
					</div>
				)
			},
			{
				Header: "Full Name",
				accessor: "fullName"
			},
			{
				Header: "Reference Number",
				accessor: "rrr"
			},
			{
				Header: "Invoice #",
				accessor: "invoiceCode"
			},
			{
				Header: "Amount",
				accessor: "totalAmount",
				Cell: ({ cell: { row } }) => (
					<>{numberFormatter(row.original.totalAmount) || "NONE"}</>
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
					<div className="d-flex align-items-center">
						<Button
							label="Reprint Invoice"
							buttonClass={"primary"}
							onClick={() =>
								push({
									pathname: `/sundry_reciepts`,
									state: { data: row.original }
								})
							}
						/>

						<Button
							label="Reprint Receipt"
							onClick={() =>
								row.original.paymentStatus === "True" &&
								push({
									pathname: `/fee_receipt`,
									state: { data: row.original.invoiceCode }
								})
							}
							buttonClass={"standard"}
							disabled={row.original.paymentStatus === "False"}
						/>
					</div>
				)
			}
		],
		[pageNumber, pageSize, push]
	);
	return (
		<TMTable
			columns={columns}
			additonalTitleData={
				<Button
					label="New Invoice"
					buttonClass="primary"
					onClick={() => setNewInvoice(true)}
				/>
			}
			data={data}
			loading={loading}
			title={`Invoices - ${filter?.subCategoryId?.label}`}
			setPageNumber={setPageNumber}
			availablePages={paginationProps.totalPages}
		/>
	);
};

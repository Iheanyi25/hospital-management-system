import { useMemo } from "react";
import {
	Badge,
	Button,
	TMTable,
	ToggleElement
} from "../../../../../../ui_elements";
import numberFormatter from "../../../../../../utils/numberFormatter";

export const Table = ({
	data,
	loading,
	title,
	toggleInvoiceActivation,
	setEditData,
	setEditOpen,
	metaData,
	setPageNumber,
	paginationProps
}) => {
	const columns = useMemo(
		() => [
			{
				Header: "Reference Number",
				accessor: "rrr"
			},
			{
				Header: "Invoice type",
				accessor: "bursarySetupCategory"
			},
			{
				Header: "Session",
				accessor: "session"
			},
			{
				Header: "Payment type",
				accessor: "paymentType"
			},
			{
				Header: "Amount",
				accessor: "totalAmount",
				Cell: ({ cell: { row } }) => (
					<>{numberFormatter(row.original.totalAmount)}</>
				)
			},
			{
				Header: "Status",
				accessor: "entityStatus",
				Cell: ({ cell: { row } }) => (
					<Badge
						item={{
							title:
								row.original.paymentStatus === "False"
									? "Unpaid"
									: "Paid",
							type:
								row.original.paymentStatus === "False"
									? "fail"
									: "success"
						}}
					/>
				)
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => {
					const { invoiceCode, active } = row.original;
					return (
						<>
							{row.original.paymentStatus === "False" ? (
								<ToggleElement
									id={`set-status`}
									checked={active}
									onChange={() =>
										toggleInvoiceActivation({
											active: !active,
											invoiceCode
										})
									}
									isDisabled={loading}
								/>
							) : (
								<Badge
									item={{
										title:
											row.original.paymentStatus ===
											"False"
												? "Unpaid"
												: "Paid",
										type:
											row.original.paymentStatus ===
											"False"
												? "fail"
												: "success"
									}}
								/>
							)}
							<Button
								data-cy="edit_unit_load"
								label="Edit"
								buttonClass="standard"
								onClick={() => {
									setEditData(row.original);
									setEditOpen(true);
								}}
							/>
						</>
					);
				}
			}
		],
		[loading, toggleInvoiceActivation, setEditData, setEditOpen]
	);

	return (
		<TMTable
			columns={columns}
			data={data}
			title={title}
			loading={loading}
			metaData={metaData}
			setPageNumber={setPageNumber}
		/>
	);
};

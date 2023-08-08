import { useMemo } from "react";
import {
	Badge,
	Button,
	TMTable,
	ToggleElement
} from "../../../../../../ui_elements";

export const Table = ({
	data,
	loading,
	title,
	toggleInvoiceActivation,
	setEditData,
	setEditOpen
}) => {
	const columns = useMemo(
		() => [
			{
				Header: "Remita number",
				accessor: "rrr"
			},
			{
				Header: "Invoice type",
				accessor: "paymentPurpose"
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
				Header: "Level",
				accessor: "level"
			},
			{
				Header: "Status",
				accessor: "entityStatus",
				Cell: ({ cell: { row } }) => (
					<Badge
						item={{
							title: !row.original.paymentStatus
								? "Unpaid"
								: "Paid",
							type: !row.original.paymentStatus
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
					const { rrr, active } = row.original;
					return (
						<>
							{!row.original.paymentStatus ? (
								<ToggleElement
									id={`set-status`}
									checked={active}
									onChange={() =>
										toggleInvoiceActivation({
											active: !active,
											rrr
										})
									}
									isDisabled={loading}
								/>
							) : (
								<Badge
									item={{
										title: !row.original.paymentStatus
											? "Unpaid"
											: "Paid",
										type: !row.original.paymentStatus
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
			data={data?.data?.invoiceData || []}
			title={title}
			loading={loading}
		/>
	);
};

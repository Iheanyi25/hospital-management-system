import { useMemo } from "react";
import { Route } from "react-router-dom";
import { TabLayout } from "../../ui_elements";

export const InvoiceRouter = ({
	component,
	path,
	exact,
	purpose,
	title,
	user,
	...rest
}) => {
	const Component = component;
	const paths = useMemo(
		() => [
			{
				title: "Invoice Management",
				path: "/invoice_management/invoice",
				disabled: false
			},
			// {
			// 	title: "Fee Bypass",
			// 	path: "/invoice_management/fee_bypass",
			// 	disabled: false
			// },
			{
				title: "Delete Sundry Invoice",
				path: "/invoice_management/delete_sundry_invoice",
				disabled: false
			},
			{
				title: "Verify Remita Status",
				path: "/invoice_management/verify_remita_status",
				disabled: false
			},
			{
				title: "E Tranzact",
				path: "/invoice_management/e_tranzact",
				disabled: false
			}
		],
		[]
	);
	return (
		<Route
			exact={exact}
			path={path}
			{...rest}
			render={(props) => {
				return (
					<TabLayout title={title} paths={paths}>
						<Component {...rest} {...props} />
					</TabLayout>
				);
			}}
		/>
	);
};

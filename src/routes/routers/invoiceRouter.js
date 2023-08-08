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
			// {
			// 	title: "Delete Sundry Invoice",
			// 	path: "/invoice_management/delete_sundry_invoice",
			// 	disabled: false
			// },
			// {
			// 	title: "Delete PG Invoice",
			// 	path: "/invoice_management/delete_pg_invoice",
			// 	disabled: false
			// }
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

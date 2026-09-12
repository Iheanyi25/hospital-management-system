import { useMemo } from "react";
import { Route } from "react-router-dom";
import { TabLayout } from "../../ui_elements";

export const ApplicationsRouter = ({
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
				title: "Reset Application",
				path: "/applications/reset",
				disabled: false
			},
			{
				title: "Delete Invoice",
				path: "/applications/delete",
				disabled: false
			},
			{
				title: "Jamb List Upload",
				path: "/applications/jamb_list_upload",
				disabled: false
			},
			{
				title: "Manage Invoices",
				path: "/applications/manage_invoices",
				disabled: false
			},
			{
				title: "Application Setup",
				path: "/applications/setup",
				disabled: false
			}
			// {
			// 	title: "Direct Entry List Upload",
			// 	path: "/applications/de_list_upload",
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

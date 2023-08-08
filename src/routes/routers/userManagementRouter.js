import { useMemo } from "react";
import { Route } from "react-router-dom";
import { TabLayout } from "../../ui_elements";

export const UserManagementRouter = ({
	component,
	path,
	exact,
	purpose,
	title,
	user,
	...rest
}) => {
	let Component = component;

	const paths = useMemo(
		() => [
			{
				title: "Manage Users",
				path: "/user_management/users",
				disabled: false
			},
			{
				title: "Manage Roles",
				path: "/user_management/roles",
				disabled: false
			},
			{
				title: "Manage Menus",
				path: "/user_management/menus",
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

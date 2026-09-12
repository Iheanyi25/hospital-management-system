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
			},
			{
				title: "Assign Course",
				path: "/user_management/assign_courses",
				disabled: false
			},
			{
				title: "Assign HOD",
				path: "/user_management/assign_staff/hod",
				disabled: false
			},
			{
				title: "Assign Dean",
				path: "/user_management/assign_staff/dean",
				disabled: false
			},
			{
				title: "Assign Course Adviser",
				path: "/user_management/assign_staff/course_adviser",
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

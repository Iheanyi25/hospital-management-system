import { useMemo } from "react";
import { Route } from "react-router-dom";
import { TabLayout } from "../../ui_elements";

export const LecturerManagementRouter = ({
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
				title: "Lecturer Upload",
				path: "/lecturer_management/lecturer_upload",
				disabled: false
			},
			{
				title: "Assign Course",
				path: "/lecturer_management/assign_courses",
				disabled: false
			},
			{
				title: "Assign HOD",
				path: "/lecturer_management/assign_staff/hod",
				disabled: false
			},
			{
				title: "Assign Dean",
				path: "/lecturer_management/assign_staff/dean",
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

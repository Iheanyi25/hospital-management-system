import { useMemo } from "react";
import { Route } from "react-router-dom";
import { TabLayout } from "../../ui_elements";

export const CourseMangementRouter = ({
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
				title: "Manage Course",
				path: "/course_management/manage_course",
				disabled: false
			},
			{
				title: "Assign Course",
				path: "/course_management/assign_course",
				disabled: false
			},
			{
				title: "Manage Unit Load",
				path: "/course_management/manage_load",
				disabled: false
			},
			{
				title: "Add & Drop course",
				path: "/course_management/add_drop",
				disabled: false
			},
			{
				title: "Assign credit load to student",
				path: "/course_management/assign_unit",
				disabled: false
			},
			{
				title: "Open & Close course reg.",
				path: "/course_management/open_reg",
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

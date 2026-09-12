import { useMemo } from "react";
import { Route } from "react-router-dom";
import { TabLayout } from "../../ui_elements";

export const StudentManagementRouter = ({
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
				title: "Search Student List",
				path: "/student_management/search_student",
				disabled: false
			},
			{
				title: "View Student List",
				path: "/student_management/view",
				disabled: false
			},
			{
				title: "View Admission List",
				path: "/student_management/admission_list",
				disabled: false
			},
			{
				title: "Search Admission List",
				path: "/student_management/search_admission_list",
				disabled: false
			},
			{
				title: "Clear Students",
				path: "/student_management/clear",
				disabled: false
			},
			{
				title: "Session Manager",
				path: "/student_management/session_manager",
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

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
				title: "Edit Students Profile",
				path: "/student_management/view",
				disabled: false
			},
			{
				title: "Clear Students",
				path: "/student_management/clear",
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

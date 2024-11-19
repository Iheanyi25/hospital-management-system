import { useMemo } from "react";
import { Route } from "react-router-dom";
import { TabLayout } from "../../ui_elements";

export const ResultManagementRouter = ({
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
				title: "Class List",
				path: "/results/classlist",
				disabled: false
			},
			// {
			// 	title: "View Result Sheets",
			// 	path: "/results/view_result_sheets",
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

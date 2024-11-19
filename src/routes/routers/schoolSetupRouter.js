import { useMemo } from "react";
import { Route } from "react-router-dom";
import { TabLayout } from "../../ui_elements";

export const SchoolSetupRouter = ({
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
				title: "Faculty & Department",
				path: "/school_setup/manage_faculty_and_department",
				disabled: false
			},
			// {
			// 	title: "Programmes",
			// 	path: "/school_setup/programmes",
			// 	disabled: false
			// },
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
						<div className="p-4 p-lg-0">
							<Component {...rest} {...props} />
						</div>
					</TabLayout>
				);
			}}
		/>
	);
};

import { useMemo } from "react";
import { Route } from "react-router-dom";
import { TabLayout } from "../../ui_elements";

export const FeesAssignmentRouter = ({
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
				title: "School fees",
				path: "/fees_assignment/school_fees",
				disabled: false
			},
			{
				title: "Acceptance fee",
				path: "/fees_assignment/acceptance_fees",
				disabled: false
			},
			{
				title: "Sundry fees",
				path: "/fees_assignment/sundry_fees",
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

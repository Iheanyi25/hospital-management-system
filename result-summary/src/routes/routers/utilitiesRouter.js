import { useMemo } from "react";
import { Route } from "react-router-dom";
import { TabLayout } from "../../ui_elements";

export const UtilitiesRouter = ({
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
				title: "O-Level Verification",
				path: "/utilities/olevel_verification",
				disabled: false
			},
			{
				title: "Certificate Verification ",
				path: "/utilities/certificate_verification",
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
						<div className="p-4 p-lg-0">
							<Component {...rest} {...props} />
						</div>
					</TabLayout>
				);
			}}
		/>
	);
};

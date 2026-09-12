import { useMemo } from "react";
import { Route } from "react-router-dom";
import { SharedLayout } from "../../ui_elements";

export const PGRouter = ({
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
				title: "School fees",
				path: "/pg/school_fees",
				disabled: false
			},
			{
				title: "All Sundry",
				path: "/pg/sundry",
				disabled: false
			},
			{
				title: "Transcript App",
				path: "/pg/transcript",
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
					<SharedLayout title={title} subMenus={paths}>
						<Component {...rest} {...props} />
					</SharedLayout>
				);
			}}
		/>
	);
};

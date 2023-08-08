import { useMemo } from "react";
import { Route } from "react-router-dom";
import { SharedLayout } from "../../ui_elements";

export const SundryRouter = ({
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
				title: "All Sundry",
				path: "/sundry/all",
				disabled: false
			},
			{
				title: "Transcript App",
				path: "/sundry/transcript",
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

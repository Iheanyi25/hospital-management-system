import { Route } from "react-router-dom";
import { SharedLayout } from "../../ui_elements";

export const SharedRouter = ({
	component,
	path,
	exact,
	purpose,
	title,
	user,
	subMenus,
	...rest
}) => {
	const Component = component;

	return (
		<Route
			exact={exact}
			path={path}
			{...rest}
			render={(props) => {
				return (
					<SharedLayout title={title} subMenus={subMenus}>
						<Component {...rest} {...props} />
					</SharedLayout>
				);
			}}
		/>
	);
};

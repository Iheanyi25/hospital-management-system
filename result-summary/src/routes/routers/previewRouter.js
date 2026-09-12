import { Route } from "react-router-dom";
import { PreviewLayout } from "../../ui_elements";

export const PreviewRouter = ({
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
					<PreviewLayout title={title} subMenus={subMenus}>
						<Component {...rest} {...props} />
					</PreviewLayout>
				);
			}}
		/>
	);
};

import { Route } from "react-router-dom";
import { Layout } from "../../ui_elements";

export const UnathorisedRouter = ({
	component,
	path,
	exact,
	purpose,
	title,
	user,
	...rest
}) => {
	let Component = component;

	return (
		<Route
			exact={exact}
			path={path}
			{...rest}
			render={(props) => {
				return (
					<Layout title={title}>
						<Component {...rest} {...props} />
					</Layout>
				);
			}}
		/>
	);
};

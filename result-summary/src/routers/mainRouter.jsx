import { Route } from "react-router-dom";
import { Layout } from "../ui_elements";

const MainRouter = ({
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
					<Layout title={title} noHeader>
						<Component {...rest} {...props} />
					</Layout>
				);
			}}
		/>
	);
};

export { MainRouter };

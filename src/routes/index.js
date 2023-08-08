import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Redirect,
	Route
} from "react-router-dom";
import {
	sharedRoutes,
	staffRoutes,
	studentRoutes,
	lecturerRoutes
} from "./routeBuilder/routeBuilder";
import { useCookies } from "react-cookie";
import { setAuthHeader } from "../api/apiCall";
import { PageLoader } from "../ui_elements";
import { Suspense } from "react";
import { TOKEN_HOLDER, USER_ROLE_HOLDER, USER_TYPES } from "../utils/constants";

const AppRoute = () => {
	const [cookies] = useCookies([TOKEN_HOLDER, USER_ROLE_HOLDER]);
	if (cookies[TOKEN_HOLDER]) setAuthHeader(cookies[TOKEN_HOLDER]);

	const { [TOKEN_HOLDER]: token, [USER_ROLE_HOLDER]: userRole } = cookies;
	const customRoutes = [
		"student",
		"lecturer",
		"dean of faculty",
		"head of department"
	];

	const lecturerStaffRoutes = {};
	const otherStaffRoutes = {};

	const generateUserBasedRoute = (userHolder, routeType, route) => {
		userHolder.forEach((item) => {
			route[item] = <MapRoutes routes={routeType} user={userRole} />;
		});
	};

	generateUserBasedRoute(
		customRoutes.filter((item) => item !== customRoutes[0]),
		lecturerRoutes,
		lecturerStaffRoutes
	);

	generateUserBasedRoute(
		USER_TYPES.filter((item) => !customRoutes.includes(item)),
		staffRoutes,
		otherStaffRoutes
	);

	const userBasedRoutes = {
		student: <MapRoutes routes={studentRoutes} user={userRole} />,
		...lecturerStaffRoutes,
		...otherStaffRoutes
	};

	return (
		<Router>
			<Switch>
				<Suspense fallback={<PageLoader />}>
					{token && token !== "undefined" && userRole ? (
						userBasedRoutes[userRole]
					) : (
						<MapRoutes routes={sharedRoutes} user={userRole} />
					)}
				</Suspense>
			</Switch>
		</Router>
	);
};

const MapRoutes = ({ routes, user }) => {
	return (
		<Router>
			<Switch>
				{routes.map((route, index) => {
					let ChosenRouter = route?.router ?? Route;
					const title = route?.title ?? "";
					const forWho = route?.forWho ?? "";
					return (
						<ChosenRouter
							path={route.path}
							exact={route.exact}
							component={route.component}
							key={`router${index}`}
							title={title}
							forWho={forWho}
							user={user}
							subMenus={route.subMenus}
						/>
					);
				})}
				<Route
					path="*"
					render={() => <Redirect to={user ? "/dashboard" : "/"} />}
				/>
			</Switch>
		</Router>
	);
};

export default AppRoute;

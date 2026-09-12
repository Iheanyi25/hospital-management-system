import * as Sentry from "@sentry/react";
import { Route } from "react-router-dom";
import { ErrorPage } from "./errorPage/errorPage";

export function RouteWithErrorBoundary(props) {
	return (
		<Sentry.ErrorBoundary
			key={props.location?.pathname}
			fallback={() => <ErrorPage />}
			showDialog
		>
			<Route {...props} />
		</Sentry.ErrorBoundary>
	);
}

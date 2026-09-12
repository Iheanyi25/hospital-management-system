import React from "react";
import * as Sentry from "@sentry/react";
import { Route } from "react-router-dom";

export default function RouteWithErrorBoundary(props) {
  return (
    <Sentry.ErrorBoundary
      key={props.location?.pathname}
      fallback={() => (
        <div className="m-4">an error occured, please contact admin</div>
      )}
      showDialog
    >
      <Route {...props} />
    </Sentry.ErrorBoundary>
  );
}

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  //   Redirect,
} from "react-router-dom";
import ThirdPartyFundAccount from "../Pages/Components/ThirdPartyFundAccount";
import { Page404 } from "../Components/Page404/Page404";
import RouteWithErrorBoundary from "../Components/RouteWithErrorBoundary";

const CommonRoute = ({ who }) => {
  return (
    <Router>
      <Switch>
        <RouteWithErrorBoundary
          exact
          path="/common/ThirdPartyFundAccount/:id"
          component={ThirdPartyFundAccount}
        />

        <RouteWithErrorBoundary exact path="*" render={() => <Page404 who={who} />} />
      </Switch>
    </Router>
  );
};

export { CommonRoute };

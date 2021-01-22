import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  //   Redirect,
} from "react-router-dom";
import ThirdPartyFundAccount from "../Pages/Components/ThirdPartyFundAccount";
import { Page404 } from "../Components/Page404/Page404";

const CommonRoute = ({ who }) => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/common/ThirdPartyFundAccount/:id"
          component={ThirdPartyFundAccount}
        />

        <Route exact path="*" render={() => <Page404 who={who} />} />
      </Switch>
    </Router>
  );
};

export { CommonRoute };

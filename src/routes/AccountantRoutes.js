import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { AccountantLayout } from "../Components/Layout";
import AccountantDashboard from "../Pages/Accountant/Dashboard";
import ManageAccounts from "../Pages/Components/ManageAccounts";
import AccountFundAccount from "../Pages/Components/FundAccount";

export default function AccountantRoutes() {
  console.log("i adccount");
  return (
    <BrowserRouter basename="accountant">
      <AccountantLayout>
        <Switch>
          <Route
            exact
            path="/AccountantDashboard"
            component={AccountantDashboard}
          />
          <Route
            exact
            path="/AccountFundAccount/:id"
            component={AccountFundAccount}
          />
          <Route exact path="/AccountantManageAccounts" component={ManageAccounts} />

          <Route
            exact
            path="*"
            render={() => <Redirect to="/AccountantDashboard" />}
          />
        </Switch>
      </AccountantLayout>
    </BrowserRouter>
  );
}

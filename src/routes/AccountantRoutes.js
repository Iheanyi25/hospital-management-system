import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { AccountantLayout } from "../Components/Layout";
import AccountantDashboard from "../Pages/Accountant/Dashboard";
import ManageAccounts from "../Pages/Components/ManageAccounts";
import AccountFundAccount from "../Pages/Components/FundAccount";
import ManageServiceRequest from "../Pages/Admin/Util_Services/ManageServiceRequest";
import ServiceRequestContents from "../Pages/Admin/Util_Services/ServiceRequestContents";
import PaymentForService from "../Pages/Admin/PaymentForService";

export default function AccountantRoutes() {
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
            path="/AccountManageServiceRequest"
            component={ManageServiceRequest}
          />
          <Route
            exact
            path="/AccountServiceRequestContents/:invoiceId"
            component={ServiceRequestContents}
          />
          
          <Route
            exact
            path="/AccountPaymentForService/:id"
            component={PaymentForService}
          />

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

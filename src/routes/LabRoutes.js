import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { LabLayout } from "../Components/Layout";
import Dashboard from "../Pages/Lab/Dashboard";
import CreateService from "../Pages/Admin/Util_Services/CreateService";
import ManageServices from "../Pages/Admin/Util_Services//ManageServices";
import EditService from "../Pages/Admin/Util_Services//EditService";

export default function LabRoutes() {
  return (
    <BrowserRouter basename="lab">
      <LabLayout>
        <Switch>
          <Route exact path="/LabDashboard" component={Dashboard} />
          <Route exact path="/LabCreateService" component={CreateService} />
          <Route exact path="/LabManageServices" component={ManageServices} />
          <Route exact path="/LabEditService/:id" component={EditService} />

          <Route
            exact
            path="*"
            render={() => <Redirect to="/LabDashboard" />}
          />
        </Switch>
      </LabLayout>
    </BrowserRouter>
  );
}

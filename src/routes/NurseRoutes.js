import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { NurseLayout } from "../Components/Layout";
import Dashboard from "../Pages/Nurse/Dashboard";

export default function NurseRoutes() {
  return (
    <BrowserRouter basename="nurse">
      <NurseLayout>
        <Switch>
          <Route exact path="/NurseDashboard" component={Dashboard} />
          <Route
            exact
            path="*"
            render={() => <Redirect to="/NurseDashboard" />}
          />
        </Switch>
      </NurseLayout>
    </BrowserRouter>
  );
}

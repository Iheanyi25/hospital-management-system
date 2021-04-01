import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { WardPersonnelLayout } from "../Components/Layout";
import Dashboard from "../Pages/WardPersonnel/Dashboard";
import ViewWardPersonnelProfile from "../Pages/WardPersonnel/ViewWardPersonnelProfile";

export default function WardPersonnelRoutes() {
  return (
    <BrowserRouter basename="ward">
      <WardPersonnelLayout>
        <Switch>
          <Route exact path="/WardDashboard" component={Dashboard} />
          <Route exact path="/WardPersonnelProfile" component={ViewWardPersonnelProfile} />
          <Route
            exact
            path="*"
            render={() => <Redirect to="/WardDashboard" />}
          />
        </Switch>
      </WardPersonnelLayout>
    </BrowserRouter>
  );
}

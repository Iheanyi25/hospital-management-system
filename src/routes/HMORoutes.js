import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { HMOLayout } from "../Components/Layout";
import Dashboard from "../Pages/HealthInsurance/HMO/Dashboard";

export default function NurseRoutes() {
  return (
    <BrowserRouter basename="HMOAdmin">
      <HMOLayout>
        <Switch>
        <Route
            exact
            path="/Dashboard"
            component={Dashboard}
          />
          <Route exact path="*" render={() => <Redirect to="/Dashboard" />} />
        </Switch>
      </HMOLayout>
    </BrowserRouter>
  );
}

import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { NurseLayout } from "../Components/Layout";
import Dashboard from "../Pages/Nurse/Dashboard";
import BookConsultation from "../Pages/Admin/BookConsultation";
import Consultations from "../Pages/Admin/Consultations";
import ClarkingHist from "../Pages/Components/ClarkingHistory";
import PreConsultation from "../Pages/Admin/PreConsultation";

export default function NurseRoutes() {
  return (
    <BrowserRouter basename="nurse">
      <NurseLayout>
        <Switch>
          <Route exact path="/NurseDashboard" component={Dashboard} />
          <Route
            exact
            path="/NurseBookConsultation"
            component={BookConsultation}
          />
          <Route exact path="/NurseConsultations" component={Consultations} />
          <Route exact path="/ViewClarkingHistory" component={ClarkingHist} />
          <Route
            exact
            path="/NursePreConsultation/:id"
            component={PreConsultation}
          />
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

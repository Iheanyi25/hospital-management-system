import React from "react";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import { NurseLayout } from "../Components/Layout";
import Dashboard from "../Pages/Nurse/Dashboard";
import ViewNurseProfile from "../Pages/Nurse/ViewNurseProfile";
import ViewChangePassword from "../Pages/Components/ViewChangePassword";
import BookConsultation from "../Pages/Admin/BookConsultation";
import Consultations from "../Pages/Admin/Consultations";
import ClarkingHist from "../Pages/Components/ClarkingHistory";
import PreConsultation from "../Pages/Admin/PreConsultation";
import BookAppointment from "../Pages/Admin/BookAppointment";
import Appointments from "../Pages/Admin/Appointments";
import ManageAdmissions from "../Components/Admissions/ManageAdmissions";
import WardRoundNotes from "../Components/Admissions/WardRoundNotes";
import ViewPatientProfile from "../Pages/Components/ViewPatientProfile";
import RouteWithErrorBoundary from "../Components/RouteWithErrorBoundary";

export default function NurseRoutes() {
  return (
    <BrowserRouter basename="nurse">
      <NurseLayout>
        <Switch>
          <RouteWithErrorBoundary exact path="/NurseDashboard" component={Dashboard} />
          <RouteWithErrorBoundary exact path="/NurseProfile" component={ViewNurseProfile} />
          <RouteWithErrorBoundary exact path="/ChangePassword" component={ViewChangePassword} />
          <RouteWithErrorBoundary
            exact
            path="/NurseBookConsultation"
            component={BookConsultation}
          />
          <RouteWithErrorBoundary exact path="/NurseConsultations" component={Consultations} />
          <RouteWithErrorBoundary exact path="/ViewClarkingHistory" component={ClarkingHist} />
          <RouteWithErrorBoundary
            exact
            path="/NursePreConsultation/:id"
            component={PreConsultation}
          />
          <RouteWithErrorBoundary
            exact
            path="/NurseBookAppointment"
            component={BookAppointment}
          />
          <RouteWithErrorBoundary
            exact
            path="/NurseAppointments"
            component={Appointments}
          />
          <RouteWithErrorBoundary
            exact
            path="/NursePatientProfile/:id"
            component={ViewPatientProfile}
          />
          <RouteWithErrorBoundary
            exact
            path="/NurseManageAdmissions"
            component={ManageAdmissions}
          />
           <RouteWithErrorBoundary
            exact
            path="/NurseWardRoundNotes/:id"
            component={WardRoundNotes}
          />
          <RouteWithErrorBoundary
            exact
            path="*"
            render={() => <Redirect to="/NurseDashboard" />}
          />
        </Switch>
      </NurseLayout>
    </BrowserRouter>
  );
}

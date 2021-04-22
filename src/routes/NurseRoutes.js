import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
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
import UpdateNursingReport from "../Pages/Admin/NursingReport/UpdateNursingReport";
import ManageNursingReports from "../Pages/Admin/NursingReport/ManageNursingReports";

export default function NurseRoutes() {
  return (
    <BrowserRouter basename="nurse">
      <NurseLayout>
        <Switch>
          <Route exact path="/NurseDashboard" component={Dashboard} />
          <Route exact path="/NurseProfile" component={ViewNurseProfile} />
          <Route exact path="/ChangePassword" component={ViewChangePassword} />
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
            path="/NurseBookAppointment"
            component={BookAppointment}
          />
          <Route exact path="/NurseAppointments" component={Appointments} />
          <Route
            exact
            path="/NursePatientProfile/:id"
            component={ViewPatientProfile}
          />
          <Route
            exact
            path="/NurseManageAdmissions"
            component={ManageAdmissions}
          />
          <Route
            exact
            path="/NurseWardRoundNotes/:id"
            component={WardRoundNotes}
          />
          <Route
            exact
            path="/NurseUpdateNursingReport/:id"
            component={UpdateNursingReport}
          />
          <Route
            exact
            path="/NurseManageNursingReports"
            component={ManageNursingReports}
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

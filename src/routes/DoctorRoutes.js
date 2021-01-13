import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { DoctorLayout } from "../Components/Layout";
import DoctorDashboard from "../Pages/Doctor/Dashboard";
import DoctorPatientsList from "../Pages/Doctor/Patients";
import DoctorConsultations from "../Pages/Doctor/Consultations";
import DoctorAppointments from "../Pages/Doctor/Appointments";
import DoctorPatientProfile from "../Pages/Doctor/PatientProfile";
import DoctorPatientMedicalHistory from "../Pages/Doctor/PatientMedicalHistory";
import DoctorClarking from "../Pages/Doctor/Clarking";
import ViewDoctorProfile from "../Pages/Doctor/ViewDoctorProfile";
import ViewPatientProfile from "../Pages/Components/ViewPatientProfile";
import ViewPreConsultationHistory from "../Pages/Components/ViewPreConsultationHistory";
import ViewClarkingHistory from "../Pages/Components/ViewClarkingHistory";
import ViewServiceRequests from "../Pages/Components/ViewServiceRequests";
import CreateServiceRequest from "../Pages/Admin/Util_Services/CreateServiceRequest";
import ClarkingHistory from "../Pages/Components/ClarkingHistory";
import ViewChangePassword from "../Pages/Components/ViewChangePassword";
import MyPatients from "../Pages/Doctor/MyPatients";

export default function DoctorRoutes() {
  return (
    <BrowserRouter basename="doctor">
      <DoctorLayout>
        <Switch>
          <Route exact path="/DoctorDashboard" component={DoctorDashboard} />
          <Route
            exact
            path="/DoctorPatientsList"
            component={DoctorPatientsList}
          />
          <Route
            exact
            path="/myPatients"
            component={MyPatients}
          />
          <Route
            exact
            path="/DoctorConsultations"
            component={DoctorConsultations}
          />
          <Route
            exact
            path="/DoctorAppointments"
            component={DoctorAppointments}
          />
          <Route exact path="/DoctorClarking" component={DoctorClarking} />
          <Route
            exact
            path="/DoctorPatientProfile"
            component={DoctorPatientProfile}
          />
          <Route
            exact
            path="/DoctorPatientMedicalHistory"
            component={DoctorPatientMedicalHistory}
          />
          <Route exact path="/DoctorProfile" component={ViewDoctorProfile} />
          <Route
            exact
            path="/DoctorPatientProfile/:id"
            component={ViewPatientProfile}
          />
          <Route
            exact
            path="/DoctorClarkingHistory/:id"
            component={ViewClarkingHistory}
          />
          <Route
            exact
            path="/DoctorPreConsultationHistory/:id"
            component={ViewPreConsultationHistory}
          />
          <Route
            exact
            path="/DoctorServiceRequests/:id"
            component={ViewServiceRequests}
          />
          <Route
            exact
            path="/AdminServiceRequests"
            component={CreateServiceRequest}
          />
          <Route
            exact
            path="/ChangePassword"
            component={ViewChangePassword}
          />
          <Route
            exact
            path="/ViewClarkingHistory"
            component={ClarkingHistory}
          />

          <Route
            exact
            path="*"
            render={() => <Redirect to="/DoctorDashboard" />}
          />
        </Switch>
      </DoctorLayout>
    </BrowserRouter>
  );
}

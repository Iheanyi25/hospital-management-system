import React from "react";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import { DoctorLayout } from "../Components/Layout";
import DoctorDashboard from "../Pages/Doctor/Dashboard";
import DoctorPatientsList from "../Pages/Doctor/Patients";
import DoctorConsultations from "../Pages/Doctor/Consultations";
import DoctorAppointments from "../Pages/Doctor/Appointments";
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
import PreConsultationHistory from "../Pages/Components/PreConsultationHistory";
import ManageAdmissions from "../Components/Admissions/ManageAdmissions";
import WardRoundNotes from "../Components/Admissions/WardRoundNotes";
import RouteWithErrorBoundary from "../Components/RouteWithErrorBoundary";

export default function DoctorRoutes() {
  return (
    <BrowserRouter basename="doctor">
      <DoctorLayout>
        <Switch>
          <RouteWithErrorBoundary exact path="/DoctorDashboard" component={DoctorDashboard} />
          <RouteWithErrorBoundary
            exact
            path="/DoctorPatientsList"
            component={DoctorPatientsList}
          />
          <RouteWithErrorBoundary exact path="/myPatients" component={MyPatients} />
          <RouteWithErrorBoundary
            exact
            path="/DoctorConsultations"
            component={DoctorConsultations}
          />
          <RouteWithErrorBoundary
            exact
            path="/DoctorAppointments"
            component={DoctorAppointments}
          />
          <RouteWithErrorBoundary exact path="/DoctorClarking" component={DoctorClarking} />
          <RouteWithErrorBoundary
            exact
            path="/DoctorPatientMedicalHistory"
            component={DoctorPatientMedicalHistory}
          />
          <RouteWithErrorBoundary exact path="/DoctorProfile" component={ViewDoctorProfile} />
          <RouteWithErrorBoundary
            exact
            path="/DoctorPatientProfile/:id"
            component={ViewPatientProfile}
          />
          <RouteWithErrorBoundary
            exact
            path="/DoctorClarkingHistory/:id"
            component={ViewClarkingHistory}
          />
          <RouteWithErrorBoundary
            exact
            path="/DoctorPreConsultationHistory/:id"
            component={ViewPreConsultationHistory}
          />
          <RouteWithErrorBoundary
            exact
            path="/DoctorServiceRequests/:id"
            component={ViewServiceRequests}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminServiceRequests"
            component={CreateServiceRequest}
          />
          <RouteWithErrorBoundary exact path="/ChangePassword" component={ViewChangePassword} />
          <RouteWithErrorBoundary
            exact
            path="/ViewClarkingHistory"
            component={ClarkingHistory}
          />
          <RouteWithErrorBoundary
            exact
            path="/ViewPreConsultationHistory"
            component={PreConsultationHistory}
          />
          <RouteWithErrorBoundary
            exact
            path="/DoctorManageAdmissions"
            component={ManageAdmissions}
          />
          <RouteWithErrorBoundary
            exact
            path="/DoctorWardRoundNotes/:id"
            component={WardRoundNotes}
          />
          <RouteWithErrorBoundary
            exact
            path="*"
            render={() => <Redirect to="/DoctorDashboard" />}
          />
        </Switch>
      </DoctorLayout>
    </BrowserRouter>
  );
}

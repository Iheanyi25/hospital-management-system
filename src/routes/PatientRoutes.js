import React from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import PatientDashboard from "../Pages/Patient/Dashboard";
import PatientAppointments from "../Pages/Patient/Appointments";
import PatientConsultations from "../Pages/Patient/Consultations";
import PatientBookAppointment from "../Pages/Patient/BookAppointment";
import PatientBookConsultation from "../Pages/Patient/BookConsultation";
import PatientDoctorList from "../Pages/Patient/DoctorList";
import ViewDoctorProfile from "../Pages/Patient/ViewDoctorProfile";
import PatientAccount from "../Pages/Patient/Account";
import { PatientLayout } from '../Components/Layout';
import PatientFundAccount from '../Pages/Patient/PatientFundAccount';
import ViewPatientProfile from '../Pages/Patient/ViewPatientProfile';
import ViewPreConsultationHistory from '../Pages/Patient/ViewPreConsultationHistory';
import ViewClarkingHistory from '../Pages/Patient/ViewClarkingHistory';
import MyDoctors from '../Pages/Patient/MyDoctors';
import ViewChangePassword from "../Pages/Components/ViewChangePassword";
import ThirdPartyFunding from '../Pages/Patient/ThirdPartyFunding';
import ViewHealthHistory from '../Pages/Patient/ViewHealthHistory';
import RouteWithErrorBoundary from '../Components/RouteWithErrorBoundary';

export default function PatientRoutes() {
    return (
        <BrowserRouter basename="patient">
            <PatientLayout>
                <Switch>

                    <RouteWithErrorBoundary exact path="/PatientDashboard" component={PatientDashboard} />
                    <RouteWithErrorBoundary exact path="/PatientAppointments" component={PatientAppointments} />
                    <RouteWithErrorBoundary exact path="/PatientConsultations" component={PatientConsultations} />
                    <RouteWithErrorBoundary exact path="/PatientDoctorList" component={PatientDoctorList} />
                    <RouteWithErrorBoundary exact path="/PatientAccount" component={PatientAccount} />
                    <RouteWithErrorBoundary exact path="/PatientFundAccount" component={PatientFundAccount} />
                    <RouteWithErrorBoundary exact path="/PatientBookAppointment/:doctorId" component={PatientBookAppointment} />
                    <RouteWithErrorBoundary exact path="/PatientBookConsultation/:doctorId" component={PatientBookConsultation} />
                    <RouteWithErrorBoundary exact path="/ViewDoctorProfile/:id" component={ViewDoctorProfile} />

                    <RouteWithErrorBoundary exact path="/MyDoctors" component={MyDoctors} />
                    <RouteWithErrorBoundary exact path="/ChangePassword" component={ViewChangePassword} />
                    <RouteWithErrorBoundary exact path="/ThirdPartyFunding" component={ThirdPartyFunding} />
                    <RouteWithErrorBoundary exact path="/PatientProfile" component={ViewPatientProfile} />
                    <RouteWithErrorBoundary exact path="/PatientPreConsultationHistory" component={ViewPreConsultationHistory} />
                    <RouteWithErrorBoundary exact path="/PatientClarkingHistory" component={ViewClarkingHistory} />

                    <RouteWithErrorBoundary exact path="/PatientHealthHistory" component={ViewHealthHistory} />

                    <RouteWithErrorBoundary exact path="*" render={() => <Redirect to="/PatientDashboard" />} />

                </Switch>
            </PatientLayout>
        </BrowserRouter>
    )
}
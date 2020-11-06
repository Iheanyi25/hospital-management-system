import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { DoctorLayout } from '../Components/Layout';
import DoctorDashboard from "../Pages/Doctor/Dashboard";
import DoctorPatientsList from "../Pages/Doctor/Patients";
import DoctorConsultations from "../Pages/Doctor/Consultations";
import DoctorAppointments from "../Pages/Doctor/Appointments";
import DoctorPatientProfile from "../Pages/Doctor/PatientProfile";
import DoctorPatientMedicalHistory from "../Pages/Doctor/PatientMedicalHistory";
import DoctorClarking from "../Pages/Doctor/Clarking";
import DoctorProfile from "../Pages/Doctor/DoctorProfile";
import DoctorUpdateProfile from "../Pages/Doctor/UpdateDoctorProfile";
import DoctorAvaliablity from "../Pages/Doctor/Avaliablity";

export default function DoctorRoutes() {
    return (
        <BrowserRouter basename="doctor">
            <DoctorLayout>
                <Switch>

                    <Route exact path="/DoctorDashboard" component={DoctorDashboard} />
                    <Route exact path="/DoctorPatientsList" component={DoctorPatientsList} />
                    <Route exact path="/DoctorConsultations" component={DoctorConsultations} />
                    <Route exact path="/DoctorAppointments" component={DoctorAppointments} />
                    <Route exact path="/DoctorClarking" component={DoctorClarking} />
                    <Route exact path="/DoctorPatientProfile" component={DoctorPatientProfile} />
                    <Route exact path="/DoctorPatientMedicalHistory" component={DoctorPatientMedicalHistory} />
                    <Route exact path="/DoctorProfile" component={DoctorProfile} />
                    <Route exact path="/DoctorUpdateProfile" component={DoctorUpdateProfile} />
                    <Route exact path="/DoctorAvaliablity" component={DoctorAvaliablity} />

                    <Route exact path="*" render={() => <Redirect to="/DoctorDashboard" />} />

                </Switch>
            </DoctorLayout>
        </BrowserRouter>
    )
}
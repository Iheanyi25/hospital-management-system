import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { DoctorLayout } from '../Components/Layout';
import DoctorDashboard from "../Pages/Doctor/Dashboard";
import DoctorPatientsList from "../Pages/Doctor/Patients";
import DoctorConsultationQueue from "../Pages/Doctor/ConsultationQueue";
import DoctorAppointments from "../Pages/Doctor/Appointments";
import DoctorCreateSchedule from "../Pages/Doctor/CreateSchedule";
import DoctorSchedules from "../Pages/Doctor/Schedules";
import DoctorPatientProfile from "../Pages/Doctor/PatientProfile";
import DoctorPatientMedicalHistory from "../Pages/Doctor/PatientMedicalHistory";
import DoctorConsultation from "../Pages/Doctor/Consultation";
import DoctorProfile from "../Pages/Doctor/DoctorProfile";
import DoctorUpdateProfile from "../Pages/Doctor/UpdateDoctorProfile";
import DoctorAvaliablity from "../Pages/Doctor/Avaliablity";

export default function DoctorRoutes() {
    return (
        <BrowserRouter basename="doctor"  >
            <Switch >
                <DoctorLayout>
                    <Route exact path="/DoctorDashboard" component={DoctorDashboard} />
                    <Route exact path="/DoctorPatientsList" component={DoctorPatientsList} />
                    <Route exact path="/DoctorConsultationQueue" component={DoctorConsultationQueue} />
                    <Route exact path="/DoctorAppointments" component={DoctorAppointments} />
                    <Route exact path="/DoctorCreateSchedule" component={DoctorCreateSchedule} />
                    <Route exact path="/DoctorSchedules" component={DoctorSchedules} />
                    <Route exact path="/DoctorConsultation" component={DoctorConsultation} />
                    <Route exact path="/DoctorPatientProfile" component={DoctorPatientProfile} />
                    <Route exact path="/DoctorPatientMedicalHistory" component={DoctorPatientMedicalHistory} />
                    <Route exact path="/DoctorProfile" component={DoctorProfile} />
                    <Route exact path="/DoctorUpdateProfile" component={DoctorUpdateProfile} />
                    <Route exact path="/DoctorAvaliablity" component={DoctorAvaliablity} />

                    <Route exact path="*" render={() => <Redirect to="/DoctorDashboard" />} />

                </DoctorLayout>
            </Switch>
        </BrowserRouter>
    )
}
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import PatientDashboard from "../Pages/Patient/Dashboard";
import PatientAppointments from "../Pages/Patient/Appointments";
import PatientConsultations from "../Pages/Patient/Consultations";
import PatientBookAppointment from "../Pages/Patient/BookAppointment";
import PatientBookConsultation from "../Pages/Patient/BookConsultation";
import PatientDoctorList from "../Pages/Patient/DoctorList";
import PatientDoctorProfile from "../Pages/Patient/DoctorProfile";
import PatientAccount from "../Pages/Patient/Account";
import { PatientLayout } from '../Components/Layout';
import PatientFundAccount from '../Pages/Patient/PatientFundAccount';
import PatientProfile from '../Pages/Patient/PatientProfile';
import PatientPreConsultationHistory from '../Pages/Patient/PreConsultationHistory';
import PatientClarkingHistory from '../Pages/Patient/ClarkingHistory';

export default function PatientRoutes() {
    return (
        <BrowserRouter basename="patient">
            <PatientLayout>
                <Switch>

                    <Route exact path="/PatientDashboard" component={PatientDashboard} />
                    <Route exact path="/PatientAppointments" component={PatientAppointments} />
                    <Route exact path="/PatientConsultations" component={PatientConsultations} />
                    <Route exact path="/PatientDoctorList" component={PatientDoctorList} />
                    <Route exact path="/PatientAccount" component={PatientAccount} />
                    <Route exact path="/PatientFundAccount" component={PatientFundAccount} />
                    <Route exact path="/PatientBookAppointment/:doctorId" component={PatientBookAppointment} />
                    <Route exact path="/PatientBookConsultation/:doctorId" component={PatientBookConsultation} />
                    <Route exact path="/PatientDoctorProfile/:doctorId" component={PatientDoctorProfile} />

                    <Route exact path="/PatientProfile" component={PatientProfile} />
                    <Route exact path="/PatientPreConsultationHistory" component={PatientPreConsultationHistory} />
                    <Route exact path="/PatientClarkingHistory" component={PatientClarkingHistory} />

                    <Route exact path="*" render={() => <Redirect to="/PatientDashboard" />} />

                </Switch>
            </PatientLayout>
        </BrowserRouter>
    )
}
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
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
import { PatientProfile } from '../Components/Profiles/PatientProfile';
import ThirdPartyFunding from '../Pages/Patient/thirdPartyFunding';

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
                    <Route exact path="/ViewDoctorProfile/:id" component={ViewDoctorProfile} />

                    <Route exact path="/MyDoctors" component={MyDoctors} />
                    <Route exact path="/ChangePassword" component={ViewChangePassword} />
                    <Route exact path="/ThirdPartyFunding" component={ThirdPartyFunding} />
                    <Route exact path="/PatientProfile" component={ViewPatientProfile} />
                    <Route exact path="/PatientPreConsultationHistory" component={ViewPreConsultationHistory} />
                    <Route exact path="/PatientClarkingHistory" component={ViewClarkingHistory} />

                    <Route exact path="*" render={() => <Redirect to="/PatientDashboard" />} />

                </Switch>
            </PatientLayout>
        </BrowserRouter>
    )
}
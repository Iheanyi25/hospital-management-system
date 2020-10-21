import React, { useEffect, useState } from "react";
import Login from "./Pages/Login/Login";

import AdminDashboard from "./Pages/Admin/Dashboard";
import AdminUpdatePatientProfile from "./Pages/Admin/UpdatePatientProfile";
import AdminPreConsultation from "./Pages/Admin/PreConsultation";
import AdminAllPatients from "./Pages/Admin/AllPatients";
import AdminAllDoctors from "./Pages/Admin/AllDoctors";
import AdminAppointments from "./Pages/Admin/Appointments";
import AdminBookAppointment from "./Pages/Admin/BookAppointment";
import AdminDoctorAppointments from "./Pages/Admin/DoctorAppointments";
import AdminBookConsultation from "./Pages/Admin/BookConsultation";
import AdminConsultationQueue from "./Pages/Admin/ConsultationQueue";
import AdminDoctorConsultationQueue from "./Pages/Admin/DoctorConsultationQueue";

import DoctorDashboard from "./Pages/Doctor/Dashboard";
import DoctorPatientsList from "./Pages/Doctor/Patients";
import DoctorConsultationQueue from "./Pages/Doctor/ConsultationQueue";
import DoctorAppointments from "./Pages/Doctor/Appointments";
import DoctorCreateSchedule from "./Pages/Doctor/CreateSchedule";
import DoctorSchedules from "./Pages/Doctor/Schedules";
import DoctorPatientProfile from "./Pages/Doctor/PatientProfile";
import DoctorPatientMedicalHistory from "./Pages/Doctor/PatientMedicalHistory";
import DoctorConsultation from "./Pages/Doctor/Consultation";
import DoctorProfile from "./Pages/Doctor/DoctorProfile";
import DoctorUpdateProfile from "./Pages/Doctor/UpdateDoctorProfile";
import DoctorAvaliablity from "./Pages/Doctor/Avaliablity";

import PatientDashboard from "./Pages/Patient/Dashboard";
import PatientAppointments from "./Pages/Patient/Appointments";
import PatientConsultations from "./Pages/Patient/Consultations";
import PatientBookAppointment from "./Pages/Patient/BookAppointment";
import PatientBookConsultation from "./Pages/Patient/BookConsultation";
import PatientDoctorList from "./Pages/Patient/DoctorList";
import PatientDoctorProfile from "./Pages/Patient/DoctorProfile";

import AccountantDashboard from "./Pages/Accountant/Dashboard";

import PharmacyDashboard from "./Pages/Pharmacy/Dashboard";
import PharmacyCreateDrugCategories from "./Pages/Pharmacy/CreateCategories";
import PharmacyManageDrugCategories from "./Pages/Pharmacy/ManageCategories";
import PharmacyCreateDrugSubCategories from "./Pages/Pharmacy/CreateSubCategories";
import PharmacyManageDrugSubCategories from "./Pages/Pharmacy/ManageSubCategories";
import PharmacyCreateDrug from "./Pages/Pharmacy/CreateDrug";
import PharmacyManageDrugs from "./Pages/Pharmacy/ManageDrugs";

import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { MainRoute, AuthRoute } from "./routes";

function AppRouter() {

    const [isAuthenticated, setisAuthenticated] = useState(Boolean(JSON.parse(localStorage.getItem('authenticatedUser'))));
    const [userType, setUserType] = useState(
        Boolean(localStorage.getItem('authenticatedUser')) ?
            JSON.parse(localStorage.getItem('authenticatedUser')).userType :
            null);

    useEffect(() => {
        setisAuthenticated(Boolean(JSON.parse(localStorage.getItem('authenticatedUser'))));
        if (isAuthenticated) {
            setUserType(JSON.parse(localStorage.getItem('authenticatedUser')).userType);
        }
    }, [isAuthenticated]);

    return (

        <Router>
            <Switch>

                <AuthRoute exact isAuthenticated={isAuthenticated} path="/" Component={Login} />

                {/*  for authorized / Protected routes */}
                {/* Accountant Route */}

                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/dashboard" Component={AdminDashboard} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/AdminDashboard" Component={AdminDashboard} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/AdminUpdatePatientProfile/:id" Component={AdminUpdatePatientProfile} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/AdminPreConsultation/:id" Component={AdminPreConsultation} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/AdminAllPatients" Component={AdminAllPatients} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/AdminAllDoctors" Component={AdminAllDoctors} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/AdminBookAppointment/:doctorId" Component={AdminBookAppointment} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/AdminAppointments" Component={AdminAppointments} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/AdminDoctorAppointments/:doctorId" Component={AdminDoctorAppointments} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/AdminBookConsultation/:doctorId" Component={AdminBookConsultation} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/AdminConsultationQueue" Component={AdminConsultationQueue} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/AdminDoctorConsultationQueue/:doctorId" Component={AdminDoctorConsultationQueue} />

                {/* Doctors Route */}
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/DoctorDashboard" Component={DoctorDashboard} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/DoctorPatientsList" Component={DoctorPatientsList} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/DoctorConsultationQueue" Component={DoctorConsultationQueue} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/DoctorAppointments" Component={DoctorAppointments} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/DoctorCreateSchedule" Component={DoctorCreateSchedule} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/DoctorSchedules" Component={DoctorSchedules} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/DoctorConsultation" Component={DoctorConsultation} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/DoctorPatientProfile" Component={DoctorPatientProfile} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/DoctorPatientMedicalHistory" Component={DoctorPatientMedicalHistory} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/DoctorProfile" Component={DoctorProfile} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/DoctorUpdateProfile" Component={DoctorUpdateProfile} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/DoctorAvaliablity" Component={DoctorAvaliablity} />

                {/* Patients Route */}
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/PatientDashboard" Component={PatientDashboard} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/PatientAppointments" Component={PatientAppointments} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/PatientConsultations" Component={PatientConsultations} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/PatientDoctorList" Component={PatientDoctorList} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/PatientBookAppointment/:doctorId" Component={PatientBookAppointment} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/PatientBookConsultation/:doctorId" Component={PatientBookConsultation} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/PatientDoctorProfile/:doctorId" Component={PatientDoctorProfile} />

                {/* Accountant Route */}
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/AccountantDashboard" component={AccountantDashboard} />

                {/* Pharmacy Routes */}
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/PharmacyDashboard" Component={PharmacyDashboard} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/PharmacyCreateDrugCategories" Component={PharmacyCreateDrugCategories} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/PharmacyManageDrugCategories" Component={PharmacyManageDrugCategories} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/PharmacyCreateDrugSubCategories" Component={PharmacyCreateDrugSubCategories} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/PharmacyManageDrugSubCategories" Component={PharmacyManageDrugSubCategories} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/PharmacyCreateDrug" Component={PharmacyCreateDrug} />
                <MainRoute exact isAuthenticated={isAuthenticated} userType={userType} path="/PharmacyManageDrugs" Component={PharmacyManageDrugs} />

                {/* error route goes back to login page is unauthenticated, goes back to dashboard of the authenticated user */}
                <Route path="*" render={() => <Redirect to="/" />} />
            </Switch>
        </Router>
    );
}

export default AppRouter;
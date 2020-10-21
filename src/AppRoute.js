import React from "react";
import Login from "./Pages/Login/Login";

import { AuthRoute, MainRoute } from "./routes";

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

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function AppRoute() {

    const [isAuthenticated, setisAuthenticated] = useState(Boolean(JSON.parse(localStorage.getItem("authID"))));

    useEffect(() => {
        setisAuthenticated(Boolean(JSON.parse(localStorage.getItem("authenticatedUser"))));
    }, [isAuthenticated]);

    return (
        <Router>
            <Switch>

                {/* Register the routes here */}
                <Route exact path="/" component={Login} />

                {/* Register the admin routes here */}
                <Route exact path="/AdminDashboard" component={AdminDashboard} />
                <Route exact path="/AdminUpdatePatientProfile/:id" component={AdminUpdatePatientProfile} />
                <Route exact path="/AdminPreConsultation/:id" component={AdminPreConsultation} />
                <Route exact path="/AdminAllPatients" component={AdminAllPatients} />
                <Route exact path="/AdminAllDoctors" component={AdminAllDoctors} />


                <Route exact path="/AdminBookAppointment/:doctorId" component={AdminBookAppointment} />
                <Route exact path="/AdminAppointments" component={AdminAppointments} />
                <Route exact path="/AdminDoctorAppointments/:doctorId" component={AdminDoctorAppointments} />


                <Route exact path="/AdminBookConsultation/:doctorId" component={AdminBookConsultation} />
                <Route exact path="/AdminConsultationQueue" component={AdminConsultationQueue} />
                <Route exact path="/AdminDoctorConsultationQueue/:doctorId" component={AdminDoctorConsultationQueue} />


                {/* Register the doctor routes here */}
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


                {/* Register the patients routes here */}
                <Route exact path="/PatientDashboard" component={PatientDashboard} />
                <Route exact path="/PatientAppointments" component={PatientAppointments} />
                <Route exact path="/PatientConsultations" component={PatientConsultations} />
                <Route exact path="/PatientDoctorList" component={PatientDoctorList} />
                <Route exact path="/PatientBookAppointment/:doctorId" component={PatientBookAppointment} />
                <Route exact path="/PatientBookConsultation/:doctorId" component={PatientBookConsultation} />
                <Route exact path="/PatientDoctorProfile/:doctorId" component={PatientDoctorProfile} />


                {/* Register the admin accountant here */}
                <Route exact path="/AccountantDashboard" component={AccountantDashboard} />


                {/* Register the pharmacy routes here */}
                <Route exact path="/PharmacyDashboard" component={PharmacyDashboard} />
                <Route exact path="/PharmacyCreateDrugCategories" component={PharmacyCreateDrugCategories} />
                <Route exact path="/PharmacyManageDrugCategories" component={PharmacyManageDrugCategories} />
                <Route exact path="/PharmacyCreateDrugSubCategories" component={PharmacyCreateDrugSubCategories} />
                <Route exact path="/PharmacyManageDrugSubCategories" component={PharmacyManageDrugSubCategories} />
                <Route exact path="/PharmacyCreateDrug" component={PharmacyCreateDrug} />
                <Route exact path="/PharmacyManageDrugs" component={PharmacyManageDrugs} />

            </Switch>
        </Router>
    )
}

export default AppRoute;
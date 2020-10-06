import React from "react";
import Login from "./Login/Login";
import AdminDashboard from "./Admin/Dashboard";
import AdminUpdatePatientProfile from "./Admin/UpdatePatientProfile";
import AdminAppointments from "./Admin/Appointments";
import AdminPreConsultation from "./Admin/PreConsultation";
import AdminAllPatients from "./Admin/AllPatients";
import AdminAllDoctors from "./Admin/AllDoctors";

import DoctorDashboard from "./Doctor/Dashboard";
import DoctorPatientsList from "./Doctor/Patients";
import DoctorAppointments from "./Doctor/Appointments";
import DoctorCreateSchedule from "./Doctor/CreateSchedule";
import DoctorSchedules from "./Doctor/Schedules";
import DoctorPatientProfile from "./Doctor/PatientProfile";
import DoctorPatientMedicalHistory from "./Doctor/PatientMedicalHistory";
import DoctorManageSchedule from "./Doctor/ManageSchedule";
import DoctorConsultation from "./Doctor/Consultation";

import PatientDashboard from "./Patient/Dashboard";
import PatientAppointments from "./Patient/Appointments";
import PatientDoctorList from "./Patient/DoctorList";

import AccountantDashboard from "./Accountant/Dashboard";

import PharmacyDashboard from "./Pharmacy/Dashboard";
import PharmacyCreateDrugCategories from "./Pharmacy/CreateCategories";
import PharmacyManageDrugCategories from "./Pharmacy/ManageCategories";
import PharmacyCreateDrugSubCategories from "./Pharmacy/CreateSubCategories";
import PharmacyManageDrugSubCategories from "./Pharmacy/ManageSubCategories";
import PharmacyCreateDrug from "./Pharmacy/CreateDrug";
import PharmacyManageDrugs from "./Pharmacy/ManageDrugs";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      {/* Register the routes here */}
      <Route exact path="/" component={Login} />

      {/* Register the admin routes here */}
      <Route exact path="/AdminDashboard" component={AdminDashboard} />
      <Route
        exact
        path="/AdminUpdatePatientProfile/:id"
        component={AdminUpdatePatientProfile}
      />
      <Route
        exact
        path="/AdminPreConsultation"
        component={AdminPreConsultation}
      />
      <Route path="/AdminAllPatients" component={AdminAllPatients} />

      <Route path="/AdminAllDoctors" component={AdminAllDoctors} />
      <Route exact path="/AdminAppointments" component={AdminAppointments} />

      {/* Register the doctor routes here */}
      <Route exact path="/DoctorDashboard" component={DoctorDashboard} />
      <Route exact path="/DoctorPatientsList" component={DoctorPatientsList} />
      <Route exact path="/DoctorAppointments" component={DoctorAppointments} />
      <Route
        exact
        path="/DoctorCreateSchedule"
        component={DoctorCreateSchedule}
      />
      <Route exact path="/DoctorSchedules" component={DoctorSchedules} />
      <Route exact path="/DoctorConsultation" component={DoctorConsultation} />
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
      <Route
        exact
        path="/DoctorManageSchedule"
        component={DoctorManageSchedule}
      />

      {/* Register the patients routes here */}
      <Route exact path="/PatientDashboard" component={PatientDashboard} />
      <Route
        exact
        path="/PatientAppointments"
        component={PatientAppointments}
      />
      <Route exact path="/PatientDoctorList" component={PatientDoctorList} />

      {/* Register the admin accountant here */}
      <Route
        exact
        path="/AccountantDashboard"
        component={AccountantDashboard}
      />

      {/* Register the pharmacy routes here */}
      <Route exact path="/PharmacyDashboard" component={PharmacyDashboard} />
      <Route
        exact
        path="/PharmacyCreateDrugCategories"
        component={PharmacyCreateDrugCategories}
      />
      <Route
        exact
        path="/PharmacyManageDrugCategories"
        component={PharmacyManageDrugCategories}
      />
      <Route
        exact
        path="/PharmacyCreateDrugSubCategories"
        component={PharmacyCreateDrugSubCategories}
      />
      <Route
        exact
        path="/PharmacyManageDrugSubCategories"
        component={PharmacyManageDrugSubCategories}
      />
      <Route exact path="/PharmacyCreateDrug" component={PharmacyCreateDrug} />
      <Route
        exact
        path="/PharmacyManageDrugs"
        component={PharmacyManageDrugs}
      />
    </Router>
  );
}

export default App;

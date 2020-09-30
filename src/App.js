import React from 'react';
import Login from './Login/Login'
import AdminDashboard from './Admin/Dashboard'
import AdminUpdatePatientProfile from './Admin/UpdatePatientProfile'

import DoctorDashboard from './Doctor/Dashboard'
import PatientDashboard from './Patient/Dashboard'
import AccountantDashboard from './Accountant/Dashboard'

import PharmacyDashboard from './Pharmacy/Dashboard'
import PharmacyCreateDrugCategories from './Pharmacy/CreateCategories'
import PharmacyManageDrugCategories from './Pharmacy/ManageCategories'

import PharmacyCreateDrugSubCategories from './Pharmacy/CreateSubCategories'
import PharmacyManageDrugSubCategories from './Pharmacy/ManageSubCategories'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


function App() {
  return (

    <Router>

      {/* Register the routes here */}
      <Route exact path="/" component={Login} />

      {/* Register the admin routes here */}
      <Route exact path="/AdminDashboard" component={AdminDashboard} />
      <Route exact path="/AdminUpdatePatientProfile" component={AdminUpdatePatientProfile} />

      {/* Register the doctor routes here */}
      <Route exact path="/DoctorDashboard" component={DoctorDashboard} />

      {/* Register the patients routes here */}
      <Route exact path="/PatientDashboard" component={PatientDashboard} />

      {/* Register the admin accountant here */}
      <Route exact path="/AccountantDashboard" component={AccountantDashboard} />

      {/* Register the pharmacy routes here */}
      <Route exact path="/PharmacyDashboard" component={PharmacyDashboard} />
      <Route exact path="/PharmacyCreateDrugCategories" component={PharmacyCreateDrugCategories} />
      <Route exact path="/PharmacyManageDrugCategories" component={PharmacyManageDrugCategories} />
      <Route exact path="/PharmacyCreateDrugSubCategories" component={PharmacyCreateDrugSubCategories} />
      <Route exact path="/PharmacyManageDrugSubCategories" component={PharmacyManageDrugSubCategories} />
      
    </Router>
    
  );
}

export default App;

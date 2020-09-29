import React from 'react';
import Login from './Login/Login'
import AdminDashboard from './Admin/Dashboard'
import DoctorDashboard from './Doctor/Dashboard'
import PatientDashboard from './Patient/Dashboard'
import AccountantDashboard from './Accountant/Dashboard'
import PharmacyDashboard from './Pharmacy/Dashboard'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


function App() {
  return (

    <Router>

      {/* Register the routes here */}
      <Route exact path="/" component={Login} />

      {/* Register the admin routes here */}
      <Route exact path="/AdminDashboard" component={AdminDashboard} />

      {/* Register the doctor routes here */}
      <Route exact path="/DoctorDashboard" component={DoctorDashboard} />

      {/* Register the patients routes here */}
      <Route exact path="/PatientDashboard" component={PatientDashboard} />

      {/* Register the admin accountant here */}
      <Route exact path="/AccountantDashboard" component={AccountantDashboard} />

      {/* Register the pharmacy routes here */}
      <Route exact path="/PharmacyDashboard" component={PharmacyDashboard} />

    </Router>
    
  );
}

export default App;

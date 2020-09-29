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
      <Route exact path="/AdminDashboard" component={AdminDashboard} />
      <Route exact path="/DoctorDashboard" component={DoctorDashboard} />
      <Route exact path="/PatientDashboard" component={PatientDashboard} />
      <Route exact path="/AccountantDashboard" component={AccountantDashboard} />
      <Route exact path="/PharmacyDashboard" component={PharmacyDashboard} />
      

    </Router>
    
  );
}

export default App;

import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { HMOLayout } from "../Components/Layout";
import Dashboard from "../Pages/HealthInsurance/HMO/Dashboard";
import CreateHealthPlan from "../Pages/HealthInsurance/HMO/CreateHealthPlans";
import ManageHealthPlans from "../Pages/HealthInsurance/HMO/ManageHealthPlans";
import ManagePatientsInPlan from "../Pages/HealthInsurance/HMO/ManagePatientsInPlan";
import ManageDrugsInPlan from "../Pages/HealthInsurance/HMO/ManageDrugsInPlan";
import ManageServicesInPlan from "../Pages/HealthInsurance/HMO/ManageServicesInPlan";
import ManageUserGroups from "../Pages/HealthInsurance/HMO/ManageUserGroups";
import AddUserToPlan from "../Pages/HealthInsurance/HMO/AddUserToPlan";
import AddDrugToPlan from "../Pages/HealthInsurance/HMO/AddDrugToPlan";
import AddServiceToPlan from "../Pages/HealthInsurance/HMO/AddServiceToPlan";

export default function NurseRoutes() {
  return (
    <BrowserRouter basename="HMOAdmin">
      <HMOLayout>
        <Switch>
          <Route exact path="/Dashboard" component={Dashboard} />
          <Route exact path="/CreateHealthPlan" component={CreateHealthPlan} />
          <Route
            exact
            path="/ManageHealthPlans"
            component={ManageHealthPlans}
          />
          <Route
            exact
            path="/ManageHealthPlanPatients"
            component={ManagePatientsInPlan}
          />
          <Route
            exact
            path="/ManageHealthPlanDrugs"
            component={ManageDrugsInPlan}
          />
          <Route
            exact
            path="/ManageHealthPlanServices"
            component={ManageServicesInPlan}
          />
          <Route exact path="/ManageUserGroups" component={ManageUserGroups} />
          <Route exact path="/AddUserToPlan" component={AddUserToPlan} />
          <Route exact path="/AddDrugToPlan" component={AddDrugToPlan} />
          <Route exact path="/AddServiceToPlan" component={AddServiceToPlan} />
          <Route exact path="*" render={() => <Redirect to="/Dashboard" />} />
        </Switch>
      </HMOLayout>
    </BrowserRouter>
  );
}

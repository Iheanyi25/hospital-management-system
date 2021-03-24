import React, { useContext, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { HMOLayout } from "../Components/Layout";
import Dashboard from "../Pages/HealthInsurance/HMO/Dashboard";
import ViewHMOProfile from "../Pages/HealthInsurance/HMO/ViewHMOProfile";
import CreateHealthPlan from "../Pages/HealthInsurance/HMO/CreateHealthPlans";
import EditHealthPlan from "../Pages/HealthInsurance/HMO/EditHealthPlan";
import ManageHealthPlans from "../Pages/HealthInsurance/HMO/ManageHealthPlans";
import ManagePatientsInPlan from "../Pages/HealthInsurance/HMO/ManagePatientsInPlan";
import ManageDrugsInPlan from "../Pages/HealthInsurance/HMO/ManageDrugsInPlan";
import ManageServicesInPlan from "../Pages/HealthInsurance/HMO/ManageServicesInPlan";
import ManageUserGroups from "../Pages/HealthInsurance/HMO/ManageUserGroups";
import AddUserToPlan from "../Pages/HealthInsurance/HMO/AddUserToPlan";
import AddDrugToPlan from "../Pages/HealthInsurance/HMO/AddDrugToPlan";
import EditDrugInPlan from "../Pages/HealthInsurance/HMO/EditDrugInPlan";
import AddServiceToPlan from "../Pages/HealthInsurance/HMO/AddServiceToPlan";
import CreateUserGroup from "../Pages/HealthInsurance/HMO/CreateUserGroup";
import ManageUserSubGroups from "../Pages/HealthInsurance/HMO/ManageUserSubGroups";
import CreateUserSubGroup from "../Pages/HealthInsurance/HMO/CreateUserSubGroup";
import AddUserToSubGroup from "../Pages/HealthInsurance/HMO/AddUserToSubGroup";
import ManagePatientsInSubGroup from "../Pages/HealthInsurance/HMO/ManagePatientsInSubGroup";
import AddUserGroupToPlan from "../Pages/HealthInsurance/HMO/AddUserGroupToPlan";
import { UserContext } from "../mobx/UserState";

export default function HMORoutes() {
  const { setHMOId, user } = useContext(UserContext);
  useEffect(() => {
    setHMOId();
  }, [setHMOId, user.id]);

  return (
    <BrowserRouter basename="HMOAdmin">
      <HMOLayout>
        <Switch>
          <Route exact path="/Dashboard" component={Dashboard} />
          <Route exact path="/HMOProfile" component={ViewHMOProfile} />
          <Route exact path="/CreateHealthPlan" component={CreateHealthPlan} />
          <Route exact path="/EditHealthPlan" component={EditHealthPlan} />
          <Route
            exact
            path="/ManageHealthPlans"
            component={ManageHealthPlans}
          />
          <Route
            exact
            path="/ManageHealthPlanPatients/:id"
            component={ManagePatientsInPlan}
          />
          <Route
            exact
            path="/ManageHealthPlanDrugs/:id"
            component={ManageDrugsInPlan}
          />
          <Route
            exact
            path="/ManageHealthPlanServices/:id"
            component={ManageServicesInPlan}
          />
          <Route exact path="/ManageUserGroups" component={ManageUserGroups} />
          <Route exact path="/AddUserToPlan/:id" component={AddUserToPlan} />
          <Route exact path="/EditDrugInPlan/:id" component={EditDrugInPlan} />
          <Route exact path="/AddDrugToPlan/:id" component={AddDrugToPlan} />
          <Route exact path="/AddServiceToPlan/:id" component={AddServiceToPlan} />
          <Route exact path="/CreateUserGroup" component={CreateUserGroup} />
          <Route
            exact
            path="/ManageUserSubGroups"
            component={ManageUserSubGroups}
          />
          <Route
            exact
            path="/CreateUserSubGroup"
            component={CreateUserSubGroup}
          />
          <Route
            exact
            path="/ManagePatientsInSubGroup"
            component={ManagePatientsInSubGroup}
          />
          <Route
            exact
            path="/AddUserToSubGroup"
            component={AddUserToSubGroup}
          />
          <Route
            exact
            path="/AddUserGroupToPlan"
            component={AddUserGroupToPlan}
          />
          <Route exact path="*" render={() => <Redirect to="/Dashboard" />} />
        </Switch>
      </HMOLayout>
    </BrowserRouter>
  );
}

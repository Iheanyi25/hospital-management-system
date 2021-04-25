import React, { useContext, useEffect } from "react";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import { HMOLayout } from "../Components/Layout";
import { UserContext } from "../mobx/UserState";
import Dashboard from "../Pages/HealthInsurance/HMO/Dashboard";
import ViewHMOProfile from "../Pages/HealthInsurance/HMO/ViewHMOProfile";
import ViewChangePassword from "../Pages/Components/ViewChangePassword";
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
import EditUserGroup from "../Pages/HealthInsurance/HMO/EditUserGroups";
import ManageUserSubGroups from "../Pages/HealthInsurance/HMO/ManageUserSubGroups";
import CreateUserSubGroup from "../Pages/HealthInsurance/HMO/CreateUserSubGroup";
import EditUserSubGroup from "../Pages/HealthInsurance/HMO/EditUserSubGroup";
import AddUserToSubGroup from "../Pages/HealthInsurance/HMO/AddUserToSubGroup";
import EditServiceInPlan from "../Pages/HealthInsurance/HMO/EditServiceInPlan";
import ManagePatientsInSubGroup from "../Pages/HealthInsurance/HMO/ManagePatientsInSubGroup";
import RouteWithErrorBoundary from "../Components/RouteWithErrorBoundary";

export default function HMORoutes() {
  const { setHMOId, user } = useContext(UserContext);
  useEffect(() => {
    setHMOId();
  }, [setHMOId, user.id]);

  return (
    <BrowserRouter basename="HMOAdmin">
      <HMOLayout>
        <Switch>
          <RouteWithErrorBoundary exact path="/Dashboard" component={Dashboard} />
          <RouteWithErrorBoundary exact path="/HMOProfile" component={ViewHMOProfile} />
          <RouteWithErrorBoundary exact path="/ChangePassword" component={ViewChangePassword} />
          <RouteWithErrorBoundary exact path="/CreateHealthPlan" component={CreateHealthPlan} />
          <RouteWithErrorBoundary exact path="/EditHealthPlan" component={EditHealthPlan} />
          <RouteWithErrorBoundary
            exact
            path="/ManageHealthPlans"
            component={ManageHealthPlans}
          />
          <RouteWithErrorBoundary
            exact
            path="/ManageHealthPlanPatients/:id"
            component={ManagePatientsInPlan}
          />
          <RouteWithErrorBoundary
            exact
            path="/ManageHealthPlanDrugs/:id"
            component={ManageDrugsInPlan}
          />
          <RouteWithErrorBoundary
            exact
            path="/ManageHealthPlanServices/:id"
            component={ManageServicesInPlan}
          />
          <RouteWithErrorBoundary
            exact
            path="/EditServiceInPlan/:id"
            component={EditServiceInPlan}
          />
          <RouteWithErrorBoundary exact path="/ManageUserGroups" component={ManageUserGroups} />
          <RouteWithErrorBoundary exact path="/AddUserToPlan/:id" component={AddUserToPlan} />
          <RouteWithErrorBoundary exact path="/EditDrugInPlan/:id" component={EditDrugInPlan} />
          <RouteWithErrorBoundary exact path="/AddDrugToPlan/:id" component={AddDrugToPlan} />
          <RouteWithErrorBoundary
            exact
            path="/AddServiceToPlan/:id"
            component={AddServiceToPlan}
          />
          <RouteWithErrorBoundary exact path="/CreateUserGroup" component={CreateUserGroup} />
          <RouteWithErrorBoundary exact path="/EditUserGroup/:id" component={EditUserGroup} />
          <RouteWithErrorBoundary
            exact
            path="/ManageUserSubGroups/:id"
            component={ManageUserSubGroups}
          />
          <RouteWithErrorBoundary
            exact
            path="/CreateUserSubGroup/:id"
            component={CreateUserSubGroup}
          />
          <RouteWithErrorBoundary
            exact
            path="/EditUserSubGroup/:id"
            component={EditUserSubGroup}
          />
          <RouteWithErrorBoundary
            exact
            path="/ManagePatientsInSubGroup/:id"
            component={ManagePatientsInSubGroup}
          />
          <RouteWithErrorBoundary
            exact
            path="/AddUserToSubGroup/:id"
            component={AddUserToSubGroup}
          />
          <RouteWithErrorBoundary exact path="*" render={() => <Redirect to="/Dashboard" />} />
        </Switch>
      </HMOLayout>
    </BrowserRouter>
  );
}

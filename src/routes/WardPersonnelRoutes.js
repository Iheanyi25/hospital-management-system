import React from "react";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import Dashboard from "../Pages/WardPersonnel/Dashboard";
import ViewWardPersonnelProfile from "../Pages/WardPersonnel/ViewWardPersonnelProfile";
import ViewChangePassword from "../Pages/Components/ViewChangePassword";
import CreateWard from "../Components/Admissions/Wards/CreateWard";
import EditWard from "../Components/Admissions/Wards/EditWard";
import ManageWards from "../Components/Admissions/Wards/ViewWards";
import ManageBeds from "../Components/Admissions/Wards/ViewBeds";
import AssignWard from "../Components/Admissions/Wards/AssignWard";
import AssignBed from "../Components/Admissions/Wards/AssignBed";
import { WardPersonnelLayout } from "../Components/Layout";
import ReferredPatients from "../Components/Admissions/ReferredPatients";
import ManageAdmissions from "../Components/Admissions/ManageAdmissions";
import RouteWithErrorBoundary from "../Components/RouteWithErrorBoundary";

export default function WardPersonnelRoutes() {
  return (
    <BrowserRouter basename="ward">
      <WardPersonnelLayout>
        <Switch>
          <RouteWithErrorBoundary exact path="/WardDashboard" component={Dashboard} />
          <RouteWithErrorBoundary
            exact
            path="/WardProfile"
            component={ViewWardPersonnelProfile}
          />
          <RouteWithErrorBoundary exact path="/ChangePassword" component={ViewChangePassword} />
          <RouteWithErrorBoundary exact path="/WardCreateWard" component={CreateWard} />
          <RouteWithErrorBoundary exact path="/WardEditWard/:id" component={EditWard} />
          <RouteWithErrorBoundary exact path="/WardManageWards" component={ManageWards} />
          <RouteWithErrorBoundary exact path="/WardManageBeds/:id" component={ManageBeds} />
          <RouteWithErrorBoundary exact path="/WardAssignWard/:id" component={AssignWard} />
          <RouteWithErrorBoundary exact path="/WardAssignBed/:id" component={AssignBed} />
          <RouteWithErrorBoundary
            exact
            path="/WardViewReferredPatients"
            component={ReferredPatients}
          />
          <RouteWithErrorBoundary
            exact
            path="/WardManageAdmissions"
            component={ManageAdmissions}
          />
          <RouteWithErrorBoundary
            exact
            path="*"
            render={() => <Redirect to="/WardDashboard" />}
          />
        </Switch>
      </WardPersonnelLayout>
    </BrowserRouter>
  );
}

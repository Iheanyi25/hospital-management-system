import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
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

export default function WardPersonnelRoutes() {
  return (
    <BrowserRouter basename="ward">
      <WardPersonnelLayout>
        <Switch>
          <Route exact path="/WardDashboard" component={Dashboard} />
          <Route
            exact
            path="/WardProfile"
            component={ViewWardPersonnelProfile}
          />
          <Route exact path="/ChangePassword" component={ViewChangePassword} />
          <Route exact path="/WardCreateWard" component={CreateWard} />
          <Route exact path="/WardEditWard/:id" component={EditWard} />
          <Route exact path="/WardManageWards" component={ManageWards} />
          <Route exact path="/WardManageBeds/:id" component={ManageBeds} />
          <Route exact path="/WardAssignWard/:id" component={AssignWard} />
          <Route exact path="/WardAssignBed/:id" component={AssignBed} />
          <Route
            exact
            path="*"
            render={() => <Redirect to="/WardDashboard" />}
          />
        </Switch>
      </WardPersonnelLayout>
    </BrowserRouter>
  );
}

import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import PharmacyDashboard from "../Pages/Pharmacy/Dashboard";
import { PharmacyLayout } from "../Components/Layout";
import ViewPharmacyProfile from "../Pages/Pharmacy/ViewPharmacyProfile";
import RegisterDrug from "../Pages/Admin/Pharmacy/RegisterDrug";
import ViewDrugs from "../Pages/Admin/Pharmacy/ViewDrugs";
import ViewDrug from "../Pages/Admin/Pharmacy/ViewDrug";

export default function PharmacyRoutes() {
  return (
    <BrowserRouter basename="pharmacy">
      <PharmacyLayout>
        <Switch>
          <Route
            exact
            path="/PharmacyDashboard"
            component={PharmacyDashboard}
          />
          <Route
            exact
            path="/PharmacyProfile"
            component={ViewPharmacyProfile}
          />

          <Route exact path="/PharmacyRegisterDrug" component={RegisterDrug} />
          <Route exact path="/PharmacyViewDrugs" component={ViewDrugs} />
          <Route exact path="/PharmacyViewDrug/:id" component={ViewDrug} />

          <Route
            exact
            path="*"
            render={() => <Redirect to="/PharmacyDashboard" />}
          />
        </Switch>
      </PharmacyLayout>
    </BrowserRouter>
  );
}

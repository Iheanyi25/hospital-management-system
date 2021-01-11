import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import PharmacyDashboard from "../Pages/Pharmacy/Dashboard";
import { PharmacyLayout } from "../Components/Layout";
import ViewPharmacyProfile from "../Pages/Pharmacy/ViewPharmacyProfile";
import RegisterDrug from "../Pages/Admin/Pharmacy/RegisterDrug";
import ViewDrugs from "../Pages/Admin/Pharmacy/ViewDrugs";
import ViewDrug from "../Pages/Admin/Pharmacy/ViewDrug";
import ManagePrescriptions from "../Pages/Admin/Pharmacy/ManagePrescriptions";
import DrugPrescription from '../Pages/Admin/Pharmacy/DrugPrescription'
import ManagePrescriptionInvioice from "../Pages/Admin/Pharmacy/ManagePrescriptionInvioice";

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
          <Route exact path="/PharmacyManagePrescriptions" component={ManagePrescriptions} />
          <Route exact path="/PharmacyManagePrescriptionInvoice" component={ManagePrescriptionInvioice} />
          <Route exact path="/PharmacyDrugPrescription/:id" component={DrugPrescription} />

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

import React from "react";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import PharmacyDashboard from "../Pages/Pharmacy/Dashboard";
import { PharmacyLayout } from "../Components/Layout";
import ViewPharmacyProfile from "../Pages/Pharmacy/ViewPharmacyProfile";
import RegisterDrug from "../Pages/Admin/Pharmacy/RegisterDrug";
import ViewDrugs from "../Pages/Admin/Pharmacy/ViewDrugs";
import ViewDrug from "../Pages/Admin/Pharmacy/ViewDrug";
import ManagePrescriptions from "../Pages/Admin/Pharmacy/ManagePrescriptions";
import DrugPrescription from "../Pages/Admin/Pharmacy/DrugPrescription";
import ManagePrescriptionInvioice from "../Pages/Admin/Pharmacy/ManagePrescriptionInvioice";
import ViewChangePassword from "../Pages/Components/ViewChangePassword";
import RouteWithErrorBoundary from "../Components/RouteWithErrorBoundary";
// import ManageAdmissions from "../Components/Admissions/ManageAdmissions";
// import ManageAdmissionPrescriptions from "../Components/Admissions/Prescriptions/ManagePrescriptions";

export default function PharmacyRoutes() {
  return (
    <BrowserRouter basename="pharmacy">
      <PharmacyLayout>
        <Switch>
          <RouteWithErrorBoundary
            exact
            path="/PharmacyDashboard"
            component={PharmacyDashboard}
          />
          <RouteWithErrorBoundary
            exact
            path="/PharmacyProfile"
            component={ViewPharmacyProfile}
          />

          <RouteWithErrorBoundary exact path="/PharmacyRegisterDrug" component={RegisterDrug} />
          <RouteWithErrorBoundary exact path="/PharmacyViewDrugs" component={ViewDrugs} />
          <RouteWithErrorBoundary exact path="/PharmacyViewDrug/:id" component={ViewDrug} />
          <RouteWithErrorBoundary
            exact
            path="/PharmacyManagePrescriptions"
            component={ManagePrescriptions}
          />
          <RouteWithErrorBoundary
            exact
            path="/PharmacyManagePrescriptionInvoice"
            component={ManagePrescriptionInvioice}
          />
          <RouteWithErrorBoundary
            exact
            path="/PharmacyDrugPrescription/:id"
            component={DrugPrescription}
          />
          <RouteWithErrorBoundary exact path="/ChangePassword" component={ViewChangePassword} />
          {/* <RouteWithErrorBoundary
            exact
            path="/PharmacyManageAdmissions"
            component={ManageAdmissions}
          />
          <RouteWithErrorBoundary
            exact
            path="/PharmacyManageAdmissionPrescriptions/:id"
            component={ManageAdmissionPrescriptions}
          /> */}
          <RouteWithErrorBoundary
            exact
            path="*"
            render={() => <Redirect to="/PharmacyDashboard" />}
          />
        </Switch>
      </PharmacyLayout>
    </BrowserRouter>
  );
}

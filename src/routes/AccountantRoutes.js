import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { AccountantLayout } from "../Components/Layout";
import AccountantDashboard from "../Pages/Accountant/Dashboard";
import ManageAccounts from "../Pages/Components/ManageAccounts";
import AccountFundAccount from "../Pages/Components/FundAccount";
import ManageServiceRequest from "../Pages/Admin/Util_Services/ManageServiceRequest";
import ServiceRequestContents from "../Pages/Admin/Util_Services/ServiceRequestContents";
import PaymentForService from "../Pages/Admin/PaymentForService";
import RegistrationInvoice from "../Pages/Accountant/RegistrationInvoice";
import PatientRegistration from "../Pages/Admin/PatientRegistration";
import ViewAccountantProfile from "../Pages/Accountant/ViewAccountantProfile";
import ManagePrescriptionInvoice from "../Pages/Admin/Pharmacy/ManagePrescriptionInvioice";
import PaymentForPrescription from "../Pages/Admin/Pharmacy/PaymentForPrescription";
import ViewChangePassword from "../Pages/Components/ViewChangePassword";

//reports
import AllTransactions from "../Pages/Admin/Reports/AllTransactions";
import RegistrationReport from "../Pages/Admin/Reports/RegistrationReport";
import ServiceRequestReport from "../Pages/Admin/Reports/ServiceRequestReport";
import DrugReport from "../Pages/Admin/Reports/DrugReport";
import ExpiredDrugsReport from "../Pages/Admin/Reports/ExpiredDrugsReport";
import AllAccountTransactions from "../Pages/Admin/Reports/AllAccountTransactions";
import ManageAdmissions from "../Components/Admissions/ManageAdmissions";
import ManageAdmissionInvoices from "../Components/Admissions/ManageAdmissionInvoices";
import PaymentForAdmissionInvoices from "../Components/Admissions/PaymentForAdmissionInvoices";

export default function AccountantRoutes() {
  return (
    <BrowserRouter basename="accountant">
      <AccountantLayout>
        <Switch>
          <Route
            exact
            path="/AccountantDashboard"
            component={AccountantDashboard}
          />
          <Route
            exact
            path="/AccountantProfile"
            component={ViewAccountantProfile}
          />
          <Route
            exact
            path="/AccountFundAccount/:id"
            component={AccountFundAccount}
          />
          <Route
            exact
            path="/AccountantManageAccounts"
            component={ManageAccounts}
          />
          <Route
            exact
            path="/AccountManageServiceRequest"
            component={ManageServiceRequest}
          />
          <Route
            exact
            path="/AccountServiceRequestContents/:invoiceId"
            component={ServiceRequestContents}
          />
          <Route
            exact
            path="/AccountPaymentForService/:id"
            component={PaymentForService}
          />
          <Route
            exact
            path="/AccountRegistrationInvoice"
            component={RegistrationInvoice}
          />
          <Route
            exact
            path="/AccountPatientRegistration/:id"
            component={PatientRegistration}
          />
          <Route
            exact
            path="/AccountManagePrescriptionInvoice"
            component={ManagePrescriptionInvoice}
          />
          <Route
            exact
            path="/ChangePassword"
            component={ViewChangePassword}
          />
          <Route
            exact
            path="/AccountPaymentForPrescription/:id"
            component={PaymentForPrescription}
          />
          <Route
            exact
            path="/AccountantAllTransactions"
            component={AllTransactions}
          />
          <Route exact path="/AccountantDrugReport" component={DrugReport} />
          <Route
            exact
            path="/AccountantServiceRequestReport"
            component={ServiceRequestReport}
          />
          <Route
            exact
            path="/AccountantRegistrationReport"
            component={RegistrationReport}
          />
          <Route
            exact
            path="/AccountantExpiredDrugsReport"
            component={ExpiredDrugsReport}
          />
          <Route
            exact
            path="/AccountantAllAccountTransactions"
            component={AllAccountTransactions}
          />
          <Route
            exact
            path="/AccountantManageAdmissions"
            component={ManageAdmissions}
          />
          <Route
            exact
            path="/AccountantManageAdmissionInvoices/:id"
            component={ManageAdmissionInvoices}
          />
          <Route
            exact
            path="/AccountantPaymentForAdmissionInvoices/:id"
            component={PaymentForAdmissionInvoices}
          />

          <Route
            exact
            path="*"
            render={() => <Redirect to="/AccountantDashboard" />}
          />
        </Switch>
      </AccountantLayout>
    </BrowserRouter>
  );
}

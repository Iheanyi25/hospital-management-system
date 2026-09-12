import React from "react";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";

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
import ViewPatientsInAccount from "../Pages/Admin/ViewPatientsInAccount";
import RouteWithErrorBoundary from "../Components/RouteWithErrorBoundary";

export default function AccountantRoutes() {
  return (
    <BrowserRouter basename="accountant">
      <AccountantLayout>
        <Switch>
          <RouteWithErrorBoundary
            exact
            path="/AccountantDashboard"
            component={AccountantDashboard}
          />
          <RouteWithErrorBoundary
            exact
            path="/AccountantProfile"
            component={ViewAccountantProfile}
          />
          <RouteWithErrorBoundary
            exact
            path="/AccountFundAccount/:id"
            component={AccountFundAccount}
          />
          <RouteWithErrorBoundary
            exact
            path="/AccountantManageAccounts"
            component={ManageAccounts}
          />
          <RouteWithErrorBoundary
            exact
            path="/ViewPatientsInAccount/:id"
            component={ViewPatientsInAccount}
          />
          <RouteWithErrorBoundary
            exact
            path="/AccountManageServiceRequest"
            component={ManageServiceRequest}
          />
          <RouteWithErrorBoundary
            exact
            path="/AccountServiceRequestContents/:invoiceId"
            component={ServiceRequestContents}
          />
          <RouteWithErrorBoundary
            exact
            path="/AccountPaymentForService/:id"
            component={PaymentForService}
          />
          <RouteWithErrorBoundary
            exact
            path="/AccountRegistrationInvoice"
            component={RegistrationInvoice}
          />
          <RouteWithErrorBoundary
            exact
            path="/AccountPatientRegistration/:id"
            component={PatientRegistration}
          />
          <RouteWithErrorBoundary
            exact
            path="/AccountManagePrescriptionInvoice"
            component={ManagePrescriptionInvoice}
          />
          <RouteWithErrorBoundary
            exact
            path="/ChangePassword"
            component={ViewChangePassword}
          />
          <RouteWithErrorBoundary
            exact
            path="/AccountPaymentForPrescription/:id"
            component={PaymentForPrescription}
          />
          <RouteWithErrorBoundary
            exact
            path="/AccountantAllTransactions"
            component={AllTransactions}
          />
          <RouteWithErrorBoundary exact path="/AccountantDrugReport" component={DrugReport} />
          <RouteWithErrorBoundary
            exact
            path="/AccountantServiceRequestReport"
            component={ServiceRequestReport}
          />
          <RouteWithErrorBoundary
            exact
            path="/AccountantRegistrationReport"
            component={RegistrationReport}
          />
          <RouteWithErrorBoundary
            exact
            path="/AccountantExpiredDrugsReport"
            component={ExpiredDrugsReport}
          />
          <RouteWithErrorBoundary
            exact
            path="/AccountantAllAccountTransactions"
            component={AllAccountTransactions}
          />
          <RouteWithErrorBoundary
            exact
            path="/AccountantManageAdmissions"
            component={ManageAdmissions}
          />
          <RouteWithErrorBoundary
            exact
            path="/AccountantManageAdmissionInvoices/:id"
            component={ManageAdmissionInvoices}
          />
          <RouteWithErrorBoundary
            exact
            path="/AccountantPaymentForAdmissionInvoices/:id"
            component={PaymentForAdmissionInvoices}
          />

          <RouteWithErrorBoundary
            exact
            path="*"
            render={() => <Redirect to="/AccountantDashboard" />}
          />
        </Switch>
      </AccountantLayout>
    </BrowserRouter>
  );
}

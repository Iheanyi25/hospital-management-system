import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AdminDashboard from "../Pages/Admin/Dashboard";
import AdminUpdatePatientProfile from "../Pages/Admin/UpdatePatientProfile";
import AdminPreConsultation from "../Pages/Admin/PreConsultation";
import AdminAllDoctors from "../Pages/Admin/AllDoctors";
import AdminAllPharmacists from "../Pages/Admin/AllPharmacist";
import AdminAllAccountants from "../Pages/Admin/AllAccountants";
import AdminAllLabTechnicians from "../Pages/Admin/AllLab";
import AdminAppointments from "../Pages/Admin/Appointments";
import AdminBookAppointment from "../Pages/Admin/BookAppointment";
import AdminDoctorAppointments from "../Pages/Admin/DoctorAppointments";
import AdminBookConsultation from "../Pages/Admin/BookConsultation";
import AdminConsultationQueue from "../Pages/Admin/Consultations";
import AddPatient from "../Pages/Admin/AddPatient.js";
import AdminDoctorConsultationQueue from "../Pages/Admin/DoctorConsultations";
import { AdminLayout } from "../Components/Layout";
import AllPatients from "../Pages/Admin/AllPatients";
import ManageAccounts from "../Pages/Components/ManageAccounts";
import PatientRegistration from "../Pages/Admin/PatientRegistration";
import AdminFundAccount from "../Pages/Components/FundAccount";
import PaymentForService from "../Pages/Admin/PaymentForService";
import ViewPatientProfile from "../Pages/Components/ViewPatientProfile";
import ViewPreConsultationHistory from "../Pages/Components/ViewPreConsultationHistory";
import ViewClarkingHistory from "../Pages/Components/ViewClarkingHistory";
import DoctorClarking from "../Pages/Doctor/Clarking";
import RegisterDrug from "../Pages/Admin/Pharmacy/RegisterDrug";
import ViewDrugs from "../Pages/Admin/Pharmacy/ViewDrugs";
import ViewDrug from "../Pages/Admin/Pharmacy/ViewDrug";
import DrugPrescription from "../Pages/Admin/Pharmacy/DrugPrescription";
import ManagePrescriptionInvoice from "../Pages/Admin/Pharmacy/ManagePrescriptionInvioice";
import PaymentForPrescription from "../Pages/Admin/Pharmacy/PaymentForPrescription";
import ManagePrescriptions from "../Pages/Admin/Pharmacy/ManagePrescriptions";
import ViewPharmacyProfile from "../Pages/Pharmacy/ViewPharmacyProfile";
import ViewAccountantProfile from "../Pages/Accountant/ViewAccountantProfile";
import ViewLabProfile from "../Pages/Lab/ViewLabProfile";
import ViewAdminProfile from "../Pages/Admin/ViewAdminProfile";
import ViewChangePassword from "../Pages/Components/ViewChangePassword";

// service utils
import CreateService from "../Pages/Admin/Util_Services/CreateService";
import ManageServices from "../Pages/Admin/Util_Services//ManageServices";
import EditService from "../Pages/Admin/Util_Services//EditService";
import ServiceCategory from "../Pages/Admin/Util_Services//ServiceCategory";
import ManageServiceCategory from "../Pages/Admin/Util_Services//ManageServiceCategory";
import EditServiceCategory from "../Pages/Admin/Util_Services//EditServiceCategory";
import CreateServiceRequest from "../Pages/Admin/Util_Services/CreateServiceRequest";
import ManageServiceRequest from "../Pages/Admin/Util_Services/ManageServiceRequest";
import ServiceRequestContents from "../Pages/Admin/Util_Services/ServiceRequestContents";
import ServiceRequestResultUpload from "../Pages/Admin/Util_Services/UploadServiceRequestResult";
import ViewLabResults from "../Pages/Admin/Util_Services/ViewLabResults";

// ward utils
import CreateWard from "../Pages/Admin/Util_Ward/CreateWard";
import EditWard from "../Pages/Admin/Util_Ward/EditWard";
import ManageWards from "../Pages/Admin/Util_Ward/ManageWards";

// health-plan utils
import CreateHealthPlan from "../Pages/Admin/Util_HealtlPlans/CreateHealthPlan";
import EditHealthPlan from "../Pages/Admin/Util_HealtlPlans/EditHealthPlan";
import ManageHealthPlans from "../Pages/Admin/Util_HealtlPlans/ManageHealthPlans";
import SelectFamily from "../Pages/Admin/SelectFamily";
import DoctorsProfile from "../Pages/Admin/DoctorsProfile";
import ClarkingHist from "../Pages/Components/ClarkingHistory";

//reports
import AllTransactions from "../Pages/Admin/Reports/AllTransactions";
import RegistrationReport from "../Pages/Admin/Reports/RegistrationReport";
import ServiceRequestReport from "../Pages/Admin/Reports/ServiceRequestReport";
import DrugReport from "../Pages/Admin/Reports/DrugReport";
import ViewPatientHealthHistory from "../Pages/Admin/ViewPatientHealthHistory";

export default function AdminRoutes() {
  return (
    <BrowserRouter basename="admin">
      <AdminLayout>
        <Switch>
          <Route exact path="/AdminDashboard" component={AdminDashboard} />
          <Route
            exact
            path="/AdminUpdatePatientProfile/:id"
            component={AdminUpdatePatientProfile}
          />
          <Route
            exact
            path="/AdminPreConsultation/:id"
            component={AdminPreConsultation}
          />
          <Route exact path="/AdminAllPatients" component={AllPatients} />
          <Route exact path="/AdminAllDoctors" component={AdminAllDoctors} />
          <Route
            exact
            path="/AdminAllPharmacists"
            component={AdminAllPharmacists}
          />
          <Route
            exact
            path="/AdminAllAccountants"
            component={AdminAllAccountants}
          />
          <Route
            exact
            path="/AdminAllLabTechnicians"
            component={AdminAllLabTechnicians}
          />
          <Route
            exact
            path="/AdminBookAppointment"
            component={AdminBookAppointment}
          />
          <Route
            exact
            path="/AdminAppointments"
            component={AdminAppointments}
          />
          <Route exact path="/AdminProfile" component={ViewAdminProfile} />
          <Route
            exact
            path="/AdminDoctorAppointments/:doctorId"
            component={AdminDoctorAppointments}
          />
          <Route
            exact
            path="/AdminBookConsultation"
            component={AdminBookConsultation}
          />
          <Route
            exact
            path="/AdminConsultations"
            component={AdminConsultationQueue}
          />
          <Route
            exact
            path="/AdminDoctorConsultations/:doctorId"
            component={AdminDoctorConsultationQueue}
          />
          <Route exact path="/AdminCreateService" component={CreateService} />
          <Route exact path="/AdminEditService/:id" component={EditService} />
          <Route exact path="/AdminManageServices" component={ManageServices} />
          <Route
            exact
            path="/AdminViewServiceRequestContents/:invoiceId"
            component={ServiceRequestContents}
          />
          <Route
            exact
            path="/AdminUploadServiceRequestResult/:serviceRequestId"
            component={ServiceRequestResultUpload}
          />

          <Route exact path="/DoctorClarking" component={DoctorClarking} />
          <Route exact path="/ViewClarkingHistory" component={ClarkingHist} />

          <Route
            exact
            path="/AdminServiceCategory"
            component={ServiceCategory}
          />
          <Route
            exact
            path="/AdminEditServiceCategory/:id"
            component={EditServiceCategory}
          />
          <Route
            exact
            path="/AdminManageServiceCategory"
            component={ManageServiceCategory}
          />
          <Route exact path="/AdminCreateWard" component={CreateWard} />
          <Route exact path="/AdminEditWard/:id" component={EditWard} />
          <Route exact path="/DoctorProfile/:id" component={DoctorsProfile} />
          <Route exact path="/AdminManageWards" component={ManageWards} />
          <Route
            exact
            path="/AdminCreateHealthPlan"
            component={CreateHealthPlan}
          />
          <Route
            exact
            path="/AdminEditHealthPlan/:id"
            component={EditHealthPlan}
          />
          <Route
            exact
            path="/AdminManageHealthPlans"
            component={ManageHealthPlans}
          />
          <Route exact path="/AdminAddPatients" component={AddPatient} />
          <Route exact path="/AdminSelectFamily" component={SelectFamily} />
          <Route
            exact
            path="/AdminManageServiceRequests"
            component={ManageServiceRequest}
          />
          <Route
            exact
            path="/AdminServiceRequests"
            component={CreateServiceRequest}
          />
          <Route exact path="/AdminManageAccounts" component={ManageAccounts} />
          <Route
            exact
            path="/AdminPatientRegistration/:id"
            component={PatientRegistration}
          />
          <Route
            exact
            path="/AdminFundAccount/:id"
            component={AdminFundAccount}
          />
          <Route
            exact
            path="/AdminPaymentForService/:id"
            component={PaymentForService}
          />
          <Route
            exact
            path="/AdminPatientProfile/:id"
            component={ViewPatientProfile}
          />
          <Route
            exact
            path="/AdminViewLabResults/:id"
            component={ViewLabResults}
          />
          <Route
            exact
            path="/AdminViewPreConsultationHistory/:id"
            component={ViewPreConsultationHistory}
          />
          <Route exact path="/ChangePassword" component={ViewChangePassword} />
          <Route
            exact
            path="/AdminAllTransactions"
            component={AllTransactions}
          />
            <Route
              exact
              path="/AdminDrugReport"
              component={DrugReport}
            />
            <Route
              exact
              path="/AdminServiceRequestReport"
              component={ServiceRequestReport}
            />
          <Route
            exact
            path="/AdminRegistrationReport"
            component={RegistrationReport}
          />
          <Route
            exact
            path="/AdminViewClarkingHistory/:id"
            component={ViewClarkingHistory}
          />
          <Route exact path="/AdminRegisterDrug" component={RegisterDrug} />
          <Route exact path="/AdminViewDrugs" component={ViewDrugs} />
          <Route exact path="/AdminViewDrug/:id" component={ViewDrug} />
          <Route
            exact
            path="/AdminManagePrescriptions"
            component={ManagePrescriptions}
          />
          <Route
            exact
            path="/AdminDrugPrescription/:id"
            component={DrugPrescription}
          />
          <Route
            exact
            path="/AdminManagePrescriptionInvoice"
            component={ManagePrescriptionInvoice}
          />
          <Route
            exact
            path="/AdminPaymentForPrescription/:id"
            component={PaymentForPrescription}
          />
          <Route
            exact
            path="/AdminViewAccountantProfile/:id"
            component={ViewAccountantProfile}
          />
          <Route
            exact
            path="/AdminViewPharmacistProfile/:id"
            component={ViewPharmacyProfile}
          />
          <Route
            exact
            path="/AdminViewLabProfile/:id"
            component={ViewLabProfile}
          />

          <Route
            exact
            path="/AdminViewPatientHealthHistory/:id"
            component={ViewPatientHealthHistory}
          />
          <Route
            exact
            path="*"
            render={() => <Redirect to="/AdminDashboard" />}
          />
        </Switch>
      </AdminLayout>
    </BrowserRouter>
  );
}

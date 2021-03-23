import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AdminDashboard from "../Pages/Admin/Dashboard";
import AdminUpdatePatientProfile from "../Pages/Admin/UpdatePatientProfile";
import AdminPreConsultation from "../Pages/Admin/PreConsultation";
import AdminAllDoctors from "../Pages/Admin/AllDoctors";
import AdminAllNurses from "../Pages/Admin/AllNurses";
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
import ViewNurseProfile from "../Pages/Nurse/ViewNurseProfile";
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
import ExpiredDrugsReport from "../Pages/Admin/Reports/ExpiredDrugsReport";
import AllAccountTransactions from "../Pages/Admin/Reports/AllAccountTransactions";
import ViewPatientHealthHistory from "../Pages/Admin/ViewPatientHealthHistory";

// admissions
import CreateWard from "../Components/Admissions/Wards/CreateWard";
import EditWard from "../Components/Admissions/Wards/EditWard";
import ManageWards from "../Components/Admissions/Wards/ViewWards";
import ManageBeds from "../Components/Admissions/Wards/ViewBeds";
import ManageAdmissions from "../Components/Admissions/ManageAdmissions";
import ReferredPatients from "../Components/Admissions/ReferredPatients";
import AdminWardRoundNotes from "../Components/Admissions/WardRoundNotes";
import AssignWard from "../Components/Admissions/Wards/AssignWard";
import AssignBed from "../Components/Admissions/Wards/AssignBed";
import ManageAdmissionPrescriptions from "../Components/Admissions/Prescriptions/ManagePrescriptions";
import AdmissionPrescribeDrug from "../Components/Admissions/Prescriptions/PrescribeDrug";
import ManageAdmissionInvoices from "../Components/Admissions/ManageAdmissionInvoices";
import AdmissionCreateServiceRequest from "../Components/Admissions/CreateServiceRequest";
import ManageServiceRequests from "../Components/Admissions/MangeServiceRequests";
import PaymentForAdmissionInvoices from "../Components/Admissions/PaymentForAdmissionInvoices";
import UploadServiceRequestResult from "../Components/Admissions/LabServices/UploadServiceRequestResult";
import ViewServiceRequestResults from "../Components/Admissions/LabServices/ViewServiceRequestResults";

// health insurance
import CreateNHIS from "../Pages/HealthInsurance/NHIS/CreateNHIS";
import ManageNHIS from "../Pages/HealthInsurance/NHIS/ManageNHIS";
import ManagePatientsInNHIS from "../Pages/HealthInsurance/NHIS/ManagePatientsInNHIS";
import ManageDrugsInNHIS from "../Pages/HealthInsurance/NHIS/ManageDrugsInNHIS";
import ManageServicesInNHIS from "../Pages/HealthInsurance/NHIS/ManageServicesInNHIS";
import AddUserToNHIS from "../Pages/HealthInsurance/NHIS/AddUserToNHIS";
import AddDrugToNHIS from "../Pages/HealthInsurance/NHIS/AddDrugToNHIS";
import AddServiceToNHIS from "../Pages/HealthInsurance/NHIS/AddServiceToNHIS";
import CreateHMO from "../Pages/HealthInsurance/HMO/CreateHMO";
import ManageHMO from "../Pages/HealthInsurance/HMO/ManageHMO";

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
          <Route exact path="/AdminAllNurses" component={AdminAllNurses} />
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
            path="/AdminWardRoundNotes/:id"
            component={AdminWardRoundNotes}
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
          <Route exact path="/AdminManageWards" component={ManageWards} />
          <Route exact path="/AdminManageBeds/:id" component={ManageBeds} />
          <Route exact path="/AdminAssignWard/:id" component={AssignWard} />
          <Route exact path="/AdminAssignBed/:id" component={AssignBed} />
          <Route exact path="/DoctorProfile/:id" component={DoctorsProfile} />
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
          <Route exact path="/AdminDrugReport" component={DrugReport} />
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
            path="/AdminExpiredDrugsReport"
            component={ExpiredDrugsReport}
          />
          <Route
            exact
            path="/AdminAllAccountTransactions"
            component={AllAccountTransactions}
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
            path="/AdminViewNurseProfile/:id"
            component={ViewNurseProfile}
          />
          <Route
            exact
            path="/AdminViewPatientHealthHistory/:id"
            component={ViewPatientHealthHistory}
          />
          <Route
            exact
            path="/AdminViewReferredPatients"
            component={ReferredPatients}
          />
          <Route
            exact
            path="/AdminManageAdmissions"
            component={ManageAdmissions}
          />
          <Route
            exact
            path="/AdminManageAdmissionPrescriptions/:id"
            component={ManageAdmissionPrescriptions}
          />
          <Route
            exact
            path="/AdmissionPrescribeDrug/:id"
            component={AdmissionPrescribeDrug}
          />
          <Route
            exact
            path="/AdminManageAdmissionInvoices/:id"
            component={ManageAdmissionInvoices}
          />
          <Route
            exact
            path="/AdminCreateAdmissionServiceRequest/:id"
            component={AdmissionCreateServiceRequest}
          />
          <Route
            exact
            path="/AdminManageAdmissionServiceRequest/:id"
            component={ManageServiceRequests}
          />
          <Route
            exact
            path="/AdminUploadAdmissionsServiceRequestResult/:id"
            component={UploadServiceRequestResult}
          />
          <Route
            exact
            path="/AdminViewAdmissionsServiceRequestResults/:id"
            component={ViewServiceRequestResults}
          />
          <Route
            exact
            path="/AdminPaymentForAdmissionInvoices/:id"
            component={PaymentForAdmissionInvoices}
          />
          <Route exact path="/AdminCreateNHIS" component={CreateNHIS} />
          <Route exact path="/AdminManageNHIS" component={ManageNHIS} />
          <Route
            exact
            path="/AdminManageNHISPatients/:id"
            component={ManagePatientsInNHIS}
          />
          <Route
            exact
            path="/AdminManageNHISDrugs/:id"
            component={ManageDrugsInNHIS}
          />
          <Route
            exact
            path="/AdminManageNHISServices/:id"
            component={ManageServicesInNHIS}
          />
          <Route
            exact
            path="/AdminAddUserToNHIS/:id"
            component={AddUserToNHIS}
          />
          <Route
            exact
            path="/AdminAddDrugToNHIS/:id"
            component={AddDrugToNHIS}
          />
          <Route
            exact
            path="/AdminAddServiceToNHIS/:id"
            component={AddServiceToNHIS}
          />
          <Route exact path="/AdminCreateHMO" component={CreateHMO} />
          <Route exact path="/AdminManageHMO" component={ManageHMO} />
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

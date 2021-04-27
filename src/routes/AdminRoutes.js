import React from "react";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import RouteWithErrorBoundary from "../Components/RouteWithErrorBoundary";
import AdminDashboard from "../Pages/Admin/Dashboard";
import AdminUpdatePatientProfile from "../Pages/Admin/UpdatePatientProfile";
import AdminPreConsultation from "../Pages/Admin/PreConsultation";
import AdminAllDoctors from "../Pages/Admin/AllDoctors";
import AdminAllNurses from "../Pages/Admin/AllNurses";
import AdminAllPharmacists from "../Pages/Admin/AllPharmacist";
import AdminAllAccountants from "../Pages/Admin/AllAccountants";
import AdminAllLabTechnicians from "../Pages/Admin/AllLab";
import AdminAllWardPersonnel from "../Pages/Admin/AllWardPersonnel";
import AdminAppointments from "../Pages/Admin/Appointments";
import AdminBookAppointment from "../Pages/Admin/BookAppointment";
import AdminDoctorAppointments from "../Pages/Admin/DoctorAppointments";
import AdminBookConsultation from "../Pages/Admin/BookConsultation";
import AdminConsultationQueue from "../Pages/Admin/Consultations";
import AddPatient from "../Pages/Admin/AddPatient.js";
import AdminDoctorConsultationQueue from "../Pages/Admin/DoctorConsultations";
import { AdminLayout } from "../Components/Layout";
import ViewAllPatients from "../Pages/Admin/ViewAllPatients";
import ViewPatientsInAccount from "../Pages/Admin/ViewPatientsInAccount";
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
import ViewWardPersonnelProfile from "../Pages/WardPersonnel/ViewWardPersonnelProfile";
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
import ViewPatientHealthHistory from "../Pages/Admin/ViewPatientHealthHistory";

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
import PatientInvoiceReport from "../Pages/Admin/Reports/HMOReports/PatientInvoiceReport";
import DrugInvoiceReport from "../Pages/Admin/Reports/HMOReports/DrugInvoiceReport";
import ServiceInvoiceReport from "../Pages/Admin/Reports/HMOReports/ServiceInvoiceReport";
import PrimaryNHISReports from "../Pages/Admin/Reports/NHISReports/PrimaryNHISReports";
import SecondaryNHISReports from "../Pages/Admin/Reports/NHISReports/SecondaryNHISReports";

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

//Surgery
import ManageSurgeries from "../Pages/Admin/Surgery/ManageSurgeries";
import SurgicalOperationNotes from "../Pages/Admin/Surgery/SurgicalOperation";

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
import RequestSecondaryService from "../Pages/HealthInsurance/NHIS/RequestSecondaryService";

// nursing reports
import UpdateNursingReport from "../Pages/Admin/NursingReport/UpdateNursingReport";
import ManageNursingReports from "../Pages/Admin/NursingReport/ManageNursingReports";
import ViewNursingReport from "../Pages/Admin/NursingReport/ViewNursingReport";

// AnteNatal
import RegisterAntenatal from "../Pages/Nurse/NatalCare/Antenatal/RegisterAntenatal";
import ManageAnteNatal from "../Pages/Nurse/NatalCare/Antenatal/ManageAntenatal";
import ViewAntenatalRecords from "../Pages/Nurse/NatalCare/Antenatal/ViewAntenatalRecords";
import RegisterPostNatal from "../Pages/Nurse/NatalCare/Postnatal/RegisterPostNatal";

export default function AdminRoutes() {
  return (
    <BrowserRouter basename="admin">
      <AdminLayout>
        <Switch>
          <RouteWithErrorBoundary exact path="/AdminDashboard" component={AdminDashboard} />
          <RouteWithErrorBoundary
            exact
            path="/AdminUpdatePatientProfile/:id"
            component={AdminUpdatePatientProfile}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminPreConsultation/:id"
            component={AdminPreConsultation}
          />
          <RouteWithErrorBoundary exact path="/AdminAllPatients" component={ViewAllPatients} />
          <RouteWithErrorBoundary
            exact
            path="/ViewPatientsInAccount/:id"
            component={ViewPatientsInAccount}
          />
          <RouteWithErrorBoundary exact path="/AdminAllDoctors" component={AdminAllDoctors} />
          <RouteWithErrorBoundary exact path="/AdminAllNurses" component={AdminAllNurses} />
          <RouteWithErrorBoundary
            exact
            path="/AdminAllPharmacists"
            component={AdminAllPharmacists}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminAllAccountants"
            component={AdminAllAccountants}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminAllLabTechnicians"
            component={AdminAllLabTechnicians}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminAllWardPersonnel"
            component={AdminAllWardPersonnel}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminWardRoundNotes/:id"
            component={AdminWardRoundNotes}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminBookAppointment"
            component={AdminBookAppointment}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminAppointments"
            component={AdminAppointments}
          />
          <RouteWithErrorBoundary exact path="/AdminProfile" component={ViewAdminProfile} />
          <RouteWithErrorBoundary
            exact
            path="/AdminDoctorAppointments/:doctorId"
            component={AdminDoctorAppointments}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminBookConsultation"
            component={AdminBookConsultation}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminConsultations"
            component={AdminConsultationQueue}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminDoctorConsultations/:doctorId"
            component={AdminDoctorConsultationQueue}
          />
          <RouteWithErrorBoundary exact path="/AdminCreateService" component={CreateService} />
          <RouteWithErrorBoundary exact path="/AdminEditService/:id" component={EditService} />
          <RouteWithErrorBoundary exact path="/AdminManageServices" component={ManageServices} />
          <RouteWithErrorBoundary
            exact
            path="/AdminViewServiceRequestContents/:invoiceId"
            component={ServiceRequestContents}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminUploadServiceRequestResult/:serviceRequestId"
            component={ServiceRequestResultUpload}
          />

          <RouteWithErrorBoundary exact path="/DoctorClarking" component={DoctorClarking} />
          <RouteWithErrorBoundary exact path="/ViewClarkingHistory" component={ClarkingHist} />

          <RouteWithErrorBoundary
            exact
            path="/AdminServiceCategory"
            component={ServiceCategory}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminEditServiceCategory/:id"
            component={EditServiceCategory}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminManageServiceCategory"
            component={ManageServiceCategory}
          />
          <RouteWithErrorBoundary exact path="/AdminCreateWard" component={CreateWard} />
          <RouteWithErrorBoundary exact path="/AdminEditWard/:id" component={EditWard} />
          <RouteWithErrorBoundary exact path="/AdminManageWards" component={ManageWards} />
          <RouteWithErrorBoundary exact path="/AdminManageBeds/:id" component={ManageBeds} />
          <RouteWithErrorBoundary exact path="/AdminAssignWard/:id" component={AssignWard} />
          <RouteWithErrorBoundary exact path="/AdminAssignBed/:id" component={AssignBed} />
          <RouteWithErrorBoundary exact path="/DoctorProfile/:id" component={DoctorsProfile} />
          <RouteWithErrorBoundary
            exact
            path="/AdminCreateHealthPlan"
            component={CreateHealthPlan}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminEditHealthPlan/:id"
            component={EditHealthPlan}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminManageHealthPlans"
            component={ManageHealthPlans}
          />
          <RouteWithErrorBoundary exact path="/AdminAddPatients" component={AddPatient} />
          <RouteWithErrorBoundary exact path="/AdminSelectFamily" component={SelectFamily} />
          <RouteWithErrorBoundary
            exact
            path="/AdminManageServiceRequests"
            component={ManageServiceRequest}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminServiceRequests"
            component={CreateServiceRequest}
          />
          <RouteWithErrorBoundary exact path="/AdminManageAccounts" component={ManageAccounts} />
          <RouteWithErrorBoundary
            exact
            path="/AdminPatientRegistration/:id"
            component={PatientRegistration}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminFundAccount/:id"
            component={AdminFundAccount}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminPaymentForService/:id"
            component={PaymentForService}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminPatientProfile/:id"
            component={ViewPatientProfile}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminViewLabResults/:id"
            component={ViewLabResults}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminViewPreConsultationHistory/:id"
            component={ViewPreConsultationHistory}
          />
          <RouteWithErrorBoundary
            exact
            path="/ViewPreConsultationHistory"
            component={ViewPreConsultationHistory}
          />
          <RouteWithErrorBoundary exact path="/ChangePassword" component={ViewChangePassword} />
          <RouteWithErrorBoundary
            exact
            path="/AdminAllTransactions"
            component={AllTransactions}
          />
          <RouteWithErrorBoundary exact path="/AdminDrugReport" component={DrugReport} />
          <RouteWithErrorBoundary
            exact
            path="/AdminServiceRequestReport"
            component={ServiceRequestReport}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminRegistrationReport"
            component={RegistrationReport}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminExpiredDrugsReport"
            component={ExpiredDrugsReport}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminAllAccountTransactions"
            component={AllAccountTransactions}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminViewClarkingHistory/:id"
            component={ViewClarkingHistory}
          />
          <RouteWithErrorBoundary exact path="/AdminRegisterDrug" component={RegisterDrug} />
          <RouteWithErrorBoundary exact path="/AdminViewDrugs" component={ViewDrugs} />
          <RouteWithErrorBoundary exact path="/AdminViewDrug/:id" component={ViewDrug} />
          <RouteWithErrorBoundary
            exact
            path="/AdminManagePrescriptions"
            component={ManagePrescriptions}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminDrugPrescription/:id"
            component={DrugPrescription}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminManagePrescriptionInvoice"
            component={ManagePrescriptionInvoice}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminPaymentForPrescription/:id"
            component={PaymentForPrescription}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminViewAccountantProfile/:id"
            component={ViewAccountantProfile}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminViewPharmacistProfile/:id"
            component={ViewPharmacyProfile}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminViewLabProfile/:id"
            component={ViewLabProfile}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminViewNurseProfile/:id"
            component={ViewNurseProfile}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminViewWardPersonnelProfile/:id"
            component={ViewWardPersonnelProfile}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminViewPatientHealthHistory/:id"
            component={ViewPatientHealthHistory}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminViewReferredPatients"
            component={ReferredPatients}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminManageAdmissions"
            component={ManageAdmissions}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminManageAdmissionPrescriptions/:id"
            component={ManageAdmissionPrescriptions}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdmissionPrescribeDrug/:id"
            component={AdmissionPrescribeDrug}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminManageAdmissionInvoices/:id"
            component={ManageAdmissionInvoices}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminCreateAdmissionServiceRequest/:id"
            component={AdmissionCreateServiceRequest}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminManageAdmissionServiceRequest/:id"
            component={ManageServiceRequests}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminUploadAdmissionsServiceRequestResult/:id"
            component={UploadServiceRequestResult}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminViewAdmissionsServiceRequestResults/:id"
            component={ViewServiceRequestResults}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminPaymentForAdmissionInvoices/:id"
            component={PaymentForAdmissionInvoices}
          />

          <RouteWithErrorBoundary
            exact
            path="/AdminManageSurgeries"
            component={ManageSurgeries}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminSurgicalOperationNotes/:id"
            component={SurgicalOperationNotes}
          />
          <RouteWithErrorBoundary exact path="/AdminCreateNHIS" component={CreateNHIS} />
          <RouteWithErrorBoundary exact path="/AdminManageNHIS" component={ManageNHIS} />
          <RouteWithErrorBoundary
            exact
            path="/AdminManageNHISPatients/:id"
            component={ManagePatientsInNHIS}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminManageNHISDrugs/:id"
            component={ManageDrugsInNHIS}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminManageNHISServices/:id"
            component={ManageServicesInNHIS}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminAddUserToNHIS/:id"
            component={AddUserToNHIS}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminAddDrugToNHIS/:id"
            component={AddDrugToNHIS}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminAddServiceToNHIS/:id"
            component={AddServiceToNHIS}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminRequestSecondaryService/:id"
            component={RequestSecondaryService}
          />
          <RouteWithErrorBoundary exact path="/AdminCreateHMO" component={CreateHMO} />
          <RouteWithErrorBoundary exact path="/AdminManageHMO" component={ManageHMO} />
          <RouteWithErrorBoundary
            exact
            path="/AdminHMOPatientInvoiceReport"
            component={PatientInvoiceReport}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminHMODrugInvoiceReport"
            component={DrugInvoiceReport}
          />
          <RouteWithErrorBoundary
            exact
            path="/AdminHMOServiceInvoiceReport"
            component={ServiceInvoiceReport}
          />
          <RouteWithErrorBoundary exact path="/AdminRegisterAnteNatal" component={RegisterAntenatal} />
          <RouteWithErrorBoundary exact path="/AdminPrimaryNHISReports" component={PrimaryNHISReports} />
          <RouteWithErrorBoundary exact path="/AdminSecondaryNHISReports" component={SecondaryNHISReports} />
          <RouteWithErrorBoundary exact path="/AdminUpdateNursingReport/:id" component={UpdateNursingReport} />
          <RouteWithErrorBoundary exact path="/AdminManageNursingReports" component={ManageNursingReports} />
          <RouteWithErrorBoundary exact path="/AdminViewNursingReport/:id" component={ViewNursingReport} />
          <RouteWithErrorBoundary exact path="/AdminRegisterAnteNatal" component={RegisterAntenatal} />
          <RouteWithErrorBoundary exact path="/AdminManageAnteNatal" component={ManageAnteNatal} />
          <RouteWithErrorBoundary exact path="/AdminViewAntenatalRecords/:id" component={ViewAntenatalRecords} />
          <RouteWithErrorBoundary exact path="/AdminRegisterPostNatal" component={RegisterPostNatal} />

          <RouteWithErrorBoundary
            exact
            path="*"
            render={() => <Redirect to="/AdminDashboard" />}
          />
        </Switch>
      </AdminLayout>
    </BrowserRouter>
  );
}

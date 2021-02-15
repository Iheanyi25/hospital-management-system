// Admin - Dashboard
export const getAdminDashboardUrl = () => `/Admin/Dashboard`;
// Admin - Manage Accounts
export const postAdminAccountUrl = () => `/Admin/Account/CreateAccount`;
export const getAllAccountsUrl = (pageNumber, pageSize) =>
  `/Admin/Account/GetAllAccounts?PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const postAdminFundAccountsUrl = () => `/Admin/Account/FundAccount`;

// Admin - Manage Appointment
export const getDoctorAppointmentsUrl = () => `/Admin/GetDoctorAppointments`;
export const postAppointmentUrl = () => `/Admin/BookAppointment`;
export const deleteAppointmentUrl = () => `/Admin/DeleteAppointment`;
/* this endpoint will serve reassignment of appointment and reassignment of doctors*/
export const postReAssignmentUrl = (reAssignmentUrl) =>
  `/Admin/${reAssignmentUrl}`;

// Admin - Manage Consultations
export const getPatientConsultationsUrl = () =>
  `/Admin/GetPatientConsultations`;
export const getPatientConsultationCountUrl = () =>
  `/Admin/GetPatientConsultationCount`;
export const getPatientsUnattentedToCountUrl = () =>
  `/Admin/GetPatientsUnattendedToCount`;
export const getPatientsAttentedToCountUrl = () =>
  `/Admin/GetPatientsAttendedToCount`;
export const postBookConsultationUrl = () => `/Admin/BookConsultation`;
export const deleteConsultationUrl = () => `/Admin/DeleteConsultation`;
//ReAssignment of doctors shares url with reAssignment of appointment

// Admin - Manage Health Plans
export const getAllHealthPlansUrl = (pageNumber, pageSize) =>
  `/Admin/GetAllHealthPlans?PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const createHealthPlanUrl = () => `/Admin/CreateHealthPlan`;
export const updateHealthPlanUrl = () => `/Admin/UpdateHealthPlan`;
export const disableHealthPlanUrl = () => `/Admin/DisableHealthPlan`;

// Admin - Manage Profile
export const getAdminProfileUrl = (adminId) =>
  `/Admin/GetAdmin?AdminId=${adminId}`;
export const updateAdminBasicInfoUrl = () => `/Admin/UpdateAdminBasicInfo`;
export const updateAdminContactDetailsUrl = () =>
  `/Admin/UpdateAdminContactDetails`;
export const postDoctorSpecializationUrl = () =>
  `/Doctor/AddDoctorSpecialization`;
export const postDoctorSocialUrl = () => `/Doctor/AddDoctorSocial`;

// Admin - Manage Roles

// Admin - Manage Services Catgories
export const getAllServicesCategoryUrl = (pageNumber) =>
  `/Admin/GetAllServiceCategories?PageNumber=${pageNumber}&PageSize=${50}`;
export const getAllServicesInACategoryUrl = (serviceCatId) =>
  `/Admin/GetAllServicesInAServiceCategory?serviceCategoryId=${serviceCatId}`;
export const postServiceCategoryUrl = () => `/Admin/CreateServiceCategory`;
export const updateServiceCategoryUrl = () => `/Admin/UpdateServiceCategory`;
export const deleteServiceCategoryUrl = () => `/Admin/DeleteServiceCategory`;

// Admin - Manage Service Requests
export const getServiceRequestUrl = (serviceRequestId) =>
  `/Admin/GetServiceRequest/${serviceRequestId}`;
export const getAllServiceRequestInvoiceUrl = (PageNumber) =>
  `/Admin/GetAllServiceRequestInvoice?PageNumber=${PageNumber}&PageSize=${50}`;
export const postServiceRequestUrl = () => `/Admin/UploadServiceRequestResult`;
export const getServiceRequestResultForPatientUrl = (patientId) =>
  `/Admin/GetServiceRequestResultsForPatient/${patientId}`;
export const getServiceRequestResultUrl = (serviceRequestId) =>
  `/Admin/GetServiceRequestResults/${serviceRequestId}`;
export const getServicesInAnInvoiceUrl = (invoiceId, pageNumber) =>
  `/Admin/GetServicesInAnInvoice/${invoiceId}?PageNumber=${pageNumber}&PageSize=${50}`;
export const postPayForServicesUrl = () => `/Admin/PayForServices`;
export const postPayForServicesWithAccountUrl = () =>
  `/Admin/PayForServicesWithAccount`;

// Admin - Manage Services
export const getAllServicesUrl = (pageNumber) =>
  `/Admin/GetAllServices?PageNumber=${pageNumber}&PageSize=${50}`;
export const createServiceUrl = () => `/Admin/CreateService`;
export const updateServiceUrl = () => `/Admin/UpdateService`;
export const postRequestServicesUrl = () => `/Admin/RequestServices`;
export const deleteServiceUrl = () => `/Admin/DeleteService`;

// Admin - Manage Wards
export const getAllWardsUrl = (pageNumber) =>
  `/Admin/Ward/GetAllWards?PageNumber=${pageNumber}&PageSize=${50}`;
export const createWardUrl = () => `/Admin/Ward/CreateWard`;
export const updateWardUrl = () => `/Admin/Ward/UpdateWard`;
export const deleteWardUrl = () => `/Admin/Ward/DeleteWard`;

// Admin - Onboarding
export const registerUserUrl = () => `/Admin/Register`;
export const getRegistrationFeeInvoiceUrl = () =>
  `/Admin/GetRegistrationFeeInvoices`;
export const registerPatientUrl = () => `/Admin/RegisterPatient`;
export const getPatientRegistrationInvoiceUrl = (patientId) =>
  `/Admin/GetPatientRegistrationInvoice?patientId=${patientId}`;
export const postPayPatientRegistrationFeeUrl = () =>
  `/Admin/PayPatientRegistrationFee`;
export const postPayPatientRegistrationFeeWithAccountUrl = () =>
  `/Admin/PayPatientRegistrationFeeWithAccount`;

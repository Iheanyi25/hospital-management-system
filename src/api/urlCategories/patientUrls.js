// Patient - Manage Accounts
export const postPatientFundAccountUrl = () => `/Patient/Account/FundAccount`;
export const getPatientAccountBalanceUrl = (patientId) => `/Patient/Account/GetAccountBalance?PatientId=${patientId}`;
export const getPatientAccountTransactionsUrl = (patientId) => `/Patient/Account/GetPatientAccountTransactions?PatientId=${patientId}`;
export const getPatientAccountUrl = (patientId) => `/Patient/Account/GetAccount?PatientId=${patientId}`;


// Patient - Manage Profile
export const getPatientUrl = (patientId) =>
  `/Patient/GetPatient?id=${patientId}`;
export const getPatientsUrl = (pageNumber, pageSize) => `/Patient/GetPatients?PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const updatePatientBasicInfoUrl = () => `/Patient/UpdatePatientBasicInfo`;
export const updatePatientContactDetailsUrl = () => `/Patient/UpdatePatientContactDetails`;
export const updatePatientHealthDetailsUrl = () => `/Patient/UpdatePatientHealthDetails`;
export const getPatientHealthHistoryUrl = (patientId) => `/Patient/GetPatientHealthHistory?PatientId=${patientId}`;

// Patient - Preconsultation Management
export const getPatientPreConsultationUrl = (id) =>
  `/PatientPreConsultation/GetPatientPreConsultation?PatientId=${id}`;
export const updatePatientPreConsultationVitalsUrl = () =>
  `/PatientPreConsultation/UpdatePatientVitals`;
export const updatePatientPreConsultationBMIUrl = () =>
  `/PatientPreConsultation/UpdatePatientBMI`;

// Patient- Dashboard

// Patient- Manage Doctor Appointments
export const getPatientDashboardUrl = (patientId) =>
  `/Patient/Dashboard?PatientId=${patientId}`;

export const getPatientPendingAppointmentsUrl = (patientId, pageNumber, pageSize) =>
  `/Patient/GetPendingAppointments?PatientId=${patientId}&PageNumber=${pageNumber}&PageSize=${pageSize}`;
  export const getPatientCompletedAppointmentsUrl = (patientId,pageNumber, pageSize) =>
  `/Patient/GetCompletedAppointments?PatientId=${patientId}&PageNumber=${pageNumber}&PageSize=${pageSize}`;
  export const getPatientCancelledAppointmentsUrl = (patientId, pageNumber, pageSize) =>
  `/Patient/GetCanceledAppointments?PatientId=${patientId}&PageNumber=${pageNumber}&PageSize=${pageSize}`;
 
export const postPatientAppointmentUrl = () => `/Patient/BookAppointment`;
export const cancelPatientAppointmentUrl = (id) => `/Patient/CancelAnAppointment?AppointmentId=${id}`;

// Patient- Manage Doctor Consultation
export const getPendingConsultationsCountUrl = (patientId) =>
  `/Patient/GetPendingConsultationsCount?PatientId=${patientId}`;
export const getCompletedConsultationsCountUrl = (patientId) =>
  `/Patient/GetCompletedConsultationsCount?PatientId=${patientId}`;
export const getCanceledConsultationsCountUrl = (patientId) =>
  `/Patient/GetCanceledConsultationsCount?PatientId=${patientId}`;
export const getPatientAllConsulationsUrl = (patientId) =>
  `/Patient/GetAllConsultations?PatientId=${patientId}`;
export const getPatientPendingConsulationsUrl = (patientId, pageNumber, pageSize) =>
  `/Patient/GetPendingConsultations?PatientId=${patientId}&PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const getPatientCompletedConsulationsUrl = (patientId, pageNumber, pageSize) =>
  `/Patient/GetCompletedConsultations?PatientId=${patientId}&PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const getPatientCanceledConsulationsUrl = (patientId, pageNumber, pageSize) =>
  `/Patient/GetCanceledConsultations?PatientId=${patientId}&PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const getMyDoctors = (patientId) =>
  `/Doctor/GetDoctorsByPatient?PatientId=${patientId}`;
export const postPatientConsultationUrl = () => `/Patient/BookConsultation`;
// export const getPatientAllPendingConsulationsUrl = (patientId) =>
//   `/Patient/GetPendingConsultationsCount?PatientId=${patientId}`;
// export const getPatientAllCompletedConsulationsUrl = (patientId) =>
//   `/Patient/GetCompletedConsultationsCount?PatientId=${patientId}`;
// export const getPatientAllCancelledConsulationsUrl = (patientId) =>
//   `/Patient/GetCanceledConsultationsCount?PatientId=${patientId}`;
export const cancelPatientConsulationsUrl = (queueId) =>
  `/Patient/CancelConsultation?patientQueueId=${queueId}`;  

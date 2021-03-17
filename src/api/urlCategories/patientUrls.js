// Patient - Manage Accounts
export const postPatientFundAccountUrl = () => `/Patient/Account/FundAccount`;
export const getPatientAccountBalanceUrl = (patientId) => `/Patient/Account/GetAccountBalance?PatientId=${patientId}`;
export const getPatientAccountTransactionsUrl = (patientId) => `/Patient/Account/GetPatientAccountTransactions?PatientId=${patientId}`;
export const getPatientAccountUrl = (patientId) => `/Patient/Account/GetAccount?PatientId=${patientId}`;


// Patient - Manage Profile
export const getPatientUrl = (patientId) =>
  `/Patient/GetPatient?id=${patientId}`;
export const getPatientsUrl = () => `/Patient/GetPatients`;
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
export const getPatientPendingAppointmentsUrl = (patientId) =>
  `/Patient/GetPendingAppointments?PatientId=${patientId}`;
export const getPatientAllAppointmentsUrl = (patientId) =>
  `/Patient/ViewAllAppointments?PatientId=${patientId}`;
export const postPatientAppointmentUrl = () => `/Patient/BookAppointment`;
export const patientCancelAppointments = (patientId) => `/Patient/CancelAnAppointment?AppointmentId=${patientId}`;

// Patient- Manage Doctor Consultation
export const getPatientAllConsulationsUrl = (patientId) =>
  `/Patient/GetAllConsultations?PatientId=${patientId}`;
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

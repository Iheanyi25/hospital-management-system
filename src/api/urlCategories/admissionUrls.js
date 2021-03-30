// Admin - Manage Admission
export const getAdmissionsUrl = (wardId, pageNumber, pageSize) =>
  `/Admission/GetAdmissionsWithBed?WardId=${wardId}&PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const getAdmissionsWithoutBedUrl = (pageNumber, pageSize) =>
  `/Admission/GetAdmissionsWithoutBed?PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const assignPatientToBedSpaceUrl = () =>
  `/Admission/AssignPatientToBedspace`;
  export const postDischargePatientUrl = () => `Admission/DischargePatient`;
  export const getAdmissionDaysUrl = (admssionId) => `Admission/GetAdmissionDays?AdmissionId=${admssionId}`;  
  // Admission - Manage Admission Drug Dispensing
export const postAdmissionsRequestDrugUrl = () => `/Admission/RequestDrug`;
export const getDrugsInAnAdmissionInvoiceUrl = (invoiceId) =>
  `/Admission/GetDrugsInAnInvoice?invoiceId=${invoiceId}`;

// Admission - Manage Admission Invoices
export const getAdmissionTransactionsUrl = (admssionId, pageNumber, pageSize) =>
  `/Admission/GetAdmissionTransactions?AdmissionId=${admssionId}&PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const getAdmissionInvoiceUrl = (admssionId) =>
  `/Admission/GetAdmissionInvoice?AdmissionId=${admssionId}`;
export const postPayForAdmissionUrl = () => `/Admission/PayForAdmission`;
export const postPayForAdmissionWithAccountUrl = () =>
  `/Admission/PayForAdmissionWithAccount`;

// Admission - Manage Admission Notes
export const getAdmissionsDoctorsNotesUrl = (AdmissionId) =>
  `Admission/GetAdmissionNotesForAdmission?AdmissionId=${AdmissionId}`;
export const createAdmissionsNoteUrl = () => `Admission/CreateAdmissionNote`;

// Admission - Manage Admission Service Requests
export const postAdmissionsRequestServiceUrl = () =>
  `/Admission/RequestServices`;
export const getServiceRequestsInAnInvoiceUrl = (invoiceId) =>
  `/Admission/GetServiceRequestsInAnInvoice?AdmissionInvoiceId=${invoiceId}`;
export const getAdmissionServiceRequestUrl = (serviceRequestId) =>
  `/Admission/GetAdmissionServiceRequest/${serviceRequestId}`;
export const uploadServiceRequestResultUrl = () =>
  `/Admission/UploadServiceRequestResult`;
export const getAdmissionsServiceRequestResultUrl = (serviceRequestId) =>
  `/Admission/GetServiceRequestResults/${serviceRequestId}`;

// Admission - Manage Medications
export const getDrugMedicationsUrl = (admissionId, pageNumber, pageSize) =>
  `/Admission/GetDrugMedications?AdmissionId=${admissionId}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
export const createDrugMedicationUrl = () => `Admission/CreateDrugMedication`;
export const updateDrugMedicationStatusUrl = () =>
  `Admission/UpdateDrugMedicationStatus`;
  export const getServiceMedicationsUrl = (admissionId, pageNumber, pageSize) =>
  `/Admission/GetServiceMedications?AdmissionId=${admissionId}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
export const createServiceMedicationUrl = () => `Admission/CreateServiceMedication`;
export const updateServiceMedicationStatusUrl = () =>
  `Admission/UpdateServiceMedicationStatus`;


// Admission - Manage Observation Charts
export const getObservationChartUrl = (admissionId) =>
  `/Admission/GetObservationChart?AdmissionId=${admissionId}`;
export const postObservationChartUrl = () =>
  `/Admission/UpdateObservationChart`;

// Admission - Manage Wards
export const createWardUrl = () => `/Admission/Ward/CreateWard`;
export const createBedUrl = () => `/Admission/Ward/CreateBed`;
export const getAllWardsUrl = (pageNumber, pageSize) =>
  `/Admission/Ward/GetAllWards?PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const updateWardUrl = () => `/Admission/Ward/UpdateWard`;
export const deleteWardUrl = () => `/Admission/Ward/DeleteWard`;
export const getBedsInAWardUrl = (wardId, pageNumber, pageSize) =>
  `/Admission/Ward/GetBedsInAWard?WardId=${wardId}&PageNumber=${pageNumber}&PageSize=${pageSize}`;

// Admission - Manage Prescriptions
export const getPrescriptionForAdmssionUrl = (id) =>
  `/Admission/GetPrescription?PrescriptionId=${id}`;
export const getPrescriptionsForAdmissionUrl = (id, pageNumber, pageSize) =>
  `/Admission/GetPrescriptionsForAdmission?AdmissionId=${id}&PageNumber=${pageNumber}&PageSize=${pageSize}`;

// Admission - Manage Medications
// export const getDrugMedicationsUrl = (admissionId, pageNumber, pageSize) =>
//   `/Admission/GetDrugMedications?AdmissionId=${admissionId}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
// export const createDrugMedicationUrl = () => `Admission/CreateDrugMedication`;
export const updateMedicationStatusUrl = () => `Admission/UpdateMedicationStatus`;
// Admission - Manage Observation Charts
// export const getObservationChartUrl = (admissionId) =>
//   `/Admission/GetObservationChart?AdmissionId=${admissionId}`;
  // export const postObservationChartUrl = () =>
  // `/Admission/UpdateObservationChart`;
// Admission - Manage Medication
export const postAdministerDrugMedicationUrl = () =>
  `/Admission/AdministerDrugMedication`;

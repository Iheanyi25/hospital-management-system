// Admin - Manage Admission
export const getAdmissionsUrl = (wardId, pageNumber, pageSize) =>
  `/Admission/GetAdmissionsWithBed?WardId=${wardId}&PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const getAdmissionsWithoutBedUrl = (pageNumber, pageSize) =>
  `/Admission/GetAdmissionsWithoutBed?PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const assignPatientToBedSpaceUrl = () =>
  `/Admission/AssignPatientToBedspace`;

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

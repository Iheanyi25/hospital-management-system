// Doctor - Manage Appointments
export const getDoctorAllAppointmentsUrl = (doctorId) =>
  `/Doctor/ViewAllAppointments?DoctorId=${doctorId}`;
export const getDoctorAppointmentsRejectedUrl = (doctorId, pageNumber, pageSize) =>
  `/Doctor/GetDoctorAppointmentsRejected?DoctorId=${doctorId}&PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const postDoctorAcceptAppointmentUrl = (appointmentId) =>
  `/Doctor/AcceptAnAppointment?AppointmentId=${appointmentId}`;
export const postDoctorRejectAppointmentUrl = () =>
  `/Doctor/RejectAnAppointment`;
export const postDoctorCancelAppointmentUrl = (appointmentId) =>
  `/Doctor/CancelAnAppointment?AppointmentId=${appointmentId}`;

// Doctor - Manage Clerking
export const getPatientClarkingHistoryUrl = (id) =>
  `/Doctor/GetClerkingHistoryForPatient?PatientId=${id}`;
export const getPatientClarkingHistoryByAppointmentOrConsultationUrl = (id) =>
  `/Doctor/GetClerkingByAppointmentOrConsultation?Id=${id}`;
export const updatePatientClerkingUrl = (id, type, userId, patientId) =>
  `/Doctor/UpdatePatientClerking?Id=${id}&IdType=${type}&UserId=${userId}&PatientId=${patientId}`;
export const postAdmitOrSendPatientHomeUrl = () =>
  `/Doctor/AdmitOrSendPatientHome`;

//Doctor - Manage  Consultation 
export const getDoctorAllConsultationsUrl = (doctorId) =>
  `/Doctor/ViewAllConsultations?DoctorId=${doctorId}`;
export const getConsultationsWithDoctorUrl = (doctorId, pageNumber, pageSize) =>
  `/Doctor/GetConsultationsWithDoctor?DoctorId=${doctorId}&PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const getConsultationsCompletedWithDoctorUrl = (doctorId, pageNumber, pageSize) =>
  `/Doctor/GetConsultationsCompleted?DoctorId=${doctorId}&PageNumber=${pageNumber}&PageSize=${pageSize}`;

// Doctor - Manage Surgery
export const getDoctorSurgeryUrl = (SurgeryId) =>
  `/Doctor/GetSurgery?SurgeryId=${SurgeryId}`;
export const getDoctorAllSurgeriesUrl = (pageNumber,pageSize) =>
  `/Doctor/GetSurgeries?PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const createDoctorSurgeryUrl = () =>`/Doctor/CreateSurgery`;
export const updateSurgeryOperationNoteOneUrl = () =>`/Doctor/UpdateOperationNoteOne`;
export const updateSurgeryOperationNoteTwoUrl = () =>`/Doctor/UpdateOperationNoteTwo`;
export const updateSurgeryOperationProcedureUrl = () =>`/Doctor/UpdateOperationProcedure`;


// Doctor- Dashboard
export const getDoctorDashboardUrl = (doctorId) =>
  `/Doctor/Dashboard?doctorId=${doctorId}`;

// Doctor- Manage Profile
export const getDoctorUrl = (doctorId) =>
  `/Doctor/GetDoctor?DoctorId=${doctorId}`;
export const getMyPatients = (doctorId) =>
  `/Patient/GetPatientsByDoctor?DoctorId=${doctorId}`;
export const getDoctorsUrl = () => `/Doctor/GetDoctors`;
export const postDoctorEducationUrl = () => `/Doctor/AddDoctorEducation`;
export const postDoctorExperienceUrl = () => `/Doctor/AddDoctorExperience`;
export const postDoctorOfficeTimeUrl = () => `/Doctor/AddDoctorOfficeTime`;
export const updateDoctorContactDetailsUrl = () =>
  `/Doctor/UpdateDoctorContactDetails`;
export const getDoctorsBySpecializationUrl = (spec) =>
  `/Doctor/GetDoctorsBySpecialization?specialiazation=${spec}`;

export const getDoctorAvailabilityUrl = (doctorId) =>
  `/Doctor/GetDoctorAvailability?DoctorId=${doctorId}`;

export const updateDoctorAvailabilityUrl = (doctorId) =>
  `/Doctor/UpdateDoctorAvailability?DoctorId=${doctorId}`;
export const updateDoctorBasicInfoUrl = () => `/Doctor/UpdateDoctorBasicInfo`;
export const UpdateDoctorContactDetailsUrl = () =>
  `/Doctor/UpdateDoctorContactDetails`;
export const UpdateDoctorProfessionalDetailsUrl = () =>
  `/Doctor/UpdateDoctorProfessionalDetails`;
/*handles all the delete endpoints under doctor profile*/
export const deleteDoctorProfileInfoUrl = (deleteInfoUrl, id) =>
  `/Doctor/${deleteInfoUrl}/${id}`;

// admit or send patient
export const postDoctorAdmitOrSendPatientHomeUrl = () =>
  `Doctor/AdmitOrSendPatientHome`;

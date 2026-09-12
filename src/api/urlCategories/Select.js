const baseUrl = "Select";

export const getAllUnpaginatedRolesUrl = () => `${baseUrl}/all-roles`;
export const getAllBursaryFeeInvoiceTypesUrl = () =>
	`${baseUrl}/bursary-fee-invoice-types`;
export const getYearsUrl = () => `${baseUrl}/exam-year`;
export const getAllServiceTypesUrl = () => `${baseUrl}/service-types`;
export const getApplicationTypesUrl = () => `${baseUrl}/application-types`;
export const getStudentTypesUrl = () => `${baseUrl}/student-types`;
export const getOLevelExamTypesUrl = () => `${baseUrl}/o-level-exam-types`;
export const getOLevelSubjectsUrl = () => `${baseUrl}/o-level-subjects`;
export const getPutmeSubjectsUrl = () => `${baseUrl}/utme-subjects`;
export const getJambSubjectsUrl = () => `${baseUrl}/jamb-subjects`;
export const getJupebApplicationTypesUrl = () =>
	`${baseUrl}/sub-degree-application-type`;
export const getCSEApplicationTypesUrl = () =>
	`${baseUrl}/cse-application-type`;
export const getSchoolProgrammesUrl = ({ studentTypeId }) =>
	`${baseUrl}/school-programmes/${studentTypeId}`;
export const yearOfStudyUrl = ({ studentTypeId }) =>
	`${baseUrl}/levels/${studentTypeId}`;
export const getServicesTypesUrl = () => `${baseUrl}/service-types`;
export const getCSEAwardsUrl = () => `${baseUrl}/cse-awards`;
export const getCSECoursesUrl = () => `${baseUrl}/cse-courses`;
export const getPGProgrammesUrl = () => `${baseUrl}/pg-programmes`;
export const getLevelForBorrowCoursesUrl = (userId) =>
	`${baseUrl}/level-for-borrowing-courses${
		userId ? `?userId=${userId}` : ""
	}`;
export const getPGCertificateTypesUrl = () => `${baseUrl}/pg-certificate-types`;
export const getAllDepartmentsWithoutValuesUrl = () => `${baseUrl}/departments`;
export const getAllFacultiesUrl = () => `${baseUrl}/faculties`;

export const getAllSelectLevels = () => `${baseUrl}/all-levels`;
export const getAllPgAreasOfSpecialization = () =>
	`${baseUrl}/pg-areas-of-specialization`;

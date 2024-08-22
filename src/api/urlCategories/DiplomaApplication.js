const baseUrl = "DiplomaApplication";

export const getDiplomaApplication = (rrr) =>
	`${baseUrl}/load-application-form?rrr=${rrr}`;
export const setDiplomaApplicationPersonalDetails = () =>
	`${baseUrl}/store-diploma-application-personal-details`;
export const setDiplomaApplicationProgrammeDetails = () =>
	`${baseUrl}/store-diploma-application-programme-details`;
export const setDiplomaApplicationOlevelDetails = () =>
	`${baseUrl}/store-diploma-application-olevel-details`;
export const setDiplomaApplicationEducationalRecords = () =>
	`${baseUrl}/store-diploma-application-education-history-details`;
export const setDiplomaApplicationEmploymentHistory = () =>
	`${baseUrl}/store-diploma-application-employment-details`;

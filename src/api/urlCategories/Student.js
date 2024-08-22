import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "Student";
export const getStudentProfileUrl = ({ refCode = false }) =>
	`${baseUrl}/student-profile${refCode ? `?&userId=${refCode}` : ""}`;
export const createStudentProfileUrl = () =>
	`${baseUrl}/create-student-profile`;
export const getInitialStudentProfileUrl = (jambRegNumber) =>
	`${baseUrl}/student-initial-profile?jambRegNumber=${jambRegNumber}`;
export const updateStudentProfileUrl = ({ refCode = false }) =>
	`${baseUrl}/update-student-profile${refCode ? `?&userId=${refCode}` : ""}`;
export const getStudentsUrl = (filter) =>
	`${baseUrl}/student-records?${generateUrlParams(filter)}`;
export const getStudentSiwesUrl = () => `${baseUrl}/student-siwes`;
export const addOrUpdateStudentSiwesDetailsUrl = () =>
	`${baseUrl}/add-or-update-student-siwes-details`;
export const getMatricNumberGenerationReportsUrl = (filter) =>
	`${baseUrl}/matric-number-report?${generateUrlParams(filter)}`;
export const downloadMatricNumberGenerationReportsUrl = (filter) =>
	`${baseUrl}/download-matric-number-report?${generateUrlParams(filter)}`;
export const applyForChangeDepartmentUrl = () =>
	`${baseUrl}/apply-for-change-of-department`;
export const activateStudentUrl = () => `${baseUrl}/activate-student`;
export const deactivateStudentUrl = () => `${baseUrl}/deactivate-student`;
export const getAllStudentsUrl = (filter) =>
	`${baseUrl}/get-students?${generateUrlParams(filter)}`;
export const updateStudentStaffStatusUrl = (userId) =>
	`${baseUrl}/update-student-staff-status?userId=${userId}`;

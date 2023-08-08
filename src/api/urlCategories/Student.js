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
export const getMatricNumberGenerationReportsUrl = (filter) =>
	`${baseUrl}/matric-number-report?${generateUrlParams(filter)}`;
export const downloadMatricNumberGenerationReportsUrl = (filter) =>
	`${baseUrl}/download-matric-number-report?${generateUrlParams(filter)}`;

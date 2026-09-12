import { generateUrlParams } from "../../utils/generateUrlParams";
const baseUrl = "Application";

export const getAllApplicationTypesUrl = (filter) =>
	`${baseUrl}/all-application-types?${generateUrlParams(filter)}`;
export const getAllApplicationTypesUnpaginatedUrl = () =>
	`${baseUrl}/all-application-types-unpaginated`;
export const createApplicationTypeUrl = () =>
	`${baseUrl}/create-application-type`;
export const editApplicationTypeUrl = (id) =>
	`${baseUrl}/update-application-types/${id}`;
export const toggleApplicationStatusUrl = (id) =>
	`${baseUrl}/toggle-application-type-status/${id}`;
export const toggleOpenCloseApplicationStatusUrl = (id) =>
	`${baseUrl}/close-or-open-application-type/${id}`;
export const deleteApplicationTypeUrl = (id) =>
	`${baseUrl}/delete-application-type/${id}`;
export const getApplicationUrl = (id, rrr) =>
	`${baseUrl}/applications?ApplicationTypeId=${id}&RRR=${rrr}`;
export const resetApplicationsUrl = () => `${baseUrl}/reset-applications`;
export const getApplicationReportsUrl = (filter) =>
	`${baseUrl}/get-application-reports?${generateUrlParams(filter)}`;
export const downloadApplicationReportUrl = (filter) =>
	`${baseUrl}/download-application-report?${generateUrlParams(filter)}`;
export const downloadApplicationDocumentsUrl = (filter) =>
	`${baseUrl}/download-application-document?${generateUrlParams(filter)}`;
export const downloadApplicationFileUrl = (filter) =>
	`${baseUrl}/download-applicant-file?${generateUrlParams(filter)}`;
export const getPGApplicationTypesUrl = () => `${baseUrl}/pg-application-types`;

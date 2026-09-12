import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "AdmissionList";

//global admission list search
export const getSearchAdmissionList = (filter) =>
	`${baseUrl}/search-admission-list?${generateUrlParams(filter)}`;
//an object containing all the params and their values is passed to the generateUrlParams function
export const getAdmissionList = (filter) =>
	`${baseUrl}/admission-list?${generateUrlParams(filter)}`;

export const getClearanceInfoUrl = (filter) =>
	`${baseUrl}/admission-clearance-list?${generateUrlParams(filter)}`;
export const updateClearanceStatusUrl = () =>
	`${baseUrl}/update-admission-clearance-status`;

export const downloadAdmissionsListTemplateUrl = () =>
	`${baseUrl}/download-sample-sheet`;
export const bulkUploadAdmissionListUrl = () =>
	`${baseUrl}/upload-admission-list`;
export const singleUploadAdmissionListUrl = () =>
	`${baseUrl}/upload-admission-record`;
export const updateAdmissionListRecordUrl = (admissionListId) =>
	`${baseUrl}/update-admission-list-record/${admissionListId}`;
export const deleteAdmissionListRecordUrl = (admissionListId) =>
	`${baseUrl}/admission-list-record/${admissionListId}`;
export const deleteAdmissionListUrl = (filter) =>
	`${baseUrl}?${generateUrlParams(filter)}`;
export const downloadAdmissionListReportsUrl = (filter) =>
	`${baseUrl}/download-admission-list-report?${generateUrlParams(filter)}`;
export const getAdmissionListReportsUrl = (filter) =>
	`${baseUrl}/admission-list-report?${generateUrlParams(filter)}`;

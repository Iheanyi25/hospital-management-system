import { generateUrlParams } from "../../utils/generateUrlParams";
const baseUrl = "Application";

export const getAllApplicationTypesUrl = (filter) =>
	`${baseUrl}/all-application-types?${generateUrlParams(filter)}`;
export const getAllApplicationTypesUnpaginatedUrl = (filter) =>
	`${baseUrl}/all-application-types-unpaginated`;
export const createApplicationTypeUrl = () =>
	`${baseUrl}/create-application-type`;
export const editApplicationTypeUrl = (id) =>
	`${baseUrl}/update-application-types/${id}`;
export const toggleApplicationStatusUrl = (id) =>
	`${baseUrl}/toggle-application-type-status/${id}`;
export const deleteApplicationTypeUrl = (id) =>
	`${baseUrl}/delete-application-type/${id}`;
export const getApplicationUrl = (id, rrr) =>
	`${baseUrl}/applications?ApplicationTypeId=${id}&RRR=${rrr}`;
export const resetApplicationsUrl = () => `${baseUrl}/reset-applications`;

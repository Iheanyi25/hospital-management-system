import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "Faculty";

export const getFacultiesUrl = (studentTpeId) =>
	`${baseUrl}/${studentTpeId}/faculties`;
export const getApplicationFacultiesUrl = (applicationTypeId) =>
	`${baseUrl}/${applicationTypeId}/application-faculty`;
export const getAllDeansUrl = (filter) =>
	`${baseUrl}/deans?${generateUrlParams(filter)}`;
export const assignDeantoFacultyUrl = () => `${baseUrl}/assign-dean-to-faculty`;
export const getAllPaginatedFacultiesUrl = (filter) =>
	`${baseUrl}/all-faculties-paginated?${generateUrlParams(filter)}`;
export const toggleFacultyActivationStatusUrl = (id) =>
	`${baseUrl}/faculty/${id}/toggle-activation`;
export const createFacultyUrl = () => `${baseUrl}/create-faculty`;
export const bulkFacultiesUploadUrl = () => `${baseUrl}/upload-faculties`;
export const downloadFacultyExcelTemplateUrl = () =>
	`${baseUrl}/download-faculty-upload-template`;
export const updateFacultyUrl = () => `${baseUrl}/update-faculty`;
export const deleteFacultyUrl = (id) =>
	`${baseUrl}/delete-faculty?facultyId=${id}`;

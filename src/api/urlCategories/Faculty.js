import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "Faculty";

export const getFacultiesUrl = (studentTpeId) =>
	`${baseUrl}/${studentTpeId}/faculties`;
export const getAllDeansUrl = (filter) =>
	`${baseUrl}/deans?${generateUrlParams(filter)}`;
export const assignDeantoFacultyUrl = () => `${baseUrl}/assign-dean-to-faculty`;

import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "Department";

export const getDepartmentsUrl = (studentTypeId, facultyId) =>
	`${baseUrl}/${studentTypeId}${
		facultyId ? `/${facultyId}` : ""
	}/departments`;
export const getAllDepartmentsUrl = () => `${baseUrl}/departments`;
export const getDepartmentOptionUrl = ({ departmentId }) =>
	`${baseUrl}/${departmentId}/departmentoptions`;
export const getAllHODsUrl = (filter) =>
	`${baseUrl}/hods?${generateUrlParams(filter)}`;
export const assignHODToDepartmentUrl = () =>
	`${baseUrl}/assign-hod-to-department`;
export const jupebCourseOptionsUrl = () => `${baseUrl}/jupeb-options`;
export const jupebCourseOptionsSubjectUrl = (jupebOptionsId) =>
	`${baseUrl}/${jupebOptionsId}/jupeb-options-subjects`;
export const getLecturerDepartmentsUrl = () =>
	`${baseUrl}/departments-for-result-approval`;

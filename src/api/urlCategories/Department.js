import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "Department";

export const getDepartmentsUrl = (studentTypeId, facultyId) =>
	`${baseUrl}/${studentTypeId}${
		facultyId ? `/${facultyId}` : ""
	}/departments`;
export const getApplicationDepartmentsUrl = (applicationTypeId, facultyId) =>
	`${baseUrl}/${applicationTypeId}${
		facultyId ? `/${facultyId}` : ""
	}/application-departments`;
export const getAllDepartmentsUrl = () => `${baseUrl}/all-departments`;
export const getDepartmentOptionUrl = ({ departmentId, studentTypeId }) =>
	`${baseUrl}${
		studentTypeId ? `/${studentTypeId}` : ""
	}/${departmentId}/departmentoptions`;

export const getAllHODsUrl = (filter) =>
	`${baseUrl}/hods?${generateUrlParams(filter)}`;
export const assignHODToDepartmentUrl = () =>
	`${baseUrl}/assign-hod-to-department`;
export const jupebCourseOptionsUrl = () => `${baseUrl}/jupeb-options`;
export const jupebCourseOptionsSubjectUrl = (jupebOptionsId) =>
	`${baseUrl}/${jupebOptionsId}/jupeb-options-subjects`;
export const getLecturerDepartmentsUrl = () =>
	`${baseUrl}/departments-for-result-approval`;
export const getDepartmentJupebOptionsUrl = () => `${baseUrl}/jupeb-options`;
export const getDepartmentJupebOptionsSubjects = (jupebOptionsId) =>
	`${baseUrl}/${jupebOptionsId}/jupeb-options-subjects`;
export const getAllDepartmentActiveSessionsUrl = (filter) =>
	`${baseUrl}/get-all-depts-active-sessions?${generateUrlParams(filter)}`;
export const setDepartmentActiveSessionUrl = () =>
	`${baseUrl}/set-active-session`;
export const rollbackDepartmentActiveSessionUrl = () =>
	`${baseUrl}/rollback-active-session`;
export const assignLevelCourseAdvisersUrl = () =>
	`${baseUrl}/assign-level-course-adviser`;
export const getLevelCourseAdvisersUrl = (filter) =>
	`${baseUrl}/get-department-level-course-advisers?${generateUrlParams(
		filter
	)}`;

export const getAllPaginatedDepartmentsUrl = (filter) =>
	`${baseUrl}/get-paginated-departments?${generateUrlParams(filter)}`;
export const toggleDepartmentActivationStatusUrl = (id) =>
	`${baseUrl}/toggle-department-activation?departmentId=${id}`;
export const createDepartmentUrl = () => `${baseUrl}/create-department`;
export const bulkDepartmentsUploadUrl = () => `${baseUrl}/upload-departments`;
export const downloadDepartmentExcelTemplateUrl = () =>
	`${baseUrl}/download-department-upload-template`;
export const updateDepartmentUrl = () => `${baseUrl}/update-department`;
export const deleteDepartmentUrl = (id) =>
	`${baseUrl}/delete-department?departmentId=${id}`;

export const getAllPaginatedOptionsUrl = (filter) =>
	`${baseUrl}/get-paginated-departments-options?${generateUrlParams(filter)}`;
export const toggleOptionActivationStatusUrl = (id) =>
	`${baseUrl}/toggle-option-activation?optionId=${id}`;
export const createOptionUrl = () => `${baseUrl}/create-option`;
export const bulkOptionsUploadUrl = () => `${baseUrl}/upload-options`;
export const downloadOptionExcelTemplateUrl = () =>
	`${baseUrl}download-department-upload-template`;
export const updateOptionUrl = () => `${baseUrl}/update-department-option`;
export const deleteOptionUrl = (id) =>
	`${baseUrl}/delete-department-option?optionId=${id}`;

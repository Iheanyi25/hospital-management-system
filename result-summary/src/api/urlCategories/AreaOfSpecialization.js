import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "AreaOfSpecialization";

//global admission list search
export const createAreaOfSpecializationUrl = () =>
	`${baseUrl}/create-area-of-specialization`;

export const deleteAreaOfSpecializationUrl = (id) =>
	`${baseUrl}/delete-area-of-specialization?areaOfSpecializationId=${id}`;

export const toggleAreaOfSpecializationActivationUrl = (id) =>
	`${baseUrl}/toggle-area-of-specialization-activation?areaOfSpecializationId=${id}`;
export const updateAreaOfSpecializationActivationUrl = () =>
	`${baseUrl}/update-area-of-specialization-activation`;
export const downloadAreaOfSpecializationUploadTemplateUrl = () =>
	`${baseUrl}/download-area-of-specialization-upload-template`;
export const uploadAreaOfSpecializationUrl = () =>
	`${baseUrl}/upload-area-of-specialization`;
export const getPaginatedAreaOfSpecializationUrl = (filter) =>
	`${baseUrl}/get-paginated-area-of-specializations${
		filter ? `?${generateUrlParams(filter)}` : ""
	}`;

export const getAreaOfSpecializationUrl = (id) =>
	`${baseUrl}/get-area-of-specialization?areaOfSpecializationId=${id}`;
export const getAreaOfSpecializationByDepartmentUrl = (
	id = "",
	programmeId = ""
) =>
	`${baseUrl}/get-area-of-specializations-by-department${
		(id || programmeId) && `?departmentId=${id}&programId=${programmeId}`
	}`;

export const getAllAreasOfSpecializationUrl = () =>
	`${baseUrl}/get-all-areas-of-specialization`;
export const assignAreaOfSpecializationToProgrammeUrl = () =>
	`${baseUrl}/assign-area-of-specialization-to-programme`;

import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "Lecturer";

export const getLecturerProfileUrl = () => `${baseUrl}/lecturer`;
export const updateLecturerProfileUrl = () =>
	`${baseUrl}/update-lecturer-profile`;
export const getLecturersUrl = (filter) =>
	`${baseUrl}/lecturers?${generateUrlParams(filter)}`;
export const downloadLecturerListTemplateUrl = () =>
	`${baseUrl}/lecturer-upload-sample-sheet`;
export const bulkUploadLecturerListUrl = () =>
	`${baseUrl}/upload-lecturer-profile`;
export const createNewLecturerUrl = () => `${baseUrl}/create-lecturer-profile`;
export const singleLecturerEditUrl = (id) =>
	`${baseUrl}/update-lecturer-profile?userId=${id}`;
export const getAllLecturerCourses = (filter) =>
	`${baseUrl}/lecturer-courses?${generateUrlParams(filter)}`;
export const postLecturerCourseUpdate = () =>
	`${baseUrl}/assign-or-update-lecturer-course`;

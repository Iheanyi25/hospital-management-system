import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "CourseManagement";
export const getLecturerCourses = (filter) =>
	`${baseUrl}/view-lecturer-courses?${generateUrlParams(filter)}`;
export const editAssignCourseToLecturer = (lecturerId) =>
	`${baseUrl}/assign-courses-to-lecturer/${lecturerId}`;
export const postCourseSingUploadUrl = () => `${baseUrl}/course`;
export const downloadCourseSampleUrl = () =>
	`${baseUrl}/download-excel-template`;
export const postCourseBulkUUrl = () => `${baseUrl}/bulk-upload`;
export const editUploadedCourseUrl = (courseId) =>
	`${baseUrl}/course/${courseId}`;
export const getCoursesToManageUrl = (filter) =>
	`${baseUrl}/all-courses?${generateUrlParams(filter)}`;
export const assignCoursesToDeptsUrl = () => `${baseUrl}/course-assignment`;
export const getCoursesAssignedToDeptsUrl = (filter) =>
	`${baseUrl}/all-course-assignments?${generateUrlParams(filter)}`;
export const getUnitLoadsToManageUrl = (filter) =>
	`${baseUrl}/department-unit-loads?${generateUrlParams(filter)}`;
export const editCourseAssignedToDeptsUrl = (courseId) =>
	`${baseUrl}/course-assignment/${courseId}`;
export const toggleCourseAssignedActivationUrl = (id) =>
	`${baseUrl}/course-assignment/${id}/toggle-activation`;
export const editUnitLoadsToManageUrl = (unitLoadId) =>
	`${baseUrl}/department-unit-loads/${unitLoadId}`;
export const getCourseRegsToToggleUrl = (filter) =>
	`${baseUrl}/open-or-close-course-reg?${generateUrlParams(filter)}`;
export const toggleCourseRegistrationOpenCloseUrl = (id) =>
	`${baseUrl}/open-or-close-course-reg/${id}/toggle-activation`;
export const getAllowableUnitsForStudentUrl = (filter) =>
	`${baseUrl}/manage-student-unit-load?${generateUrlParams(filter)}`;
export const editAllowableUnitsForStudentUrl = (filter) =>
	`${baseUrl}/manage-student-unit-load?${generateUrlParams(filter)}`;
export const getCoursesToAddOrDropUrl = (filter) =>
	`${baseUrl}/add-or-drop-courses?${generateUrlParams(filter)}`;
export const getRegistrableCoursesUrl = (filter) =>
	`${baseUrl}/add-or-drop-courses/registrable-courses?${generateUrlParams(
		filter
	)}`;
export const addCoursesUrl = () => `${baseUrl}/add-or-drop-courses/add-courses`;
export const cloneCourseAssignmentUrl = () => `${baseUrl}/clone-course-assignment`;
export const dropCourseUrl = (courseId) =>
	`${baseUrl}/add-or-drop-courses/drop-courses/${courseId}`;
export const downloadStudentUnitLoadSampleUrl = () =>
	`${baseUrl}/download-student-unit-load-sample-sheet`;
export const downloadUserUploadTemplate = () =>
	`${baseUrl}/user-upload-sample-sheet`;
export const toggleCourseStatusUrl = (courseId) =>
	`${baseUrl}/toggle-course-status/${courseId}`;
export const uploadBulkStudentUnitLoadUrl = () =>
	`${baseUrl}/upload-students-unit-load`;
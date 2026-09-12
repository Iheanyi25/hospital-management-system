import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "courseRegistration";

export const postCourseRegistrationUrl = () => `${baseUrl}/register`;

export const getCourseRegistrationApprovalStatusUrl = ({
	sessionId,
	semester
}) =>
	`${baseUrl}/coursesapprovalstatus?sessionId=${sessionId}&semester=${semester}`;

export const getCoursesForRegistrationUrl = ({
	sessionId,
	semester,
	yearOfStudyId
}) =>
	`${baseUrl}/registrable-courses?sessionId=${sessionId}&semesterId=${semester}&levelId=${yearOfStudyId}`;

export const getRegisteredCoursesHistoryUrl = () => `${baseUrl}/history`;

export const getBorrowCoursesUrl = ({
	sessionId,
	departmentId,
	registerLevelId,
	semester,
	borrowLevelId,
	departmentOptionId
}) =>
	`${baseUrl}/borrowable-courses?sessionId=${sessionId}&departmentId=${departmentId}&semesterId=${semester}&registerLevelId=${registerLevelId}&borrowLevelId=${borrowLevelId}${
		departmentOptionId ? `&departmentOptionId=${departmentOptionId}` : ""
	}`;

export const getRegisteredCoursesUrl = ({
	sessionId,
	semester,
	yearOfStudyId
}) =>
	`${baseUrl}/?sessionId=${sessionId}&semesterId=${semester}&levelId=${yearOfStudyId}`;
export const getCourseApprovalUrl = (filter) =>
	`${baseUrl}/course-registration-approval?${generateUrlParams(filter)}`;
export const geRegisteredCoursesForApprovalUrl = (filter) =>
	`${baseUrl}/course-approval/registered-courses?${generateUrlParams(
		filter
	)}`;
export const postCourseApprovalUrl = () =>
	`${baseUrl}/approve-course-registration`;

export const getCourseRegsToToggleUrl = (filter) =>
	`${baseUrl}/open-or-close-course-registration?${generateUrlParams(filter)}`;
export const toggleCourseRegistrationOpenCloseUrl = (id) =>
	`${baseUrl}/open-or-close-course-registration/${id}/toggle-activation`;

export const getCoursesToAddOrDropUrl = (filter) =>
	`${baseUrl}/add-or-drop-courses?${generateUrlParams(filter)}`;

export const dropCourseUrl = (courseId) =>
	`${baseUrl}/add-or-drop-courses/drop-courses/${courseId}`;

export const addCoursesUrl = () => `${baseUrl}/add-or-drop-courses/add-courses`;
export const getRegistrableCoursesUrl = (filter) =>
	`${baseUrl}/add-or-drop-courses/registerable-courses?${generateUrlParams(
		filter
	)}`;
export const studentOpenCloseCourseRegUrl = (filter) =>
	`${baseUrl}/open-or-close-student-course-registration?${generateUrlParams(
		filter
	)}`;
export const approveAllCoursesUrl = () =>
	`${baseUrl}/bulk-approve-course-registration`;
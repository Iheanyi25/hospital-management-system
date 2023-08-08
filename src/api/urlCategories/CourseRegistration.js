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

export const getBorrowCoursesUrl = (filter) =>
	`${baseUrl}/borrowable-courses?${generateUrlParams(filter)}`;

export const getRegisteredCoursesUrl = ({
	sessionId,
	semester,
	yearOfStudyId
}) =>
	`${baseUrl}/registered-courses?sessionId=${sessionId}&semesterId=${semester}&levelId=${yearOfStudyId}`;
export const getCourseApprovalUrl = (filter) =>
	`${baseUrl}/course-approval?${generateUrlParams(filter)}`;
export const geRegisteredCoursesForApprovalUrl = (filter) =>
	`${baseUrl}/course-approval/registered-courses?${generateUrlParams(
		filter
	)}`;
export const postCourseApprovalUrl = () => `${baseUrl}/course-approval`;
export const getCourseRegistrationReportUrl = (filter) =>
	`${baseUrl}/course-registered-report?${generateUrlParams(filter)}`;
export const downloadCourseRegistrationReportUrl = (filter) =>
	`${baseUrl}/download-course-registered-report?${generateUrlParams(filter)}`;

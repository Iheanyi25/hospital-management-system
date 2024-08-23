import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "Lecturer";

export const getLecturerCoursesUrl = ({ sessionId, semesterId }) =>
	`${baseUrl}/lecturer-courses-assigned?sessionId=${sessionId}&semesterId=${semesterId}`;
export const getAdviserClassListUrl = (filter) =>
	`${baseUrl}/get-course-adviser-student?${generateUrlParams(filter)}`;

export const downloadAdviserClassListUrl = (filter) =>
	`${baseUrl}/download-course-adviser-student-report?${generateUrlParams(
		filter
	)}`;

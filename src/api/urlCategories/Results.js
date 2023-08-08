import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "Results";

export const getLecturerCoursesUrl = ({ sessionId, semesterId }) =>
	`${baseUrl}/lecturer-courses-assigned?sessionId=${sessionId}&semesterId=${semesterId}`;
export const getClassListUrl = ({ departmentCourseId, sessionId }) =>
	`${baseUrl}/classlist?departmentCourseId=${departmentCourseId}&sessionId=${sessionId}`;
export const downloadClassListUrl = ({ departmentCourseId, sessionId }) =>
	`${baseUrl}/download-class-list?departmentCourseId=${departmentCourseId}&sessionId=${sessionId}`;
export const getResultsUrl = ({ departmentCourseId, sessionId }) =>
	`${baseUrl}/course-grades?departmentCourseId=${departmentCourseId}&sessionId=${sessionId}`;
export const downloadScoreSheetUrl = ({ departmentCourseId, sessionId }) =>
	`${baseUrl}/download-score-sheet?departmentCourseId=${departmentCourseId}&sessionId=${sessionId}`;
export const uploadScoreSheetUrl = ({ departmentCourseId }) =>
	`${baseUrl}/upload-result-score-sheet?departmentCourseId=${departmentCourseId}`;
export const getStudentCGPAsUrl = () => `${baseUrl}/studentCgpas`;
export const getStudentSemesterResultUrl = (sessionId, semester) =>
	`${baseUrl}/studentSemesterResult?sessionId=${sessionId}&semester=${semester}`;
export const getGradeSheetUrl = ({ departmentCourseId, sessionId }) =>
	`${baseUrl}/download-grade-sheet?departmentCourseId=${departmentCourseId}&sessionId=${sessionId}`;
export const studentCompositeResultsUrl = (filter) =>
	`${baseUrl}/students-composite-results?${generateUrlParams(filter)}`;
	export const studentSenateCompositeResultsUrl = (filter) =>
	`${baseUrl}/students-senate-composite-results?${generateUrlParams(filter)}`;

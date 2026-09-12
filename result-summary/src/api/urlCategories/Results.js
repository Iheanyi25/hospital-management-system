import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "Results";

export const getClassListUrl = (filter) =>
	`${baseUrl}/class-list?${generateUrlParams(filter)}`;
export const downloadClassListUrl = ({ departmentCourseId, sessionId }) =>
	`${baseUrl}/download-class-list?departmentCourseId=${departmentCourseId}&sessionId=${sessionId}`;
export const getResultsUrl = ({ departmentCourseId, sessionId }) =>
	`${baseUrl}/course-grades?departmentCourseId=${departmentCourseId}&sessionId=${sessionId}`;
export const downloadScoreSheetUrl = ({ departmentCourseId, sessionId }) =>
	`${baseUrl}/download-score-sheet?departmentCourseId=${departmentCourseId}&sessionId=${sessionId}`;
export const uploadScoreSheetUrl = ({ departmentCourseId }) =>
	`${baseUrl}/upload-result-score-sheet?departmentCourseId=${departmentCourseId}`;
export const getStudentCGPAsUrl = () => `${baseUrl}/student-semester-cgpa`;
export const getStudentSemesterResultUrl = (sessionId, semesterId) =>
	`${baseUrl}/student-results?sessionId=${sessionId}&semesterId=${semesterId}`;
export const getGradeSheetUrl = ({ departmentCourseId, sessionId }) =>
	`${baseUrl}/download-grade-sheet?departmentCourseId=${departmentCourseId}&sessionId=${sessionId}`;
export const uploadScoreSheet = () => `${baseUrl}/upload-result-score-sheet`;
export const getCourseGradesUrl = (filter) =>
	`${baseUrl}/course-grades?${generateUrlParams(filter)}`;
export const getStudentCGPAsByIdUrl = (studentUserId) =>
	`${baseUrl}/student-semester-cgpa?studentUserId=${studentUserId}`;
export const getCBTCoursesUrl = (filter) =>
	`${baseUrl}/get-cbt-courses?${generateUrlParams(filter)}`;
export const getCBTResultsUrl = (filter) =>
	`${baseUrl}/get-cbt-results?${generateUrlParams(filter)}`;
export const downloadCBTScoresheetUrl = (filter) =>
	`${baseUrl}/get-cbt-scoresheet?${generateUrlParams(filter)}`;
export const uploadCBTScoresheetUrl = (filter) => `${baseUrl}/cbt-upload`;
export const studentCompositeResultsUrl = (filter) =>
	`${baseUrl}/students-composite-results?${generateUrlParams(filter)}`;
export const studentSummaryResultsUrl = (filter) =>
	`${baseUrl}/students-summary-results?${generateUrlParams(filter)}`;

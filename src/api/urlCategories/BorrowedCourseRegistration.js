import { generateUrlParams } from '../../utils/generateUrlParams';
const baseUrl = "CourseRegistration";

export const getBorrowedCourseRegsToToggleUrl = (filter) =>
    `${baseUrl}/student-course-borrowing-status?${generateUrlParams(filter)}`;

export const toggleBorrowedCourseRegUrl = (filter) =>
    `${baseUrl}/toggle-student-course-borrowing?${generateUrlParams(filter)}`;
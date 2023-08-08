const baseUrl = "level";
export const getLevelForBorrowCoursesUrl = (userId) =>
	`${baseUrl}/levelForBorrowCourses${userId ? `?userId=${userId}` : ""}`;
export const getAllLevels = () => `${baseUrl}/get-all-levels`;

const baseUrl = "Select";
export const getLevelForBorrowCoursesUrl = (userId) =>
	`${baseUrl}/level-for-borrowing-courses${
		userId ? `?userId=${userId}` : ""
	}`;
export const getAllLevels = () => `${baseUrl}/get-all-levels`;

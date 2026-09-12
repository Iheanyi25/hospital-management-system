const baseUrl = "Sessions";

export const getSessionsUrl = () =>
	`${baseUrl}/get-all-sessions-for-currentuser`;
export const getAllSessionsUrl = () => `${baseUrl}/AllSessions`;
export const getAllSessionsForSelectedStudentUrl = (userId) =>
	`${baseUrl}/get-all-sessions-for-currentUser?${userId}`;
export const getSundrySessionsUrl = (paymentPurposeId) =>
	`${baseUrl}/sundry-sessions?paymentPurposeId=${paymentPurposeId}`;

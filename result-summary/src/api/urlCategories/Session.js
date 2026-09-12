const baseUrl = "Session";

export const getSessionsUrl = () => `${baseUrl}/user-sessions`;
export const getAllSessionsUrl = () => `${baseUrl}/all-sessions`;
export const getSundrySessionsUrl = (paymentPurposeId) =>
	`${baseUrl}/sundry-sessions?paymentPurposeId=${paymentPurposeId}`;

const baseUrl = "Dashboard";

export const studentDashboardUrl = () => `${baseUrl}/student-dashboard`;
export const lecturerDashboardUrl = () => `${baseUrl}/lecturer-dashboard`;
export const superAdminDashboardUrl = (id) =>
	`${baseUrl}/admin-dashboard${id ? `?sessionId=${id}` : ""}`;

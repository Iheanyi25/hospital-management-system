const baseUrl = "UserDocument";

export const updatePassportUrl = (userId) =>
	`${baseUrl}/upload-passport${userId ? `?userId=${userId}` : ""}`;

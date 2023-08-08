import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "UserManagement";

export const getAllUsersUrl = (filter) =>
	`${baseUrl}/all-users?${generateUrlParams(filter)}`;

export const createUserUrl = () => `${baseUrl}/create-user`;

export const editUserUrl = (id) => `${baseUrl}/update-user?userId=${id}`;

export const toggleUserStatusUrl = (id) =>
	`${baseUrl}/toggle-user-status?userId=${id}`;
export const updatePassportUrl = (userId) =>
	`${baseUrl}/upload-passport?userId=${userId}`;

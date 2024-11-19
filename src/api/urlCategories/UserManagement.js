import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "UserManagement";

export const getAllUsersUrl = (filter) =>
	`${baseUrl}/all-users?${generateUrlParams(filter)}`;

export const getUsersUrl = (filter) =>
	`${baseUrl}?${generateUrlParams(filter)}`;

export const createUserUrl = () => `${baseUrl}/create-user`;

export const editUserUrl = (id) => `${baseUrl}/update-user?userId=${id}`;

export const toggleUserStatusUrl = (id) =>
	`${baseUrl}/toggle-user-status?userId=${id}`;

export const getUserProfileUrl = (staffProfile) =>
	`${baseUrl}${staffProfile ? `?staffProfile=${staffProfile}` : ""}`;

export const updateUserProfileUrl = () => `${baseUrl}/update-user`;

export const bulkStaffUploadUrl = () => `${baseUrl}/upload-user`;

export const downloadUserUploadTemplate = () =>
	`${baseUrl}/user-upload-sample-sheet`;
export const updateStaffProfileUrl = () => `${baseUrl}/update-staff`;

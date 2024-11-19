import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "RoleClaims";

export const getRolesUrl = (filter) =>
	`${baseUrl}/roles?${generateUrlParams(filter)}`;

export const addRoleUrl = (filter) =>
	`${baseUrl}/create-role?${generateUrlParams(filter)}`;

export const deleteRoleUrl = () => `${baseUrl}/role`;

export const getAllClaimsUrl = () => `${baseUrl}/claims`;

export const getAllMenuClaimsUrl = () => `${baseUrl}/permissions`;

export const getRoleClaimsUrl = (filter) =>
	`${baseUrl}/role-claims?${generateUrlParams(filter)}`;

export const updateRoleClaimsUrl = () => `${baseUrl}/update-role-claims`;

export const getUserClaimsUrl = (filter) =>
	`${baseUrl}/user-claims?${generateUrlParams(filter)}`;

export const deleteUserClaimUrl = () => `${baseUrl}/delete-user-claim`;

export const createUserClaimsUrl = () => `${baseUrl}/create-user-claims`;

export const getStudentRolesUrl = () => `${baseUrl}/get-student-roles`;

export const updateUserClaimUrl = (userId) =>
	`${baseUrl}/update-user-claims/${userId}`;

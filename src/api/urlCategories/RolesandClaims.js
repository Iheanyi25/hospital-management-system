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

export const getUserClaimsUrl = (filter) =>
	`${baseUrl}/user-claims?${generateUrlParams(filter)}`;

export const createUserClaimsUrl = () => `${baseUrl}/create-user-claims`;

export const deleteUserClaimUrl = ({ userId, claim }) =>
	`${baseUrl}/delete-user-claim/${userId}/${claim}`;

export const updateRoleClaimsUrl = () => `${baseUrl}/update-role-claims`;

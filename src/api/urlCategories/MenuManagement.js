import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "Menus";

export const getMenusUrl = (filter) =>
	`${baseUrl}/menus?${generateUrlParams(filter)}`;

export const addMenuUrl = () => `${baseUrl}/create-menu`;

export const getMenuClaimsUrl = (filter) =>
	`${baseUrl}/menu-claims?${generateUrlParams(filter)}`;

export const deleteMenuUrl = (menuId) => `${baseUrl}/${menuId}`;

export const updateMenuUrl = (id) => `${baseUrl}/${id}`;

export const addClaimsToMenu = () => `${baseUrl}/add-claims-to-menu`;

export const deleteMenuClaimUrl = (id, claim) =>
	`${baseUrl}/remove-claim-from-menu?menuId=${id}&claim=${claim}`;

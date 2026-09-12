import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "Notices";
export const getNoticesUrl = (filter) =>
	`${baseUrl}/get-notices?${generateUrlParams(filter)}`;
export const getNoticeCategoryUrl = () => `${baseUrl}/categories`;
export const getNoticeByIdUrl = (id) => `${baseUrl}/${id}`;
export const postNoticeUrl = () => `${baseUrl}/create-notice`;
export const toggleNoticeStatusUrl = (id) => `${baseUrl}/${id}/toggle-status`;
export const getRecentNoticessUrl = () => `${baseUrl}/recent`;
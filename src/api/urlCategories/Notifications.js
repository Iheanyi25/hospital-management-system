import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "Notification";

export const getAllNotificationsUrl = (filter) =>
	`${baseUrl}/notifications?${generateUrlParams(filter)}`;
export const getAllRecentNotificationUrl = () =>
	`${baseUrl}/recent-notifications`;
export const readNotificationUrl = (id) => `${baseUrl}/read-notification/${id}`;

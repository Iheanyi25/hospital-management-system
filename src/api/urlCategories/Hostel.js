import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "Hostel";

export const getAllHostelsUrl = (filter) =>
	`${baseUrl}/all-hostels?${generateUrlParams(filter)}`;
export const getAllHostelsRoomUrl = (filter) =>
	`${baseUrl}/all-hostel-rooms?${generateUrlParams(filter)}`;
export const createHostelsUrl = () => `${baseUrl}/create-hostel`;
export const toggleHostelStatusUrl = (hostelId) =>
	`${baseUrl}/toggle-hostel-status?hostelId=${hostelId}`;
export const updateHostelUrl = (hostelId) =>
	`${baseUrl}/update-hostel?hostelId=${hostelId}`;
export const deleteHostelUrl = (hostelId) =>
	`${baseUrl}/hostel?hostelId=${hostelId}`;
export const getAllHostelRoomCategories = (filter) =>
	`${baseUrl}/all-hostel-room-categories?${generateUrlParams(filter)}`;
export const getUpaginatedHostelRoomCategories = () =>
	`${baseUrl}/hostel-room-categories`;
export const updateHostelCategoryUrl = (id) =>
	`${baseUrl}/update-hostel-room-category?hostelRoomCategoryId=${id}`;
export const createHostelCategoryUrl = () =>
	`${baseUrl}/create-hostel-room-Category`;
export const deleteHostelCategoryUrl = (id) =>
	`${baseUrl}/hostel-room-category?hostelRoomCategoryId=${id}`;
export const downloadHostelRoomSampleUrl = (id) =>
	`${baseUrl}/download-room-sample-sheet`;
export const createHostelRoomUrl = () => `${baseUrl}/create-hostel-room`;
export const bulkCreateHostelRoomUrl = () => `${baseUrl}/upload-hostel-rooms`;
export const updateHostelRoomUrl = (hostelRoomId) =>
	`${baseUrl}/update-hostel-room?hostelRoomId=${hostelRoomId}`;
export const bulkToggleHostelRoomsUrl = () =>
	`${baseUrl}/toggle-hostel-room-status`;
export const deleteHostelRoomUrl = (hostelRoomId) =>
	`${baseUrl}/hostel-room?hostelRoomId=${hostelRoomId}`;
export const getHostelBedSpaceUrl = (filter) =>
	`${baseUrl}/all-hostel-beds?${generateUrlParams(filter)}`;
export const deleteHostelBedUrl = (hostelBedId) =>
	`${baseUrl}/hostel-bed?hostelBedId=${hostelBedId}`;
export const createHostelBedUrl = () => `${baseUrl}/create-hostel-bed`;
export const updateHostelBedUrl = (hostelBedId) =>
	`${baseUrl}/update-hostel-bed?hostelBedId=${hostelBedId}`;
export const assignHostelBedUrl = () => `${baseUrl}/assign-hostel-bed-to-user`;

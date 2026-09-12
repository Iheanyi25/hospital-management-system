import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "DirectEntry";

export const getDirectEntryListUrl = (filter) =>
	`${baseUrl}/direct-entry-list?${generateUrlParams(filter)}`;
export const uploadDirectEntryListUrl = () =>
	`${baseUrl}/upload-direct-entry-list`;
export const downloadDirectEntryListTemplateUrl = () =>
	`${baseUrl}/download-direct-entry-sample-sheet`;

import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "Jamb";

export const getJambListUrl = (filter) =>
	`${baseUrl}/jamb-list?${generateUrlParams(filter)}`;
export const uploadJambListUrl = () => `${baseUrl}/upload-jamb-list`;
export const downloadJambListTemplateUrl = () =>
	`${baseUrl}/download-sample-sheet`;

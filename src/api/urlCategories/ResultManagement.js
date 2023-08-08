import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "ResultManagement";

export const getSingleResultToManageUrl = (filter) =>
	`${baseUrl}/results?${generateUrlParams(filter)}`;
export const postResultApprovalUrl = () => `${baseUrl}/admin-approval`;

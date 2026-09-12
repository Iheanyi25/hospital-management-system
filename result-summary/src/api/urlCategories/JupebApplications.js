import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "JupebApplication";

export const verifyJupebApplicationStatusUrl = (rrr) =>
	`${baseUrl}/verify-application-status/${rrr}`;
export const previewJupebApplicationUrl = (rrr) =>
	`${baseUrl}/jupeb-application/${rrr}`;
export const addAndUpdateProfileAndNextOfKinUrl = () =>
	`${baseUrl}/add-or-update-profile-and-next-of-kin`;
export const addAndUpdateInstitutionUrl = (applicantId) =>
	`${baseUrl}/add-or-update-institution/${applicantId}`;
export const addAndUpdateOLevelUrl = (applicantId) =>
	`${baseUrl}/add-or-update-olevel/${applicantId}`;
export const uploadDocumentsUrl = (applicantId) =>
	`${baseUrl}/upload-documents/${applicantId}`;
export const getAllJupebApplicationsUrl = (filter) =>
	`${baseUrl}/all-jupeb-applications?${generateUrlParams(filter)}`;
export const changeApplicationStatusUrl = (applicationNo) =>
	`${baseUrl}/admit-jupeb-applicant?applicationNo=${applicationNo}`;

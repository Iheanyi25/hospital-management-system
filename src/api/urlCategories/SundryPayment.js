import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "SundryPayment";

export const getApplicantInfoForSundryUrl = ({ regNo, subCategoryId }) =>
	`${baseUrl}/applicant-info?regNo=${regNo}&subCategoryId=${subCategoryId}`;
export const getSetUpCategoriesUrl = () => `${baseUrl}/setup-categories`;
export const getSetUpCategoryTypesUrl = ({ setupCategoryId }) =>
	`${baseUrl}/setup-category-types?setupCategoryId=${setupCategoryId}`;
export const getSetUpCategoryFeesUrl = ({ setupCategoryTypeId }) =>
	`${baseUrl}/setup-category-fees?setupCategoryTypeId=${setupCategoryTypeId}`;
export const getTranscriptPostingUrl = () => `${baseUrl}/transcript-posting`;
export const generateTranscriptInvoiceUrl = () =>
	`${baseUrl}/generate-transcript-app-invoice`;
export const generateAllSundryInvoiceUrl = () => `${baseUrl}/generate-invoice`;
export const getSundryReportsUrl = (filter) =>
	`${baseUrl}/get-sundry-report?${generateUrlParams(filter)}`;
export const downloadSundryReportUrl = (filter) =>
	`${baseUrl}/download-sundry-report?${generateUrlParams(filter)}`;

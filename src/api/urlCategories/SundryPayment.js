import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "Sundry";

export const getApplicantInfoForSundryUrl = ({
	mobileNumber,
	bursaryCategoryTypeId
}) =>
	`${baseUrl}/applicant-information?MobileNumber=${mobileNumber}&BursaryCategoryTypeId=${bursaryCategoryTypeId}`;
export const getSetUpCategoriesUrl = () => `${baseUrl}/setup-categories`;
export const getSetUpCategoryTypesUrl = ({ setupCategoryId }) =>
	`${baseUrl}/setup-category-types?setupCategoryId=${setupCategoryId}`;
export const getApplicantSundryInvoicesUrl = (filter) =>
	`${baseUrl}/get-all-invoices?${generateUrlParams(filter)}`;
export const getSetUpCategoryFeesUrl = ({ setupCategoryTypeId }) =>
	`${baseUrl}/setup-category-fees?setupCategoryTypeId=${setupCategoryTypeId}`;
export const getTranscriptPostingUrl = () => `${baseUrl}/transcript-posting`;
export const generateTranscriptInvoiceUrl = () =>
	`${baseUrl}/generate-transcript-app-invoice`;
export const generateAllSundryInvoiceUrl = () => `${baseUrl}/generate-invoice`;
export const getSundryReportsUrl = (filter) =>
	`${baseUrl}/get-bursary-report?${generateUrlParams(filter)}`;
export const downloadSundryReportUrl = (filter) =>
	`${baseUrl}/download-sundry-report?${generateUrlParams(filter)}`;

export const downloadBursaryReportUrl = (filter) =>
	`${baseUrl}/download-bursary-report?${generateUrlParams(filter)}`;

export const createBusaryFeesUrl = () => `${baseUrl}/create-bursary-fee`;
export const deleteBusaryFeesUrl = (filter) =>
	`${baseUrl}/delete-bursary-fee?${generateUrlParams(filter)}`;
export const getSundryPaymentBusaryFees = (filter) =>
	`${baseUrl}/all-bursary-fees?${generateUrlParams(filter)}`;
export const updateBusaryFeesUrl = (filter) =>
	`${baseUrl}/update-bursary-fee?${generateUrlParams(filter)}`;
export const toggleBusaryFeesUrl = (filter) =>
	`${baseUrl}/toggle-bursary-fee-status?${generateUrlParams(filter)}`;
export const getFeesForSundryPaymentUrl = (filter) =>
	`${baseUrl}/get-bursary-fee/?${generateUrlParams(filter)}`;
export const getTranscriptBaseFeeeUrl = () =>
	`${baseUrl}/transcript-setup-category-fee`;
export const getApplicationSundryInvoiceDetailsUrl = (invoiceCode) =>
	`${baseUrl}/invoice-details?invoiceCode=${invoiceCode}`;
export const deactivateApplicationSundryInvoiceUrl = (invoiceCode) =>
	`${baseUrl}/deactivate-bursary-invoice?invoiceCode=${invoiceCode}`;

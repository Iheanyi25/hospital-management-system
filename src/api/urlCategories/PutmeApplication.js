import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "NDPartTime";

export const putmeLoadApplicationFormUrl = (jambRegNumber) =>
	`${baseUrl}/load-application-form?rrr=${jambRegNumber}`;

export const putmePersonalDetailsFormUrl = () =>
	`${baseUrl}/add-or-update-putme-application-personal-details`;

export const putmeCertificateDetailsFormUrl = () =>
	`${baseUrl}/add-or-update-putme-application-certificate-details`;

export const putmeOLevelDetailsFormUrl = () =>
	`${baseUrl}/add-or-update-putme-application-olevel-details`;

export const putmeProgrammeDetailsFormUrl = () =>
	`${baseUrl}/add-or-update-putme-application-programme-details`;

export const getPutmeApplicationReportsUrl = (filter) =>
	`${baseUrl}/post-utme-applications-report?${generateUrlParams(filter)}`;

export const downloadPutmeApplicationReportsUrl = (filter) =>
	`${baseUrl}/download-utme-applications-report?${generateUrlParams(filter)}`;

export const downloadPutmeResultTemplateUrl = (filter) =>
	`${baseUrl}/putme-result-template?${generateUrlParams(filter)}`;

export const downloadPutmeResultUrl = (filter) =>
	`${baseUrl}/download-putme-result?${generateUrlParams(filter)}`;

export const getPutmeSessionApplicantCountUrl = (filter) =>
	`${baseUrl}/sessions-applicant-count?${generateUrlParams(filter)}`;

export const getPutmeSessionResultsUrl = (filter) =>
	`${baseUrl}/all-results?${generateUrlParams(filter)}`;

export const uploadPutmeResultUrl = () => `${baseUrl}/upload-putme-result`;

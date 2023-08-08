import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "PostUtme";

export const putmeLoadApplicationFormUrl = (jambRegNumber) =>
	`${baseUrl}/load-application-form?regNo=${jambRegNumber}`;

export const putmePersonalDetailsFormUrl = () =>
	`${baseUrl}/store-putme-application-personal-details`;

export const putmeCertificateDetailsFormUrl = () =>
	`${baseUrl}/store-putme-application-certificate-details`;

export const putmeOLevelDetailsFormUrl = () =>
	`${baseUrl}/store-putme-application-olevel-details`;

export const putmeProgrammeDetailsFormUrl = () =>
	`${baseUrl}/store-putme-application-programme-details`;

export const getPutmeApplicationReportsUrl = (filter) =>
	`${baseUrl}/post-utme-applications?${generateUrlParams(filter)}`;

export const downloadPutmeApplicationReportsUrl = (filter) =>
	`${baseUrl}/download-utme-applications-report?${generateUrlParams(filter)}`;

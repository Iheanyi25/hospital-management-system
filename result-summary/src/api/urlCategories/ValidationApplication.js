import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "MembershipValidation";

export const validationLoadApplicationFormUrl = (rrr) =>
	`${baseUrl}/load-validation-form?rrr=${rrr}`;

export const validationPersonalDetailsFormUrl = () =>
	`${baseUrl}/store-validation-application-personal-details`;

export const validationQualificationDetailsFormUrl = () =>
	`${baseUrl}/store-validation-application-qualificationAndWork-details`;

export const validationProgrammeDetailsFormUrl = () =>
	`${baseUrl}/store-validation-application-programme-details`;

export const putmeCertificateDetailsFormUrl = () =>
	`${baseUrl}/store-putme-application-certificate-details`;

export const putmeOLevelDetailsFormUrl = () =>
	`${baseUrl}/store-putme-application-olevel-details`;

export const getPutmeApplicationReportsUrl = (filter) =>
	`${baseUrl}/post-utme-applications?${generateUrlParams(filter)}`;

export const downloadPutmeApplicationReportsUrl = (filter) =>
	`${baseUrl}/download-utme-applications-report?${generateUrlParams(filter)}`;

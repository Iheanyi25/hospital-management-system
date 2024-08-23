import { generateUrlParams } from "../../utils/generateUrlParams";
const baseUrl = "DirectEntryApplication";

export const directEntryLoadApplicationFormUrl = (jambRegNumber) =>
	`${baseUrl}/load-direct-entry-application-form?regNumber=${jambRegNumber}`;

export const postDirectEntryPersonalDetailsFormUrl = () =>
	`${baseUrl}/add-or-update-direct-entry-application-form-and-programme`;

export const directEntryProgrammeDetailsFormUrl = () =>
	`${baseUrl}/add-or-update-direct-entry-programme?`;

export const directEntryOLevelDetailsFormUrl = () =>
	`${baseUrl}/add-or-update-direct-entry-application-olevel-details?`;

export const directEntryUploadCertificateUrl = () =>
	`${baseUrl}/add-or-update-direct-entry-application-certificates`;

export const previewDirectEntryUrl = (jambRegNumber) =>
	`${baseUrl}/application/${jambRegNumber}`;
export const getDirectEntryListUrl = (filter) =>
	`${baseUrl}/direct-entry-list?${generateUrlParams(filter)}`;
export const uploadDirectEntryListUrl = () =>
	`${baseUrl}/upload-direct-entry-list`;
export const downloadDirectEntryListTemplateUrl = () =>
	`${baseUrl}/download-direct-entry-sample-sheet`;

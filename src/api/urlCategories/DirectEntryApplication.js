import { generateUrlParams } from "../../utils/generateUrlParams";
const baseUrl = "DirectEntry";

export const directEntryLoadApplicationFormUrl = (jambRegNumber) =>
	`${baseUrl}/verify-direct-entry-application-status/${jambRegNumber}`;

export const postDirectEntryPersonalDetailsFormUrl = () =>
	`${baseUrl}/add-or-update-direct-entry-application`;

export const directEntryOLevelDetailsFormUrl = (filter) =>
	`${baseUrl}/add-or-update-direct-entry-applicant-olevel?${generateUrlParams(
		filter
	)}`;

export const directEntryInstitutionAttendedUrl = () =>
	`${baseUrl}/add-or-update-direct-entry-applicant-institution`;

export const previewDirectEntryUrl = (jambRegNumber) =>
	`${baseUrl}/application/${jambRegNumber}`;

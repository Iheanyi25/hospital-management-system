const baseUrl = "CCEApplication";

export const cceLoadApplicationFormUrl = (rrr) =>
	`${baseUrl}/load-cce-application-form?rrr=${rrr}`;

export const postCcePersonalDetailsFormUrl = () =>
	`${baseUrl}/add-or-update-cce-application-form-`;

export const cceProgrammeDetailsFormUrl = () =>
	`${baseUrl}/add-or-update-cce-programme`;

export const cceOLevelDetailsFormUrl = () =>
	`${baseUrl}/add-or-update-cce-application-olevel-details`;

export const previewCceUrl = (jambRegNumber) =>
	`${baseUrl}/application/${jambRegNumber}`;

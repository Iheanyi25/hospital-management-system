const baseUrl = "SupplementaryPostUtme";

export const supplementaryPutmeLoadApplicationFormUrl = (jambRegNumber) =>
	`${baseUrl}/load-application-form?regNumber=${jambRegNumber}`;

export const postSupplementaryPutmePersonalDetailsFormUrl = () =>
	`${baseUrl}/add-or-update-supplementary-post-utme-personal-details`;

export const supplementaryPutmeProgrammeDetailsFormUrl = () =>
	`${baseUrl}/add-or-update-supplementary-post-utme-programme`;

export const supplementaryPutmeOLevelDetailsFormUrl = () =>
	`${baseUrl}/add-or-update-supplementary-post-utme-application-olevel-details?`;

export const previewSupplementaryPutmeUrl = (jambRegNumber) =>
	`${baseUrl}/application/${jambRegNumber}`;

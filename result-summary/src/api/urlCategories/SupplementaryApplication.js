const baseUrl = "Supplementary";

export const supplementaryLoadApplicationFormUrl = (jambRegNumber) =>
	`${baseUrl}/load-supplementary-application-form?regNumber=${jambRegNumber}`;

export const supplementaryPersonalDetailsFormUrl = () =>
	`${baseUrl}/add-or-update-supplementary-application-personal-details-and-programme`;

export const staffRequestLoadApplicationFormUrl = (jambRegNumber) =>
	`${baseUrl}/load-staff-request-application-form?jambNumber=${jambRegNumber}`;

export const staffRequestStaffDetailsFormUrl = () =>
	`${baseUrl}/add-or-update-staff-request-application-personal-details`;

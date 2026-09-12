const baseUrl = "CSENDApplication";

export const CSNDAppVerificationPaymentUrl = (rrr) =>
	`${baseUrl}/Verify-cse-nd-payment/${rrr}`;

export const CSNDAppAddOrUpdateUrl = () =>
	`${baseUrl}/add-or-update-cse-nd-profile`;

export const CSNDAddOrDropProgramme = () =>
	`${baseUrl}/add-or-update-cse-nd-programme`;

export const CSNDAddOrUpdateOLevel = (applicantId) =>
	`${baseUrl}/add-or-update-cse-nd-o-level/${applicantId}`;
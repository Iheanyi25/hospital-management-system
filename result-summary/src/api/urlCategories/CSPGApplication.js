const baseUrl = "CSEPGApplication";

export const CSPGAppVerificationPaymentUrl = (rrr) =>
	`${baseUrl}/Verify-payment/${rrr}`;

export const CSPGAppAddOrUpdateUrl = () =>
	`${baseUrl}/add-or-update-cse-pg-profile`;

export const CSPGAddOrDropProgramme = () =>
	`${baseUrl}/add-or-update-cse-pg-programme`;

export const CSPGAddOrUpdateQualificationUrl = () =>
	`${baseUrl}/add-or-update-cse-pg-qualifications`;

export const CSPGAddOrUpdateOLevel = (applicantId) =>
	`${baseUrl}/add-or-update-cse-pg-o-level/${applicantId}`;

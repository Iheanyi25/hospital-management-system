const baseUrl = "OLevel";

export const loadOlevelDetailsUrl = (applicationTypeId, applicantId) =>
	`${baseUrl}/get-olevel-details?ApplicationTypeId=${applicationTypeId}&ApplicantId=${applicantId}`;

//post
export const updateOlevelUrl = () =>
	`${baseUrl}/add-or-update-verify-olevel-details`;

const baseUrl = "PreDegreeApplication";

export const preDegreeLoadApplicationFormUrl = (rrr) =>
	`${baseUrl}/load-pre-degree-application-form?rrr=${rrr}`;
export const updatePredegreePersonalInfoFormUrl = () =>
	`${baseUrl}/add-or-update-pre-degree-application-form-and-next-of-kin`;
export const updatePredegreeProgrammeFormUrl = () =>
	`${baseUrl}/add-or-update-pre-degree-application-programme`;
export const updatePredegreeEducationFormUrl = () =>
	`${baseUrl}/add-or-update-pre-degree-application-education`;
export const updatePredegreeOlevelFormUrl = () =>
	`${baseUrl}/add-or-update-pre-degree-application-olevel-details`;

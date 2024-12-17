// import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "HNDApplication";

export const hndLoadApplicationFormUrl = (jambRegNumber) =>
	`${baseUrl}/load-HND-application-form?mobileNumber=${jambRegNumber}`;

export const hndPersonalDetailsFormUrl = () =>
	`${baseUrl}/add-or-update-hnd-application-form-and-programme`;

export const hndProgrammeDetailsFormUrl = () =>
	`${baseUrl}/add-or-update-hnd-programme`;

export const hndOLevelDetailsFormUrl = () =>
	`${baseUrl}/add-or-update-hnd-application-olevel-details`;

export const hndNdDetailsFormUrl = () =>
	`${baseUrl}/add-or-update-hnd-nd-details`;

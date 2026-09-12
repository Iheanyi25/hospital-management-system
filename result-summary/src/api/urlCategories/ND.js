// import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "ND";

export const ndLoadApplicationFormUrl = (jambRegNumber) =>
	`${baseUrl}/load-application-form?regNumber=${jambRegNumber}`;

export const ndPersonalDetailsFormUrl = () => 
  `${baseUrl}/add-or-update-ND-application-personal-details`;

export const ndProgrammeDetailsFormUrl = () => 
  `${baseUrl}/add-or-update-ND-application-programme-details`;

export const ndOLevelDetailsFormUrl = () =>
	`${baseUrl}/add-or-update-ND-application-olevel-details`;

export const ndJambDetailsFormUrl = () => 
  `${baseUrl}/add-or-update-ND-jamb-details`;
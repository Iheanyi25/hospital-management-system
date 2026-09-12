import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "PGApplication";

export const verifyPGPaymentUrl = (rrr) =>
	`${baseUrl}/Verify-payment?rrr=${rrr}`;
export const submitStep1ApplicationUrl = () => `${baseUrl}/step-1`;
export const submitStep2ApplicationUrl = () => `${baseUrl}/step-2`;
export const submitPGApplicationStepUrl = (step) => `${baseUrl}/step-${step}`;
export const getPGRefereeStatusUrl = (rrr) =>
	`${baseUrl}/referee-status?rrr=${rrr}`;
export const getPGTrackingVerificationUrl = (rrr) =>
	`${baseUrl}/reprint?rrr=${rrr}`;
export const getPGTranscriptRequestUrl = (rrr) =>
	`${baseUrl}/transcript-request?rrr=${rrr}`;
export const getRefereeInfoUrl = (passCode) =>
	`${baseUrl}/referee-info?passCode=${passCode}`;
export const getRefereePrintOutUrl = (refereeEmail) =>
	`${baseUrl}/referee-printout?refereeEmail=${refereeEmail}`;
export const getRefereeRatingOptionsUrl = () => `${baseUrl}/referee-ratings`;
export const submitRefereeReviewUrl = () => `${baseUrl}/referee-review`;
export const updatePGRefereeUrl = (refereeId) =>
	`${baseUrl}/update-referee?refereeId=${refereeId}`;
export const getPGApplicationReportsUrl = (filter) =>
	`${baseUrl}/application-report?${generateUrlParams(filter)}`;
export const downloadPGApplicationReportsUrl = (filter) =>
	`${baseUrl}/download-report?${generateUrlParams(filter)}`;

import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "Payment";

export const getMyInvoicesUrl = (paymentType) =>
	`${baseUrl}/student-invoices/${paymentType}`;
export const initiateSchoolFeesPaymentUrl = ({
	sessionId,
	paymentTypeId,
	levelId
}) =>
	`${baseUrl}/schoolfees/initiate-payment?sessionId=${sessionId}&paymentTypeId=${paymentTypeId}&levelId=${levelId}`;
export const initiateAcceptanceFeePaymentUrl = () =>
	`${baseUrl}/acceptance/initiate-payment`;
export const generateFeesInvoiceUrl = () => `${baseUrl}/generate-fee-Invoice`;
export const generateSchoolFeesBalanceInvoiceUrl = () =>
	`${baseUrl}/generate-balance-invoice`;
export const getInvoiceUrl = (rrr) => `${baseUrl}/invoice/${rrr}`;
export const getFeeRecieptUrl = ({
	sessionId,
	levelId,
	paymentTypeId,
	paymentPurposeId
}) =>
	`${baseUrl}/fee-receipt?${generateUrlParams({
		sessionId,
		levelId,
		paymentTypeId,
		paymentPurposeId
	})}`;
export const getSchoolFeesRecieptUrl = ({
	sessionId,
	yearofStudyId,
	schoolFeesPaymentType
}) =>
	`${baseUrl}/schoolfeesReceipt?sessionId=${sessionId}&yearofStudyId=${yearofStudyId}&schoolFeesPaymentType=${schoolFeesPaymentType}`;
export const getAllStudetInvoicesUrl = (userId) =>
	`${baseUrl}/all-Student-Invoices?userId=${userId}`;
export const getSchoolFeesAssignmentsUrl = (filter) =>
	`${baseUrl}/school-fee-assignment?${generateUrlParams(filter)}`;
export const updateSchoolFeesAssignmentsUrl = (schoolFeeAssignmentId) =>
	`${baseUrl}/update-school-fee-assignment/${schoolFeeAssignmentId}`;
export const getAcceptanceFeesUrl = (filter) =>
	`${baseUrl}/acceptance-fee-assignment?${generateUrlParams(filter)}`;
export const updateAcceptanceFeesUrl = (acceptanceFeeAssignmentId) =>
	`${baseUrl}/update-acceptance-fee-assignment/${acceptanceFeeAssignmentId}`;
export const deactivatefeeinvoiceUrl = () =>
	`${baseUrl}/deactivate-fee-invoice`;
export const updateFeeInvoiceUrl = () => `${baseUrl}/schoolfees/updateinvoice`;
export const getPGFeeAmountUrl = (filter) =>
	`${baseUrl}/pg-fee-amount?${generateUrlParams(filter)}`;
export const generatePGSchoolFeesInvoiceUrl = () =>
	`${baseUrl}/pg-school-fees/generate-invoice`;
export const getPGFeeAssignmentsUrl = (filter) =>
	`${baseUrl}/pg-fee-assignment?${generateUrlParams(filter)}`;
export const updatePGFeesUrl = () => `${baseUrl}/pg-fee-assignment`;
export const getSchoolFeesAssignmentBreakdownUrl = (id) =>
	`${baseUrl}/school-fee-assignment-breakdown/${id}`;
export const updateSchoolFeesAssignmentBreakdownUrl = (id) =>
	`${baseUrl}/update-school-fee-assignment/${id}`;
export const initiateSundryFeePaymentUrl = (filter) =>
	`${baseUrl}/sundry/initiate-payment?${generateUrlParams(filter)}`;
export const getSundryFeesAssignmentsUrl = (filter) =>
	`${baseUrl}/sundry-fee-assignment?${generateUrlParams(filter)}`;
export const updateSundryFeesAssignmentsUrl = (sundryFeeAssignmentId) =>
	`${baseUrl}/update-sundry-fee-assignment/${sundryFeeAssignmentId}`;
export const getFeesReportUrl = (filter) =>
	`${baseUrl}/fee-report?${generateUrlParams(filter)}`;
export const downloadFeesReportUrl = (filter) =>
	`${baseUrl}/download-fee-report?${generateUrlParams(filter)}`;
export const getPGFeesReportUrl = (filter) =>
	`${baseUrl}/pg-fee-report?${generateUrlParams(filter)}`;
export const downloadPGFeesReportUrl = (filter) =>
	`${baseUrl}/download-pg-fee-report?${generateUrlParams(filter)}`;

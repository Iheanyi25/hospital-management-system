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
export const initiateDevelopmentLevyPaymentUrl = () =>
	`${baseUrl}/development/initiate-payment`;
export const generateFeesInvoiceUrl = () => `${baseUrl}/generate-fee-Invoice`;
export const generateSchoolFeesBalanceInvoiceUrl = () =>
	`${baseUrl}/generate-balance-invoice`;
export const getInvoiceUrl = (rrr) => `${baseUrl}/invoice/${rrr}`;
export const getInvoiceWithInvoiceNumberUrl = (invoiceCode) =>
	`${baseUrl}/school-fees-invoice?invoiceCode=${invoiceCode}`;
export const getFeeDetailsWithInvoiceUrl = (invoiceNumber) =>
	`${baseUrl}/receipt?invoiceNumber=${invoiceNumber}`;
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
export const getAllStudetInvoicesUrl = (filter) =>
	`${baseUrl}/all-student-invoices?${generateUrlParams(filter)}`;
export const getSchoolFeesAssignmentsUrl = (filter) =>
	`${baseUrl}/school-fee-assignment?${generateUrlParams(filter)}`;
export const updateSchoolFeesAssignmentsUrl = (schoolFeeAssignmentId) =>
	`${baseUrl}/update-school-fee-assignment/${schoolFeeAssignmentId}`;
export const getAcceptanceFeesUrl = (filter) =>
	`${baseUrl}/acceptance-fees-assignment?${generateUrlParams(filter)}`;
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
	`${baseUrl}/update-school-fee-assignment?feeAssignmentId=${id}`;
export const bulkUpdateSchoolFeesAssignmentUrl = () =>
	`${baseUrl}/bulk-update-school-fee-assignment`;
export const initiateSundryFeePaymentUrl = (filter) =>
	`${baseUrl}/sundry/initiate-payment?${generateUrlParams(filter)}`;
export const getSundryFeesAssignmentsUrl = (filter) =>
	`${baseUrl}/sundry-fee-assignment?${generateUrlParams(filter)}`;
export const updateSundryFeesAssignmentsUrl = (sundryFeeAssignmentId) =>
	`${baseUrl}/update-sundry-fee-assignment/${sundryFeeAssignmentId}`;
export const downloadFeesSampleUrl = () =>
	`${baseUrl}/fee-assignment-upload-sample-sheet`;
export const uploadFeesUrl = () => `${baseUrl}/upload-school-fee-assignment`;
export const uploadAcceptanceFeeUrl = () =>
	`${baseUrl}/upload-acceptance-fee-assignment`;
export const bulkUpdateAcceptanceFeesAssignmentUrl = () =>
	`${baseUrl}/bulk-update-acceptance-fee-assignment`;
export const downloadAcceptanceFeesSampleUrl = () =>
	`${baseUrl}/acceptance-fee-assignment-upload-sample-sheet`;
export const downloadCashBookReportUrl = (filter) =>
	`${baseUrl}/download-cashbook-report?${generateUrlParams(filter)}`;
export const downloadFeesReportUrl = (filter) =>
	`${baseUrl}/download-fee-report?${generateUrlParams(filter)}`;
export const getFeesReportUrl = (filter) =>
	`${baseUrl}/fee-report?${generateUrlParams(filter)}`;
export const getScholarshipsUrl = (filter) =>
	`${baseUrl}/scholarships?${generateUrlParams(filter)}`;
export const updateScholarshipUrl = (id) =>
	`${baseUrl}/update-scholarship/${id}`;
export const deleteScholarshipUrl = (id) => `${baseUrl}/scholarship/${id}`;
export const toggleScholarshipStatusUrl = (id) =>
	`${baseUrl}/deactivate-scholarship/${id}`;
export const getStudentsScholarshipsUrl = (filter) =>
	`${baseUrl}/scholarship-students?${generateUrlParams(filter)}`;
export const getStudentScholarshipsUrl = (filter) =>
	`${baseUrl}/student-scholarships?${generateUrlParams(filter)}`;
export const awardScholarshipUrl = () => `${baseUrl}/award-scholarship`;
export const deleteStudentSessionScholarshipUrl = (id) =>
	`${baseUrl}/student-scholarship-session?studentScholarshipId=${id}`;
export const deleteStudentScholarshipUrl = (filter) =>
	`${baseUrl}/student-scholarship?${generateUrlParams(filter)}`;
export const bulkSundryFeesAssignmentsUrl = () =>
	`${baseUrl}/bulk-sundry-fee-assignment`;

export const getSundryInvoiceReceiptUrl = (filter) =>
	`${baseUrl}/receipt?${generateUrlParams(filter)}`;

export const sendSundryInvoiceReceiptMailUrl = (filter) =>
	`${baseUrl}/send-receipt-mail?${generateUrlParams(filter)}`;

	export const cloneFeesAssignmentUrl = () =>
	`${baseUrl}/clone-fee-assignment`;
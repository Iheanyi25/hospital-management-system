import { generateUrlParams } from "../../utils/generateUrlParams";
const baseUrl = "ApplicationInvoice";

export const getApplicationInvoiceData = (filter) =>
	`${baseUrl}/application-invoice-data?${generateUrlParams(filter)}`;
export const generateAdmissionStatusInvoiceUrl = (regNo) =>
	`${baseUrl}/generate-admission-status-invoice?jambRegNumber=${regNo}`;

export const generateApplicationInvoiceUrl = () =>
	`${baseUrl}/generate-application-invoice`;

export const getApplicationJupebFeeInvoiceData = (filter) =>
	`${baseUrl}/application-invoice-data?${generateUrlParams(filter)}`;
export const getAllPaymentReportsUrl = (filter) =>
	`${baseUrl}/payment-report?${generateUrlParams(filter)}`;
export const downloadPaymentReportsUrl = (filter) =>
	`${baseUrl}/download-payment-report?${generateUrlParams(filter)}`;
export const checkAdmissionStatusUrl = (jambRegNumber) =>
	`${baseUrl}/check-admission-status?jambRegNumber=${jambRegNumber}`;
export const deactivateApplicationInvoiceUrl = (rrr) =>
	`${baseUrl}/deactivate-application-invoice?rrr=${rrr}`;
export const getApplicationInvoiceDetailsUrl = (rrr) =>
	`${baseUrl}/invoice-details?rrr=${rrr}`;
export const downloadApplicationReportsUrl = (filter) =>
	`${baseUrl}/download-payment-report?${generateUrlParams(filter)}`;
export const getApplicationReportsUrl = (filter) =>
	`${baseUrl}/payment-report?${generateUrlParams(filter)}`;

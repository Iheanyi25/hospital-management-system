const baseUrl = "TransferApplication";

export const verifyTransferPaymentUrl = (regNumber) =>
	`${baseUrl}/load-application-form?regNumber=${regNumber}`;
export const updateTransferApplicationPersonalInfoUrl = () =>
	`${baseUrl}/store-transfer-application-personal-details	`;
export const updateTransferApplicationProgrammeDetailsUrl = () =>
	`${baseUrl}/store-transfer-application-programme-details`;
export const updateTransferApplicationOlevelDetailsUrl = () =>
	`${baseUrl}/store-transfer-application-olevel-details`;
export const updateTransferApplicationExtraDetailsUrl = () =>
	`${baseUrl}/store-transfer-application-extra-details`;
export const updateTransferApplicationEducationHistoryDetailsUrl = () =>
	`${baseUrl}/store-transfer-application-education-history-details`;

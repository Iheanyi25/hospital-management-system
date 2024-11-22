const baseUrl = "Webhook";

export const tiggerRemitaPaymentUrl = (rrr) =>
	`${baseUrl}/remita-payment?rrr=${rrr}`;
export const verifyRemitaStatus = (rrr) =>
	`${baseUrl}/remita-payment1?RRR=${rrr}`;

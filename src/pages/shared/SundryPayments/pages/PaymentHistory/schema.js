import * as yup from "yup";

export const InvoiceNumberSchema = yup.object().shape({
	invoiceNumber: yup.string().required("please enter invoice number")
});

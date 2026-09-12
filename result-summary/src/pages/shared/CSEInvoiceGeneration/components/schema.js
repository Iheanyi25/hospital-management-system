import * as yup from "yup";
import {
	checkForCorrectPhoneNumber,
	checkforValidName
} from "../../../../utils/formValidations";

export const JambFormSchema = yup.object().shape({
	InvoiceTypeId: yup.mixed().required("please select an invoice type"),
	MobileNo: yup
		.string()
		.required("please input mobile number")
		.test("text number", "invalid phone number", checkForCorrectPhoneNumber)
});

export const UserDetailsSchema = yup.object().shape({
	Surname: yup
		.string()
		.required("please input surname")
		.test(
			"text name",
			"invalid name, check for trailing spaces",
			checkforValidName
		)
		.nullable(),
	Firstname: yup
		.string()
		.required("please input first name")
		.test(
			"text name",
			"invalid name, check for trailing spaces",
			checkforValidName
		)
		.nullable(),
	Middlename: yup
		.string()
		.test(
			"text name",
			"invalid name, check for trailing spaces",
			checkforValidName
		)
		.nullable(),
	MobileNo: yup
		.string()
		.required("please input mobile number")
		.test(
			"text number",
			"invalid phone number",
			checkForCorrectPhoneNumber
		).nullable(),
	Email: yup
		.string()
		.required("please input email address")
		.email("invalid email address").nullable(),
	SessionId: yup.mixed().required("please enter your session"),
	Amount: yup.number().required("please enter amount")
});

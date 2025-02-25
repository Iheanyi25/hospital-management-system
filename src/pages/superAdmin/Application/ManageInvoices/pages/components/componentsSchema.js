import * as yup from "yup";
import { checkForCorrectPhoneNumber } from "../../../../../../utils/formValidations";

export const UploadSchema = yup.object().shape({
	firstname: yup.string().required("please input your first name"),
	middlename: yup.string().optional(),
	lastname: yup.string().required("please input your surname"),
	email: yup
		.string()
		.required("email is required")
		.email("invalid email address"),
	mobileNumber: yup
		.string()
		.required("phone number is required")
		.test(
			"text number",
			"invaild phone number",
			checkForCorrectPhoneNumber
		),
	regNo: yup.string().required("please input your reg number"),
	rrr: yup.string().required("RRR is required")
});

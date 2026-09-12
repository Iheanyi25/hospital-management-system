import * as yup from "yup";
import {
	checkForCorrectPhoneNumber,
	checkforValidInitial,
	checkforValidName
} from "../../../utils/formValidations";

export const Schema = yup.object().shape({
	surname: yup
		.string()
		.required("please input your surname")
		.test("text name", "invaild name", checkforValidName),
	firstName: yup
		.string()
		.required("please input your first name")
		.test("text name", "invaild name", checkforValidName),
	middleName: yup
		.string()
		.test("text name", "invaild name", checkforValidInitial),
	regNo: yup.string().required("please input your registration number"),
	email: yup
		.string()
		.required("email is required")
		.email("invalid email address"),
	phoneNo: yup
		.string()
		.required("phone number is required")
		.test(
			"text number",
			"invaild phone number",
			checkForCorrectPhoneNumber
		),
	departmentId: yup.mixed().required("please select department"),
	departmentOptionId: yup
		.mixed()
		.when(
			"$isDepartmentOptionRequired",
			(isDepartmentOptionRequired, schema) => {
				if (isDepartmentOptionRequired) {
					return schema.required("please select department option");
				}
				return schema.default(null);
			}
		),
	sessionId: yup.mixed().required("please select a session"),
	destination: yup.mixed().required("please select a location"),
	scanning: yup.string().required("please make a selection")
});

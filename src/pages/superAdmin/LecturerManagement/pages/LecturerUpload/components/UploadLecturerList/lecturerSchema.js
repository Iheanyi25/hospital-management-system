import * as yup from "yup";
import { checkForCorrectPhoneNumber, checkforValidName } from "../../../../../../../utils/formValidations";

export const LecturerSchema = yup.object().shape({
	Surname: yup
		.string()
		.required("please input surname")
		.test(
			"text name",
			"invalid name, check for trailing spaces",
			checkforValidName
		).nullable(),
	Firstname: yup
		.string()
		.required("please input first name")
		.test(
			"text name",
			"invalid name, check for trailing spaces",
			checkforValidName
		).nullable(),
	Middlename: yup
		.string()
		.test(
			"text name",
			"invalid name, check for trailing spaces",
			checkforValidName
		).nullable(),
	MobileNo: yup
		.string()
		.required("please input mobile number")
		.test(
			"text number",
			"invaild phone number",
			checkForCorrectPhoneNumber
		).nullable(),
	Email: yup
		.string()
		.required("please input email address")
		.email("invalid email address"),
	GenderId: yup.mixed().required("please enter a gender"),
	StudentTypeId: yup.mixed().required("please select student type"),
	DepartmentId: yup.mixed().required("please enter a department")
});

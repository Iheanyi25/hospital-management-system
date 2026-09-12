import * as yup from "yup";
import { checkForCorrectPhoneNumber, checkforValidInitial, checkforValidName } from "../../../../../../../utils/formValidations";

export const LecturerSchema = yup.object().shape({
	Surname: yup
		.string()
		.required("please input surname")
		.test(
			"text name",
			"invalid name format. Please ensure there are no trailing spaces and use a name with a minimum length of 2 characters.",
			checkforValidName
		).nullable(),
	Firstname: yup
		.string()
		.required("please input first name")
		.test(
			"text name",
			"invalid name format. Please ensure there are no trailing spaces and use a name with a minimum length of 2 characters.",
			checkforValidName
		).nullable(),
	Middlename: yup
		.string()
		.test(
			"text name",
			"invalid name format. Please ensure there are no trailing spaces and use a name with a minimum length of 2 characters.",
			checkforValidInitial
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

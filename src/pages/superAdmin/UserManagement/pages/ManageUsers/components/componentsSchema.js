import * as yup from "yup";
import {
	checkForCorrectPhoneNumber,
	checkforValidInitial,
	checkforValidName
} from "../../../../../../utils/formValidations";

export const addMenuSchema = yup.object().shape({
	Name: yup.string().required("please input menu name")
});

export const addUserSchema = yup.object().shape({
	Surname: yup
		.string()
		.required("please input surname")
		.test(
			"text name",
			"invalid name format. Please ensure there are no trailing spaces and use a name with a minimum length of 2 characters.",
			checkforValidName
		),
	Firstname: yup
		.string()
		.required("please input first name")
		.test(
			"text name",
			"invalid name format. Please ensure there are no trailing spaces and use a name with a minimum length of 2 characters.",
			checkforValidName
		),
	Middlename: yup
		.string()
		.test(
			"text name",
			"invalid name format. Please ensure there are no trailing spaces and use a name with a minimum length of 2 characters.",
			checkforValidInitial
		),
	Username: yup.string().required("please input user name"),
	Email: yup.string().email().required("please input email address"),
	StaffNumber: yup.string().required("please input a staff number"),
	CampusId: yup.mixed(),
	GenderId: yup.mixed().required("please select a gender"),
	Department: yup.mixed(),
	PhoneNumber: yup
		.string()
		.required("phone number is required")
		.test(
			"text number",
			"invalid phone number",
			checkForCorrectPhoneNumber
		),
	UserRole: yup.mixed().required("please enter a role")
});

export const editUserSchema = yup.object().shape({
	Surname: yup
		.string()
		.required("please input surname")
		.test(
			"text name",
			"invalid name format. Please ensure there are no trailing spaces and use a name with a minimum length of 2 characters.",
			checkforValidName
		),
	Firstname: yup
		.string()
		.required("please input first name")
		.test(
			"text name",
			"invalid name format. Please ensure there are no trailing spaces and use a name with a minimum length of 2 characters.",
			checkforValidName
		),
	Middlename: yup
		.string()
		.nullable()
		.test(
			"text name",
			"invalid name format. Please ensure there are no trailing spaces and use a name with a minimum length of 2 characters.",
			checkforValidInitial
		),
	Department: yup.mixed(),
	StaffNumber: yup.string().required("please input a staff number"),
	CampusId: yup.mixed(),
	Gender: yup.mixed().when("$isLGender", (isLGender, schema) => {
		if (isLGender) {
			return schema.required("please select a gender");
		}
		return schema.default(null);
	}),
	UserRole: yup.mixed().required("please enter a role"),
	PhoneNumber: yup
		.string()
		.required("phone number is required")
		.test("text number", "invalid phone number", checkForCorrectPhoneNumber)
});

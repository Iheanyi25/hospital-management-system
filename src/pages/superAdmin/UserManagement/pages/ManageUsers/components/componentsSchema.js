import * as yup from "yup";
import {
	checkForCorrectPhoneNumber,
	checkforValidName
} from "../../../../../../utils/formValidations";

export const addMenuSchema = yup.object().shape({
	Name: yup.string().required("please input menu name").nullable()
});

export const addUserSchema = yup.object().shape({
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
	Username: yup.string().required("please input user name").nullable(),
	Email: yup
		.string()
		.email()
		.required("please input email address")
		.nullable(),
	StudentType: yup.mixed().required("please enter a student type"),
	Department: yup.mixed().when("$isLDepartment", (isLDepartment, schema) => {
		if (isLDepartment) {
			return schema.required("please enter a department");
		}
		return schema.default(null);
	}),
	PhoneNumber: yup
		.string()
		.required("phone number is required")
		.test(
			"text number",
			"invaild phone number",
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
		.nullable()
		.test(
			"text name",
			"invalid name, check for trailing spaces",
			checkforValidName
		)
		.nullable(),
	Department: yup.mixed().when("$isLDepartment", (isLDepartment, schema) => {
		if (isLDepartment) {
			return schema.required("please enter a department");
		}
		return schema.default(null);
	}),
	UserRole: yup.mixed().required("please enter a role"),
	PhoneNumber: yup
		.string()
		.required("phone number is required")
		.test("text number", "invaild phone number", checkForCorrectPhoneNumber)
});

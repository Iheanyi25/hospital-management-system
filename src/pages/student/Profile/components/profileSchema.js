import * as yup from "yup";
import {
	checkForCorrectPhoneNumber,
	checkIfValidFullName,
	checkforValidName
} from "../../../../utils/formValidations";

export const PersonalInformationSchema = yup.object().shape({
	PermanentAddress: yup.string().required("please input your address"),
	ContactAddress: yup.string().required("please input your address"),
	Height: yup
		.string()
		.nullable()
		.required("please input your height")
		.nullable(),
	Weight: yup
		.string()
		.nullable()
		.required("please input your weight")
		.nullable(),
	EyeColorId: yup.mixed().nullable().required("please select your eye color")
});

export const ProgrammeDetailsSchema = yup.object().shape({
	GraduationYearId: yup.mixed().required("please select graduation year"),
	LevelId: yup.mixed().required("please select a level")
});

export const SponsorDetailsSchema = yup.object().shape({
	Fullname: yup
		.string()
		.required("full name is required")
		.test(
			"test first & last name",
			"enter both first and last name",
			checkIfValidFullName
		)
		.test(
			"text name",
			"invalid name, check for trailing spaces",
			checkforValidName
		),
	Address: yup.string().required("please input sponsor's address"),
	MobileNumber: yup
		.string()
		.required("phone number is required")
		.test(
			"text number",
			"invaild phone number",
			checkForCorrectPhoneNumber
		),
	Relationship: yup.mixed().required("please select sponsor's relationship"),
	Email: yup
		.string()
		.required("email is required")
		.email("invalid email address")
		.nullable()
});

export const NextOfKinDetailsSchema = yup.object().shape({
	Fullname: yup
		.string()
		.required("full name is required")
		.test(
			"test first & last name",
			"enter both first and last name",
			checkIfValidFullName
		)
		.test(
			"text name",
			"invalid name, check for trailing spaces",
			checkforValidName
		),
	Address: yup.string().required("please input next of kin's address"),
	MobileNumber: yup
		.string()
		.required("phone number is required")
		.test(
			"text number",
			"invaild phone number",
			checkForCorrectPhoneNumber
		),
	Relationship: yup
		.mixed()
		.required("please select next of kin's relationship"),
	Email: yup
		.string()
		.required("email is required")
		.email("invalid email address")
		.nullable()
});

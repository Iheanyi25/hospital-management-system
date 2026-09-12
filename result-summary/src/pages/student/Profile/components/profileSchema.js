import * as yup from "yup";
import {
	checkForCorrectPhoneNumber,
	checkIfValidFullName,
} from "../../../../utils/formValidations";

export const PersonalInformationSchema = yup.object().shape({
	PermanentAddress: yup.string().required("please input your address"),
	ContactAddress: yup.string().required("please input your address")
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
		.nullable(),
	BloodGroupId: yup.mixed().required("please select your blood group"),
	GenoTypeId: yup.mixed().required("please select your genotype"),
	ReligionId: yup.mixed().required("please select your religion")
});

export const NextOfKinDetailsSchema = yup.object().shape({
	Fullname: yup
		.string()
		.required("full name is required")
		.test(
			"test first & last name",
			"enter both first and last name",
			checkIfValidFullName
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

export const educationalRecordsSchema = yup.object().shape({
	educationalRecords: yup.array().of(
		yup.object().shape({
			school: yup.string().nullable(),
			regNumber: yup.string().nullable(),
			yearFrom: yup.string().nullable(),
			yearTo: yup.string().nullable(),
			certificate: yup
				.string()
				// .required("please input a qualification")
				.nullable()
		})
	)
});

export const employmentHistorySchema = yup.object().shape({
	workHistory: yup.array().of(
		yup.object().shape({
			employer: yup.string().nullable(),
			from: yup.string().nullable(),
			to: yup.string().nullable(),
			reasonForLeaving: yup.string().nullable()
		})
	)
});

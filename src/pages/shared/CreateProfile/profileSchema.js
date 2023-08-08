import * as yup from "yup";
import {
	checkForCorrectPhoneNumber,
	checkIfUserIsLessThanMaximumAge,
	checkIfUserIsMoreThanMinimumAge,
	checkIfValidFullName,
	checkforValidName
} from "../../../utils/formValidations";

export const PersonalInformationSchema = yup.object().shape({
	Gender: yup.mixed().required("please select your gender"),
	DateOfBirth: yup
		.string()
		.test(
			"min age",
			"you have to be more than 15 years old",
			checkIfUserIsMoreThanMinimumAge
		)
		.test(
			"max age",
			"you have to be less than 80 years old",
			checkIfUserIsLessThanMaximumAge
		)
		.required("please input your date of birth"),
	CountryId: yup.mixed().required("please select your country"),
	StateId: yup.mixed().when("$isStateRequired", (isStateRequired, schema) => {
		if (isStateRequired) return schema.required("please select your state");
		return schema.default(null);
	}),
	LgaId: yup.mixed().when("$isLGARequired", (isLGARequired, schema) => {
		if (isLGARequired) return schema.required("please select your LGA");
		return schema.default(null);
	}),
	HomeTown: yup.string().required("please input hometown").nullable(),
	PermanentAddress: yup.string().required("please input your address"),
	Email: yup
		.string()
		.required("email is required")
		.email("invalid email address")
		.nullable(),
	MobileNo: yup
		.string()
		.required("phone number is required")
		.test(
			"text number",
			"invaild phone number",
			checkForCorrectPhoneNumber
		),
	ContactAddress: yup.string().required("please input your address"),
	BloodGroup: yup.mixed().required("please select your blood group"),
	GenoType: yup.mixed().required("please select your genotype"),
	Religion: yup.mixed().required("please select your religion")
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
		.test("text name", "invalid name, check for trailing spaces", checkforValidName),
	Address: yup.string().required("please input sponsor's address"),
	PhoneNo: yup
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
		.test("text name", "invalid name, check for trailing spaces", checkforValidName),
	Address: yup.string().required("please input next of kin's address"),
	PhoneNo: yup
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

export const ProgrammeDetailSchema = yup.object().shape({
	MatricNumber: yup.string().required("please input matric number"),
	JambRegNumber: yup.string().required("please input jamb reg. number"),
	DepartmentId: yup.mixed().required("please select department"),
	DepartmentOptionId: yup.mixed().required("please select department option"),
	SchoolProgrammeId: yup.mixed().when("$isProgrammeRequired", (isProgrammeRequired, schema) => {
		if (isProgrammeRequired) return schema.required("please select programme");
		return schema.default(null);
	}),
	EntryYearId: yup.mixed().required("please select entry year"),
	GraduationYearId: yup.mixed().required("please select graduation year"),
	StudentTypeId: yup.mixed().required("please select student type"),
	StudentModeOfEntryId: yup.mixed().required("please select mode of entry"),
	StudentModeOfStudyId: yup.mixed().required("please select mode of study"),
	LevelId: yup.mixed().required("please select year of study"),
	StudentModeId: yup.mixed().required("please select student mode")
});

import * as yup from "yup";
import {
	checkForCorrectPhoneNumber,
	checkIfUserIsLessThanMaximumAge,
	checkIfUserIsMoreThanMinimumAge,
	checkIfValidFullName,
	checkforValidName
} from "../../../../../utils/formValidations";

export const PersonalInformationSchema = yup.object().shape({
	Firstname: yup
		.string()
		.required("please input your first name")
		.test(
			"text name",
			"invalid name, check for trailing spaces",
			checkforValidName
		).nullable(),
	Lastname: yup
		.string()
		.required("please input your surname")
		.test(
			"text name",
			"invalid name, check for trailing spaces",
			checkforValidName
		).nullable(),
	Middlename: yup.string().nullable(),
	GenderId: yup.mixed().required("please select your gender"),
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
	StateId: yup.mixed().required("please select your state"),
	LgaId: yup.mixed().when("$isLGARequired", (isLGARequired, schema) => {
		if (isLGARequired) {
			return schema.required("please select your LGA");
		}
		return schema.default(null);
	}),
	HomeTown: yup.string().required("please input hometown"),
	PermanentAddress: yup.string().required("please input your address"),
	Email: yup
		.string()
		.required("email is required")
		.email("invalid email address"),
	MobileNumber: yup
		.string()
		.required("phone number is required")
		.test(
			"text number",
			"invaild phone number",
			checkForCorrectPhoneNumber
		),
	ContactAddress: yup.string().required("please input your address"),
	BloodGroupId: yup.mixed().required("please select your blood group"),
	GenoTypeId: yup.mixed().required("please select your genotype"),
	ReligionId: yup.mixed().required("please select your religion")
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
	RelationshipId: yup
		.mixed()
		.required("please select sponsor's relationship"),
	Email: yup
		.string()
		.required("email is required")
		.email("invalid email address")
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
	RelationshipId: yup
		.mixed()
		.required("please select next of kin's relationship"),
	Email: yup
		.string()
		.required("email is required")
		.email("invalid email address")
});

export const ProgrammeDetailSchema = yup.object().shape({
	MatricNumber: yup.string().required("please input matric number"),
	JambRegNumber: yup.string().required("please input jamb reg. number"),
	DepartmentId: yup.mixed().required("please select department"),
	SchoolProgrammeId: yup
		.mixed()
		.when("$isSchoolProgrammeId", (isSchoolProgrammeId, schema) => {
			if (isSchoolProgrammeId) {
				return schema.required("please select a programme");
			}
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

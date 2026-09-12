import * as yup from "yup";
import {
	checkForCorrectPhoneNumber,
	checkIfUserIsLessThanMaximumAge,
	checkIfUserIsMoreThanMinimumAge,
	checkIfValidFullName,
	checkforValidName,
	checkforValidInitial
} from "../../../../../utils/formValidations";

export const PersonalInformationSchema = yup.object().shape({
	Firstname: yup
		.string()
		.required("please input your first name")
		.test("text name", "invaild name", checkforValidName),
	Middlename: yup
		.string()
		.test("text name", "invaild name", checkforValidInitial)
		.nullable(),
	Lastname: yup
		.string()
		.required("please input your surname")
		.test("text name", "invaild name", checkforValidName),
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
	CategoryId: yup.mixed().required("please select your category"),
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
	DepartmentOptionId: yup.mixed(),
	EntryYearId: yup.mixed().required("please select entry year"),
	GraduationYearId: yup.mixed().required("please select graduation year"),
	StudentTypeId: yup.mixed().required("please select student type"),
	ModeOfEntryId: yup.mixed().required("please select mode of entry"),
	ModeOfStudyId: yup.mixed().required("please select mode of study"),
	LevelId: yup.mixed().required("please select level of study"),
	StudentModeId: yup.mixed().required("please select student mode"),
	SchoolProgrammeId: yup
		.mixed()
		.when(
			"$isSchoolProgrammeIdRequired",
			(isSchoolProgrammeIdRequired, schema) => {
				if (isSchoolProgrammeIdRequired) {
					return schema.required("please select programme");
				}
				return schema.default(null);
			}
		),
	programmeTypeId: yup
		.mixed()
		.when("$isPGSelected", (isPGSelected, schema) => {
			if (isPGSelected) {
				return schema.required("please select a programme type");
			}
			return schema.default(null);
		})
});

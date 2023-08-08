import * as yup from "yup";
import {
	checkForCorrectPhoneNumber,
	checkifDuplicateEntriesExist,
	checkIfMinimumNumberOfSubjectIsSelected,
	checkforValidName,
	checkIfValidFullName,
	checkForNumbersAndStrings
} from "../../../utils/formValidations";

export const personalDetailsSchema = yup.object().shape({
	Surname: yup
		.string()
		.nullable()
		.test("text name", "invaild name", checkforValidName),
	Firstname: yup
		.string()
		.nullable()
		.test("text name", "invaild name", checkforValidName),
	Middlename: yup
		.string()
		.nullable()
		.test("text name", "invaild name", checkforValidName),
	GenderId: yup.mixed().required("please select your gender").nullable(),
	DateofBirth: yup.string().required("please enter your date of birth").nullable(),
	BloodGroupId: yup.mixed().required("please select your blood group"),
	GenoTypeId: yup.mixed().required("please select your genotype"),
	CountryId: yup.mixed().required("please select your country"),
	StateId: yup.mixed().required("please select your state"),
	LgaId: yup.mixed().when("$isLGARequired", (isLGARequired, schema) => {
		if (isLGARequired) {
			return schema.required("please select your LGA");
		}
		return schema.default(null);
	}),
	Town: yup.string().required("please input your town").nullable(),
	PermanentAddress: yup
		.string()
		.required("please enter your address")
		.nullable()
		.test("test name", "invalid address", checkForNumbersAndStrings)
		.min(3),
	Hobby: yup.string().required("please enter your hobby").nullable(),
	MobileNo: yup
		.string()
		.required("phone number is required")
		.test("text number", "invaild phone number", checkForCorrectPhoneNumber)
		.nullable(),
	Email: yup
		.string()
		.required("email is required")
		.email("invalid email address")
		.nullable(),
	ReligionId: yup.mixed().required("please select your religion"),
	Disability: yup.string().required("check a radio button").nullable(),
	CourseId: yup.mixed().required("please select your course"),

	SponsersFullname: yup
		.string()
		.required("please enter sponsor's full name")
		.test("text name", "invaild name", checkIfValidFullName)
		.nullable(),
	SponsersEmail: yup
		.string()
		.required("email is required")
		.email("invalid email address")
		.nullable(),
	SponsersRelationship: yup
		.mixed()
		.required("please select sponsor's relationship")
		.nullable(),
	SponsersMobileNo: yup
		.string()
		.required("sponsor's phone number is required")
		.test(
			"text number",
			"invaild phone number",
			checkForCorrectPhoneNumber
		),
	SponsersAddress: yup
		.string()
		.required("please input your address")
		.nullable()
		.test("test name", "invalid address", checkForNumbersAndStrings)
		.min(3)
});

export const OlevelResultSchema = yup.object().shape({
	sittings: yup
		.array()
		.of(
			yup.object().shape({
				examinationType: yup
					.mixed()
					.required("please select your o level type"),
				examCentre: yup
					.string()
					.required("please enter your exam center"),
				examNumber: yup
					.string()
					.required("please enter your exam number"),
				examYear: yup.mixed().required("please select your exam year"),
				cardPin: yup.string().required("please enter your card pin"),
				cardSerialNumber: yup
					.string()
					.required("please enter your card serial number"),
				subjects: yup
					.array()
					.of(
						yup.object().shape({
							subject: yup.mixed(),
							grade: yup.mixed()
						})
					)
					.test(
						"incomplete",
						"subjects are required",
						checkIfMinimumNumberOfSubjectIsSelected
					)
					.test(
						"duplicate",
						"duplicate entries exists",
						checkifDuplicateEntriesExist
					)
					.required("please select at least one subject")
			})
		)
		.required("this information is required")
});

export const InstitutionAttendedSchema = yup.object().shape({
	institutionAttended: yup
		.array()
		.of(
			yup.object().shape({
				institution: yup.string().required("enter name of institution"),
				fieldOfStudy: yup
					.string()
					.required("enter name your field of study"),
				dateFrom: yup.string().required("enter start date"),
				dateTo: yup.string().required("enter end date"),
				certificate: yup.string().required("enter certificate")
			})
		)
		// .test(
		// 	"test",
		// 	"institutions attended are required",
		// 	checkIfAtLeastOneInstitutionIsSelected
		// )
		// .required("please submit at least one institution attended")
});

import * as yup from "yup";
import {
	checkIfFilesAreTooBig,
	checkIfImagesAreCorrectType
} from "../../../utils/FileValidation";
import {
	checkForCorrectPhoneNumber,
	checkifDuplicateEntriesExist,
	checkIfMinimumNumberOfSubjectIsSelected,
	checkIfUserIsLessThanMaximumAge,
	checkIfUserIsMoreThanMinimumAge,
	checkIfValidFullName,
	checkforValidName
} from "../../../utils/formValidations";

export const personalDetailsSchema = yup.object().shape({
	Surname: yup
		.string()
		.test(
			"text name",
			"invalid name, check for trailing spaces",
			checkforValidName
		).nullable(),
	Firstname: yup
		.string()
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
	GenderId: yup.mixed().required("please select your gender"),
	DateOfBirth: yup
		.string()
		.required("please input your date of birth")
		.nullable()
		.test(
			"min age",
			"you have to be more than 15 years old",
			checkIfUserIsMoreThanMinimumAge
		)
		.test(
			"max age",
			"you have to be less than 80 years old",
			checkIfUserIsLessThanMaximumAge
		),
	BloodGroupId: yup.mixed().required("please select your blood group"),
	GenoTypeId: yup.mixed().required("please select your blood genotype"),
	CountryId: yup.mixed().required("please select your country"),
	StateId: yup.mixed().required("please select your state"),
	LgaId: yup.mixed().when("$isLGARequired", (isLGARequired, schema) => {
		if (isLGARequired) {
			return schema.required("please select your LGA");
		}
		return schema.default(null);
	}),
	Town: yup.string().required("please enter your town").nullable(),
	PermanentAddress: yup
		.string()
		.required("please enter contact address")
		.nullable(),
	MobileNo: yup
		.string()
		.required("phone number is required")
		.test(
			"text number",
			"invaild phone number",
			checkForCorrectPhoneNumber
		),
	Email: yup.string().email("invalid email address").nullable(),
	ReligionId: yup.mixed().required("please select your religion"),
	MaritalStatusId: yup.mixed().required("please select a marital status"),
	DepartmentId: yup.mixed().required("please select your course"),
	JupebOptionSubjectId: yup
		.mixed()
		.required("please select your subject combination"),
	ChoiceSchoolId: yup.mixed().required("please select your choice of school"),
	ChoiceDepartmentId: yup
		.mixed()
		.required("please select your choice of department"),
	SponsorsFullname: yup
		.string()
		.required("please enter sponsor's full name")
		.test(
			"test first & last name",
			"enter both first and last name",
			checkIfValidFullName
		)
		.test(
			"text name",
			"invalid name, check for trailing spaces",
			checkforValidName
		)
		.nullable(),
	SponsorsRelationship: yup
		.mixed()
		.required("please select sponsor's relationship")
		.nullable(),
	SponsorsMobileNo: yup
		.string()
		.required("phone number is required")
		.test("text number", "invaild phone number", checkForCorrectPhoneNumber)
		.nullable(),
	SponsorsAddress: yup
		.string()
		.required("please enter your sponsor's address")
		.nullable(),
	SponsorsEmail: yup
		.string()
		.required("please enter your sponsor's email address")
		.nullable()
});

export const OlevelResultSchema = yup.object().shape({
	sittings: yup
		.array()
		.of(
			yup.object().shape({
				examinationType: yup
					.mixed()
					.required("please select your o level type"),
				examCenter: yup
					.string()
					.required("please enter your exam center"),
				examNo: yup.string().required("please enter your exam number"),
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
	NameOfInstitution: yup.string().required("enter name of institution"),
	DateFrom: yup.mixed().required("enter start date"),
	DateTo: yup.mixed().required("enter end date"),
	Certificate: yup.string().required("enter certificate")
});

export const UploadDocumentSchema = yup.object().shape({
	Birthcertificate: yup
		.mixed()
		.test("required", "Please select a file!", (value) => {
			return value && value.length;
		})
		.test(
			"is-correct-file",
			"The file you selected is too big!",
			checkIfFilesAreTooBig
		)
		.test(
			"is-big-file",
			"Wrong file type, ensure this is an image file!",
			checkIfImagesAreCorrectType
		),
	OLevelResult: yup
		.mixed()
		.test("required", "Please select a file!", (value) => {
			return value && value.length;
		})
		.test(
			"is-correct-file",
			"The file you selected is too big!",
			checkIfFilesAreTooBig
		)
		.test(
			"is-big-file",
			"Wrong file type, ensure this is an image file!",
			checkIfImagesAreCorrectType
		),
	Signature: yup
		.mixed()
		.test("required", "Please select a file!", (value) => {
			return value && value.length;
		})
		.test(
			"is-correct-file",
			"The file you selected is too big!",
			checkIfFilesAreTooBig
		)
		.test(
			"is-big-file",
			"Wrong file type, ensure this is an image file!",
			checkIfImagesAreCorrectType
		)
});

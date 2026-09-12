import * as yup from "yup";
import {
	checkForCorrectPhoneNumber,
	checkifDuplicateEntriesExist,
	checkIfMinimumNumberOfSubjectIsSelected,
	checkforValidName,
	checkforValidInitial
} from "../../../utils/formValidations";

export const personalDetailsSchema = yup.object().shape({
	Surname: yup
		.string()
		.nullable()
		.test("text name", "Invalid name", checkforValidName),
	Firstname: yup
		.string()
		.nullable()
		.test("text name", "Invalid name", checkforValidName),
	Middlename: yup
		.string()
		.nullable()
		.test("text name", "Invalid name", checkforValidInitial),
	GenderId: yup.mixed().required("Please select your gender").nullable(),
	Religion: yup.mixed().required("Please select your religion").nullable(),
	DateofBirth: yup
		.string()
		.required("Please enter your date of birth")
		.nullable(),
	CountryId: yup.mixed().required("Please select your country"),
	StateId: yup.mixed().required("Please select your state"),
	LgaId: yup.mixed().when("$isLGARequired", (isLGARequired, schema) => {
		if (isLGARequired) {
			return schema.required("Please select your LGA");
		}
		return schema.default(null);
	}),
	PermanentAddress: yup
		.string()
		.required("Please enter your address")
		.nullable()
		.min(3),
	ContactAddress: yup
		.string()
		.required("Please enter your address")
		.nullable()
		.min(3),
	MobileNo: yup
		.string()
		.required("P	hone number is required")
		.test("text number", "Invalid phone number", checkForCorrectPhoneNumber)
		.nullable(),
	Email: yup
		.string()
		.required("Email is required")
		.email("Invalid email address")
		.nullable()
});

export const ProgrammeDetailsSchema = yup.object().shape({
	department: yup.mixed().required("Please select your department"),
	regNo: yup.string().required("Please enter your reg number").nullable(),
	jambScore: yup
		.number()
		.required("Please enter your jamb score")
		.nullable()
		.max(400)
});

export const OlevelResultSchema = yup.object().shape({
	sittings: yup
		.array()
		.of(
			yup.object().shape({
				oLevelType: yup
					.mixed()
					.required("Please input your O'Level type"),
				examCentre: yup
					.string()
					.required("Please enter your exam center"),
				examNumber: yup
					.string()
					.required("Please enter your exam number"),
				examYear: yup.mixed().required("Please select your exam year"),
				resultPin: yup.string().required("Please input value"),
				resultPinSno: yup.string().required("Please input value"),
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
						"Duplicate entries exists",
						checkifDuplicateEntriesExist
					)
					.required("Please select entry")
			})
		)
		.required("This information is required")
});

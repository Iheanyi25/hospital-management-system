import * as yup from "yup";
import {
	checkForCorrectPhoneNumber,
	checkIfUserIsLessThanMaximumAge,
	checkIfUserIsMoreThanMinimumAge,
	checkIfValidFullName,
	checkforValidName
} from "../../../utils/formValidations";

export const personalDetailsSchema = yup.object().shape({
	sexId: yup.mixed().required("please select your gender"),
	dateOfBirth: yup
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
	countryId: yup.mixed().required("please select your country"),
	stateId: yup.mixed().required("please select your state"),
	lgaId: yup.mixed().when("$isLGARequired", (isLGARequired, schema) => {
		if (isLGARequired) return schema.required("please select your LGA");
		return schema.default(null);
	}),
	contactAddress: yup
		.string()
		.required("please input your address")
		.nullable(),
	permanentAddress: yup
		.string()
		.required("please input your address")
		.nullable(),
	email: yup
		.string()
		.required("email is required")
		.email("invalid email address")
		.nullable(),
	maritalStatusId: yup.mixed().required("please select your marital status"),
	religionId: yup.mixed().required("please select your religion"),
	fullname: yup
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
		)
		.nullable(),
	address: yup
		.string()
		.required("please input next of kin's address")
		.nullable(),
	phoneNo: yup
		.string()
		.required("phone number is required")
		.test("text number", "invaild phone number", checkForCorrectPhoneNumber)
		.nullable(),
	relationshipId: yup
		.mixed()
		.required("please select next of kin's relationship")
});

export const educationalRecordsSchema = yup.object().shape({
	educationHistory: yup.array().of(
		yup.object().shape({
			schoolName: yup
				.string()
				.required("please input location")
				.test(
					"text name",
					"invalid name, check for trailing spaces",
					checkforValidName
				)
				.nullable(),
			majorField: yup
				.string()
				.required("please input field of study")
				.test(
					"text name",
					"invalid name, check for trailing spaces",
					checkforValidName
				)
				.nullable(),
			yearFrom: yup.string().required("please select a date").nullable(),
			yearTo: yup.string().required("please select a date").nullable(),
			certificate: yup
				.string()
				.required("please input a degree")
				.nullable()
		})
	)
});

export const employmentHistorySchema = yup.object().shape({
	workHistory: yup.array().of(
		yup.object().shape({
			employer: yup.string().required("please input location"),
			yearFrom: yup.string().required("please select a date"),
			yearTo: yup.string().required("please select a date"),
			description: yup.string().required("please input a job description")
		})
	),
	referees: yup.array().of(
		yup.object().shape({
			name: yup
				.string()
				.required("please input a name")
				.test(
					"text name",
					"invalid name, check for trailing spaces",
					checkforValidName
				),
			email: yup
				.string()
				.required("email is required")
				.email("invalid email address"),
			position: yup.string().required("please input a job position"),
			organisation: yup.string().required("please input an organization")
		})
	)
});

export const prgramInfoSchema = yup.object().shape({
	programmeId: yup.mixed().required("please select programme"),
	departmentId: yup.mixed().required("please select department"),
	facultyId: yup.mixed().required("please select faculty"),
	departmentOptionId: yup
		.mixed()
		.when(
			"$isDepartmentOptionRequired",
			(isDepartmentOptionRequired, schema) => {
				if (isDepartmentOptionRequired) {
					return schema.required("please select department option");
				}
				return schema.default(null);
			}
		)
});

export const researchDetailsSchema = yup.object().shape({
	dissertationTitle: yup.string().required("please input a title"),
	researchStatement: yup
		.string()
		.required("please write a research statement")
		.test(
			"Is less than 200?",
			"text must be less than 200 words!",
			(value) => value.split(" ").length < 200
		),
	nysc: yup.mixed().required("please answer the question"),
	nyscYear: yup
		.mixed()
		.when("$isExemptionYearRequired", (isExemptionYearRequired, schema) => {
			if (isExemptionYearRequired) {
				return schema.required("please answer the question");
			}
			return schema.default(null);
		}),
	otherPrograms: yup.mixed().required("please answer the question"),
	otherProgramsType: yup
		.string()
		.when("$isOtherProgramsRequired", (isOtherProgramsRequired, schema) => {
			if (isOtherProgramsRequired) {
				return schema.required("please answer the question");
			}
			return schema.default(null);
		}),
	otherProgramsInstitution: yup
		.string()
		.when("$isOtherProgramsRequired", (isOtherProgramsRequired, schema) => {
			if (isOtherProgramsRequired) {
				return schema.required("please answer the question");
			}
			return schema.default(null);
		})
});

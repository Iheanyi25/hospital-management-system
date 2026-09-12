import * as yup from "yup";
import {
	checkForCorrectPhoneNumber,
	checkIfMinimumNumberOfSubjectIsSelected,
	checkIfUserIsLessThanMaximumAge,
	checkIfUserIsMoreThanMinimumAge,
	checkIfValidFullName,
	checkifDuplicateEntriesExist,
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
	fullname: yup
		.string()
		.required("full name is required")
		.test(
			"test first & last name",
			"enter both first and last name",
			checkIfValidFullName
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
	educationalRecords: yup.array().of(
		yup.object().shape({
			schoolName: yup
				.string()
				.required("please input the institution name")
				.nullable(),
			countryId: yup
				.mixed()
				.required("please input a place or country")
				.nullable(),
			yearFrom: yup.string().required("please select a date").nullable(),
			yearTo: yup.string().required("please select a date").nullable(),
			certificate: yup
				.string()
				.required("please input a qualification")
				.nullable()
		})
	)
});

export const employmentHistorySchema = yup.object().shape({
	employmentInfo: yup.array().of(
		yup.object().shape({
			employer: yup
				.string()
				.nullable()
				.required("Please input a company with location"),
			yearFrom: yup
				.string()
				.test("new-test", "please select a date", function (value) {
					const { certificate, employer, to, reasonForLeaving } =
						this.parent;
					if (!(certificate || employer || to || reasonForLeaving)) {
						return true;
					} else {
						return !!value;
					}
				})
				.nullable(),
			yearTo: yup
				.string()
				.test("new-test", "please select a date", function (value) {
					const { certificate, employer, from, reasonForLeaving } =
						this.parent;
					if (
						!(certificate || employer || from || reasonForLeaving)
					) {
						return true;
					} else {
						return !!value;
					}
				})
				.nullable(),
			jobDescription: yup
				.string()
				.nullable()
				.required("Please input a job description")
		})
	)
});

export const courseInfoSchema = yup.object().shape({
	facultyId: yup.mixed().required("please select faculty"),
	departmentId: yup.mixed().required("please select department"),
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
	languages: yup.array().of(
		yup.object().shape({
			language: yup
				.string()
				.test("new-test", "please select a date", function (value) {
					const { languageProficiencyId } = this.parent;
					if (!languageProficiencyId) {
						return true;
					} else {
						return !!value;
					}
				}),
			languageProficiencyId: yup
				.mixed()
				.test("new-test", "please select a date", function (value) {
					const { language } = this.parent;
					if (!language) {
						return true;
					} else {
						return !!value;
					}
				})
		})
	),
	statement: yup
		.string()
		.required("please write a statement")
		.test(
			"Is less than 180?",
			"text must be less than 180 words!",
			(value) => value.split(" ").length < 180
		),
	fieldOfStudy: yup.string().required("please tell us your field of study"),
	disabilitySelector: yup.mixed().required("please answer the question"),
	hearAboutUsId: yup.mixed().required("please answer the question"),
	disability: yup
		.string()
		.when(
			"$isdisabilitySelectorRequired",
			(isdisabilitySelectorRequired, schema) => {
				if (isdisabilitySelectorRequired) {
					return schema.required("please answer the question");
				}
				return schema.default(null);
			}
		)
});

export const OlevelResultSchema = yup.object().shape({
	sittings: yup
		.array()
		.of(
			yup.object().shape({
				oLevelType: yup
					.mixed()
					.required("please input your o level type"),
				examCentre: yup
					.string()
					.required("please input your exam center"),
				examNumber: yup
					.string()
					.required("please input your exam number"),
				examYear: yup.mixed().required("please input your exam year"),
				resultPin: yup.string().required("please input your your pin"),
				resultPinSno: yup
					.string()
					.required("please input your pin serial number"),
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

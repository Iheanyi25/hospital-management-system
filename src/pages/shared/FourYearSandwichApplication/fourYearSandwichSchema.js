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
	relationship: yup
		.mixed()
		.required("please select next of kin's relationship")
});

export const educationalRecordsSchema = yup.object().shape({
	educationalRecords: yup.array().of(
		yup.object().shape({
			school: yup
				.string()
				.required("please input the institution name")
				.nullable(),
			regNumber: yup
				.string()
				.required("please input reg. number")
				.nullable(),
			yearFrom: yup.string().required("please select a date").nullable(),
			yearTo: yup.string().required("please select a date").nullable(),
			certificate: yup
				.string()
				.required("please input a qualification")
				.nullable()
		})
	),
	honours: yup.array().of(
		yup.object().shape({
			honour: yup
				.string()
				.test(
					"honour-test",
					"please input the title of the honour",
					function (value) {
						if (!this.parent.yearObtained) {
							return true;
						} else {
							return !!value;
						}
					}
				)
				.nullable(),
			yearObtained: yup
				.mixed()
				.test(
					"year-obtained-test",
					"please select year obtained",
					function (value) {
						if (!this.parent.honour) {
							return true;
						} else {
							return !!value;
						}
					}
				)
		})
	),
	publications: yup.array().of(
		yup.object().shape({
			title: yup
				.string()
				.test("new-test", "please input a title", function (value) {
					const { pGPublicationStatusId, year } = this.parent;
					if (!(pGPublicationStatusId || year)) {
						return true;
					} else {
						return !!value;
					}
				}),
			pGPublicationStatusId: yup
				.mixed()
				.test(
					"new-test",
					"please select your publication status",
					function (value) {
						const { title, year } = this.parent;
						if (!(title || year)) {
							return true;
						} else {
							return !!value;
						}
					}
				),
			year: yup
				.mixed()
				.test("new-test", "please select year", function (value) {
					const { pGPublicationStatusId, title } = this.parent;
					if (!(pGPublicationStatusId || title)) {
						return true;
					} else {
						return !!value;
					}
				})
		})
	)
});

export const employmentHistorySchema = yup.object().shape({
	workHistory: yup.array().of(
		yup.object().shape({
			employer: yup
				.string()
				.required("This field is required")
				.nullable(),
			yearFrom: yup
				.string()
				.required("This field is required")
				.nullable(),
			yearTo: yup
				.string()
				.test("new-test", "please select a date", function (value) {
					const { currentlyWorkingHere } = this.parent;
					if (currentlyWorkingHere) {
						return true;
					} else if (!currentlyWorkingHere && value) {
						return true;
					}
					return false;
				})
				.nullable(),
			jobDescription: yup
				.string()
				.required("This field is required")
				.nullable(),
			reasonForLeaving: yup
				.string()
				.required("This field is required")
				.nullable(),
			currentlyWorkingHere: yup.boolean().nullable()
		})
	)
});

export const prgramInfoSchema = yup.object().shape({
	programmeId: yup.mixed().required("please select programme"),
	departmentId: yup.mixed().required("please select department"),
	modeOfStudyId: yup.mixed().required("please select a mode of study"),
	facultyId: yup.mixed().required("please select a faculty"),
	enrolledBefore: yup.mixed().required("please answer the question"),
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

export const UploadCertificateSchema = yup.object().shape({
	certificates: yup.array().of(
		yup.object().shape({
			certificateTypeId: yup
				.mixed()
				.test("new-test", "please select a date", function (value) {
					const { certificate } = this.parent;
					if (!certificate) {
						return true;
					} else {
						return !!value;
					}
				})
		})
	)
});

export const programmeDetailsSchema = yup.object().shape({
	appliedToUniversity: yup.mixed().required("please this field is required"),
	appliedToUniversityDate: yup
		.mixed()
		.required("please this field is required"),
	offeredAdmission: yup.mixed().required("please this field is required"),
	facultyId: yup.mixed().required("please select a faculty"),
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

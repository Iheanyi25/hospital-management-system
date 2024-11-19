import * as yup from "yup";
import {
	checkForCorrectPhoneNumber,
	checkIfMinimumNumberOfSubjectIsSelected,
	checkIfUserIsLessThanMaximumAge,
	checkIfUserIsMoreThanMinimumAge,
	checkforValidName,
	checkifDuplicateEntriesExist
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
	maritalStatusId: yup.mixed().required("please select your marital status")
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
				.required("please select your country")
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
	workHistory: yup.array().of(
		yup.object().shape({
			employer: yup
				.string()
				.test("new-test", "please input location", function (value) {
					const { certificate, from, to, reasonForLeaving } =
						this.parent;
					if (!(certificate || from || to || reasonForLeaving)) {
						return true;
					} else {
						return !!value;
					}
				})
				.nullable(),
			from: yup
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
			to: yup
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
			reasonForLeaving: yup
				.string()
				.test(
					"new-test",
					"please input a reason for leaving",
					function (value) {
						const { certificate, employer, from, to } = this.parent;
						if (!(certificate || employer || from || to)) {
							return true;
						} else {
							return !!value;
						}
					}
				)
				.nullable(),
			currentlyWorking: yup.boolean().nullable()
		})
	),
	referees: yup.array().of(
		yup.object().shape({
			name: yup
				.string()
				.required("please input a name")
				.test(
					"text name",
					"invalid name format. Please ensure there are no trailing spaces and use a name with a minimum length of 2 characters.",
					checkforValidName
				)
				.nullable(),
			email: yup
				.string()
				.required("email is required")
				.email("invalid email address")
				.nullable(),
			mobileNumber: yup
				.string()
				.required("phone number is required")
				.test(
					"text number",
					"invalid phone number",
					checkForCorrectPhoneNumber
				)
				.nullable(),
			address: yup.string().required("please input an address").nullable()
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

export const updateUniversityDetailSchema = yup.object().shape({
	presentUniversity: yup.string().required("please input university"),
	presentFaculty: yup.string().required("please input faculty"),
	presentDepartment: yup.string().required("please input department"),
	presentCourseOfStudy: yup.string().required("please input course of study")
});

export const updateCourseOfStudySchema = yup.object().shape({
	departmentId: yup.mixed().required("please select a department"),
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
		),
	facultyId: yup.mixed().required("please select a faculty")
});

export const otherInformationSchema = yup.object().shape({
	appliedToUniversity: yup.mixed().required("please select an option"),
	appliedToUniversityDate: yup
		.mixed()
		.when(
			"$appliedToUniversityDateRequired",
			(appliedToUniversityDateRequired, schema) => {
				if (appliedToUniversityDateRequired) {
					return schema.required("Please select a year");
				}
				return schema.default(null);
			}
		),
	offeredAdmission: yup.mixed().required("please select an option"),
	departmentId: yup
		.mixed()
		.when("$isDepartmentRequired", (isDepartmentRequired, schema) => {
			if (isDepartmentRequired) {
				return schema.required("Please select a department");
			}
			return schema.default(null);
		}),
	scholarshipDetails: yup.string().nullable(),
	paymentPlan: yup.string().nullable()
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

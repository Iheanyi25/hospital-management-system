import * as yup from "yup";
import {
	checkForCorrectPhoneNumber,
	checkIfCertificateTypeHasCertificateUpload,
	checkifDuplicateEntriesExist,
	checkIfMinimumNumberOfSubjectIsSelected,
	checkIfUserIsLessThanMaximumAge,
	checkIfUserIsMoreThanMinimumAge,
	checkIfValidFullName,
	checkDuplicateSubjects
} from "../../../utils/formValidations";

export const personalDetailsSchema = yup.object().shape({
	sex: yup.mixed().required("please select your gender"),
	dateOfBirth: yup
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
	country: yup.mixed().required("please select your country"),
	state: yup.mixed().required("please select your state"),
	lga: yup.mixed().when("$isLGARequired", (isLGARequired, schema) => {
		if (isLGARequired) return schema.required("please select your LGA");
		return schema.default(null);
	}),
	mobileNo: yup
		.string()
		.required("phone number is required")
		.test(
			"text number",
			"invaild phone number",
			checkForCorrectPhoneNumber
		),
	contactAddress: yup
		.string()
		.required("please input your address")
		.nullable(),
	email: yup
		.string()
		.required("email is required")
		.email("invalid email address")
		.nullable(),
	disability: yup
		.string()
		.when("$isDisabilityRequired", (isDisabilityRequired, schema) => {
			if (isDisabilityRequired)
				return schema.required("please enter your disability");
			return schema.default(null);
		})
		.nullable(),
	sponsorFullName: yup
		.string()
		.required("full name is required")
		.test(
			"test first & last name",
			"enter both first and last name",
			checkIfValidFullName
		)
		.nullable(),
	sponsorAddress: yup
		.string()
		.required("please input next of kin's address")
		.nullable(),
	sponsorMobileNo: yup
		.string()
		.required("phone number is required")
		.test("text number", "invaild phone number", checkForCorrectPhoneNumber)
		.nullable(),
	sponsorRelationship: yup
		.mixed()
		.required("please select next of kin's relationship")
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
				resultPin: yup.string().required("please input value"),
				resultPinSno: yup.string().required("please input value"),
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

export const UploadCertificateSchema = yup.object().shape({
	certificates: yup
		.array()
		.of(
			yup.object().shape({
				certificateType: yup.mixed(),
				certificateData: yup.mixed()
			})
		)
		.test(
			"test",
			"certificates are required",
			checkIfCertificateTypeHasCertificateUpload
		)
		.required("please select at least one certificate")
});

export const ProgrammeDetailsSchema = yup.object().shape({
	department: yup.mixed().required("please select your department"),
	faculty: yup.mixed().required("please select your faculty"),
	regNo: yup.string().required("please enter your reg number").nullable(),
	firstSubject: yup
		.mixed()
		.required("please select your first subject")
		.test(
			"is-duplicate",
			"duplicate subject selected",
			checkDuplicateSubjects("firstSubject")
		),

	secondSubject: yup
		.mixed()
		.required("please select your second subject")
		.test(
			"is-duplicate",
			"duplicate subject selected",
			checkDuplicateSubjects("secondSubject")
		),

	thirdSubject: yup
		.mixed()
		.required("please select your third subject")
		.test(
			"is-duplicate",
			"duplicate subject selected",
			checkDuplicateSubjects("thirdSubject")
		),
	fourthSubject: yup
		.mixed()
		.required("please select your fourth subject")
		.test(
			"is-duplicate",
			"duplicate subject selected",
			checkDuplicateSubjects("fourthSubject")
		),
	utmeScore: yup
		.number()
		.required("please enter your utme score")
		.nullable()
		.max(400, "utme score cannot be beyond 400")
		.transform((value) => (Number.isNaN(value) ? null : value))
});

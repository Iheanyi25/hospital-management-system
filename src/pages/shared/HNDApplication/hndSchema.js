import * as yup from "yup";
import {
	checkForCorrectPhoneNumber,
	checkForWholeAndTwoDecimalPlaceNumbers,
	checkIfCertificateTypeHasCertificateUpload,
	checkifDuplicateEntriesExist,
	checkIfMinimumNumberOfSubjectIsSelected,
	checkIfSpecialCharacters,
	checkIfUserIsLessThanMaximumAge,
	checkIfUserIsMoreThanMinimumAge
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
		.trim()
		.required("please input your address")
		.test(
			"check-input-type",
			"no special characters are allowed",
			checkIfSpecialCharacters
		)
		.nullable(),
	permanentAddress: yup
		.string()
		.required("please input your permanent address")
		.test(
			"check-input-type",
			"no special characters are allowed",
			checkIfSpecialCharacters
		)
		.nullable(),
	email: yup
		.string()
		.required("email is required")
		.email("invalid email address")
		.nullable(),
	maritalStatus: yup.mixed().required("please select your marital status")
});

export const OlevelResultSchema = yup.object().shape({
	sittings: yup
		.array()
		.of(
			yup.object().shape({
				oLevelType: yup
					.mixed()
					.required("please select your o level type"),
				examCentre: yup
					.string()
					.trim()
					.required("please input your exam center")
					.test(
						"check-input-type",
						"no special characters are allowed",
						checkIfSpecialCharacters
					),
				examNumber: yup
					.string()
					.trim()
					.required("please input your exam number")
					.test(
						"check-input-type",
						"no special characters are allowed",
						checkIfSpecialCharacters
					),
				examYear: yup.mixed().required("please select your exam year"),
				// resultPin: yup.string().required("please input value"),
				// resultPinSno: yup.string().required("please input value"),
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
					.required("please select at least eight subject")
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
	department: yup.mixed().required("please select your first choice programme"),
	faculty: yup.mixed().required("please select your first choice school")
});

export const JambDetailsSchema = yup
	.object()
	.shape({
		firstSubject: yup.mixed().required("Please select your first subject"),
		secondSubject: yup
			.mixed()
			.required("Please select your second subject"),
		thirdSubject: yup.mixed().required("Please select your third subject"),
		fourthSubject: yup
			.mixed()
			.required("Please select your fourth subject"),
		firstSubjectUtmeScore: yup
			.number("Please input a valid JAMB score")
			.typeError("Score must be a number")
			.nullable()
			.min(0, "Value must be at least 0")
			.max(100, "Value must be at most 100")
			.required("This field is required"),
		secondSubjectUtmeScore: yup
			.number("Please input a valid JAMB score")
			.typeError("Score must be a number")
			.nullable()
			.min(0, "Value must be at least 0")
			.max(100, "Value must be at most 100")
			.required("This field is required"),
		thirdSubjectUtmeScore: yup
			.number("Please input a valid JAMB score")
			.typeError("Score must be a number")
			.nullable()
			.min(0, "Value must be at least 0")
			.max(100, "Value must be at most 100")
			.required("This field is required"),
		fourthSubjectUtmeScore: yup
			.number("Please input a valid JAMB score")
			.typeError("Score must be a number")
			.nullable()
			.min(0, "Value must be at least 0")
			.max(100, "Value must be at most 100")
			.required("This field is required")
	})
	.test("unique-subjects", "Duplicate subjects found", function (values) {
		const subjectFields = [
			"firstSubject",
			"secondSubject",
			"thirdSubject",
			"fourthSubject"
		];

		const subjects = subjectFields.map((field) => {
			const subject = values[field];
			return subject &&
				typeof subject === "object" &&
				subject.value !== undefined
				? subject.value
				: subject;
		});

		const valueOccurrences = new Map();
		const duplicateIndices = [];

		subjects.forEach((subject, index) => {
			if (subject === undefined || subject === null) return;

			if (valueOccurrences.has(subject)) {
				if (!duplicateIndices.includes(valueOccurrences.get(subject))) {
					duplicateIndices.push(valueOccurrences.get(subject));
				}
				duplicateIndices.push(index);
			} else {
				valueOccurrences.set(subject, index);
			}
		});

		if (duplicateIndices.length === 0) return true;

		const errors = duplicateIndices.map((index) =>
			this.createError({
				path: subjectFields[index],
				message: "This subject has already been selected"
			})
		);

		return new yup.ValidationError(errors);
	});

export const NDDetailsSchema = yup.object().shape({
	yearOfGraduation: yup.mixed().required("please select your department"),
	schoolAttended: yup
		.string()
		.trim()
		.required("please enter your school attended")
		.test(
			"check-input-type",
			"no special characters are allowed",
			checkIfSpecialCharacters
		)
		,
	cgpa: yup
		.string()
		.required("Please enter your CGPA")
		.test("cgpa", "Invalid cgpa", checkForWholeAndTwoDecimalPlaceNumbers),
	courseStudied: yup
		.string()
		.trim()
		.required("please enter your course studied")
		.test(
			"check-input-type",
			"no special characters are allowed",
			checkIfSpecialCharacters
		)
		
});

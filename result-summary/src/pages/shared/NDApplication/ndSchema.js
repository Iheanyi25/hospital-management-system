import * as yup from "yup";
import {
	checkForCorrectPhoneNumber,
	checkIfCertificateTypeHasCertificateUpload,
	checkIfUserIsLessThanMaximumAge,
	checkIfUserIsMoreThanMinimumAge,
	checkIfFieldsAreNotIdentical,
	checkIfMinimumNumberOfSubjectIsSelected,
	checkifDuplicateEntriesExist,
	checkIfSpecialCharacters
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
					.required("please input your o level type"),
				examCentre: yup
					.string()
					.test(
						"check-input-type",
						"no special characters are allowed",
						checkIfSpecialCharacters
					)
					.required("please input your exam center"),
				examNumber: yup
					.string()
					.test(
						"check-input-type",
						"no special characters are allowed",
						checkIfSpecialCharacters
					)
					.required("please input your exam number"),
				examYear: yup.mixed().required("please input your exam year"),
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

// export const OlevelResultSchema = yup.object().shape({
// 	OlevelInfo: yup.array().of(
// 		yup.object().shape({
// 			ExaminationTypeId: yup
// 				.number()
// 				.required("ExaminationTypeId is required")
// 				.min(0, "ExaminationTypeId must be at least 0"), // Assuming 0 is valid
// 			ExamCenter: yup.string().required("ExamCenter is required"),
// 			ExamNumber: yup.string().required("ExamNumber is required"),
// 			ExamYear: yup
// 				.number()
// 				.required("ExamYear is required")
// 				.min(1900, "ExamYear must be a valid year")
// 				.max(
// 					new Date().getFullYear(),
// 					"ExamYear cannot be in the future"
// 				),
// 			ResultPin: yup.string().required("ResultPin is required"),
// 			ResultSerialNumber: yup
// 				.string()
// 				.required("ResultSerialNumber is required"),
// 			SubjectGrade: yup.object().shape({
// 				additionalProp1: yup
// 					.string()
// 					.required("Grade for additionalProp1 is required"),
// 				additionalProp2: yup
// 					.string()
// 					.required("Grade for additionalProp2 is required"),
// 				additionalProp3: yup
// 					.string()
// 					.required("Grade for additionalProp3 is required")
// 			})
// 		})
// 	)
// });

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
	department: yup
		.mixed()
		.required("please select your first choice programme"),
	faculty: yup.mixed().required("please select first choice school"),
	regNo: yup.string().required("please enter your reg number").nullable(),
	alternativeDepartment: yup
		.mixed()
		.test(
			"check-if-programmes-are-identical",
			"First Choice programme and Second Choice programme cannot be the same",
			checkIfFieldsAreNotIdentical("department")
		)
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
			.typeError('Score must be a number')
			.nullable()
			.min(0, "Value must be at least 0")
			.max(100, "Value must be at most 100")
			.required("This field is required"),
		secondSubjectUtmeScore: yup
			.number("Please input a valid JAMB score")
			.typeError('Score must be a number')
			.nullable()
			.min(0, "Value must be at least 0")
			.max(100, "Value must be at most 100")
			.required("This field is required"),
		thirdSubjectUtmeScore: yup
			.number("Please input a valid JAMB score")
			.typeError('Score must be a number')
			.nullable()
			.min(0, "Value must be at least 0")
			.max(100, "Value must be at most 100")
			.required("This field is required"),
		fourthSubjectUtmeScore: yup
			.number("Please input a valid JAMB score")
			.typeError('Score must be a number')
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

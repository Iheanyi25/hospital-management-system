import * as yup from "yup";

import {
	checkForCorrectPhoneNumber,
	checkifDuplicateEntriesExist,
	checkIfMinimumNumberOfSubjectIsSelected,
	checkIfUserIsLessThanMaximumAge,
	checkIfUserIsMoreThanMinimumAge
} from "../../../utils/formValidations";

export const personalDetailsSchema = yup.object().shape({
	Surname: yup.string(),
	Firstname: yup.string(),
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
	CountryId: yup.mixed().required("please select your country"),
	StateId: yup.mixed().required("please select your state"),
	LgaId: yup.mixed().when("$isLGARequired", (isLGARequired, schema) => {
		if (isLGARequired) {
			return schema.required("please select your LGA");
		}
		return schema.default(null);
	}),
	MobileNo: yup
		.string()
		.required("phone number is required")
		.test(
			"text number",
			"invaild phone number",
			checkForCorrectPhoneNumber
		),
	Email: yup.string().email("invalid email address").nullable()
});

export const ProgrammeDetailsSchema = yup.object().shape({
	Mode: yup.mixed().required("please select a mode"),
	Award: yup.mixed().required("please select an award"),
	Course: yup.mixed().required("please select a course"),
	Session: yup.mixed().required("please enter a session")
});

export const educationalRecordsSchema = yup.object().shape({
	educationHistory: yup.array().of(
		yup.object().shape({
			schoolName: yup
				.string()
				.required("please enter location")
				.nullable(),
			majorField: yup
				.string()
				.required("please enter field of study")
				.nullable(),
			yearFrom: yup.string().required("please select a date").nullable(),
			yearTo: yup.string().required("please select a date").nullable(),
			certificate: yup
				.string()
				.required("please enter a degree")
				.nullable()
		})
	)
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

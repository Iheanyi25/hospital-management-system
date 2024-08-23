import * as yup from "yup";
import {
	checkForCorrectPhoneNumber,
	checkifDuplicateEntriesExist,
	checkIfMinimumNumberOfSubjectIsSelected,
	checkforValidName,
	checkForNumbersAndStrings,
	checkforValidInitial
} from "../../../utils/formValidations";

export const personalDetailsSchema = yup.object().shape({
	Surname: yup
		.string()
		.nullable()
		.test("text name", "invaild name", checkforValidName),
	Firstname: yup
		.string()
		.nullable()
		.test("text name", "invaild name", checkforValidName),
	Middlename: yup
		.string()
		.nullable()
		.test("text name", "invaild name", checkforValidInitial),
	GenderId: yup.mixed().required("please select your gender").nullable(),
	DateofBirth: yup
		.string()
		.required("please enter your date of birth")
		.nullable(),
	CountryId: yup.mixed().required("please select your country"),
	StateId: yup.mixed().required("please select your state"),
	LgaId: yup.mixed().when("$isLGARequired", (isLGARequired, schema) => {
		if (isLGARequired) {
			return schema.required("please select your LGA");
		}
		return schema.default(null);
	}),
	PermanentAddress: yup
		.string()
		.required("please enter your address")
		.nullable()
		.test("test name", "invalid address", checkForNumbersAndStrings)
		.min(3),
	MobileNo: yup
		.string()
		.required("phone number is required")
		.test("text number", "invaild phone number", checkForCorrectPhoneNumber)
		.nullable(),
	Email: yup
		.string()
		.required("email is required")
		.email("invalid email address")
		.nullable()
});

export const CheckForDuplicateJambSubject = (
	value,
	firstSubjectValue,
	secondSubjectValue
) => {
	if (!value || !firstSubjectValue || !secondSubjectValue) {
		return true;
	}
	if (value === firstSubjectValue || value === secondSubjectValue) {
		return false;
	}
	return true;
};

export const ProgrammeDetailsSchema = yup.object().shape({
	department: yup.mixed().required("please select your department"),
	secondSubject: yup
		.mixed()
		.required("please select your second subject")
		.test(
			"duplicate entry",
			"duplicate entries selected",
			(value, { parent: { thirdSubject, fourthSubject } }) => {
				return CheckForDuplicateJambSubject(
					value?.value,
					thirdSubject?.value,
					fourthSubject?.value
				);
			}
		),
	thirdSubject: yup
		.mixed()
		.required("please select your third subject")
		.test(
			"duplicate entry",
			"duplicate entries selected",
			(value, { parent: { secondSubject, fourthSubject } }) => {
				return CheckForDuplicateJambSubject(
					value?.value,
					secondSubject?.value,
					fourthSubject?.value
				);
			}
		),
	fourthSubject: yup
		.mixed()
		.required("please select your fourth subject")
		.test(
			"duplicate entry",
			"duplicate entries selected",
			(value, { parent: { secondSubject, thirdSubject } }) => {
				return CheckForDuplicateJambSubject(
					value?.value,
					secondSubject?.value,
					thirdSubject?.value
				);
			}
		),
	utmeScore: yup
		.number("")
		.required("please input your utme score")
		.typeError("utme score must be a number")
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
					.required("please enter your exam center"),
				examNumber: yup
					.string()
					.required("please enter your exam number"),
				examYear: yup.mixed().required("please select your exam year"),
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
					.required("please select entry")
			})
		)
		.required("this information is required")
});

export const UploadCertificateSchema = yup.object().shape({
	birthCertificate: yup.string().required("field cant be empty"),
	lgaIdentification: yup.string().required("field cant be empty"),
	testimonials: yup.string().required("field cant be empty"),
	firstSchoolLeaving: yup.string(),
	ondHndStatementOfResult: yup.string().required("field cant be empty"),
	olevelResult: yup.string().required("field cant be empty")
});

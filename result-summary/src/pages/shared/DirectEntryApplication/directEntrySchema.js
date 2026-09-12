import * as yup from "yup";
import {
	checkForCorrectPhoneNumber,
	checkifDuplicateEntriesExist,
	checkIfMinimumNumberOfSubjectIsSelected,
	checkforValidName,
	checkForWholeAndTwoDecimalPlaceNumbers,
	checkforValidInitial
} from "../../../utils/formValidations";

export const personalDetailsSchema = yup.object().shape({
	Surname: yup
		.string()
		.nullable()
		.test("text name", "Invaild name", checkforValidName),
	Firstname: yup
		.string()
		.nullable()
		.test("text name", "Invaild name", checkforValidName),
	Middlename: yup
		.string()
		.nullable()
		.test("text name", "Invalid name", checkforValidInitial),
	GenderId: yup.mixed().required("Please select your gender").nullable(),
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
	MobileNo: yup
		.string()
		.required("Phone number is required")
		.test("text number", "Invaild phone number", checkForCorrectPhoneNumber)
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
	certificateType: yup.mixed().required("Please select your certificate"),
	grade: yup.mixed().when("certificateType", {
		is: (certificateType) => (certificateType?.label !== "A Level" || certificateType?.label !== "JUPEB"),
		then: yup.mixed().required("Please select grade"),
		otherwise: yup.mixed().notRequired()
	}),
	cgpa: yup
		.string()
		.required("Please enter your CGPA")
		.test("cgpa", "Invalid cgpa", checkForWholeAndTwoDecimalPlaceNumbers)
		.nullable(),
	previousSchool: yup
		.string()
		.required("Please enter your previous school")
		.nullable(),
	previousCourse: yup
		.string()
		.required("Please enter your previous course")
		.nullable()
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
						"Subjects are required",
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

export const UploadCertificateSchema = yup.object().shape({
	birthCertificate: yup.string().required("Field cannot be empty"),
	lgaIdentification: yup.string().required("Field cannot be empty"),
	testimonials: yup.string().required("Field cannot be empty"),
	firstSchoolLeaving: yup.string().nullable(),
	ondHndStatementOfResult: yup.string().required("Field cannot be empty"),
	olevelResult: yup.string().required("Field cannot be empty")
});

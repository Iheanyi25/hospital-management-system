import * as yup from "yup";
import {
	checkForCorrectPhoneNumber,
	checkforValidInitial,
	// checkIfValidFullName,
	checkforValidName
} from "../../../utils/formValidations";

export const Schema = yup.object().shape({
	name: yup
		.string()
		.when(
			"$isCertifcateVerification",
			(isCertifcateVerification, schema) => {
				if (isCertifcateVerification) {
					return schema
						.required("please input name")
						.test("text name", "invaild name", checkforValidName)
						.nullable();
				}
				return schema.default(null);
			}
		),
	surname: yup.string().when("$isNameRequired", (isNameRequired, schema) => {
		if (isNameRequired) {
			return schema
				.required("please input your surname")
				.test("text name", "invaild name", checkforValidName);
		}
		return schema.default(null);
	}),
	firstName: yup
		.string()
		.when("$isNameRequired", (isNameRequired, schema) => {
			if (isNameRequired) {
				return schema
					.required("please input your first name")
					.test("text name", "invaild name", checkforValidName);
			}
			return schema.default(null);
		}),
	middleName: yup
		.string()
		.when("$isNameRequired", (isNameRequired, schema) => {
			if (isNameRequired) {
				return schema.test(
					"text name",
					"invaild name",
					checkforValidInitial
				);
			}
			return schema.default(null);
		}),
	regNo: yup
		.string()
		.when(
			["$isCertifcateVerification", "$contractorPaymentSelected"],
			(isCertifcateVerification, contractorPaymentSelected, schema) => {
				if (!isCertifcateVerification && !contractorPaymentSelected) {
					return schema.required(
						"please input your registration number"
					);
				}
				return schema.default(null);
			}
		),
	email: yup
		.string()
		.required("email is required")
		.email("invalid email address"),
	phoneNo: yup
		.string()
		.required("phone number is required")
		.test(
			"text number",
			"invaild phone number",
			checkForCorrectPhoneNumber
		),
	departmentId: yup
		.mixed()
		.when(
			"$contractorPaymentSelected",
			(contractorPaymentSelected, schema) => {
				if (!contractorPaymentSelected) {
					return schema.required("please select department");
				}
				return schema.default(null);
			}
		),
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
	sessionId: yup
		.mixed()
		.when(
			"$isCertifcateVerification",
			(isCertifcateVerification, schema) => {
				if (!isCertifcateVerification) {
					return schema.required("please select a session");
				}
				return schema.default(null);
			}
		),
	semesterId: yup
		.mixed()
		.when("$isSemesterRequired", (isSemesterRequired, schema) => {
			if (isSemesterRequired) {
				return schema.required("please select a semester");
			}
			return schema.default(null);
		}),
	amount: yup
		.mixed()
		.required("please input amount")
		.test(
			"Is positive?",
			"number must be greater than 0!",
			(value) => value > 0
		)
});

export const SundryDetailsSchema = yup.object().shape({
	setupCategoryId: yup.mixed().required("please select a fee category"),
	setupCategoryTypeId: yup.mixed().required("please select a type"),
	subCategoryId: yup.mixed().required("please select a sub category"),
	mobileNumber: yup.string().required("please select a reg number").nullable()
});

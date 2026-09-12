import * as yup from "yup";
import { checkIfValidFullName } from "../../../utils/formValidations";

export const StaffDetailsSchema = yup.object().shape({
	Fullname: yup
		.string()
		.required("Please enter your full name")
		.test(
			"test first & last name",
			"enter both first and last name",
			checkIfValidFullName
		)
		.nullable(),
	Department: yup.string().required("Please enter your department"),
	Relationship: yup
		.mixed()
		.required("Please select your relationship with candidate"),
	EntryDate: yup.string().required("Please enter your entry date").nullable(),
	NumberOfYearsServed: yup
		.number()
		.typeError("Field must be a number")
		.required("Please enter number of years served")
		.nullable(),
	StaffNumber: yup
		.string()
		.required("Please enter your staff number")
		.nullable()
});

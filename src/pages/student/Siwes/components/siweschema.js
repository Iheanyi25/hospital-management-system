import * as yup from "yup";
import {
	accountNumberValidator,
	checkForOnlyNumbers
} from "../../../../utils/formValidations";

export const siwesDetailsSchema = yup.object().shape({
	logBookSerialNumber: yup
		.string()
		.required("please input log book serial number")
		.test(
			"text serial number",
			"invaild log book serial number, field should contain only numbers",
			checkForOnlyNumbers
		)
		.nullable(),
	organizationName: yup
		.string()
		.required("please input organization name")
		.nullable(),
	organizationAddress: yup
		.string()
		.required("please input organization address")
		.nullable(),
	stateId: yup.mixed().required("please enter state").nullable(),
	city: yup.string().required("please input city").nullable(),
	supervisor: yup.string().required("please input supervisor").nullable(),
	bank: yup.string().required("please input bank name").nullable(),
	accountNumber: yup
		.string()
		.required("please input account number")
		.test(
			"text account number",
			"invaild account number",
			accountNumberValidator
		)
		.nullable(),
	sortCode: yup
		.string()
		.required("please input sort code")
		.test(
			"text sort code",
			"invaild sort code, field should contain only numbers",
			checkForOnlyNumbers
		)
		.nullable()
});

import * as yup from "yup";

export const UploadSchema = yup.object().shape({
	Amount: yup
		.mixed()
		.required("please input amount")
		.test(
			"Is positive?",
			"number must be greater than 0!",
			(value) => value > 0
		),
	TeneceCommission: yup
		.mixed()
		.required("please input tenece commission")
		.test(
			"Is positive?",
			"number must be greater than 0!",
			(value) => value >= 0
		)
		.test(
			"amount greater",
			"should be lower than the amount",
			function (value) {
				return Number(this.parent.Amount) >= Number(value);
			}
		),
	ServiceTypeId: yup.mixed().required("please enter service types amount"),
	PaymentType: yup.mixed().required("please enter payment types"),
	DepartmentTypeId: yup.mixed().required("please enter your department"),
	DepartmentOption: yup
		.mixed()
		.when("$isDepartmentOptionRequired", (isDepartmentOptionRequired, schema) => {
			if (isDepartmentOptionRequired) {
				return schema.required("Please enter your department option");
			}
			return schema.default(null);
		})
});

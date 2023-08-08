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
	ServiceTypeId: yup.mixed().required("please enter service type"),
	PaymentType: yup.mixed().required("please enter payment types"),
	PaymentPurpose: yup.mixed().required("please enter payment purpose")
});

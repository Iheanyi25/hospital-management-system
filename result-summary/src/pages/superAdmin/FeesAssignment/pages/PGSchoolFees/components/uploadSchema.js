import * as yup from "yup";

export const UploadSchema = yup.object().shape({
	amount: yup
		.mixed()
		.required("please input amount")
		.test(
			"Is positive?",
			"number must be greater than 0!",
			(value) => value > 0
		),
	teneceCommission: yup
		.mixed()
		.required("please input tenece commission")
		.test(
			"Is positive?",
			"number must be greater than 0!",
			(value) => value > 0
		)
		.test(
			"amount greater",
			"should be lower than the amount",
			function (value) {
				return Number(this.parent.amount) >= Number(value);
			}
		)
});

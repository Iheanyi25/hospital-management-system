import * as yup from "yup";

export const UploadSchema = yup.object().shape({
	maximumUnit: yup
		.number()
		.required("please input maximum unit")
		.test(
			"Is positive?",
			"number must be greater than 0!",
			(value) => value > 0
		),
	minimumUnit: yup
		.number()
		.required("please input maximum unit")
		.test(
			"Is positive?",
			"number must be greater than 0!",
			(value) => value > 0
		)
		.test(
			"maximum greater",
			"should be lower than the maximum",
			function (value) {
				return this.parent.maximumUnit >= value;
			}
		)
});

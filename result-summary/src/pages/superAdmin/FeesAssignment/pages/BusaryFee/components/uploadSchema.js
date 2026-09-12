 import * as yup from "yup";

export const UploadSchema = yup.object().shape({
	BursaryFeeDescription: yup
		.string()
		.required("please input bursary fee description"),
	BursaryFeeCode: yup.string().required("please input bursary fee code"),
	Amount: yup
		.mixed()
		.required("please input amount")
		.test(
			"Is positive?",
			"amount must be greater than 0!",
			(value) => Number(value) > 0
		),
	TeneceCommission: yup
		.mixed()
		.required("please input tenece commission")
		.test(
			"Is positive?",
			"amount must be greater than or equal to 0!",
			(value) => Number(value) >= 0
		)
		.test(
			"maximum greater",
			"should be lower than the amount of the application",
			function (value) {
				return Number(this.parent.Amount) >= Number(value);
			}
		),
	StampDuty: yup.mixed().required("please input stamp duty"),
	ServiceTypeId: yup.mixed().required("please input service type"),
	BursaryCategoryId: yup.mixed().required("please choose a bursary category"),
	BursaryCategoryTypeId: yup
		.mixed()
		.required("please choose a bursary category type")
});

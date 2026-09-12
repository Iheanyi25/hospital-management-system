import * as yup from "yup";

export const UploadSchema = yup.object().shape({
	name: yup.string().required("please input application title"),
	code: yup.string().required("please input application code"),
	amount: yup
		.mixed()
		.required("please input amount")
		.test(
			"Is positive?",
			"amount must be greater than 0!",
			(value) => Number(value) > 0
		),
	teneceCommission: yup
		.string()
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
				return Number(this.parent.amount) >= Number(value);
			}
		),
	sessionId: yup.mixed().required("please choose a session"),
	studentTypeId: yup.mixed().required("please choose a student type"),
	serviceTypeId: yup.mixed().required("please choose a service type"),
	departmentId: yup
		.mixed()
		.when(
			"$isChooseSelectionRquired",
			(isChooseSelectionRquired, schema) => {
				if (isChooseSelectionRquired)
					return schema
						.required("please select a department")
						.test(
							"test department length",
							"select at least 1 department",
							(value) => {
								return value?.length > 0;
							}
						);
				return schema.default(null);
			}
		),
	groupSelectionId: yup.mixed().required("please select an action")
});

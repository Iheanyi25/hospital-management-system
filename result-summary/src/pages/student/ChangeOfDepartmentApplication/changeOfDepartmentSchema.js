import * as yup from "yup";

export const programmeDetailsSchema = yup.object().shape({
	departmentId: yup.mixed().required("please select department"),
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
	reason: yup.string().required("This field is required!!!")
});

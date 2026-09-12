import * as yup from "yup";

export const addClaimSchema = yup.object().shape({
	claim: yup
		.mixed()
		.required("Claim is required")
		.test("test claim length", "select at least 1 claim", (value) => {
			return value?.length > 0;
		})
});

export const deactiveStudentSchema = yup.object().shape({
	status: yup.mixed().required("please enter status"),
	semester: yup.mixed().required("please enter semester"),
	startSession: yup.mixed().required("please enter start session"),
	endSession: yup.mixed().required("please enter end session")
});

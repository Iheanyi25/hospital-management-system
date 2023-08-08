import * as yup from "yup";

export const addEditSchema = yup.object().shape({
	Name: yup.string().required("This input cant be blank!")
});

export const addClaimSchema = yup.object().shape({
	claim: yup
		.mixed()
		.required("Claim is required")
		.test("test claim length", "select at least 1 claim", (value) => {
			return value?.length > 0;
		})
});

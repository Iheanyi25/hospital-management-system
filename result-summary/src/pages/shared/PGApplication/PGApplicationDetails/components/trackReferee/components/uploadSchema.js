import * as yup from "yup";

export const UploadSchema = yup.object().shape({
	name: yup.string().required("please input referee name"),
	email: yup
		.string()
		.required("email is required")
		.email("invalid email address"),
	organisation: yup.string().required("please input an organisation"),
	position: yup.string().required("please input a jpb title")
});

import * as yup from "yup";

export const UploadSchema = yup.object().shape({
	Title: yup.string().required("please input course title"),
	CourseCode: yup.string().required("please input course code")
});

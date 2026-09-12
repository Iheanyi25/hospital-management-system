import * as yup from "yup";

export const Schema = yup.object().shape({
	sessionId: yup.mixed().required("please select session"),
	studentTypeId: yup.mixed().required("please select student type")
});

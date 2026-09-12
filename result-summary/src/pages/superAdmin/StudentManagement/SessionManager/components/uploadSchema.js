import * as yup from "yup";

export const UploadSchema = yup.object().shape({
	activeSessionId: yup.mixed().required("please select a session")
});

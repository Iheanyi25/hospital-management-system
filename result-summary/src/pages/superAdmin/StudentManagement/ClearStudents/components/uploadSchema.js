import * as yup from "yup";

export const UploadSchema = yup.object().shape({
	courseId: yup.mixed().required("please select course"),
	courseUnit: yup.mixed().required("please select unit load"),
	courseTypeId: yup.mixed().required("please select course type")
});

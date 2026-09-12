import * as yup from "yup";

export const AwardScholarshipSchema = yup.object().shape({
	startSession: yup.mixed().required("please enter start session"),
	endSession: yup.mixed().required("please enter end session")
});

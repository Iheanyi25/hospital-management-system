import * as yup from "yup";

export const NoticeSchema = yup.object().shape({
	title: yup.string().required("please input notice title"),
	startDate: yup.string().required("please input start date"),
	endDate: yup.string().required("please input end date"),
	senderName: yup.string().required("please input sender's name"),
	categoryId: yup.mixed().required("please input end category"),
	description: yup.mixed().required("please input description")
});

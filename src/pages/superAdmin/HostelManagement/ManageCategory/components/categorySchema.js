import * as yup from "yup";

export const CategorySchema = yup.object().shape({
	categoryName: yup.string().required("please input category name"),
	occupantType: yup.mixed().required("please input occupant type")
});

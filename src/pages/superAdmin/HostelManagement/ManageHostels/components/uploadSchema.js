import * as yup from "yup";

export const UploadSchema = yup.object().shape({
	name: yup.string().required("please input hostel name"),
	price: yup
		.mixed()
		.required("please input amount")
		.test(
			"Is positive?",
			"number must be greater than 0!",
			(value) => value > 0
		),
	genderId: yup.mixed().required("please select a gender"),
	groupSelectionId: yup.mixed().required("please select an option"),
	levelId: yup
		.mixed()
		.when(
			"$isChooseSelectionRquired",
			(isChooseSelectionRquired, schema) => {
				if (isChooseSelectionRquired)
					return schema
						.required("please select a level")
						.test(
							"test department length",
							"select at least 1 level",
							(value) => {
								return value?.length > 0;
							}
						);
				return schema.default(null);
			}
		),
	hostelRoomCategoryId: yup.mixed().required("please select room category")
});

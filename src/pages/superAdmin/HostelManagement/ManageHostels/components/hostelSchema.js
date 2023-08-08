import * as yup from "yup";

export const createHostelSchema = yup.object().shape({
	name: yup.string().required("please input hostel name"),
	location: yup.string().required("please input a location"),
	genderId: yup.mixed().required("please choose a gender"),
	departmentId: yup
		.mixed()
		.when(
			"$isChooseSelectionRquired",
			(isChooseSelectionRquired, schema) => {
				if (isChooseSelectionRquired)
					return schema
						.required("please select a department")
						.test(
							"test department length",
							"select at least 1 department",
							(value) => {
								return value?.length > 0;
							}
						);
				return schema.default(null);
			}
		),
	groupSelectionId: yup.mixed().required("please select room command")
});

export const createHostelBedSchema = yup.object().shape({
	name: yup.string().required("please input hostel name")
});

export const batchRoomSchema = yup.object().shape({
	action: yup.mixed().required("please select an action"),
	hostelActivationStatusId: yup.mixed().required("please select room command")
});

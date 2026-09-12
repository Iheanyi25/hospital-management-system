import * as yup from "yup";

export const createHostelSchema = yup.object().shape({
	name: yup.string().required("please input hostel name"),
	campusId: yup.mixed().required("please choose a campus"),
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
	groupSelectionId: yup.mixed().required("please select an action")
});

export const createHostelBedSchema = yup.object().shape({
	name: yup.string().required("please input bed space name"),
	groupSelectionId: yup.mixed().required("please select an action"),
	studentTypeId: yup.mixed().required("please select a student type"),
	levelId: yup
		.mixed()
		.when(
			"$isChooseLevelSelectionRquired",
			(isChooseLevelSelectionRquired, schema) => {
				if (isChooseLevelSelectionRquired)
					return schema
						.required("please select a level")
						.test(
							"test level length",
							"select at least 1 level",
							(value) => {
								return value?.length > 0;
							}
						);
				return schema.default(null);
			}
		),
	PGSelectionId: yup
		.mixed()
		.when("$isProgrammeRequired", (isProgrammeRequired, schema) => {
			if (isProgrammeRequired)
				return schema.required("please select programme action");
			return schema.default(null);
		}),
	PGProgrammeId: yup
		.mixed()
		.when(
			"$isChooseProgrammeSelectionRquired",
			(isChooseProgrammeSelectionRquired, schema) => {
				if (isChooseProgrammeSelectionRquired)
					return schema
						.required("please select a programme")
						.test(
							"test programme length",
							"select at least 1 programme",
							(value) => {
								return value?.length > 0;
							}
						);
				return schema.default(null);
			}
		)
});

export const batchRoomSchema = yup.object().shape({
	action: yup.mixed().required("please select an action"),
	groupSelectionId: yup.mixed().required("please select room command")
});

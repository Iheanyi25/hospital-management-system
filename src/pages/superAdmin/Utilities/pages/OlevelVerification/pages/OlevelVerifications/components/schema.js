import * as yup from "yup";

import { checkForValidDate } from "../../../../../../../../utils/formValidations";

export const Schema = yup.object().shape({
	applicationTypeId: yup.mixed().required("please select application type"),
	sessionId: yup.mixed().required("please select session"),
	status: yup.mixed().required("please select status"),
	departmentId: yup.mixed(),
	dateTo: yup
		.mixed()
		.when("$isDateToRequired", (isDateToRequired, schema) => {
			if (isDateToRequired) {
				return schema.test(
					"text number",
					"please enter date to",
					checkForValidDate
				);
			}
			return schema.default(null);
		})
});

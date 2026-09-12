import * as yup from "yup";

import { checkForValidDate } from "../../../../../../../../utils/formValidations";

export const Schema = yup.object().shape({
	applicationTypeId: yup.mixed().required("please select application type"),
	sessionId: yup.mixed().required("please select session"),
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
		}),
	jupebOptionId: yup.mixed(),
	subjectCombinationId: yup
		.mixed()
		.when(
			"$isSubjectCobinationRequired",
			(isSubjectCobinationRequired, schema) => {
				if (isSubjectCobinationRequired)
					return schema.required(
						"please select your subject combination"
					);
				return schema.default(null);
			}
		)
});

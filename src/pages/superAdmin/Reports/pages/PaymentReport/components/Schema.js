import * as yup from "yup";
import { checkForValidDate } from "../../../../../../utils/formValidations";

export const Schema = yup.object().shape({
	studentTypeId: yup.mixed().required("please select student type"),
	paymentPurposeId: yup.mixed().required("please select payment purpose"),
	paymentTypeId: yup.mixed().required("please select payment type"),
	sessionId: yup.mixed().required("please select session"),
	dateTo: yup.mixed().when(
		"$isDateToRequired",
		(isDateToRequired, schema) => {
			if (isDateToRequired) {
				return schema.test(
					"text number",
					"please enter date to",
					checkForValidDate
				);
			}
			return schema.default(null);
		}
	),
});

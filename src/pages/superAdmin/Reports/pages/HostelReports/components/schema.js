import * as yup from "yup";
import { checkForValidDate } from "../../../../../../utils/formValidations";

export const Schema = yup.object().shape({
	hostelId: yup.mixed().required("please select a hostel"),
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

import * as yup from "yup";
import { checkIfSpecialCharacters } from "../../../../../../utils/formValidations";

export const UploadSchema = yup.object().shape({
	name: yup
		.string()
		.trim()
		.test(
			"check-input-type",
			"only letters are allowed",
			checkIfSpecialCharacters
		)
		.required("please input faculty name")
});

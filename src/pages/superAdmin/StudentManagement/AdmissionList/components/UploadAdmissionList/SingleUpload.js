import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SingleUploadForm from "./SingleUploadForm";
import { checkforValidInitial, checkforValidName } from "../../../../../../utils/formValidations";
import { STUDENT_TYPES } from "../../../../../../utils/constants";

export const Schema = yup.object().shape({
	surname: yup
		.string()
		.required("please input surname")
		.test(
			"text name",
			"invalid name format. Please ensure there are no trailing spaces and use a name with a minimum length of 2 characters.",
			checkforValidName
		)
		.nullable(),
	firstName: yup
		.string()
		.required("please input first name")
		.test(
			"text name",
			"invalid name format. Please ensure there are no trailing spaces and use a name with a minimum length of 2 characters.",
			checkforValidName
		)
		.nullable(),
	middlename: yup
		.string()
		.test(
			"text name",
			"invalid name format. Please ensure there are no trailing spaces and use a name with a minimum length of 2 characters.",
			checkforValidInitial
		)
		.nullable(),
	regno: yup.string().required("please input regno").nullable(),
	admissionType: yup.mixed().required("please select admission batch"),
	supervisor: yup
		.string()
		.when("$isPostGraduateSelected", (isPostGraduateSelected, schema) => {
			if (isPostGraduateSelected) {
				return schema.required("please input a supervisor name");
			}
			return schema.default(null);
		})
		.nullable()
});

export const SingleUpload = ({
	allAdmissionTypes,
	filter,
	pageNumber,
	searchTerm,
	pageSize,
	setUploadModal
}) => {
	const isPGSelected = filter.studentTypeId === STUDENT_TYPES.POSTGRADUATE;
	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting }
	} = useForm({
		resolver: yupResolver(Schema),
		context: {
			isPostGraduateSelected: isPGSelected
		}
	});
	return (
		<SingleUploadForm
			errors={errors}
			register={register}
			handleSubmit={handleSubmit}
			control={control}
			allAdmissionTypes={allAdmissionTypes}
			filter={filter}
			pageNumber={pageNumber}
			searchTerm={searchTerm}
			pageSize={pageSize}
			setUploadModal={setUploadModal}
			isPGSelected={isPGSelected}
			isSubmitting={isSubmitting}
		/>
	);
};

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SingleUploadForm from "./SingleUploadForm";
import { checkforValidName } from "./../../../../../utils/formValidations";

export const Schema = yup.object().shape({
	surname: yup
		.string()
		.required("please input surname")
		.test(
			"text name",
			"invalid name, check for trailing spaces",
			checkforValidName
		)
		.nullable(),
	firstName: yup
		.string()
		.required("please input first name")
		.test(
			"text name",
			"invalid name, check for trailing spaces",
			checkforValidName
		)
		.nullable(),
	middlename: yup
		.string()
		.test(
			"text name",
			"invalid name, check for trailing spaces",
			checkforValidName
		)
		.nullable(),
	regno: yup.string().required("please input regno").nullable(),
	admissionType: yup.mixed().required("please select admission batch")
});

export const SingleUpload = ({
	allAdmissionTypes,
	filter,
	pageNumber,
	searchTerm,
	pageSize,
	setUploadModal
}) => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting }
	} = useForm({
		resolver: yupResolver(Schema)
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
			isSubmitting={isSubmitting}
		/>
	);
};

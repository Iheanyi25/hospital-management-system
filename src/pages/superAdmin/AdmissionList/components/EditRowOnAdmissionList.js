import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

import { useApiGet } from "../../../../api/apiCall";
import {
	getDepartmentOptionUrl,
	getDepartmentsUrl
} from "../../../../api/urls";
import { formatSelectItems } from "../../../../utils/formatSelectItems";
import { findValueAndLabel } from "../../../../utils/findValueAndLabel";
import EditRowOnAdmissionListForm from "./EditRowOnAdmissionListForm";
import { Spinner } from "../../../../ui_elements";
import { checkforValidName } from "./../../../../utils/formValidations";
export const EditAdmissionListSchema = yup.object().shape({
	surname: yup
		.string()
		.required("please input surname")
		.test(
			"text name",
			"invalid name, check for trailing spaces",
			checkforValidName
		),
	firstName: yup
		.string()
		.required("please input first name")
		.test(
			"text name",
			"invalid name, check for trailing spaces",
			checkforValidName
		),
	otherNames: yup
		.string()
		.test(
			"text name",
			"invalid name, check for trailing spaces",
			checkforValidName
		),
	regno: yup.mixed().required("please input regno"),
	department: yup.mixed().required("please select department"),
	departmentOption: yup
		.mixed()
		.when(
			"$isDepartmentOptionRequired",
			(isDepartmentOptionRequired, schema) => {
				if (isDepartmentOptionRequired) {
					return schema.required();
				}
				return schema.default(null);
			}
		),
	// .required("please select department Option"),
	studentType: yup.mixed().required("please select student type"),
	studentModeOfEntry: yup.mixed().required("please select mode of entry"),
	session: yup.mixed().required("please select session")
});

export const EditRowOnAdmissionList = ({
	editData,
	allSessions,
	// allDepartments,
	allStudentModes,
	allStudentTypes,
	setEditOpen,
	filter,
	pageNumber,
	searchTerm,
	pageSize,
	isFacultyPage
	// isDepartmentLoading
}) => {
	const [departmentIdState, setDepartmentId] = useState(
		editData?.departmentId
	);

	const {
		data: departments,
		isLoading: isDepartmentLoading,
		error: departmentError
	} = useApiGet(getDepartmentsUrl(editData.studentTypeId));

	const allDepartments = formatSelectItems(
		departments?.data,
		"department",
		"departmentId"
	);

	const {
		data: departmentOption,
		isLoading: isLoadingDepartmentOptions,
		error: departmentOptionError
	} = useApiGet(
		getDepartmentOptionUrl({
			departmentId: departmentIdState
		})
	);

	const allDepartmentOptions = formatSelectItems(
		departmentOption?.data,
		"departmentOption",
		"departmentOptionId"
	);

	const {
		departmentId,
		departmentOptionId,
		studentTypeId,
		studentModeOfEntryId,
		sessionId
	} = editData;

	const {
		register,
		handleSubmit,
		control,
		watch,
		formState: { errors, isSubmitting }
	} = useForm({
		defaultValues: {
			surname: editData.lastname,
			firstName: editData.firstname,
			otherNames: editData.middlename,
			regno: editData.regNumber,
			department: findValueAndLabel(departmentId, allDepartments) || {
				label: editData.department,
				value: editData.departmentId
			},
			departmentOption: departmentOptionId
				? findValueAndLabel(
						departmentOptionId,
						allDepartmentOptions
				  ) || {
						label: editData.departmentOption,
						value: editData.departmentOptionId
				  }
				: null,
			studentType: findValueAndLabel(studentTypeId, allStudentTypes),
			studentModeOfEntry: findValueAndLabel(
				studentModeOfEntryId,
				allStudentModes
			),
			session: findValueAndLabel(sessionId, allSessions)
		},
		resolver: yupResolver(EditAdmissionListSchema),
		context: {
			isDepartmentOptionRequired:
				departmentOption?.data?.length > 0 ? true : false
		}
	});

	useEffect(() => {
		const subscription = watch(({ department }) =>
			setDepartmentId(department?.value)
		);
		return () => subscription.unsubscribe();
	}, [watch]);

	if (isDepartmentLoading) return <Spinner />;

	if (departmentOptionError || departmentError)
		return "An error has occurred: " + departmentOptionError?.message;

	return (
		<EditRowOnAdmissionListForm
			errors={errors}
			register={register}
			handleSubmit={handleSubmit}
			control={control}
			allSessions={allSessions}
			allDepartments={allDepartments}
			allStudentModes={allStudentModes}
			allStudentTypes={allStudentTypes}
			allDepartmentOptions={allDepartmentOptions}
			isLoadingDepartmentOptions={isLoadingDepartmentOptions}
			setEditOpen={setEditOpen}
			filter={filter}
			pageNumber={pageNumber}
			searchTerm={searchTerm}
			pageSize={pageSize}
			isFacultyPage={isFacultyPage}
			isSubmitting={isSubmitting}
			admissionListId={editData.admissionListId}
		/>
	);
};

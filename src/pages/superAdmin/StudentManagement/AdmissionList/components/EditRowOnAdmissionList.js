import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

import { useApiGet } from "../../../../../api/apiCall";
import {
	getDepartmentOptionUrl,
	getDepartmentsUrl,
	getSchoolProgrammesUrl,
	getStudentModesOfStudyUrl
} from "../../../../../api/urls";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import { findValueAndLabel } from "../../../../../utils/findValueAndLabel";
import EditRowOnAdmissionListForm from "./EditRowOnAdmissionListForm";
import { Spinner } from "../../../../../ui_elements";
import { checkforValidName } from "../../../../../utils/formValidations";
import { STUDENT_TYPES } from "../../../../../utils/constants";
export const EditAdmissionListSchema = yup.object().shape({
	surname: yup
		.string()
		.required("please input surname")
		.test(
			"text name",
			"invalid name format. Please ensure there are no trailing spaces and use a name with a minimum length of 2 characters.",
			checkforValidName
		),
	firstName: yup
		.string()
		.required("please input first name")
		.test(
			"text name",
			"invalid name format. Please ensure there are no trailing spaces and use a name with a minimum length of 2 characters.",
			checkforValidName
		),
	otherNames: yup
		.string()
		.test(
			"text name",
			"invalid name format. Please ensure there are no trailing spaces and use a name with a minimum length of 2 characters.",
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
	session: yup.mixed().required("please select session"),
	programmeId: yup.mixed().when("$isPGSelected", (isPGSelected, schema) => {
		if (isPGSelected) {
			return schema.required("please select a programme");
		}
		return schema.default(null);
	}),
	modeOfStudyId: yup.mixed().when("$isPGSelected", (isPGSelected, schema) => {
		if (isPGSelected) {
			return schema.required("please select a mode of study");
		}
		return schema.default(null);
	}),
	supervisor: yup
		.string()
		.when("$isPGSelected", (isPGSelected, schema) => {
			if (isPGSelected) {
				return schema.required("please input a supervisor name");
			}
			return schema.default(null);
		})
		.nullable()
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
	const [studentTypeState, setStudentTypeState] = useState(
		editData?.studentTypeId
	);

	const { modeOfEntryId, sessionId } = editData;

	const { data: departments, isLoading: isDepartmentLoading } = useApiGet(
		getDepartmentsUrl(studentTypeState)
	);

	const { data: programmes, isLoading: isLoadingProgrammes } = useApiGet(
		getSchoolProgrammesUrl({
			studentTypeId: studentTypeState
		}),
		{
			refetchOnWindowFocus: false,
			enabled: studentTypeState === STUDENT_TYPES.POSTGRADUATE
		}
	);
	const {
		data: studentModesOfStudy,
		isLoading: isLoadingStudentModesOfStudy
	} = useApiGet(getStudentModesOfStudyUrl(), {
		refetchOnWindowFocus: false,
		enabled: studentTypeState === STUDENT_TYPES.POSTGRADUATE
	});

	const { data: departmentOption, isLoading: isLoadingDepartmentOptions } =
		useApiGet(
			getDepartmentOptionUrl(
				{
					departmentId: departmentIdState,
					studentTypeId: studentTypeState
				},
				{
					enabled: !!(studentTypeState && departmentIdState)
				}
			)
		);

	const allDepartmentOptions = formatSelectItems(
		departmentOption?.data,
		"departmentOption",
		"departmentOptionId"
	);

	const allDepartments = formatSelectItems(
		departments?.data,
		"department",
		"departmentId"
	);
	const allProgrammes = formatSelectItems(programmes?.data, "name", "id");
	const allStudentModesOfStudy = formatSelectItems(
		studentModesOfStudy?.data,
		"name",
		"id"
	);

	const {
		register,
		handleSubmit,
		control,
		watch,
		setValue,
		formState: { errors, isSubmitting }
	} = useForm({
		defaultValues: {
			surname: editData.lastname,
			firstName: editData.firstname,
			otherNames: editData.middlename,
			regno: editData.regNumber,
			supervisor: editData?.supervisor,
			studentModeOfEntry: findValueAndLabel(
				modeOfEntryId,
				allStudentModes
			),
			session: findValueAndLabel(sessionId, allSessions)
		},
		resolver: yupResolver(EditAdmissionListSchema),
		context: {
			isDepartmentOptionRequired:
				departmentOption?.data?.length > 0 ? true : false,
			isPGSelected: studentTypeState === STUDENT_TYPES.POSTGRADUATE
		}
	});

	useEffect(() => {
		const subscription = watch(({ department, studentType }) => {
			setDepartmentId(department?.value);
			setStudentTypeState(studentType?.value);
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	if (isDepartmentLoading) return <Spinner />;

	return (
		<>
			<EditRowOnAdmissionListForm
				errors={errors}
				register={register}
				handleSubmit={handleSubmit}
				control={control}
				allSessions={allSessions}
				allDepartments={allDepartments}
				allStudentModes={allStudentModes}
				allStudentModesOfStudy={allStudentModesOfStudy}
				allStudentTypes={allStudentTypes}
				allProgrammes={allProgrammes}
				allDepartmentOptions={allDepartmentOptions}
				isLoadingDepartmentOptions={isLoadingDepartmentOptions}
				setEditOpen={setEditOpen}
				filter={filter}
				pageNumber={pageNumber}
				searchTerm={searchTerm}
				isLoadingProgrammes={isLoadingProgrammes}
				isLoadingStudentModesOfStudy={isLoadingStudentModesOfStudy}
				pageSize={pageSize}
				setValue={setValue}
				isFacultyPage={isFacultyPage}
				studentTypeState={studentTypeState}
				isSubmitting={isSubmitting}
				editData={editData}
				admissionListId={editData.admissionListId}
			/>
		</>
	);
};

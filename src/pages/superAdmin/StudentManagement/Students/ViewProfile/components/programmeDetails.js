import { yupResolver } from "@hookform/resolvers/yup";
import { ProgrammeDetailSchema } from "../profileSchema";
import { useForm } from "react-hook-form";
import { useApiGet } from "../../../../../../api/apiCall";
import {
	yearOfStudyUrl,
	getDepartmentOptionUrl,
	getSchoolProgrammesUrl,
	getStudentModeOfEntryUrl
} from "../../../../../../api/urls";
import { formatSelectItems } from "../../../../../../utils/formatSelectItems";
import { useEffect, useMemo, useState } from "react";
import { findValueAndLabel } from "../../../../../../utils/findValueAndLabel";
import { ProgrammeDetailsForm } from "./programmeDetailsForm";
import { STUDENT_TYPES } from "../../../../../../utils/constants";

export const ProgrammeDetails = ({
	data,
	refCode,
	allDepartments,
	allStudentTypes,
	allStudentModesOfStudy,
	allSessions,
	allProgrammeTypes,
	allStudentModes,
	hasMatricNumber
}) => {
	const [departmentIdState, setDepartmentId] = useState(data?.departmentId);
	const [studentTypeIdState, setStudentTypeIdState] = useState(
		data?.studentTypeId
	);
	// const [programmeIdState, setProgrammeIdState] = useState(
	// 	data?.schoolProgrammeId
	// );
	const { data: levels, isLoading: isLoadingLevels } = useApiGet(
		yearOfStudyUrl({ studentTypeId: studentTypeIdState }),
		{
			refetchOnWindowFocus: false
		}
	);
	const {
		data: studentModesOfEntry,
		isLoading: isLoadingStudentModesOfEntry
	} = useApiGet(getStudentModeOfEntryUrl(studentTypeIdState), {
		refetchOnWindowFocus: false
	});
	const {
		data: departmentOption,
		isLoading: isLoadingDepartmentOptions,
		error: departmentOptionError
	} = useApiGet(
		getDepartmentOptionUrl({
			departmentId: departmentIdState,
			studentTypeId: studentTypeIdState
		}),
		{
			refetchOnWindowFocus: false,
			enabled: !!(studentTypeIdState && departmentIdState)
		}
	);

	const { data: programmes, isLoading: isLoadingSchoolProgrammes } =
		useApiGet(
			getSchoolProgrammesUrl({
				studentTypeId: studentTypeIdState
			}),
			{
				refetchOnWindowFocus: false,
				enabled: !!studentTypeIdState
			}
		);

	const allDepartmentOption = useMemo(
		() =>
			formatSelectItems(
				departmentOption?.data,
				"departmentOption",
				"departmentOptionId"
			),
		[departmentOption]
	);
	const allProgrammes = useMemo(
		() => formatSelectItems(programmes?.data, "name", "id"),
		[programmes]
	);
	const allLevels = useMemo(
		() => formatSelectItems(levels?.data, "name", "id"),
		[levels]
	);
	const isPGStudent = studentTypeIdState === STUDENT_TYPES.POSTGRADUATE;
	const allStudentModesOfEntry = formatSelectItems(
		studentModesOfEntry?.data,
		"name",
		"id"
	);

	const {
		register,
		control,
		watch,
		setValue,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: {
			MatricNumber: data?.matricNumber,
			JambRegNumber: data?.jambRegNumber,
			DepartmentId: findValueAndLabel(data?.departmentId, allDepartments),
			EntryYearId: findValueAndLabel(
				data?.entryYear,
				allSessions,
				"label"
			),
			GraduationYearId: findValueAndLabel(
				data?.graduationYear,
				allSessions,
				"label"
			),
			StudentTypeId: findValueAndLabel(
				data?.studentTypeId,
				allStudentTypes
			),
			ModeOfEntryId: {
				value: data?.modeOfEntryId,
				label: data?.modeOfEntry
			},
			LevelId: {
				value: data?.levelId,
				label: data?.level
			},
			StudentModeId: findValueAndLabel(
				data?.studentMode,
				allStudentModes,
				"label"
			),
			programmeTypeId: findValueAndLabel(
				data?.programmeTypeId,
				allProgrammeTypes
			),

			ModeOfStudyId: {
				value: data?.modeOfStudyId,
				label: data?.modeOfStudy
			}
		},
		resolver: yupResolver(ProgrammeDetailSchema),
		context: {
			isDepartmentOptionRequired:
				departmentOption?.data?.length > 0 ? true : false,
			isSchoolProgrammeIdRequired:
				programmes?.data?.length > 0 ? true : false,
			isPGStudent
		}
	});
	useEffect(() => {
		const subscription = watch(
			({ DepartmentId, StudentTypeId, SchoolProgrammeId }) => {
				setDepartmentId(DepartmentId?.value);
				setStudentTypeIdState(StudentTypeId?.value);
			}
		);
		return () => subscription.unsubscribe();
	}, [watch]);

	if (departmentOptionError)
		return (
			"An error has occurred: " +
			departmentOptionError?.response?.data?.message
		);

	return (
		<ProgrammeDetailsForm
			refCode={refCode}
			handleSubmit={handleSubmit}
			errors={errors}
			control={control}
			register={register}
			setValue={setValue}
			data={data}
			isLoadingDepartmentOptions={isLoadingDepartmentOptions}
			isLoadingStudentModesOfEntry={isLoadingStudentModesOfEntry}
			isLoadingSchoolProgrammes={isLoadingSchoolProgrammes}
			departmentOption={departmentOption}
			allDepartmentOption={allDepartmentOption}
			isLoadingLevels={isLoadingLevels}
			allLevels={allLevels}
			allDepartments={allDepartments}
			isPGStudent={isPGStudent}
			allProgrammes={allProgrammes}
			allProgrammeTypes={allProgrammeTypes}
			allStudentModesOfEntry={allStudentModesOfEntry}
			allStudentTypes={allStudentTypes}
			allStudentModesOfStudy={allStudentModesOfStudy}
			allSessions={allSessions}
			allStudentModes={allStudentModes}
			hasMatricNumber={hasMatricNumber}
		/>
	);
};

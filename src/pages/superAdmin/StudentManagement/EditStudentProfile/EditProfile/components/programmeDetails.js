import { yupResolver } from "@hookform/resolvers/yup";
import { ProgrammeDetailSchema } from "../profileSchema";
import { useForm } from "react-hook-form";
import { useApiGet } from "../../../../../../api/apiCall";
import {
	yearOfStudyUrl,
	getDepartmentOptionUrl,
	getDepartmentsUrl,
	getSchoolProgrammesUrl
} from "../../../../../../api/urls";
import { formatSelectItems } from "../../../../../../utils/formatSelectItems";
import { useEffect, useMemo, useState } from "react";
import { findValueAndLabel } from "../../../../../../utils/findValueAndLabel";
import { ProgrammeDetailsForm } from "./programmeDetailsForm";

export const ProgrammeDetails = ({
	data,
	refCode,
	allStudentModesOfEntry,
	allStudentTypes,
	allStudentModesOfStudy,
	allSessions,
	allStudentModes,
}) => {
	const [departmentIdState, setDepartmentId] = useState(data?.departmentId);
	const [studentTypeIdState, setStudentTypeIdState] = useState(
		data?.studentTypeId
	);
	const { data: levels, isLoading: isLoadingLevels } = useApiGet(
		yearOfStudyUrl({ studentTypeId: studentTypeIdState }),
		{
			refetchOnWindowFocus: false
		}
	);
	const {
		data: departments,
		isLoading: isDepartmentLoading,
		error: departmentError
	} = useApiGet(getDepartmentsUrl(studentTypeIdState), {
		enabled: !!studentTypeIdState,
		refetchOnWindowFocus: false
	});
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
		}),
		{
			enabled: !!departmentIdState,
			refetchOnWindowFocus: false
		}
	);
	const { data: programmes, isLoading: isLoadingProgrammes } = useApiGet(
		getSchoolProgrammesUrl({ studentTypeId: studentTypeIdState }),
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

	const {
		register,
		control,
		watch,
		setValue,
		handleSubmit,
		clearErrors,
		formState: { errors }
	} = useForm({
		defaultValues: {
			MatricNumber: data?.matricNumber,
			JambRegNumber: data?.jambRegNumber,
			DepartmentId: findValueAndLabel(data?.departmentId, allDepartments),
			EntryYearId: findValueAndLabel(data?.entryYearId, allSessions),
			GraduationYearId: findValueAndLabel(
				data?.graduationYearId,
				allSessions
			),
			StudentTypeId: findValueAndLabel(
				data?.studentTypeId,
				allStudentTypes
			),
			SchoolProgrammeId: findValueAndLabel(
				data?.schoolProgrammeId,
				allProgrammes
			),
			StudentModeOfEntryId: findValueAndLabel(
				data?.studentModeOfEntry,
				allStudentModesOfEntry,
				"label"
			),
			StudentModeId: findValueAndLabel(
				data?.studentMode,
				allStudentModes,
				"label"
			),
			StudentModeOfStudyId: findValueAndLabel(
				data?.studentModeOfStudyId,
				allStudentModesOfStudy
			),
			LevelId: findValueAndLabel(data?.levelId, allLevels)
		},
		resolver: yupResolver(ProgrammeDetailSchema),
		context: {
			isDepartmentOptionRequired:
				departmentOption?.data?.length > 0 ? true : false,
			isSchoolProgrammeId: programmes?.data?.length > 0 ? true : false
		}
	});

	const onDepartmentChange = (value) => {
		setDepartmentId(value.value);
		setValue("DepartmentId", value);
		setValue("DepartmentOptionId", null);
		clearErrors("DepartmentId");
	};

	const onStudentTypeChange = (value) => {
		setStudentTypeIdState(value.value);
		setValue("StudentTypeId", value);
		setValue("DepartmentId", null);
		setValue("SchoolProgrammeId", null);
		clearErrors("StudentTypeId");
	};

	useEffect(() => {
		setValue("LevelId", findValueAndLabel(data?.levelId, allLevels));
	}, [allLevels, data?.levelId, setValue]);
	useEffect(() => {
		const subscription = watch(({ DepartmentId }) => {
			setDepartmentId(DepartmentId?.value);
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	useEffect(() => {
		const subscription = watch(({ StudentTypeId }) => {
			setStudentTypeIdState(StudentTypeId?.value);
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	if (departmentOptionError || departmentError)
		return (
			"An error has occurred: " +
				departmentOptionError?.response?.data?.message ||
			departmentError?.response?.data?.message
		);
	return (
		<ProgrammeDetailsForm
			refCode={refCode}
			data={data}
			handleSubmit={handleSubmit}
			errors={errors}
			control={control}
			register={register}
			isLoadingDepartmentOptions={isLoadingDepartmentOptions}
			departmentOption={departmentOption}
			allDepartmentOption={allDepartmentOption}
			isLoadingLevels={isLoadingLevels}
			allLevels={allLevels}
			allDepartments={allDepartments}
			allProgrammes={allProgrammes}
			allStudentModesOfEntry={allStudentModesOfEntry}
			allStudentTypes={allStudentTypes}
			allStudentModesOfStudy={allStudentModesOfStudy}
			allSessions={allSessions}
			allStudentModes={allStudentModes}
			onStudentTypeChange={onStudentTypeChange}
			onDepartmentChange={onDepartmentChange}
			isDepartmentLoading={isDepartmentLoading}
			isLoadingProgrammes={isLoadingProgrammes}
		/>
	);
};

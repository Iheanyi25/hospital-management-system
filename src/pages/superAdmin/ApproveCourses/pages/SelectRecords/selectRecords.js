import { useEffect, useMemo, useState } from "react";
import queryString from "query-string";
import { useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import { PageTitle, Spinner } from "../../../../../ui_elements";
import styles from "./style.module.css";
import { useApiGet } from "../../../../../api/apiCall";
import {
	getDepartmentsUrl,
	getDepartmentOptionUrl,
	getAllSessionsUrl,
	yearOfStudyUrl,
	getStudentTypesUrl,
	getCourseApprovalUrl
} from "../../../../../api/urls";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import ApproveCoursesForm from "./ApproveCoursesForm";
import ApproveCoursesTable from "./ApproveCoursesTable";
import {
	PAGESIZE,
	SEARCH_DELAY,
	SEMESTERS
} from "../../../../../utils/constants";
import { findValueAndLabel } from "../../../../../utils/findValueAndLabel";

const SelectCourseRecords = () => {
	const parsed = queryString.parse(window.location.search);
	const [watchData, setWatchData] = useState({
		department: parsed?.departmentId || "",
		studentType: parsed?.studentTypeId || ""
	});

	const [filter, setFilter] = useState({
		departmentId: parsed?.departmentId || "",
		departmentOptionId: parsed?.departmentOptionId || "",
		levelId: parsed?.levelId || "",
		studentTypeId: parsed?.studentTypeId || "",
		sessionId: parsed?.sessionId || "",
		semesterId: parsed?.semesterId || "",
		pageSize: parsed?.pageSize || PAGESIZE.sm,
		pageNumber: 1
	});
	const [searchTerm, setSearchTerm] = useState("");
	const debounced = useDebouncedCallback(
		(value) => {
			setSearchTerm(value);
		},
		// delay in ms
		SEARCH_DELAY.sm
	);

	// const [pageNumber, setPageNumber] = useState(1);
	const {
		data: courses,
		isLoading: isLoadingCoursesList,
		isFetching: isFetchingCoursesList,
		error: coursesListError
	} = useApiGet(
		getCourseApprovalUrl({
			...filter,
			pageNumber: filter.pageNumber,
			searchTerm
		}),
		{
			//using only departmentId to enable query, cause onece departmentId is set all other values needed by the query are set too
			enabled: !!filter.departmentId,
			keepPreviousData: true
		}
	);

	const {
		data: sessions,
		isLoading: isLoadingSession,
		error
	} = useApiGet(getAllSessionsUrl());
	const {
		data: departments,
		isLoading: isDepartmentLoading,
		error: departmentError
	} = useApiGet(getDepartmentsUrl(watchData?.studentType), {
		enabled: !!watchData?.studentType
	});
	const { data: studentTypes, isLoading: isLoadingStudentTypes } = useApiGet(
		getStudentTypesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const { data: departmentOption, isLoading: isLoadingDepartmentOption } =
		useApiGet(
			getDepartmentOptionUrl({
				departmentId: watchData?.department,
				studentTypeId: watchData?.studentType
			}),
			{
				enabled: !!watchData?.department
			}
		);

	const { data: levels, isLoading: isLoadingLevels } = useApiGet(
		yearOfStudyUrl({ studentTypeId: watchData?.studentType }),
		{
			refetchOnWindowFocus: false,
			enabled: !!watchData?.studentType
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
	const allStudentTypes = useMemo(
		() => formatSelectItems(studentTypes?.data, "name", "id"),
		[studentTypes]
	);
	const allLevels = useMemo(
		() => formatSelectItems(levels?.data, "name", "id"),
		[levels]
	);

	const allSessions = useMemo(
		() => formatSelectItems(sessions?.data, "session", "id"),
		[sessions]
	);
	const allDepartments = useMemo(
		() =>
			formatSelectItems(departments?.data, "department", "departmentId"),
		[departments?.data]
	);
	const {
		handleSubmit,
		control,
		watch,
		setValue,
		formState: { errors }
	} = useForm({});
	useEffect(() => {
		const { departmentOptionId, levelId, sessionId, semesterId } = filter;
		// setting this value from watch data to prevent the value resetting anytime the state is upadated
		if (watchData.department) {
			setValue(
				"department",
				findValueAndLabel(watchData.department, allDepartments)
			);
		}
		if (departmentOptionId)
			setValue(
				"departmentOption",
				findValueAndLabel(departmentOptionId, allDepartmentOption)
			);
		if (levelId)
			setValue("yearOfStudy", findValueAndLabel(levelId, allLevels));
		if (watchData.studentType)
			setValue(
				"studentType",
				findValueAndLabel(watchData.studentType, allStudentTypes)
			);
		if (sessionId)
			setValue("session", findValueAndLabel(sessionId, allSessions));
		if (semesterId)
			setValue("semester", findValueAndLabel(semesterId, SEMESTERS));
	}, [
		allDepartments,
		allLevels,
		allSessions,
		allStudentTypes,
		setValue,
		filter,
		allDepartmentOption,
		watchData.department,
		watchData.studentType
	]);
	useEffect(() => {
		const subscription = watch(({ department, studentType }) => {
			setWatchData((state) => ({
				department: department?.value ?? state.department,
				studentType: studentType?.value ?? state.studentType
			}));
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	if (isLoadingSession || isLoadingStudentTypes) return <Spinner />;
	if (error || departmentError || coursesListError)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<div className={styles.container}>
			<PageTitle title="Approve Courses" />
			<div className={styles.page_content}>
				<ApproveCoursesForm
					allStudentTypes={allStudentTypes}
					allLevels={allLevels}
					allSessions={allSessions}
					allDepartments={allDepartments}
					allDepartmentOption={allDepartmentOption}
					isDepartmentLoading={isDepartmentLoading}
					isLoadingLevels={isLoadingLevels}
					isLoadingDepartmentOption={isLoadingDepartmentOption}
					control={control}
					errors={errors}
					data={courses?.data?.items || []}
					setFilter={setFilter}
					filter={filter}
					handleSubmit={handleSubmit}
					isLoadingCoursesList={isLoadingCoursesList}
				/>
				<ApproveCoursesTable
					data={courses?.data?.items || []}
					hasPerformedQuery={!!filter.departmentId}
					paginationProps={courses?.data?.metaData || {}}
					setPageNumber={(page) => setFilter(prev => ({ ...prev, pageNumber: page }))}
					debouncedSearch={debounced}
					pageNumber={filter.pageNumber}
					pageSize={filter.pageSize}
					searchTerm={searchTerm}
					loading={isFetchingCoursesList}
					filter={filter}
				/>
			</div>
		</div>
	);
};

export default SelectCourseRecords;

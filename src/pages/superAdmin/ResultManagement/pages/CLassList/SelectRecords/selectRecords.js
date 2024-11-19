import { PageTitle, Spinner } from "../../../../../../ui_elements";
import queryString from "query-string";
import styles from "./style.module.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useApiGet } from "../../../../../../api/apiCall";
import {
	getDepartmentOptionUrl,
	getAllSessionsUrl,
	yearOfStudyUrl,
	getStudentTypesUrl,
	getCoursesAssignedToDeptsUrl,
	getDepartmentsUrl,
	getStudentModeOfEntryUrl,
	studentCompositeResultsUrl
} from "../../../../../../api/urls";
import { formatSelectItems } from "../../../../../../utils/formatSelectItems";
import { SelectRecordsForm, SelectRecordsTable } from "./components";
import {
	PAGESIZE,
	SEARCH_DELAY,
	SEMESTERS
} from "../../../../../../utils/constants";
import { findValueAndLabel } from "../../../../../../utils/findValueAndLabel";
import { useDebouncedCallback } from "use-debounce";
import { useReactToPrint } from "react-to-print";
import { CollegeSheet } from "../CompositeSheet/component/collegeSheet";

const SelectResultRecords = () => {
	const [makeRequest, setMakeRequest] = useState(false);
	const componentRef = useRef();

	const handlePrint = useReactToPrint({
		content: () => componentRef?.current,
		pageStyle: `@media print {
			@page {
			  size: auto;
			}
		  }`
	});
	const [details, setDetails] = useState({});
	const [tableData, setData] = useState([]);

	const parsed = queryString.parse(window.location.search);
	const [watchData, setWatchData] = useState({
		departmentId: parsed?.departmentId || "",
		studentTypeId: parsed?.studentTypeId || ""
	});
	const [filter, setFilter] = useState({
		departmentId: parsed?.departmentId || "",
		departmentOptionId: parsed?.departmentOptionId || "",
		studentTypeId: parsed?.studentTypeId || "",
		sessionId: parsed?.sessionId || "",
		semesterId: parsed?.semesterId || "",
		levelId: parsed?.levelId || "",
		modeOfEntryId: parsed?.modeOfEntryId || "",
		pageSize: PAGESIZE.sm
	});

	const [pageNumber, setPageNumber] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const debounced = useDebouncedCallback(
		(value) => {
			setSearchTerm(value);
		},
		// delay in ms
		SEARCH_DELAY.sm
	);
	const {
		data: courseList,
		isLoading: isLoadingcourseList,
		isFetching: isFetchingcourseList,
		error: courseListError
	} = useApiGet(
		getCoursesAssignedToDeptsUrl({ ...filter, pageNumber, searchTerm }),
		{
			enabled: !!filter.departmentId,
			keepPreviousData: true
		}
	);

	const {
		data: compositeSheet,
		isLoading: isLoadingCompositeSheet,
		error: errorCompositeSheet
	} = useApiGet(
		studentCompositeResultsUrl({
			levelId: details?.levelId?.value,
			departmentId: details?.departmentId?.value,
			departmentOptionId: details?.departmentOptionId?.value,
			sessionId: details?.sessionId?.value,
			semesterId: details?.semesterId?.value,
			studentTypeId: details?.studentTypeId?.value
		}),
		{
			enabled: !!makeRequest,
			refetchOnWindowFocus: false
		}
	);

	const getStudentData = useCallback(() => {
		return compositeSheet?.data?.studentCourses?.map((student, i) => {
			const registerCourses = {};

			student?.registeredCourses.forEach((registeredCourse) => {
				registerCourses[registeredCourse.courseCode] = registeredCourse;
			});

			const subjects = compositeSheet.data.courses?.map((course) => {
				if (registerCourses[course.courseCode]) {
					return {
						courseCode: course.courseCode,
						grade: registerCourses[course.courseCode].grade,
						gradePoint:
							registerCourses[course.courseCode].gradePoint,
						totalScore:
							registerCourses[course.courseCode].totalScore
					};
				} else {
					return {
						courseCode: course.courseCode,
						grade: "-",
						gradePoint: "-",
						totalScore: "-"
					};
				}
			});

			return {
				id: i + 1,
				name: student?.fullName,
				regNo: student?.registrationNumber,
				cumulativeSemesterDataResponse:
					student?.cumulativeSemesterDataResponse,
				currentSemesterDataResponse:
					student?.currentSemesterDataResponse,
				...(student?.previousSemesterDataResponse && {
					previousSemesterDataResponse:
						student?.previousSemesterDataResponse
				}),
				subjects: subjects,
				outStandingCourses: student?.outStandingCourses,
				remark: student?.remark
			};
		});
	}, [compositeSheet]);

	function sliceIntoChunks(arr, chunkSize) {
		const res = [];
		for (let i = 0; i < arr?.length; i += chunkSize) {
			const chunk = arr?.slice(i, i + chunkSize);
			res.push(chunk);
		}
		return res;
	}
	useEffect(() => {
		if (
			compositeSheet?.success &&
			makeRequest &&
			!isLoadingCompositeSheet
		) {
			setMakeRequest(false);
			setData(sliceIntoChunks(getStudentData(), getStudentData().length));
			setTimeout(() => {
				handlePrint();
			}, 1000);
		}
		if (errorCompositeSheet && makeRequest && !isLoadingCompositeSheet) {
			setMakeRequest(false);
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Invalid Action!",
				body:
					errorCompositeSheet?.response?.data?.message ||
					`Invalid action, please enter correct details`
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		}
	}, [
		compositeSheet,
		errorCompositeSheet,
		makeRequest,
		isLoadingCompositeSheet,
		getStudentData,
		handlePrint
	]);
	const handleCompositeSubmit = (info) => {
		console.log(info, "kdkdk");
		setDetails({ ...info });
		setMakeRequest(true);
	};
	const {
		control,
		watch,
		setValue,
		handleSubmit,
		formState: { errors }
	} = useForm();
	const { data: sessions, isLoading, error } = useApiGet(getAllSessionsUrl());
	const { data: departments, isLoading: isDepartmentLoading } = useApiGet(
		getDepartmentsUrl(watchData?.studentTypeId),
		{
			enabled: !!watchData?.studentTypeId
		}
	);
	const { data: departmentOption, isLoading: isLoadingDepartmentOption } =
		useApiGet(
			getDepartmentOptionUrl({
				departmentId: watchData?.departmentId
			}),
			{
				enabled: !!watchData?.departmentId
			}
		);
	const { data: studentTypes, isLoading: isLoadingStudentTypes } = useApiGet(
		getStudentTypesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);
	const { data: levels, isLoading: isLoadingLevels } = useApiGet(
		yearOfStudyUrl({ studentTypeId: watchData?.studentTypeId }),
		{
			refetchOnWindowFocus: false,
			enabled: !!watchData?.studentTypeId
		}
	);

	const { data: studentModes, isLoading: isLoadingStudentModes } = useApiGet(
		getStudentModeOfEntryUrl(),
		{
			refetchOnWindowFocus: false
		}
	);
	const allDepartmentOption = useMemo(
		() => formatSelectItems(departmentOption?.data, "name", "id"),
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
	const allStudentModes = useMemo(
		() => formatSelectItems(studentModes?.data, "name", "id"),
		[studentModes?.data]
	);

	useEffect(() => {
		const {
			departmentOptionId,
			levelId,
			sessionId,
			semesterId,
			modeOfEntryId
		} = filter;
		// setting this value from watch data to prevent the value resetting anytime the state is upadated
		if (watchData.departmentId) {
			setValue(
				"departmentId",
				findValueAndLabel(watchData.departmentId, allDepartments)
			);
		}
		if (departmentOptionId)
			setValue(
				"departmentOptionId",
				findValueAndLabel(departmentOptionId, allDepartmentOption)
			);
		if (levelId) setValue("levelId", findValueAndLabel(levelId, allLevels));
		if (watchData.studentTypeId)
			setValue(
				"studentTypeId",
				findValueAndLabel(watchData.studentTypeId, allStudentTypes)
			);
		if (modeOfEntryId)
			setValue(
				"modeOfEntryId",
				findValueAndLabel(modeOfEntryId, allStudentModes)
			);
		if (sessionId)
			setValue("sessionId", findValueAndLabel(sessionId, allSessions));
		if (semesterId)
			setValue("semesterId", findValueAndLabel(semesterId, SEMESTERS));
	}, [
		allDepartments,
		allLevels,
		allSessions,
		allStudentTypes,
		allStudentModes,
		setValue,
		filter,
		allDepartmentOption,
		watchData.departmentId,
		watchData.studentTypeId
	]);
	useEffect(() => {
		const subscription = watch(({ departmentId, studentTypeId }) => {
			setWatchData((state) => ({
				departmentId: departmentId?.value ?? state.departmentId,
				studentTypeId: studentTypeId?.value ?? state.studentTypeId
			}));
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	if (isLoading || isLoadingStudentTypes || isLoadingStudentModes)
		return <Spinner />;
	if (error || courseListError)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<div className={styles.container}>
			<div className="d-none">
				<div ref={componentRef}>
					<CollegeSheet
						compositeSheet={compositeSheet}
						data={tableData}
					/>
				</div>
			</div>
			<PageTitle title="Class List" />
			<div className={styles.page_content}>
				<div className="w-100">
					<SelectRecordsForm
						control={control}
						errors={errors}
						allSessions={allSessions}
						allDepartments={allDepartments}
						allDepartmentOption={allDepartmentOption}
						allStudentTypes={allStudentTypes}
						allStudentModes={allStudentModes}
						isDepartmentLoading={isDepartmentLoading}
						isLoadingDepartmentOption={isLoadingDepartmentOption}
						departmentOption={departmentOption}
						isLoadingLevels={isLoadingLevels}
						levels={levels}
						allLevels={allLevels}
						setFilter={setFilter}
						setValue={setValue}
						handleSubmit={handleSubmit}
						filter={filter}
						isLoadingCourses={isLoadingcourseList}
						handleCompositeSubmit={handleCompositeSubmit}
					/>
					<SelectRecordsTable
						data={courseList?.data?.items || []}
						hasPerformedQuery={!!filter.departmentId}
						paginationProps={courseList?.data?.metaData || {}}
						setPageNumber={setPageNumber}
						setFilter={setFilter}
						pageNumber={pageNumber}
						pageSize={filter.pageSize}
						debouncedSearch={debounced}
						searchValue={searchTerm}
						loading={isFetchingcourseList}
						sessionId={filter?.sessionId}
					/>
				</div>
			</div>
		</div>
	);
};

export default SelectResultRecords;

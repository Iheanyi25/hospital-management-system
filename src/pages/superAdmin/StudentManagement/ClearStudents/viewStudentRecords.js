import { ProfileContext, Spinner } from "../../../../ui_elements";
import styles from "./style.module.css";
import { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useApiGet, useApiPut } from "../../../../api/apiCall";
import {
	getDepartmentsUrl,
	getDepartmentOptionUrl,
	getStudentModeOfEntryUrl,
	getStudentTypesUrl,
	getClearanceInfoUrl,
	getAllSessionsUrl,
	getFacultiesUrl,
	updateClearanceStatusUrl
} from "../../../../api/urls";
import { formatSelectItems } from "../../../../utils/formatSelectItems";
import { Form, Table } from "./components";
import { PAGESIZE, SEARCH_DELAY } from "../../../../utils/constants";
import { useDebouncedCallback } from "use-debounce";
import queryString from "query-string";
import { findValueAndLabel } from "../../../../utils/findValueAndLabel";
import { useQueryClient } from "react-query";

const ViewStudentRecords = () => {
	const parsed = queryString.parse(window.location.search);
	const data = useContext(ProfileContext);
	const programDetails = data?.profileData?.programmeDetail;
	const [watchData, setWatchData] = useState({
		departmentId: parsed?.departmentId || "",
		studentTypeId:
			parsed?.studentTypeId ?? programDetails?.studentTypeId ?? "",
		facultyId: parsed?.facultyId ?? programDetails?.facultyId ?? ""
	});

	const [filter, setFilter] = useState({
		departmentId: parsed?.departmentId || "",
		facultyId: parsed?.facultyId || "",
		departmentOptionId: parsed?.departmentOptionId || "",
		modeOfEntryId: parsed?.modeOfEntryId || "",
		studentTypeId: parsed?.studentTypeId || "",
		sessionId: parsed?.sessionId || "",
		pageSize: parsed?.pageSize || PAGESIZE.sm
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
	} = useApiGet(getClearanceInfoUrl({ ...filter, pageNumber, searchTerm }), {
		enabled: !!filter.departmentId,
		keepPreviousData: true
	});

	const { mutate, isLoading: isPosting } = useApiPut();

	const queryClient = useQueryClient();

	const { data: sessions, isLoading, error } = useApiGet(getAllSessionsUrl());
	const {
		control,
		watch,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm();
	const { data: departmentOption, isLoading: isLoadingDepartmentOption } =
		useApiGet(
			getDepartmentOptionUrl({
				departmentId: watchData?.departmentId,
				studentTypeId: watchData?.studentTypeId
			}),
			{
				refetchOnWindowFocus: false,
				enabled: !!watchData?.departmentId
			}
		);
	const {
		data: departments,
		isLoading: isDepartmentLoading,
		error: departmentError
	} = useApiGet(
		getDepartmentsUrl(watchData?.studentTypeId, watchData?.facultyId),
		{
			enabled: !!watchData?.facultyId
		}
	);
	const { data: studentModes, isLoading: isLoadingStudentModes } = useApiGet(
		getStudentModeOfEntryUrl(),
		{
			refetchOnWindowFocus: false
		}
	);
	const { data: studentTypes, isLoading: isLoadingStudentTypes } = useApiGet(
		getStudentTypesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);
	const { data: faculties, isLoading: isLoadingFaculties } = useApiGet(
		getFacultiesUrl(watchData?.studentTypeId),
		{
			refetchOnWindowFocus: false,
			enabled: !!watchData?.studentTypeId
		}
	);
	const allFaculties = useMemo(
		() => formatSelectItems(faculties?.data, "name", "id"),
		[faculties]
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
	const allDepartmentOption = useMemo(
		() =>
			formatSelectItems(
				departmentOption?.data,
				"departmentOption",
				"departmentOptionId"
			),
		[departmentOption]
	);
	const allStudentModes = useMemo(
		() => formatSelectItems(studentModes?.data, "name", "id"),
		[studentModes]
	);
	const allStudentTypes = useMemo(
		() => formatSelectItems(studentTypes?.data, "name", "id"),
		[studentTypes]
	);
	useEffect(() => {
		if (departmentOption?.data?.length === 0)
			setFilter((state) => ({ ...state, departmentOptionId: null }));
	}, [departmentOption]);
	useEffect(() => {
		const { departmentOptionId, sessionId, modeOfEntryId } = filter;
		// setting this value from watch data to prevent the value resetting anytime the state is upadated
		if (watchData.facultyId) {
			setValue(
				"facultyId",
				findValueAndLabel(watchData.facultyId, allFaculties)
			);
		}
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
		if (watchData.studentTypeId)
			setValue(
				"studentTypeId",
				findValueAndLabel(watchData.studentTypeId, allStudentTypes)
			);
		if (sessionId)
			setValue("sessionId", findValueAndLabel(sessionId, allSessions));
		if (modeOfEntryId)
			setValue(
				"modeOfEntryId",
				findValueAndLabel(modeOfEntryId, allStudentModes)
			);
	}, [
		allDepartments,
		allSessions,
		allStudentModes,
		allStudentTypes,
		allFaculties,
		setValue,
		filter,
		allDepartmentOption,
		watchData.departmentId,
		watchData.studentTypeId,
		watchData.facultyId
	]);
	useEffect(() => {
		const subscription = watch(
			({ departmentId, studentTypeId, facultyId }) => {
				setWatchData((state) => ({
					departmentId: departmentId?.value ?? state.departmentId,
					studentTypeId: studentTypeId?.value ?? state.studentTypeId,
					facultyId: facultyId?.value ?? state.facultyId
				}));
			}
		);
		return () => subscription.unsubscribe();
	}, [watch]);

	const title = `${
		findValueAndLabel(filter.studentTypeId, allStudentTypes)?.label
	} - ${findValueAndLabel(filter.departmentId, allDepartments)?.label} ${
		findValueAndLabel(filter.sessionId, allSessions)?.label
	}`;

	const toggleClearanceStatus = ({
		admissionListId,
		departmentId,
		departmentOptionId
	}) => {
		const hasDepartmentOptionId = departmentOptionId
			? { departmentOptionId }
			: {};
		const requestDet = {
			url: updateClearanceStatusUrl(),
			data: { departmentId, admissionListId, ...hasDepartmentOptionId }
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getClearanceInfoUrl({
						...filter,
						pageNumber,
						searchTerm
					})
				);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Clearance Success!",
					body: `Student was cleared successfully!`
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Clearance Failure!",
					body:
						response?.data?.message ||
						`Student was uncleared successfully!`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	if (
		isLoading ||
		isLoadingStudentModes ||
		isLoadingStudentTypes ||
		courseListError
	)
		return <Spinner />;
	if (error || departmentError)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<div className={styles.container}>
			<div className={styles.page_content}>
				<div className="w-100">
					<Form
						control={control}
						errors={errors}
						allSessions={allSessions}
						allDepartments={allDepartments}
						allDepartmentOption={allDepartmentOption}
						allStudentModes={allStudentModes}
						allStudentTypes={allStudentTypes}
						isLoadingDepartmentOption={isLoadingDepartmentOption}
						isDepartmentLoading={isDepartmentLoading}
						departmentOption={departmentOption}
						setFilter={setFilter}
						filter={filter}
						handleSubmit={handleSubmit}
						isLoadingCourses={isLoadingcourseList}
						setValue={setValue}
						watchData={watchData}
						allFaculties={allFaculties}
						isLoadingFaculties={isLoadingFaculties}
					/>
					<Table
						data={courseList?.data?.items || []}
						hasPerformedQuery={!!filter.departmentId}
						paginationProps={courseList?.data?.metaData || {}}
						setPageNumber={setPageNumber}
						debouncedSearch={debounced}
						pageNumber={pageNumber}
						pageSize={filter.pageSize}
						searchValue={searchTerm}
						loading={isFetchingcourseList}
						title={title}
						isPosting={isPosting}
						onSubmit={toggleClearanceStatus}
					/>
				</div>
			</div>
		</div>
	);
};

export default ViewStudentRecords;

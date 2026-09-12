import {
	CenteredDialog,
	PageTitle,
	Spinner
} from "../../../../../../ui_elements";
import styles from "./style.module.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { getSearchRequest, useApiGet } from "../../../../../../api/apiCall";
import {
	getSessionsUrl,
	getStudentTypesUrl,
	getCBTCoursesUrl,
	getCBTResultsUrl
} from "../../../../../../api/urls";
import { formatSelectItems } from "../../../../../../utils/formatSelectItems";
import { SelectRecordsForm, SelectRecordsTable } from "./components";
import { PAGESIZE, SEARCH_DELAY } from "../../../../../../utils/constants";
import { useDebouncedCallback } from "use-debounce";
import { UploadCourse } from "./components/uploadCourse";
import { formatCourses } from "../../../../../../utils/formatCourseDisplay";

const SelectResultRecords = () => {
	const [open, setOpen] = useState(false);
	const pageSize = PAGESIZE.lg;
	const [watchData, setWatchData] = useState({
		studentTypeId: "",
		levelId: "",
		semesterId: "",
		courseId: "",
		sessionId: ""
	});
	const [filter, setFilter] = useState({
		studentTypeId: "",
		sessionId: "",
		semesterId: "",
		courseId: "",
		hasCA: false,
		pageSize: pageSize
	});

	const [pageNumber, setPageNumber] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const debounced = useDebouncedCallback(
		(value) => {
			setSearchTerm(value);
		},
		// delay in ms
		SEARCH_DELAY.lg
	);
	const {
		data: courseList,
		isLoading: isLoadingcourseList,
		isFetching: isFetchingcourseList,
		error: courseListError
	} = useApiGet(
		getCBTResultsUrl({
			...filter,
			pageNumber,
			searchTerm
		}),
		{
			enabled: !!filter.courseId && !!filter.sessionId,
			keepPreviousData: true
		}
	);
	const {
		control,
		watch,
		setValue,
		clearErrors,
		handleSubmit,
		formState: { errors }
	} = useForm();
	const { data: sessions, isLoading, error } = useApiGet(getSessionsUrl());
	const { data: studentTypes, isLoading: isLoadingStudentTypes } = useApiGet(
		getStudentTypesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const allStudentTypes = useMemo(
		() => formatSelectItems(studentTypes?.data, "name", "id"),
		[studentTypes]
	);

	const allSessions = useMemo(
		() => formatSelectItems(sessions?.data, "session", "id"),
		[sessions]
	);

	const apiOptions = useCallback(
		async (query) => {
			const { courseId, ...rest } = watchData;
			const data = await getSearchRequest({
				queryKey: getCBTCoursesUrl({
					...rest,
					searchTerm: query,
					active: true
				})
			});
			return formatCourses({
				courses: data.data,
				courseCode: "courseCode",
				couseTitle: "courseName",
				value: "courseId"
			});
		},
		[watchData]
	);

	useEffect(() => {
		const subscription = watch(
			({ studentTypeId, semesterId, courseId, sessionId }) => {
				setWatchData((state) => ({
					studentTypeId: studentTypeId?.value ?? state.studentTypeId,
					semesterId: semesterId?.value ?? state.semesterId,
					sessionId: sessionId?.value ?? state.sessionId,
					courseId: courseId?.value ?? state.courseId
				}));
			}
		);
		return () => subscription.unsubscribe();
	}, [watch]);

	if (isLoading || isLoadingStudentTypes) return <Spinner />;
	if (error || courseListError)
		return "An error has occurred: " + error?.response?.data?.message;

	return (
		<div className={styles.container}>
			<PageTitle title="CBT Result Upload" />
			<div className={styles.page_content}>
				<div className="w-100">
					<CenteredDialog
						modalId="upload_courses"
						isOpen={open}
						closeModal={() => setOpen(false)}
						formTitle="Upload Courses"
					>
						<UploadCourse
							currentFilterState={{
								...filter,
								pageNumber,
								searchTerm
							}}
							setFilter={setFilter}
							setUploadModal={setOpen}
						/>
					</CenteredDialog>
					<SelectRecordsForm
						control={control}
						errors={errors}
						allSessions={allSessions}
						allStudentTypes={allStudentTypes}
						setFilter={setFilter}
						setValue={setValue}
						clearErrors={clearErrors}
						handleSubmit={handleSubmit}
						filter={filter}
						apiOptions={apiOptions}
						isLoadingCourses={isLoadingcourseList}
					/>
					<SelectRecordsTable
						data={courseList?.data?.studentGrades?.items || []}
						hasPerformedQuery={!!filter.courseId}
						paginationProps={
							courseList?.data?.studentGrades?.metaData || {}
						}
						setPageNumber={setPageNumber}
						setFilter={setFilter}
						pageNumber={pageNumber}
						openModal={() => setOpen(true)}
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

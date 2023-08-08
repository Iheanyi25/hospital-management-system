import {
	CenteredDialog,
	PageTitle,
	Spinner
} from "../../../../../../ui_elements";
import styles from "./style.module.css";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useApiGet } from "../../../../../../api/apiCall";
import {
	getSessionsUrl,
	yearOfStudyUrl,
	getStudentTypesUrl,
	getGSCourses,
	getGSResultsUrl
} from "../../../../../../api/urls";
import { formatSelectItems } from "../../../../../../utils/formatSelectItems";
import { SelectRecordsForm, SelectRecordsTable } from "./components";
import { PAGESIZE, SEARCH_DELAY } from "../../../../../../utils/constants";
import { useDebouncedCallback } from "use-debounce";
import { UploadCourse } from "./components/uploadCourse";

const SelectResultRecords = () => {
	const [open, setOpen] = useState(false);
	const pageSize = PAGESIZE.lg;
	const [watchData, setWatchData] = useState({
		studentTypeId: "",
		levelId: "",
		semesterId: "",
		courseCode: "",
		sessionId: ""
	});
	const [filter, setFilter] = useState({
		studentTypeId: "",
		sessionId: "",
		semesterId: "",
		levelId: "",
		courseCode: "",
		pageSize: PAGESIZE.lg
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
	} = useApiGet(getGSResultsUrl({ ...filter, pageNumber, searchTerm }), {
		enabled: !!filter.courseCode,
		keepPreviousData: true
	});
	const {
		control,
		watch,
		setValue,
		handleSubmit,
		formState: { errors }
	} = useForm();
	const { data: sessions, isLoading, error } = useApiGet(getSessionsUrl());
	const { data: gsCourse, isLoading: isLoadingGscourse } = useApiGet(
		getGSCourses({
			levelId: watchData?.levelId,
			semesterId: watchData?.semesterId
		}),
		{
			enabled: !!watchData?.levelId && !!watchData?.semesterId
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
	const allGscourse = useMemo(
		() => formatSelectItems(gsCourse?.data, "title", "code"),
		[gsCourse]
	);
	const allStudentTypes = useMemo(
		() => formatSelectItems(studentTypes?.data, "name", "id"),
		[studentTypes]
	);
	const allLevels = useMemo(
		() => formatSelectItems(levels?.data, "level", "id"),
		[levels]
	);

	const allSessions = useMemo(
		() => formatSelectItems(sessions?.data, "session", "id"),
		[sessions]
	);
	useEffect(() => {
		const subscription = watch(
			({ studentTypeId, levelId, semesterId, courseCode, sessionId }) => {
				setWatchData((state) => ({
					studentTypeId: studentTypeId?.value ?? state.studentTypeId,
					levelId: levelId?.value ?? state.levelId,
					semesterId: semesterId?.value ?? state.semesterId,
					sessionId: sessionId?.value ?? state.sessionId,
					courseCode: courseCode?.value ?? state.courseCode
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
			<PageTitle title="GS Course Upload" />
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
								pageSize,
								pageNumber,
								searchTerm
							}}
							setUploadModal={setOpen}
						/>
					</CenteredDialog>
					<SelectRecordsForm
						control={control}
						errors={errors}
						allSessions={allSessions}
						allStudentTypes={allStudentTypes}
						allGscourse={allGscourse}
						isLoadingGscourse={isLoadingGscourse}
						isLoadingLevels={isLoadingLevels}
						levels={levels}
						allLevels={allLevels}
						setFilter={setFilter}
						setValue={setValue}
						handleSubmit={handleSubmit}
						filter={filter}
						isLoadingCourses={isLoadingcourseList}
					/>
					<SelectRecordsTable
						data={courseList?.data?.studentGrades?.items || []}
						hasPerformedQuery={!!filter.courseCode}
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

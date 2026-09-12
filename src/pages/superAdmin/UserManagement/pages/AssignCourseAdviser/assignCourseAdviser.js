import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useApiGet } from "../../../../../api/apiCall";
import {
	getLevelCourseAdvisersUrl,
	getAllSessionsUrl,
	getDepartmentsUrl,
	getFacultiesUrl,
	getStudentTypesUrl
} from "../../../../../api/urls";
import {
	Spinner,
	CenteredDialog,
	ProfileContext
} from "../../../../../ui_elements";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import { EditCourseAdviser, Form, Table } from "./components";
import ContainerStyles from "../../../CourseManagement/pages/AssignCourse/style.module.css";
import { PAGESIZE, SEARCH_DELAY } from "../../../../../utils/constants";
import { useDebouncedCallback } from "use-debounce";

const AssignCourseAdviser = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const lecturer = useContext(ProfileContext);
	const programDetails = lecturer?.profileData?.programmeDetail;
	const debounced = useDebouncedCallback(
		(value) => {
			setSearchTerm(value);
		},
		// delay in ms
		SEARCH_DELAY.sm
	);
	const [editOpen, setEditOpen] = useState(false);
	const [filter, setFilter] = useState({
		sessionId: "",
		studentTypeId: "",
		departmentId: "",
		pageSize: PAGESIZE.sm,
		pageNumber: 1
	});
	const [editData, setEditData] = useState({});
	const {
		control,
		watch,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm({
		defaultValues: {
			studentTypeId: programDetails?.studentTypeId
				? {
					label: programDetails?.studentType,
					value: programDetails?.studentTypeId
				}
				: null,
			departmentId: programDetails?.departmentId
				? {
					label: programDetails?.department,
					value: programDetails?.departmentId
				}
				: null,
			facultyId: programDetails?.facultyId
				? {
					label: programDetails?.faculty,
					value: programDetails?.facultyId
				}
				: null
		}
	});

	const watchData = watch({
		studentTypeId: "studentTypeId",
		facultyId: "facultyId"
	});

	const { data: studentTypes, isLoading: isLoadingStudentTypes } = useApiGet(
		getStudentTypesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const {
		data: faculties,
		isLoading: isLoadingFaculties,
		error
	} = useApiGet(getFacultiesUrl(watchData?.studentTypeId?.value), {
		enabled: !!watchData?.studentTypeId?.value,
		refetchOnWindowFocus: false
	});

	const {
		data: departments,
		isLoading: isLoadingDepartments,
		error: departmentError
	} = useApiGet(
		getDepartmentsUrl(
			watchData?.studentTypeId?.value,
			watchData?.facultyId?.value
		),
		{
			enabled: !!watchData?.facultyId?.value,
			refetchOnWindowFocus: false
		}
	);

	const {
		data: sessions,
		isLoading: isLoadingSessions,
		error: sessionError
	} = useApiGet(getAllSessionsUrl(), {
		refetchOnWindowFocus: false
	});

	const {
		data: levelAdvisers,
		isLoading: isLoadingLevelAdvisers,
		isFetching: isFetchingLevelAdvisers
	} = useApiGet(
		getLevelCourseAdvisersUrl({ ...filter, pageNumber:filter.pageNumber, searchTerm }),
		{
			enabled: !!filter.sessionId,
			keepPreviousData: true
		}
	);

	const allDepartments = formatSelectItems(
		departments?.data,
		"department",
		"departmentId"
	);
	const allFaculties = formatSelectItems(faculties?.data, "name", "id");
	const allSessions = formatSelectItems(sessions?.data, "session", "id");
	const allStudentTypes = formatSelectItems(studentTypes?.data, "name", "id");

	if (isLoadingSessions || isLoadingStudentTypes) return <Spinner />;
	if (error || sessionError || departmentError)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<section>
			<CenteredDialog
				modalId="edit_hod"
				isOpen={editOpen}
				closeModal={() => setEditOpen(false)}
				width={705}
				formTitle="Assign Course Adviser"
			>
				<EditCourseAdviser
					data={editData}
					filter={filter}
					allDepartments={allDepartments}
					currentState={{ ...filter, pageNumber: filter.pageNumber, searchTerm }}
					closeModal={() => setEditOpen(false)}
				/>
			</CenteredDialog>
			<div className={ContainerStyles.page_content}>
				<Form
					allFaculties={allFaculties}
					allSessions={allSessions}
					allStudentTypes={allStudentTypes}
					control={control}
					errors={errors}
					filter={filter}
					setFilter={setFilter}
					setValue={setValue}
					handleSubmit={handleSubmit}
					isLoadingLevelAdvisers={isLoadingLevelAdvisers}
					isLoadingDepartments={isLoadingDepartments}
					allDepartments={allDepartments}
					isLoadingFaculties={isLoadingFaculties}
				/>
			</div>
			<Table
				data={levelAdvisers?.data || []}
				setEditData={setEditData}
				paginationProps={levelAdvisers?.data?.metaData || {}}
				setPageNumber={(page) => setFilter(prev => ({ ...prev, pageNumber: page }))}
				debouncedSearch={debounced}
				pageNumber={filter.pageNumber}
				hasPerformedQuery={!!filter.sessionId}
				pageSize={filter.pageSize}
				searchValue={searchTerm}
				loading={isFetchingLevelAdvisers}
				setEditOpen={setEditOpen}
			/>
		</section>
	);
};

export default AssignCourseAdviser;

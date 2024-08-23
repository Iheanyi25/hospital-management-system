import { useState } from "react";
import { useForm } from "react-hook-form";
import { useApiGet } from "../../../../../api/apiCall";
import {
	getAllSessionsUrl,
	getDepartmentsUrl,
	getDepartmentOptionUrl,
	getStudentTypesUrl,
	yearOfStudyUrl,
	getAllLecturerCourses,
	getAllCampusesUrl
} from "../../../../../api/urls";
import { Spinner, CenteredDialog } from "../../../../../ui_elements";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import {
	EditLecturerCourseAssignment,
	AssignCourseForm,
	CourseAssignmentTable
} from "./components";
import { PAGESIZE, SEARCH_DELAY } from "../../../../../utils/constants";
import ContainerStyles from "../../../CourseManagement/pages/AssignCourse/style.module.css";
import { useDebouncedCallback } from "use-debounce/lib";

const AssignCourseToLecturer = () => {
	const [pageNumber, setPageNumber] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const debounced = useDebouncedCallback(
		(value) => {
			setSearchTerm(value);
		},
		// delay in ms
		SEARCH_DELAY.sm
	);

	const [editOpen, setEditOpen] = useState(false);
	const [filter, setFilter] = useState({
		departmentId: "",
		departmentOptionId: "",
		sessionId: "",
		semesterId: "",
		levelId: "",
		studentTypeId: "",
		campusId: "",
		pageSize: PAGESIZE.sm
	});
	const [editData, setEditData] = useState({});
	const { data: sessions, isLoading, error } = useApiGet(getAllSessionsUrl());
	const {
		control,
		watch,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm();

	const watchData = watch({
		department: "departmentId",
		studentTypeId: "studentTypeId"
	});

	const {
		data: departments,
		isLoading: isDepartmentLoading,
		error: departmentError
	} = useApiGet(getDepartmentsUrl(watchData?.studentTypeId?.value), {
		enabled: !!watchData?.studentTypeId?.value,
		refetchOnWindowFocus: false
	});

	const { data: departmentOption, isLoading: isLoadingDepartmentOption } =
		useApiGet(
			getDepartmentOptionUrl({
				departmentId: watchData?.departmentId?.value,
				studentTypeId: watchData?.studentTypeId?.value
			}),
			{
				enabled: !!watchData?.departmentId?.value
			}
		);
	const {
		data: studentTypes,
		isLoading: isLoadingStudentTypes,
		error: studentTypeError
	} = useApiGet(getStudentTypesUrl());
	const { data: levels, isLoading: isLoadingLevels } = useApiGet(
		yearOfStudyUrl({ studentTypeId: watchData?.studentTypeId?.value }),
		{
			refetchOnWindowFocus: false,
			enabled: !!watchData?.studentTypeId?.value
		}
	);

	const {
		data: lecturerCourses,
		isLoading: isLoadingLecturerCourses,
		isFetching: isFetchingLecturerCourses
	} = useApiGet(
		getAllLecturerCourses({ ...filter, pageNumber, searchTerm }),
		{
			enabled: !!filter.studentTypeId,
			keepPreviousData: true
		}
	);

	const { data: campuses, isLoading: isLoadingCampuses } = useApiGet(
		getAllCampusesUrl()
	);

	const allSessions = formatSelectItems(sessions?.data, "session", "id");
	const allStudentTypes = formatSelectItems(studentTypes?.data, "name", "id");
	const allDepartments = formatSelectItems(
		departments?.data,
		"department",
		"departmentId"
	);
	const allDepartmentOption = formatSelectItems(
		departmentOption?.data,
		"departmentOption",
		"departmentOptionId"
	);
	const allLevels = formatSelectItems(levels?.data, "name", "id");
	const allCampuses = formatSelectItems(campuses?.data, "name", "id");

	if (isLoading || isLoadingStudentTypes || isLoadingCampuses)
		return <Spinner />;

	if (error || departmentError || studentTypeError)
		return "An error has occurred: " + error?.message;

	return (
		<section>
			<CenteredDialog
				modalId="edit_lecturer_course_assignment"
				isOpen={editOpen}
				closeModal={() => setEditOpen(false)}
				width={705}
				formTitle="Assign Course"
			>
				<EditLecturerCourseAssignment
					editData={editData}
					filter={filter}
					pageNumber={pageNumber}
					searchTerm={searchTerm}
					closeModal={() => setEditOpen(false)}
				/>
			</CenteredDialog>
			<div className={ContainerStyles.page_content}>
				<AssignCourseForm
					allSessions={allSessions}
					allDepartments={allDepartments}
					allDepartmentOption={allDepartmentOption}
					allStudentTypes={allStudentTypes}
					allLevels={allLevels}
					allCampuses={allCampuses}
					setFilter={setFilter}
					setValue={setValue}
					filter={filter}
					isLoadingLevels={isLoadingLevels}
					isLoadingDepartmentOption={isLoadingDepartmentOption}
					isDepartmentLoading={isDepartmentLoading}
					departmentOption={departmentOption}
					levels={levels}
					control={control}
					handleSubmit={handleSubmit}
					isLoadingLecturerCourses={
						isLoadingLecturerCourses || isFetchingLecturerCourses
					}
					errors={errors}
				/>
			</div>
			<CourseAssignmentTable
				data={lecturerCourses?.data?.items ?? []}
				loading={isLoadingLecturerCourses || isFetchingLecturerCourses}
				hasPerformedQuery={!!filter.studentTypeId}
				setEditOpen={setEditOpen}
				setEditData={setEditData}
				setPageNumber={setPageNumber}
				debouncedSearch={debounced}
				pageNumber={pageNumber}
				pageSize={filter.pageSize}
				searchValue={searchTerm}
				paginationProps={lecturerCourses?.data?.metaData || {}}
				filter={filter}
			/>
		</section>
	);
};

export default AssignCourseToLecturer;

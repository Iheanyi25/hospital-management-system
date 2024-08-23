import { ProfileContext, Search, Spinner } from "../../../../ui_elements";
import styles from "./style.module.css";
import { useContext, useEffect, useMemo, useState } from "react";
import {
	getDepartmentOptionUrl,
	getStudentModesUrl,
	getStudentTypesUrl,
	yearOfStudyUrl,
	getStudentRolesUrl,
	getAllSessionsUrl,
	getFacultiesUrl,
	getDepartmentsUrl
} from "../../../../api/urls";
import { useApiGet } from "../../../../api/apiCall";
import { PAGESIZE, SEARCH_DELAY } from "../../../../utils/constants";
import { useDebouncedCallback } from "use-debounce";
import ViewAllStudentsForm from "./ViewAllStudentsForm";
import { useForm } from "react-hook-form";
import { formatSelectItems } from "../../../../utils/formatSelectItems";
import { StudentTable } from "./components";
import { useLocation } from "react-router-dom";

const ViewAllStudents = () => {
	const location = useLocation();
	const userData = useContext(ProfileContext);
	const isFacultyPage = location.pathname === "/student_management/view";
	const programDetails = userData?.profileData?.programmeDetail;
	const [filter, setFilter] = useState({
		departmentId: "",
		departmentOptionId: "",
		studentModeOfEntryId: "",
		studentTypeId: "",
		facultyId: "",
		active: "",
		levelId: "",
		role: "",
		pageSize: PAGESIZE.sm
	});

	const [searchTerm, setSearchTerm] = useState("");
	const [watchData, setWatchData] = useState({
		departmentId: programDetails?.departmentId ?? "",
		studentTypeId: programDetails?.studentTypeId ?? "",
		facultyId: programDetails?.facultyId ?? "",
		active: programDetails?.active ?? ""
	});

	const debouncedSearch = useDebouncedCallback(
		(value) => {
			setSearchTerm(value);
		},
		// delay in ms
		SEARCH_DELAY.sm
	);
	const [pageNumber, setPageNumber] = useState(1);
	const {
		handleSubmit,
		control,
		watch,
		setValue,
		formState: { errors }
	} = useForm();

	useEffect(() => {
		const subscription = watch(
			({ departmentId, studentTypeId, facultyId, levelId, active }) => {
				setWatchData((state) => ({
					departmentId: departmentId?.value ?? state.departmentId,
					studentTypeId: studentTypeId?.value ?? state.studentTypeId,
					facultyId: facultyId?.value ?? state.facultyId,
					levelId: levelId?.value ?? state.levelId,
					active: active?.value ?? state.active
				}));
			}
		);
		return () => subscription.unsubscribe();
	}, [watch]);
	const { data: levels, isLoading: isLoadingLevels } = useApiGet(
		yearOfStudyUrl({ studentTypeId: watchData?.studentTypeId }),
		{
			refetchOnWindowFocus: false,
			enabled: !!watchData?.studentTypeId
		}
	);

	const { data: faculties, isLoading: isLoadingFaculties } = useApiGet(
		getFacultiesUrl(watchData?.studentTypeId),
		{
			refetchOnWindowFocus: false,
			enabled: !!watchData?.studentTypeId
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
	const { data: departmentOption, isLoading: isLoadingDepartmentOption } =
		useApiGet(
			getDepartmentOptionUrl({
				departmentId: watchData?.departmentId,
				studentTypeId: watchData?.studentTypeId
			}),
			{
				enabled: !!watchData?.departmentId && !!watchData?.studentTypeId
			}
		);
	const { data: sessions, isLoading: isSessionsLoading } = useApiGet(
		getAllSessionsUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const { data: studentModes, isLoading: isLoadingStudentModes } = useApiGet(
		getStudentModesUrl(),
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
	const { data: studentRoles, isLoading: isLoadingStudentRoles } = useApiGet(
		getStudentRolesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const allLevels = useMemo(
		() => formatSelectItems(levels?.data, "name", "id"),
		[levels]
	);
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
	const allStudentModes = formatSelectItems(studentModes?.data, "name", "id");
	const allStudentTypes = formatSelectItems(studentTypes?.data, "name", "id");
	const allSessions = formatSelectItems(sessions?.data, "session", "id");
	const allFaculties = formatSelectItems(faculties?.data, "name", "id");

	const allStudentRoles = useMemo(
		() =>
			studentRoles?.data?.map((role) => {
				if (role === "student") {
					return { label: "Active", value: "student" };
				}
				return { label: role, value: role };
			}),
		[studentRoles]
	);

	if (
		isLoadingStudentModes ||
		isLoadingStudentTypes ||
		isLoadingStudentRoles ||
		isSessionsLoading
	)
		return <Spinner />;
	if (departmentError)
		return (
			"An error has occurred: " + departmentError?.response?.data?.message
		);

	return (
		<div className={styles.container}>
			<div className={styles.page_content}>
				<div className="w-100">
					{isFacultyPage && (
						<ViewAllStudentsForm
							control={control}
							errors={errors}
							allLevels={allLevels}
							allDepartments={allDepartments}
							allDepartmentOption={allDepartmentOption}
							allStudentModes={allStudentModes}
							allStudentTypes={allStudentTypes}
							allStudentRoles={allStudentRoles}
							isLoadingDepartmentOption={
								isLoadingDepartmentOption
							}
							isDepartmentLoading={isDepartmentLoading}
							watchData={watchData}
							allFaculties={allFaculties}
							isLoadingFaculties={isLoadingFaculties}
							isLoadingLevels={isLoadingLevels}
							setValue={setValue}
							setFilter={setFilter}
							handleSubmit={handleSubmit}
							filter={filter}
							pageNumber={pageNumber}
							pageSize={filter?.pageSize}
							searchTerm={searchTerm}
						/>
					)}
					<StudentTable
						title="Student List"
						filter={filter}
						additonalTitleData={
							<div className="d-flex align-items-center">
								<Search
									placeholder="Search for student name or JAMB REG NO "
									onChange={(e) => {
										debouncedSearch(e.target.value);
										setPageNumber(1);
									}}
								/>
							</div>
						}
						allSessions={allSessions}
						allRoles={allStudentRoles}
						isFacultyPage={isFacultyPage}
					/>
				</div>
			</div>
		</div>
	);
};

export default ViewAllStudents;

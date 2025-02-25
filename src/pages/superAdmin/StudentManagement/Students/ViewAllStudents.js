import { Search, Spinner } from "../../../../ui_elements";
import styles from "./style.module.css";
import { useEffect, useMemo, useState } from "react";
import {
	getDepartmentOptionUrl,
	getStudentModesUrl,
	getStudentTypesUrl,
	yearOfStudyUrl,
	getStudentRolesUrl,
	getAllSessionsUrl,
	getFacultiesUrl,
	getDepartmentsUrl,
	getAreaOfSpecializationByDepartmentUrl,
	getSchoolProgrammesUrl
} from "../../../../api/urls";
import { useApiGet } from "../../../../api/apiCall";
import {
	PAGESIZE,
	SEARCH_DELAY,
	STUDENT_TYPES
} from "../../../../utils/constants";
import { useDebouncedCallback } from "use-debounce";
import ViewAllStudentsForm from "./ViewAllStudentsForm";
import { useForm } from "react-hook-form";
import { formatSelectItems } from "../../../../utils/formatSelectItems";
import { StudentTable } from "./components";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { findValueAndLabel } from "../../../../utils/findValueAndLabel";
import { stringToBoolean } from "../../../../utils/toBoolean";
const ViewAllStudents = () => {
	const location = useLocation();
	const isFacultyPage = location.pathname === "/student_management/view";
	const stateFilter = queryString.parse(window.location.search);
	const [filter, setFilter] = useState({
		departmentOptionId: stateFilter.departmentOptionId || "",
		studentModeId: stateFilter.studentModeId || "",
		levelId: stateFilter.levelId || "",
		role: stateFilter.role || "",
		pageSize: PAGESIZE.sm
	});

	const [searchTerm, setSearchTerm] = useState("");
	const [watchData, setWatchData] = useState({
		departmentId: stateFilter?.departmentId ?? "",
		studentTypeId: stateFilter?.studentTypeId ?? "",
		facultyId: stateFilter?.facultyId ?? "",
		active: stateFilter?.active ?? "",
		programme: stateFilter?.programmeId ?? ""
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
	const { data: programmes, isLoading: loadingProgrammes } = useApiGet(
		getSchoolProgrammesUrl({
			studentTypeId: watchData?.studentTypeId
		}),
		{
			refetchOnWindowFocus: false,
			enabled: watchData?.studentTypeId === STUDENT_TYPES.POSTGRADUATE
		}
	);

	const { data: areaOfSpecialization, isLoading: isLoadingAOS } = useApiGet(
		getAreaOfSpecializationByDepartmentUrl(
			watchData?.departmentId,
			watchData?.programme
		),
		{
			enabled: !!watchData?.departmentId && !!watchData?.programme
		}
	);

	const allLevels = useMemo(
		() => formatSelectItems(levels?.data, "name", "id"),
		[levels]
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
		[departmentOption?.data]
	);

	const allProgrammes = useMemo(
		() => formatSelectItems(programmes?.data, "name", "id"),
		[programmes?.data]
	);

	const allStudentModes = useMemo(
		() => formatSelectItems(studentModes?.data, "name", "id"),
		[studentModes?.data]
	);

	const allStudentTypes = useMemo(
		() => formatSelectItems(studentTypes?.data, "name", "id"),
		[studentTypes?.data]
	);

	const allSessions = useMemo(
		() => formatSelectItems(sessions?.data, "session", "id"),
		[sessions?.data]
	);

	const allFaculties = useMemo(
		() => formatSelectItems(faculties?.data, "name", "id"),
		[faculties?.data]
	);

	const allAOS = useMemo(
		() => formatSelectItems(areaOfSpecialization?.data, "name", "id"),
		[areaOfSpecialization?.data]
	);

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

	const allObj = { value: "", label: "All" };
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const allPortalStatus = [
		{
			value: true,
			label: "Active"
		},
		{
			value: false,
			label: "Inactive"
		}
	];

	useEffect(() => {
		const subscription = watch(
			({
				departmentId,
				studentTypeId,
				facultyId,
				levelId,
				active,
				schoolProgramme
			}) => {
				setWatchData((state) => ({
					departmentId: departmentId?.value ?? state.departmentId,
					studentTypeId: studentTypeId?.value ?? state.studentTypeId,
					facultyId: facultyId?.value ?? state.facultyId,
					levelId: levelId?.value ?? state.levelId,
					active: active?.value ?? state.active,
					programme: schoolProgramme?.value ?? state.programme
				}));
			}
		);
		return () => subscription.unsubscribe();
	}, [watch]);

	useEffect(() => {
		const { departmentOptionId, sessionId, studentModeId, levelId, role } =
			filter;
		if (levelId) {
			setValue("levelId", findValueAndLabel(levelId, allLevels));
		}
		if (watchData.active) {
			setValue(
				"active",
				findValueAndLabel(
					stringToBoolean(watchData.active),
					allPortalStatus
				)
			);
		}
		if (role && studentRoles) {
			setValue("status", findValueAndLabel(role, [...allStudentRoles]));
		}
		if (studentModeId) {
			setValue(
				"studentModeId",
				findValueAndLabel(studentModeId, allStudentModes)
			);
		}
		if (departmentOptionId) {
			setValue(
				"departmentOption",
				findValueAndLabel(departmentOptionId, allDepartmentOption)
			);
		}
		if (watchData.studentTypeId) {
			setValue(
				"studentTypeId",
				findValueAndLabel(watchData.studentTypeId, allStudentTypes)
			);
		}
		if (sessionId) {
			setValue("sessionId", findValueAndLabel(sessionId, allSessions));
		}
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		filter,
		watchData.departmentId,
		watchData.facultyId,
		watchData.studentTypeId,
		watchData.levelId,
		watchData.active,
		studentRoles,
		setValue,
		allLevels,
		allStudentRoles,
		allStudentModes,
		allDepartmentOption,
		allStudentTypes,
		allSessions,
		allFaculties,
		allDepartments
	]);

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
							allProgrammes={allProgrammes}
							loadingProgrammes={loadingProgrammes}
							isLoadingAOS={isLoadingAOS}
							allAOS={allAOS}
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
							allObj={allObj}
							allPortalStatus={allPortalStatus}
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

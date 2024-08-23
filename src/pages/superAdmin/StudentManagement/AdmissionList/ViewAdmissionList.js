import { Spinner } from "../../../../ui_elements";
import styles from "./style.module.css";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useForm } from "react-hook-form";
import { useApiGet } from "../../../../api/apiCall";
import {
	getDepartmentsUrl,
	getDepartmentOptionUrl,
	getStudentModeOfEntryUrl,
	getStudentTypesUrl,
	getAdmissionList,
	getAdmissionTypesUrl,
	getAllSessionsUrl,
	getSchoolProgrammesUrl,
	getStudentModesOfStudyUrl
} from "../../../../api/urls";

import { formatSelectItems } from "../../../../utils/formatSelectItems";
import AdmissionListForm from "./components/AdmissionListForm";
import AdmissionListTable from "./components/AdmissionListTable";
import {
	PAGESIZE,
	SEARCH_DELAY,
	STUDENT_TYPES
} from "../../../../utils/constants";
import { useLocation } from "react-router-dom";
import { getSearchAdmissionList } from "../../../../api/urlCategories/AdmissionList";

const ViewAdmissionList = () => {
	const location = useLocation();
	const isFacultyPage =
		location.pathname === "/student_management/admission_list";
	const [filter, setFilter] = useState({
		departmentId: "",
		departmentOptionId: "",
		modeOfEntryId: "",
		studentTypeId: "",
		sessionId: "",
		programmeId: "",
		modeOfStudyId: "",
		pageSize: PAGESIZE.sm
	});
	const [searchTerm, setSearchTerm] = useState("");
	const debounced = useDebouncedCallback(
		(value) => {
			setSearchTerm(value);
		},
		// delay in ms
		SEARCH_DELAY.sm
	);

	const [searchStudentType, setSearchStudentType] = useState("");

	const [pageNumber, setPageNumber] = useState(1);
	const {
		data: admissionList,
		isLoading: isLoadingAdmissionList,
		isFetching: isFetchingAdmissionList,
		error: admissionListError
	} = useApiGet(
		isFacultyPage
			? getAdmissionList({
					...filter,
					pageNumber,
					pageSize: filter.pageSize,
					searchTerm
			  })
			: getSearchAdmissionList({
					pageSize: filter.pageSize,
					pageNumber,
					searchTerm
			  }),
		{
			//using only departmentId to enable query, cause onece departmentId is set all other values needed by the query are set too
			enabled: isFacultyPage ? !!filter.departmentId : true,
			keepPreviousData: true,
			refetchOnWindowFocus: false
		}
	);

	const { data: sessions, isLoading, error } = useApiGet(getAllSessionsUrl());
	const {
		handleSubmit,
		control,
		watch,
		setValue,
		formState: { errors }
	} = useForm();
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
	const watchData = watch({
		student_type: "student_type",
		department: "department"
	});
	const {
		data: departments,
		isLoading: isDepartmentLoading,
		error: departmentError
	} = useApiGet(
		getDepartmentsUrl(watchData?.student_type?.value || searchStudentType),
		{
			enabled: !!watchData?.student_type?.value || !!searchStudentType
		}
	);

	const { data: departmentOption, isLoading: isLoadingDepartmentOption } =
		useApiGet(
			getDepartmentOptionUrl({
				departmentId: watchData?.department?.value,
				studentTypeId: watchData?.student_type?.value
			}),
			{
				enabled: !!watchData?.department?.value
			}
		);

	const { data: admissionTypes, isLoading: isLoadingAdmssionTypes } =
		useApiGet(getAdmissionTypesUrl(), {
			refetchOnWindowFocus: false
		});

	const { data: programmes, isLoading: loadingProgrammes } = useApiGet(
		getSchoolProgrammesUrl({
			studentTypeId: watchData?.student_type?.value
		}),
		{
			refetchOnWindowFocus: false,
			enabled: watchData?.student_type?.value === STUDENT_TYPES.POSTGRADUATE
		}
	);
	const {
		data: studentModesOfStudy,
		isLoading: isLoadingStudentModesOfStudy
	} = useApiGet(getStudentModesOfStudyUrl(), {
		refetchOnWindowFocus: false,
		enabled: watchData?.student_type?.value === STUDENT_TYPES.POSTGRADUATE
	});

	const allSessions = formatSelectItems(sessions?.data, "session", "id");
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
	const allAdmissionTypes = formatSelectItems(
		admissionTypes?.data,
		"name",
		"id"
	);
	const allProgrammes = formatSelectItems(programmes?.data, "name", "id");
	const allStudentModesOfStudy = formatSelectItems(
		studentModesOfStudy?.data,
		"name",
		"id"
	);

	if (
		isLoading ||
		isLoadingStudentModes ||
		isLoadingStudentTypes ||
		isLoadingAdmssionTypes
	)
		return <Spinner />;
	if (error || departmentError || admissionListError)
		return (
			"An error has occurred: " + error?.message ||
			departmentError?.message ||
			admissionListError?.message
		);
	return (
		<div className={styles.container}>
			<div
				className={`${styles.page_content} d-flex justify-content-center}`}
			>
				<div className="w-100">
					{isFacultyPage && (
						<AdmissionListForm
							control={control}
							errors={errors}
							allSessions={allSessions}
							allDepartments={allDepartments}
							allDepartmentOption={allDepartmentOption}
							allStudentModes={allStudentModes}
							allStudentTypes={allStudentTypes}
							allProgrammes={allProgrammes}
							allStudentModesOfStudy={allStudentModesOfStudy}
							isLoadingStudentModesOfStudy={
								isLoadingStudentModesOfStudy
							}
							loadingProgrammes={loadingProgrammes}
							isLoadingDepartmentOption={
								isLoadingDepartmentOption
							}
							isDepartmentLoading={isDepartmentLoading}
							data={admissionList?.data?.items}
							setFilter={setFilter}
							handleSubmit={handleSubmit}
							isLoadingAdmissionList={isLoadingAdmissionList}
							filter={filter}
							allAdmissionTypes={allAdmissionTypes}
							pageNumber={pageNumber}
							pageSize={filter?.pageSize}
							searchTerm={searchTerm}
							setValue={setValue}
							watchData={watchData}
						/>
					)}
					<AdmissionListTable
						data={admissionList?.data?.items || []}
						hasPerformedQuery={!!filter.departmentId}
						paginationProps={admissionList?.data?.metaData || {}}
						setPageNumber={setPageNumber}
						debouncedSearch={debounced}
						pageNumber={pageNumber}
						pageSize={filter?.pageSize}
						searchTerm={searchTerm}
						loading={isFetchingAdmissionList}
						setValue={setValue}
						allSessions={allSessions}
						allDepartments={allDepartments}
						allDepartmentOption={allDepartmentOption}
						allStudentModes={allStudentModes}
						allStudentTypes={allStudentTypes}
						allAdmissionTypes={allAdmissionTypes}
						isFacultyPage={isFacultyPage}
						filter={filter}
						setSearchStudentType={setSearchStudentType}
						isDepartmentLoading={isDepartmentLoading}
					/>
				</div>
			</div>
		</div>
	);
};

export default ViewAdmissionList;

import { Spinner } from "../../../../ui_elements";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useApiGet, useApiPut } from "../../../../api/apiCall";
import {
	getDepartmentsUrl,
	getDepartmentOptionUrl,
	getStudentModeOfEntryUrl,
	getStudentTypesUrl,
	getClearanceInfoUrl,
	updateClearanceStatusUrl,
	getAllSessionsUrl
} from "../../../../api/urls";
import { formatSelectItems } from "../../../../utils/formatSelectItems";
import { Form, Table } from "./components";
import { useQueryClient } from "react-query";
import { PAGESIZE, SEARCH_DELAY } from "../../../../utils/constants";
import { useDebouncedCallback } from "use-debounce";

const ClearStudents = () => {
	const [filter, setFilter] = useState({
		departmentId: "",
		departmentOptionId: "",
		studentModeOfEntryId: "",
		studentTypeId: "",
		sessionId: "",
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

	const { mutate, isLoading: isPosting } = useApiPut();
	const queryClient = useQueryClient();
	const {
		data: courseList,
		isLoading: isLoadingcourseList,
		isFetching: isFetchingcourseList,
		error: courseListError
	} = useApiGet(getClearanceInfoUrl({ ...filter, pageNumber, searchTerm }), {
		enabled: !!filter.departmentId,
		keepPreviousData: true
	});

	const { data: sessions, isLoading, error } = useApiGet(getAllSessionsUrl());
	const {
		control,
		watch,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm();

	const watchData = watch({
		departmentId: "departmentId",
		studentTypeId: "studentTypeId"
	});
	const { data: departmentOption, isLoading: isLoadingDepartmentOption } =
		useApiGet(
			getDepartmentOptionUrl({
				departmentId: watchData?.departmentId?.value
			}),
			{
				refetchOnWindowFocus: false,
				enabled: !!watchData?.departmentId?.value
			}
		);
	const {
		data: departments,
		isLoading: isDepartmentLoading,
		error: departmentError
	} = useApiGet(getDepartmentsUrl(watchData?.studentTypeId?.value), {
		enabled: !!watchData?.studentTypeId?.value
	});
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
	useEffect(() => {
		if (departmentOption?.data?.length === 0)
			setFilter((state) => ({ ...state, departmentOptionId: null }));
	}, [departmentOption]);

	const toggleClearanceStatus = ({ admissionListId }) => {
		const requestDet = {
			url: updateClearanceStatusUrl({ admissionListId })
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
					body: `Student clearance action was successful!`
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
						`Student clearance action was unsuccessful!`
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
						handleSubmit={handleSubmit}
						isLoadingCourses={isLoadingcourseList}
						setValue={setValue}
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
						isPosting={isPosting}
						onSubmit={toggleClearanceStatus}
					/>
				</div>
			</div>
		</div>
	);
};

export default ClearStudents;

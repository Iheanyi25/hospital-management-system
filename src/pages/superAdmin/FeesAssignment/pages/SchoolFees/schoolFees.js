import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useApiGet } from "../../../../../api/apiCall";
import queryString from "query-string";
import {
	getFacultiesUrl,
	getServicesTypesUrl,
	getStudentTypesUrl,
	getStudentModesUrl,
	yearOfStudyUrl,
	getSchoolFeesAssignmentsUrl,
	getSchoolFeesPaymentTypesUrl,
	getAllSessionsUrl,
	getStudentModeOfEntryUrl,
	getSchoolProgrammesUrl
} from "../../../../../api/urls";
import { Button, Spinner } from "../../../../../ui_elements";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import { ViewSchoolFeesForm, SchoolFeesTable } from "./components";
import ContainerStyles from "../../../CourseManagement/pages/AssignCourse/style.module.css";
import { PAGESIZE, SEARCH_DELAY } from "../../../../../utils/constants";
import { useDebouncedCallback } from "use-debounce/lib";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FEES_ASSIGNMENT } from "../../../../../store/constant";
import { findValueAndLabel } from "../../../../../utils/findValueAndLabel";
import { useEffect } from "react";

const SchoolFeesAssignment = () => {
	const parsed = queryString.parse(window.location.search);
	const [filter, setFilter] = useState({
		SessionId: parsed?.SessionId || "",
		PaymentType: parsed?.PaymentType || "",
		FacultyId: parsed?.FacultyId || "",
		Level: parsed?.Level || "",
		StudentTypeId: parsed?.StudentTypeId || "",
		StudentModeId: parsed?.StudentModeId || "",
		StudentModeOfEntryId: parsed?.StudentModeOfEntryId || "",
		SchoolProgrammeId: parsed?.SchoolProgrammeId || "",
		ServiceTypeId: parsed?.ServiceTypeId || "",
		pageSize: parsed?.pageSize || PAGESIZE.sm
	});
	const [pageNumber, setPageNumber] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [watchData, setWatchData] = useState({
		StudentTypeId: parsed?.StudentTypeId || ""
	});
	const debounced = useDebouncedCallback(
		(value) => {
			setSearchTerm(value);
		},
		// delay in ms
		SEARCH_DELAY.sm
	);

	const { push } = useHistory();
	const dispatch = useDispatch();

	const { data: sessions, isLoading, error } = useApiGet(getAllSessionsUrl());

	const {
		control,
		watch,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm();

	const {
		data: paymentTypes,
		isLoading: isPaymentTypesLoading,
		error: paymenttypesError
	} = useApiGet(getSchoolFeesPaymentTypesUrl());

	const {
		data: serviceTypes,
		isLoading: isLoadingServiceTypes,
		error: serviceTypeError
	} = useApiGet(getServicesTypesUrl());
	const {
		data: studentTypes,
		isLoading: isLoadingStudentTypes,
		error: studentTypeError
	} = useApiGet(getStudentTypesUrl());

	const {
		data: studentModes,
		isLoading: isLoadingStudentMode,
		error: studentModeError
	} = useApiGet(getStudentModesUrl());

	const {
		data: studentModeOfEntry,
		isLoading: isLoadingStudentModeOfEntry,
		error: studentModeOfEntryError
	} = useApiGet(getStudentModeOfEntryUrl());

	const {
		data: faculties,
		isLoading: isFacultiesLoading,
		error: facultiesError
	} = useApiGet(getFacultiesUrl(watchData?.StudentTypeId), {
		refetchOnWindowFocus: false,
		enabled: !!watchData?.StudentTypeId
	});

	const { data: levels, isLoading: isLoadingLevels } = useApiGet(
		yearOfStudyUrl({ studentTypeId: watchData?.StudentTypeId }),
		{
			refetchOnWindowFocus: false,
			enabled: !!watchData?.StudentTypeId
		}
	);
	const { data: programmes, isLoading: isLoadingSchoolProgrammes } =
		useApiGet(
			getSchoolProgrammesUrl({ studentTypeId: watchData?.StudentTypeId }),
			{
				refetchOnWindowFocus: false,
				enabled: !!watchData?.StudentTypeId
			}
		);
	const {
		data: feesToAssign,
		isLoading: isLoadingFeesToAssign,
		isFetching: isFetchingFeesToAssign,
		error: feesToAssignError
	} = useApiGet(
		getSchoolFeesAssignmentsUrl({
			SessionId: filter.SessionId,
			PaymentTypeId: filter.PaymentType,
			FacultyId: filter.FacultyId,
			LevelId: filter.Level,
			StudentTypeId: filter.StudentTypeId,
			StudentModeId: filter.StudentModeId,
			SchoolProgrammeId: filter.SchoolProgrammeId,
			searchTerm,
			pageNumber,
			pageSize: filter.pageSize
		}),
		{
			enabled: !!filter.PaymentType,
			keepPreviousData: true
		}
	);

	const allSessions = useMemo(
		() => formatSelectItems(sessions?.data, "session", "id"),
		[sessions]
	);
	const allPaymentTypes = useMemo(
		() => formatSelectItems(paymentTypes?.data, "name", "id"),
		[paymentTypes]
	);
	const allFaculties = useMemo(
		() => formatSelectItems(faculties?.data, "name", "id"),
		[faculties]
	);
	const allServiceTypes = useMemo(
		() => formatSelectItems(serviceTypes?.data, "name", "id"),
		[serviceTypes]
	);
	const allStudentTypes = useMemo(
		() => formatSelectItems(studentTypes?.data, "name", "id"),
		[studentTypes]
	);
	const allStudentModes = useMemo(
		() => formatSelectItems(studentModes?.data, "name", "id"),
		[studentModes]
	);
	const allStudentModeOfEntry = useMemo(
		() => formatSelectItems(studentModeOfEntry?.data, "name", "id"),
		[studentModeOfEntry]
	);
	const allLevels = useMemo(
		() => formatSelectItems(levels?.data, "name", "id"),
		[levels]
	);
	const allProgrammes = useMemo(
		() => formatSelectItems(programmes?.data, "name", "id"),
		[programmes]
	);

	const columns = useMemo(
		() => [
			{
				Header: "Department",
				accessor: "department"
			},
			{
				Header: "Amount",
				accessor: "amount"
			},
			{
				Header: "Tenece Commission",
				accessor: "teneceCommission"
			},
			{
				Header: "Service Type",
				accessor: "serviceType"
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => (
					<div>
						<Button
							label="Edit"
							buttonClass="standard"
							onClick={() => {
								dispatch({
									type: FEES_ASSIGNMENT,
									payload: null
								});
								push({
									pathname: `/fees_assignment/school_fees/edit`,
									state: {
										id: row?.original?.id,
										name: row.original.department,
										departmentId: row.original.departmentId,
										searchParams: parsed,
										filter
									}
								});
							}}
						/>
					</div>
				)
			}
		],
		[filter, push, dispatch, parsed]
	);
	useEffect(() => {
		const {
			Level,
			SessionId,
			StudentModeId,
			ServiceTypeId,
			FacultyId,
			PaymentType,
			SchoolProgrammeId
		} = filter;
		// setting this value from watch data to prevent the value resetting anytime the state is upadated
		if (Level) setValue("Level", findValueAndLabel(Level, allLevels));
		if (SchoolProgrammeId)
			setValue(
				"SchoolProgrammeId",
				findValueAndLabel(SchoolProgrammeId, allProgrammes)
			);
		if (FacultyId)
			setValue("FacultyId", findValueAndLabel(FacultyId, allFaculties));
		if (ServiceTypeId)
			setValue(
				"ServiceTypeId",
				findValueAndLabel(ServiceTypeId, allServiceTypes)
			);
		if (StudentModeId)
			setValue(
				"StudentModeId",
				findValueAndLabel(StudentModeId, allStudentModes)
			);
		if (watchData.StudentTypeId)
			setValue(
				"StudentTypeId",
				findValueAndLabel(watchData.StudentTypeId, allStudentTypes)
			);
		if (SessionId)
			setValue("session", findValueAndLabel(SessionId, allSessions));
		if (PaymentType)
			setValue(
				"PaymentType",
				findValueAndLabel(PaymentType, allPaymentTypes)
			);
	}, [
		allLevels,
		allSessions,
		allStudentTypes,
		allPaymentTypes,
		allServiceTypes,
		allStudentModes,
		allProgrammes,
		allFaculties,
		watchData.StudentTypeId,
		setValue,
		filter
	]);
	useEffect(() => {
		const subscription = watch(({ StudentTypeId }) => {
			setWatchData((state) => ({
				StudentTypeId: StudentTypeId?.value ?? state.StudentTypeId
			}));
		});
		return () => subscription.unsubscribe();
	}, [watch]);
	if (
		isLoading ||
		isPaymentTypesLoading ||
		isLoadingServiceTypes ||
		isLoadingStudentTypes ||
		isLoadingStudentMode ||
		isLoadingStudentModeOfEntry
	)
		return <Spinner />;
	if (
		error ||
		serviceTypeError ||
		studentTypeError ||
		studentModeError ||
		paymenttypesError ||
		feesToAssignError ||
		facultiesError ||
		studentModeOfEntryError
	)
		return "An error has occurred: " + error?.message;

	return (
		<section>
			<div className={ContainerStyles.page_content}>
				<ViewSchoolFeesForm
					allSessions={allSessions}
					allFaculties={allFaculties}
					setFilter={setFilter}
					filter={filter}
					isLoadingLevels={isLoadingLevels}
					levels={levels}
					watchData={watchData}
					allLevels={allLevels}
					allPaymentTypes={allPaymentTypes}
					allServiceTypes={allServiceTypes}
					allStudentTypes={allStudentTypes}
					allStudentModes={allStudentModes}
					allStudentModeOfEntry={allStudentModeOfEntry}
					allProgrammes={allProgrammes}
					control={control}
					handleSubmit={handleSubmit}
					isLoadingFeesToAssign={isLoadingFeesToAssign}
					isLoadingSchoolProgrammes={isLoadingSchoolProgrammes}
					errors={errors}
					isFacultiesLoading={isFacultiesLoading}
					faculties={faculties}
					pageNumber={pageNumber}
					pageSize={filter?.pageSize}
					searchTerm={searchTerm}
				/>
			</div>
			<SchoolFeesTable
				title={
					feesToAssign?.data.items?.length !== 0 &&
					watchData?.StudentTypeId?.label
				}
				data={feesToAssign?.data.items || []}
				loading={isFetchingFeesToAssign}
				columns={columns}
				debouncedSearch={debounced}
				hasPerformedQuery={!!filter.SessionId}
				paginationProps={feesToAssign?.data?.metaData || {}}
				searchTerm={searchTerm}
				setPageNumber={setPageNumber}
				pageNumber={pageNumber}
			/>
		</section>
	);
};

export default SchoolFeesAssignment;

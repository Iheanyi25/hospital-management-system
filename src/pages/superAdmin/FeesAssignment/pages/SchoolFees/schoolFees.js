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
	getPaymentChannelsUrl,
	getSchoolProgrammesUrl,
	getStudentModesOfStudyUrl,
	getProgrammeTypesUrl
} from "../../../../../api/urls";
import { Button, Spinner, CenteredDialog } from "../../../../../ui_elements";
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
import numberFormatter from "../../../../../utils/numberFormatter";
import {CloneSchoolFeesAssignment} from "./components/cloneSchoolFeesAssignment";

const SchoolFeesAssignment = () => {
	const [cloneOpen, setCloneOpen] = useState(false);
	const parsed = queryString.parse(window.location.search);
	const [filter, setFilter] = useState({
		SessionId: parsed?.SessionId || "",
		PaymentType: parsed?.PaymentType || "",
		FacultyId: parsed?.FacultyId || "",
		Level: parsed?.Level || "",
		StudentTypeId: parsed?.StudentTypeId || "",
		StudentModeId: parsed?.StudentModeId || "",
		ModeOfEntryId: parsed?.ModeOfEntryId || "",
		IsStaff: parsed?.IsStaff || "",
		ServiceTypeId: parsed?.ServiceTypeId || "",
		PaymentChannelId: parsed?.PaymentChannelId || "",
		SchoolProgrammeId: parsed?.SchoolProgrammeId || "",
		ProgrammeTypeId: parsed?.ProgrammeTypeId || "",
		ModeOfStudyId: parsed?.ModeOfStudyId || "",
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
	} = useForm({});

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
		data: paymentChannels,
		isLoading: isLoadingPaymentChannels,
		error: paymentChannelsError
	} = useApiGet(getPaymentChannelsUrl());

	const { data: studentModeOfEntry, isLoading: isLoadingStudentModeOfEntry } =
		useApiGet(getStudentModeOfEntryUrl(), {
			refetchOnWindowFocus: false
		});
	const {
		data: studentModesOfStudy,
		isLoading: isLoadingStudentModesOfStudy
	} = useApiGet(getStudentModesOfStudyUrl(), {
		refetchOnWindowFocus: false
	});

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
		data: programmeTypes,
		isLoading: isLoadingProgrammeTypes,
		error: programmeTypesError
	} = useApiGet(getProgrammeTypesUrl(), {
		refetchOnWindowFocus: false,
		enabled: !!watchData?.StudentTypeId
	});
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
			IsStaff: filter.IsStaff,
			ModeOfEntryId: filter.ModeOfEntryId,
			SchoolProgrammeId: filter.SchoolProgrammeId,
			ProgrammeTypeId: filter.ProgrammeTypeId,
			PaymentChannelId: filter.PaymentChannelId,
			ModeOfStudyId: filter.ModeOfStudyId,
			searchTerm,
			pageNumber,
			pageSize: filter.pageSize
		}),
		{
			enabled: !!filter.PaymentType,
			keepPreviousData: true,
			refetchOnWindowFocus: false
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
	const allPaymentChannels = useMemo(
		() => formatSelectItems(paymentChannels?.data, "name", "id"),
		[paymentChannels]
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
	const allStudentModeEntry = useMemo(
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
	const allStudentModesOfStudy = useMemo(
		() => formatSelectItems(studentModesOfStudy?.data, "name", "id"),
		[studentModesOfStudy]
	);
	const allProgrammeTypes = useMemo(
		() => formatSelectItems(programmeTypes?.data, "name", "id"),
		[programmeTypes]
	);
	const allStaffStatus = useMemo(
		() => [
			{
				value: "true",
				label: "True"
			},
			{
				value: "false",
				label: "False"
			}
		],
		[]
	);

	const columns = useMemo(
		() => [
			{
				Header: "Department",
				accessor: "department"
			},
			{
				Header: "Amount (₦)",
				accessor: "amount",
				Cell: ({ cell: { row } }) => (
					<div>{`${numberFormatter(row?.original?.amount)}`}</div>
				)
			},
			{
				Header: "Tenece Commission (₦)",
				accessor: "teneceCommission",
				Cell: ({ cell: { row } }) => (
					<div>{`${numberFormatter(
						row?.original?.teneceCommission
					)}`}</div>
				)
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
			ModeOfEntryId,
			PaymentChannelId,
			SchoolProgrammeId,
			ModeOfStudyId,
			ProgrammeTypeId,
			IsStaff
		} = filter;
		// setting this value from watch data to prevent the value resetting anytime the state is upadated
		if (Level) setValue("Level", findValueAndLabel(Level, allLevels));
		if (SchoolProgrammeId)
			setValue(
				"SchoolProgrammeId",
				findValueAndLabel(SchoolProgrammeId, allProgrammes)
			);
		if (IsStaff)
			setValue("IsStaff", findValueAndLabel(IsStaff, allStaffStatus));
		if (ProgrammeTypeId)
			setValue(
				"ProgrammeTypeId",
				findValueAndLabel(ProgrammeTypeId, allProgrammeTypes)
			);
		if (ModeOfStudyId)
			setValue(
				"ModeOfStudyId",
				findValueAndLabel(ModeOfStudyId, allStudentModesOfStudy)
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
		if (ModeOfEntryId)
			setValue(
				"ModeOfEntryId",
				findValueAndLabel(ModeOfEntryId, allStudentModeEntry)
			);
		if (PaymentChannelId)
			setValue(
				"PaymentChannelId",
				findValueAndLabel(PaymentChannelId, allPaymentChannels)
			);
	}, [
		allLevels,
		allSessions,
		allStudentTypes,
		allPaymentTypes,
		allServiceTypes,
		allStudentModes,
		allFaculties,
		allStudentModeEntry,
		allPaymentChannels,
		allProgrammes,
		allStudentModesOfStudy,
		allProgrammeTypes,
		allStaffStatus,
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
		isLoadingStudentModeOfEntry ||
		isLoadingPaymentChannels
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
		paymentChannelsError ||
		programmeTypesError
	)
		return "An error has occurred: " + error?.message;

	return (
		<section>
			<CenteredDialog
				modalId="clone_school_fees"
				isOpen={cloneOpen}
				closeModal={() => setCloneOpen(false)}
				width={705}
				formTitle="Clone School fees Assignment"
			>
				<CloneSchoolFeesAssignment
					filter={filter}
					allSessions={allSessions}
					currentFilterState={{ ...filter, pageNumber, searchTerm }}
					paymentPurposeId="SchoolFees"
					closeModal={() => setCloneOpen(false)}
				/>
			</CenteredDialog>
			<div className={ContainerStyles.page_content}>
				<ViewSchoolFeesForm
					allSessions={allSessions}
					allFaculties={allFaculties}
					setFilter={setFilter}
					filter={filter}
					setValue={setValue}
					isLoadingLevels={isLoadingLevels}
					levels={levels}
					allLevels={allLevels}
					watchData={watchData}
					allProgrammes={allProgrammes}
					allPaymentTypes={allPaymentTypes}
					allServiceTypes={allServiceTypes}
					allStudentTypes={allStudentTypes}
					allStudentModes={allStudentModes}
					allStaffStatus={allStaffStatus}
					allPaymentChannels={allPaymentChannels}
					allStudentModeEntry={allStudentModeEntry}
					isLoadingSchoolProgrammes={isLoadingSchoolProgrammes}
					isLoadingStudentModesOfStudy={isLoadingStudentModesOfStudy}
					allStudentModesOfStudy={allStudentModesOfStudy}
					isLoadingProgrammeTypes={isLoadingProgrammeTypes}
					allProgrammeTypes={allProgrammeTypes}
					control={control}
					handleSubmit={handleSubmit}
					isLoadingFeesToAssign={isLoadingFeesToAssign}
					errors={errors}
					isFacultiesLoading={isFacultiesLoading}
					faculties={faculties}
					pageNumber={pageNumber}
					pageSize={filter?.pageSize}
					searchTerm={searchTerm}
				/>
			</div>
			<div className="d-flex justify-content-between align-items-center px-4 py-3 border">
				<h5 className="">School fees summary</h5>
				<div className="d-flex">
					<Button
						data-cy="view_records"
						type="button"
						buttonClass="standard"
						label="Clone School fees Assignment"
						onClick={() => setCloneOpen(true)}
					/>
					<Button
						label="Bulk Assignment"
						buttonClass="standard"
						disabled={
							!feesToAssign?.data.items?.length ||
							isFetchingFeesToAssign
						}
						onClick={() => {
							push({
								pathname: `/fees_assignment/school_fees/bulk`,
								state: {
									searchParams: parsed,
									filter
								}
							});
						}}
					/>

				</div>

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

import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useApiGet } from "../../../../../api/apiCall";
import {
	getFacultiesUrl,
	getAllSessionsUrl,
	getStudentTypesUrl,
	yearOfStudyUrl,
	getSchoolFeesPaymentTypesUrl,
	getServicesTypesUrl,
	getStudentModesUrl,
	getSundryFeesAssignmentsUrl,
	getSundryPaymentPurposeUrl,
	getStudentModeOfEntryUrl,
	getStudentModesOfStudyUrl
} from "../../../../../api/urls";
import { Button, Spinner, CenteredDialog } from "../../../../../ui_elements";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import { PAGESIZE } from "../../../../../utils/constants";
import {
	SundryFeesTable,
	ViewSundryFeesForm,
	EditSundryFees
} from "./components";
import ContainerStyles from "../../../CourseManagement/pages/AssignCourse/style.module.css";
import { CloneSundryFeesAssignment } from "./components/cloneSundryFeesAssignment";

const SundryFeesAssignment = () => {
	const [editOpen, setEditOpen] = useState(false);
	const [cloneOpen, setCloneOpen] = useState(false);
	const [editData, setEditData] = useState({});
	const [filter, setFilter] = useState({
		SessionId: "",
		PaymentType: "",
		PaymentPurpose: "",
		FacultyId: "",
		Level: "",
		StudentTypeId: "",
		StudentModeId: "",
		ServiceTypeId: "",
		modeOfEntryId: "",
		pageSize: PAGESIZE.sm,
		pageNumber: 1
	});
	
	const [watchData, setWatchData] = useState({
		StudentTypeId: ""
	});

	const { data: sessions, isLoading, error } = useApiGet(getAllSessionsUrl());

	const {
		control,
		watch,
		handleSubmit,
		formState: { errors }
	} = useForm();

	const {
		data: paymentTypes,
		isLoading: isPaymentTypesLoading,
		error: paymenttypesError
	} = useApiGet(getSchoolFeesPaymentTypesUrl());

	const {
		data: paymentPurpose,
		isLoading: isPaymentPurposeLoading,
		error: paymentPurposeError
	} = useApiGet(getSundryPaymentPurposeUrl());

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
	const {
		data: studentModesOfEntry,
		isLoading: isLoadingStudentModesOfEntry
	} = useApiGet(getStudentModeOfEntryUrl(), {
		refetchOnWindowFocus: false
	});

	const {
		data: studentModesOfStudy,
		isLoading: isLoadingStudentModesOfStudy
	} = useApiGet(getStudentModesOfStudyUrl(), {
		refetchOnWindowFocus: false
	});
	const {
		data: feesToAssign,
		isLoading: isLoadingFeesToAssign,
		isFetching: isFetchingFeesToAssign,
		error: feesToAssignError
	} = useApiGet(
		getSundryFeesAssignmentsUrl({
			SessionId: filter.SessionId,
			PaymentTypeId: filter.PaymentType,
			PaymentPurposeId: filter.PaymentPurpose,
			FacultyId: filter.FacultyId,
			LevelId: filter.Level,
			StudentTypeId: filter.StudentTypeId,
			StudentModeId: filter.StudentModeId,
			modeOfEntryId: filter.modeOfEntryId,
			pageNumber: filter.pageNumber,
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
	const allPaymentPurpose = useMemo(
		() => formatSelectItems(paymentPurpose?.data, "name", "id"),
		[paymentPurpose]
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
	const allLevels = useMemo(
		() => formatSelectItems(levels?.data, "name", "id"),
		[levels]
	);
	const allStudentModesOfEntry = useMemo(
		() => formatSelectItems(studentModesOfEntry?.data, "name", "id"),
		[studentModesOfEntry]
	);
	const allStudentModesOfStudy = useMemo(
		() => formatSelectItems(studentModesOfStudy?.data, "name", "id"),
		[studentModesOfStudy]
	);

	const columns = useMemo(
		() => [
			{
				Header: "Department",
				accessor: "department",
				Cell: ({ cell: { row } }) => (
					<div>{row.original.department || "-"}</div>
				)
			},
			{
				Header: "Amount",
				accessor: "amount",
				Cell: ({ cell: { row } }) => (
					<div>{row.original.amount || "-"}</div>
				)
			},
			{
				Header: "Tenece Commission",
				accessor: "teneceCommission",
				Cell: ({ cell: { row } }) => (
					<div>{row.original.teneceCommission || "-"}</div>
				)
			},
			{
				Header: "Service Type",
				accessor: "serviceType",
				Cell: ({ cell: { row } }) => (
					<div>{row.original.serviceType || "-"}</div>
				)
			},
			{
				Header: "Payment Type",
				accessor: "paymentType",
				Cell: ({ cell: { row } }) => (
					<div>{row.original.paymentType || "-"}</div>
				)
			},
			{
				Header: "Payment Purpose",
				accessor: "paymentPurpose",
				Cell: ({ cell: { row } }) => (
					<div>{row.original.paymentPurpose || "-"}</div>
				)
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
								setEditData({
									id: row.original.id,
									Amount: row.original.amount,
									TeneceCommission:
										row.original.teneceCommission,
									studentTypeId: row.original.studentTypeId,
									sessionId: row.original.sessionId,
									serviceTypeId: row.original.serviceTypeId,
									serviceType: row.original.serviceType,
									paymentTypeId: row.original.paymentTypeId,
									modeOfStudyId: row.original.modeOfStudyId,
									paymentPurposeId:
										row.original.paymentPurposeId
								});
								setEditOpen(true);
							}}
						/>
					</div>
				)
			}
		],
		[]
	);
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
		isPaymentPurposeLoading ||
		isLoadingStudentModesOfEntry ||
		isLoadingStudentModesOfStudy
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
		paymentPurposeError
	)
		return "An error has occurred: " + error?.message;

	return (
		<section>
			<CenteredDialog
				modalId="edit_school_fees"
				isOpen={editOpen}
				closeModal={() => setEditOpen(false)}
				width={705}
				formTitle="Edit Sundry fees"
			>
				<EditSundryFees
					data={editData}
					filter={filter}
					pageNumber={filter.pageNumber}
					closeModal={() => setEditOpen(false)}
					allServiceTypes={allServiceTypes}
					allPaymentPurpose={allPaymentPurpose}
					allPaymentTypes={allPaymentTypes}
					allStudentModesOfStudy={allStudentModesOfStudy}
					isLoadingStudentModesOfStudy={isLoadingStudentModesOfStudy}
				/>
			</CenteredDialog>

			<CenteredDialog
				modalId="clone_sundry_fees"
				isOpen={cloneOpen}
				closeModal={() => setCloneOpen(false)}
				width={705}
				formTitle="Clone Sundry Fees Assignment"
			>
				<CloneSundryFeesAssignment
					filter={filter}
					allSessions={allSessions}
					currentFilterState={{ ...filter }}
					paymentPurposeId="Acceptance"
					closeModal={() => setCloneOpen(false)}
				/>
			</CenteredDialog>
			<div className={ContainerStyles.page_content}>
				<ViewSundryFeesForm
					allSessions={allSessions}
					allServiceTypes={allServiceTypes}
					allStudentModes={allStudentModes}
					allFaculties={allFaculties}
					setFilter={setFilter}
					filter={filter}
					isLoadingLevels={isLoadingLevels}
					levels={levels}
					allLevels={allLevels}
					allPaymentTypes={allPaymentTypes}
					allStudentTypes={allStudentTypes}
					allStudentModesOfEntry={allStudentModesOfEntry}
					control={control}
					handleSubmit={handleSubmit}
					allStudentModesOfStudy={allStudentModesOfStudy}
					isLoadingFeesToAssign={isLoadingFeesToAssign}
					errors={errors}
					isFacultiesLoading={isFacultiesLoading}
					pageNumber={filter.pageNumber}
					pageSize={filter?.pageSize}
					faculties={faculties}
					allPaymentPurpose={allPaymentPurpose}
					isPaymentPurposeLoading
					isLoadingStudentModesOfStudy={isLoadingStudentModesOfStudy}
				/>
			</div>
			<div className="d-flex justify-content-between align-items-center px-4 py-3 border">
				<h4>Regular</h4>
				<span className="d-flex">
					<Button
						data-cy="clone-sundry-fees"
						type="button"
						buttonClass="standard"
						label="Clone sundry Fees Assignment"
						onClick={() => setCloneOpen(true)}
					/>
				</span>
			</div>
			<SundryFeesTable
				title={
					feesToAssign?.data?.length !== 0 &&
					watchData?.StudentTypeId?.label
				}
				data={feesToAssign?.data?.items || []}
				loading={isFetchingFeesToAssign}
				setEditOpen={setEditOpen}
				columns={columns}
				setPageNumber={(page) => setFilter(prev => ({ ...prev, pageNumber: page }))}
				pageNumber={filter.pageNumber}
				hasPerformedQuery={!!filter.SessionId}
				paginationProps={feesToAssign?.data?.metaData || {}}
			/>
		</section>
	);
};

export default SundryFeesAssignment;

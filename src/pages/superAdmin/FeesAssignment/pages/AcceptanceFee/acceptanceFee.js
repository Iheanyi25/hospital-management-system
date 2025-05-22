import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useApiGet } from "../../../../../api/apiCall";
import {
	getStudentTypesUrl,
	getAcceptanceFeesUrl,
	getServicesTypesUrl,
	getAllSessionsUrl,
	getFacultiesUrl
} from "../../../../../api/urls";
import { Spinner, CenteredDialog, Button } from "../../../../../ui_elements";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import {
	EditAcceptanceFee,
	ViewAcceptanceFeeForm,
	AcceptanceFeeTable
} from "./components";
import queryString from "query-string";
import ContainerStyles from "../../../CourseManagement/pages/AssignCourse/style.module.css";
import { findValueAndLabel } from "../../../../../utils/findValueAndLabel";
import { useHistory } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { PAGESIZE, SEARCH_DELAY } from "../../../../../utils/constants";
import { CloneAcceptanceFeesAssignment } from "./components/cloneAcceptanceFeesAssignment";

const AcceptanceFeeAssignment = () => {
	const [cloneOpen, setCloneOpen] = useState(false);
	const parsed = queryString.parse(window.location.search);
	const [editOpen, setEditOpen] = useState(false);
	const [filter, setFilter] = useState({
		sessionId: parsed?.sessionId || "",
		studentTypeId: parsed?.studentTypeId || "",
		facultyId: parsed?.facultyId || "",
		pageSize: parsed?.pageSize || PAGESIZE.sm
	});
	const [pageNumber, setPageNumber] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [watchData, setWatchData] = useState({
		studentTypeId: parsed?.studentTypeId || ""
	});

	const { push } = useHistory();

	const debounced = useDebouncedCallback(
		(value) => {
			setSearchTerm(value);
		},
		// delay in ms
		SEARCH_DELAY.sm
	);
	const [editData, setEditData] = useState({});
	const { data: sessions, isLoading, error } = useApiGet(getAllSessionsUrl());
	const {
		data: feesToAssign,
		isLoading: isLoadingFeesToAssign,
		isFetching: isFetchingFeesToAssign,
		error: feesToAssignError
	} = useApiGet(
		getAcceptanceFeesUrl({
			sessionId: filter.sessionId,
			studentTypeId: filter.studentTypeId,
			facultyId: filter.facultyId,
			searchTerm,
			pageNumber,
			pageSize: filter.pageSize
		}),
		{
			enabled: !!filter.sessionId,
			keepPreviousData: true,
			refetchOnWindowFocus: false
		}
	);

	const {
		data: serviceTypes,
		isLoading: isLoadingServicesTypes,
		error: servicesTypesError
	} = useApiGet(getServicesTypesUrl());

	const {
		data: studentTypes,
		isLoading: isLoadingStudentTypes,
		error: studentTypeError
	} = useApiGet(getStudentTypesUrl());

	const {
		data: faculties,
		isLoading: isFacultiesLoading,
		error: facultiesError
	} = useApiGet(getFacultiesUrl(watchData?.studentTypeId), {
		refetchOnWindowFocus: false,
		enabled: !!watchData?.studentTypeId
	});

	const {
		control,
		watch,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm();

	const allSessions = useMemo(
		() => formatSelectItems(sessions?.data, "session", "id"),
		[sessions]
	);
	const allStudentTypes = useMemo(
		() => formatSelectItems(studentTypes?.data, "name", "id"),
		[studentTypes]
	);
	const allServiceTypes = useMemo(
		() => formatSelectItems(serviceTypes?.data, "name", "id"),
		[serviceTypes]
	);
	const allFaculties = useMemo(
		() => formatSelectItems(faculties?.data, "name", "id"),
		[faculties]
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
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => (
					<div>
						<Button
							label="Edit"
							buttonClass="standard"
							data-cy="acceptance_fee_edit_button"
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
									departmentId: row.original.departmentId,
									department: row.original.department
								});
								setEditOpen(true);
							}}
						/>
					</div>
				)
			}
		],
		[setEditOpen]
	);

	useEffect(() => {
		const { sessionId, facultyId } = filter;
		// setting this value from watch data to prevent the value resetting anytime the state is upadated
		if (facultyId)
			setValue("facultyId", findValueAndLabel(facultyId, allFaculties));
		if (watchData.studentTypeId)
			setValue(
				"studentTypeId",
				findValueAndLabel(watchData.studentTypeId, allStudentTypes)
			);
		if (sessionId)
			setValue("sessionId", findValueAndLabel(sessionId, allSessions));
	}, [
		allSessions,
		allStudentTypes,
		allFaculties,
		watchData.studentTypeId,
		setValue,
		filter
	]);

	useEffect(() => {
		const subscription = watch(({ studentTypeId }) => {
			setWatchData((state) => ({
				studentTypeId: studentTypeId?.value ?? state.studentTypeId
			}));
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	if (
		error ||
		feesToAssignError ||
		studentTypeError ||
		servicesTypesError ||
		facultiesError
	)
		return "An error has occurred: " + error?.message;
	if (isLoading || isLoadingStudentTypes || isLoadingServicesTypes)
		return <Spinner />;

	return (
		<section>
			<CenteredDialog
				modalId="edit_acceptance_fees"
				isOpen={editOpen}
				closeModal={() => setEditOpen(false)}
				width={705}
				formTitle={`Edit acceptance fees for ${editData?.department}`}
			>
				<EditAcceptanceFee
					data={editData}
					filter={filter}
					closeModal={() => setEditOpen(false)}
					allServiceTypes={allServiceTypes}
					pageNumber={pageNumber}
					searchTerm={searchTerm}
				/>
			</CenteredDialog>
			<CenteredDialog
				modalId="clone_acceptance_fees"
				isOpen={cloneOpen}
				closeModal={() => setCloneOpen(false)}
				width={705}
				formTitle="Clone Acceptance fees Assignment"
			>
				<CloneAcceptanceFeesAssignment
					filter={filter}
					allSessions={allSessions}
					currentFilterState={{ ...filter }}
					paymentPurposeId="Acceptance"
					closeModal={() => setCloneOpen(false)}
				/>
			</CenteredDialog>
			<div className={ContainerStyles.page_content}>
				<ViewAcceptanceFeeForm
					allSessions={allSessions}
					allStudentTypes={allStudentTypes}
					allFaculties={allFaculties}
					isFacultiesLoading={isFacultiesLoading}
					faculties={faculties}
					control={control}
					errors={errors}
					setValue={setValue}
					filter={filter}
					setFilter={setFilter}
					handleSubmit={handleSubmit}
					isLoadingFeesToAssign={isLoadingFeesToAssign}
					pageNumber={pageNumber}
					pageSize={filter?.pageSize}
					searchTerm={searchTerm}
				/>
			</div>
			<div className="d-flex justify-content-end align-items-center px-4 py-3 border">
				<div className="d-flex">
					<Button
						data-cy="view-records"
						type="button"
						buttonClass="standard"
						label="Clone Acceptance Fees"
						onClick={() => setCloneOpen(true)}
					/>
					<Button
						label="Bulk Assignment"
						buttonClass="standard"
						disabled={!feesToAssign?.data.items?.length || isFetchingFeesToAssign}
						onClick={() => {
							push({
								pathname: `/fees_assignment/acceptance_fees/bulk`,
								state: {
									searchParams: parsed,
									filter
								}
							});
						}}
					/>
				</div>

			</div>
			<AcceptanceFeeTable
				data={feesToAssign?.data.items || []}
				setEditOpen={setEditOpen}
				columns={columns}
				loading={isFetchingFeesToAssign}
				debouncedSearch={debounced}
				hasPerformedQuery={!!filter.sessionId}
				paginationProps={feesToAssign?.data?.metaData || {}}
				searchTerm={searchTerm}
				setPageNumber={setPageNumber}
				pageNumber={pageNumber}
			/>
		</section>
	);
};

export default AcceptanceFeeAssignment;

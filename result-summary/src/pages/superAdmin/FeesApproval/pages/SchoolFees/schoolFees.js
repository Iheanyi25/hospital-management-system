import { useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useApiGet, useApiPost } from "../../../../../api/apiCall";
import {
	getFacultiesUrl,
	getAllSessionsUrl,
	getStudentTypesUrl,
	yearOfStudyUrl,
	getSchoolFeesPaymentTypesUrl,
	getApprovalStatusUrl,
	getDepartmentsUrl,
	getSchoolFeesAssignmentApprovalsUrl,
	approveFeeAssignmentUrl
} from "../../../../../api/urls";
import {
	Button,
	Spinner,
	Badge,
	ConfirmationModal
} from "../../../../../ui_elements";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import { ViewSchoolFeesForm, SchoolFeesTable } from "./components";
import ContainerStyles from "../../../CourseManagement/pages/AssignCourse/style.module.css";
import { PAGESIZE, SEARCH_DELAY } from "../../../../../utils/constants";
import { useDebouncedCallback } from "use-debounce/lib";
import numberFormatter from "../../../../../utils/numberFormatter";
import { useQueryClient } from "react-query";

const FIELD_DEFINITIONS = [
	{ key: "department", header: "Department" },
	{ key: "studentMode", header: "Student Mode" },
	{ key: "modeOfEntry", header: "Mode of Entry" },
	{ key: "staffStatus", header: "Staff Status", type: "booleanText" },
	{ key: "paymentType", header: "Payment Type" },
	{ key: "amount", header: "Amount (₦)", type: "money" },
	{ key: "approvalStatus", header: "Approval Status", type: "badge" }
];

const KNOWN_FIELD_KEYS = new Set(FIELD_DEFINITIONS.map((field) => field.key));

function humanizeCommissionKey(key) {
	const label = key
		.replace(/([a-z0-9])([A-Z])/g, "$1 $2")
		.replace(/^./, (char) => char.toUpperCase());
	return `${label} (₦)`;
}

function buildCommissionFields(items) {
	const commissionKeys = new Set();

	items.forEach((item) => {
		Object.keys(item || {}).forEach((key) => {
			if (/Commission$/i.test(key) && !KNOWN_FIELD_KEYS.has(key)) {
				commissionKeys.add(key);
			}
		});
	});

	return Array.from(commissionKeys).map((key) => ({
		key,
		header: humanizeCommissionKey(key),
		type: "money"
	}));
}

const ActionCell = ({ row, filter, queryClient }) => {
	const [approveOpen, setApproveOpen] = useState(false);
	const { mutate: approveFee, isLoading: isApproving } = useApiPost();

	const invalidateQuery = useCallback(() => {
		queryClient.invalidateQueries(getSchoolFeesAssignmentApprovalsUrl(filter));
	}, [filter, queryClient]);

	const handleApprove = useCallback(() => {
		const payload = {
			FeeAssignmentId: [row.original.id]
		};

		approveFee(
			{ url: approveFeeAssignmentUrl(), data: payload },
			{
				onSuccess: () => {
					setApproveOpen(false);
					invalidateQuery();
					const successFlag = window.AJS.flag({
						type: "success",
						title: "Fee assignment approved!",
						body: "You successfully approved this fee assignment"
					});
					setTimeout(() => {
						successFlag.close();
					}, 5000);
				},
				onError: ({ response }) => {
					const errorFlag = window.AJS.flag({
						type: "error",
						title: "Approval Failed!",
						body:
							response?.data?.message ||
							"Fee assignment wasn't approved successfully"
					});
					setTimeout(() => {
						errorFlag.close();
					}, 5000);
				}
			}
		);
	}, [row.original.id, approveFee, invalidateQuery]);

	const isApproved = row.original.approvalStatus?.toLowerCase() === "approved";

	return (
		<div className="d-flex gap-2">
			<ConfirmationModal
				modalId="approve_school_fee"
				isOpen={approveOpen}
				closeModal={() => setApproveOpen(false)}
				handleClick={handleApprove}
				formTitle="Confirm action"
				message={`Are you sure you want to approve ${row.original.department}'s school fees? This action cannot be undone. Once approved, this fee will become immediately visible to students and they can generate invoices.`}
				buttonLabel="Approve fees"
				isDeleteModal={false}
				isLoading={isApproving}
			/>

			<Button
				label="Approve"
				buttonClass="primary"
				disabled={isApproved}
				onClick={() => setApproveOpen(true)}
			/>
		</div>
	);
};

const SchoolFeesAssignmentApproval = () => {
	const [approveAll, setApproveAll] = useState(false);

	const [filter, setFilter] = useState({
		SessionId: "",
		PaymentType: "",
		FacultyId: "",
		Level: "",
		StudentTypeId: "",
		DepartmentId: "",
		ApprovalStatusId: "",
		pageSize: PAGESIZE.sm
	});

	const [pageNumber, setPageNumber] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");

	const debounced = useDebouncedCallback(
		(value) => setSearchTerm(value),
		SEARCH_DELAY.sm
	);

	const queryClient = useQueryClient();

	const { data: sessions, isLoading, error } = useApiGet(getAllSessionsUrl());

	const {
		control,
		watch,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm();

	const selectedStudentTypeId = watch("StudentTypeId")?.value;
	const selectedFacultyId = watch("FacultyId")?.value;

	const {
		data: faculties,
		isLoading: isFacultiesLoading,
		error: facultiesError
	} = useApiGet(getFacultiesUrl(selectedStudentTypeId), {
		refetchOnWindowFocus: false,
		enabled: !!selectedStudentTypeId
	});

	const {
		data: paymentTypes,
		isLoading: isPaymentTypesLoading,
		error: paymenttypesError
	} = useApiGet(getSchoolFeesPaymentTypesUrl());

	const {
		data: studentTypes,
		isLoading: isLoadingStudentTypes,
		error: studentTypeError
	} = useApiGet(getStudentTypesUrl());

	const { data: levels, isLoading: isLoadingLevels } = useApiGet(
		yearOfStudyUrl({ studentTypeId: selectedStudentTypeId }),
		{
			refetchOnWindowFocus: false,
			enabled: !!selectedStudentTypeId
		}
	);

	const {
		data: approvalStatuses,
		isLoading: isLoadingApprovalStatuses,
		error: approvalStatusError
	} = useApiGet(getApprovalStatusUrl(), { refetchOnWindowFocus: false });

	const { data: departments, isLoading: isLoadingDepartments } = useApiGet(
		getDepartmentsUrl(selectedStudentTypeId, selectedFacultyId),
		{
			refetchOnWindowFocus: false,
			enabled: !!(selectedStudentTypeId && selectedFacultyId)
		}
	);

	const feesQueryParams = useMemo(
		() => ({
			SessionId: filter.SessionId,
			SchoolFeesPaymentType: filter.PaymentType,
			FacultyId: filter.FacultyId,
			DepartmentId: filter.DepartmentId,
			LevelId: filter.Level,
			StudentTypeId: filter.StudentTypeId,
			ApprovalStatus: filter.ApprovalStatusId,
			searchTerm,
			pageNumber,
			pageSize: filter.pageSize
		}),
		[filter, searchTerm, pageNumber]
	);

	const {
		data: feesToAssign,
		isFetching: isFetchingFeesToAssign,
		error: feesToAssignError
	} = useApiGet(getSchoolFeesAssignmentApprovalsUrl(feesQueryParams), {
		enabled: !!filter.SessionId && !!filter.PaymentType,
		keepPreviousData: true,
		refetchOnWindowFocus: false
	});

	const { mutate: approveAllMutate, isLoading: isApprovingAll } = useApiPost();

	const allSessions = formatSelectItems(sessions?.data, "session", "id");
	const allPaymentTypes = formatSelectItems(paymentTypes?.data, "name", "id");
	const allFaculties = formatSelectItems(faculties?.data, "name", "id");
	const allStudentTypes = formatSelectItems(studentTypes?.data, "name", "id");
	const allLevels = formatSelectItems(levels?.data, "name", "id");
	const allApprovalStatuses = formatSelectItems(
		approvalStatuses?.data,
		"name",
		"id"
	);
	const allDepartments = formatSelectItems(
		departments?.data,
		"department",
		"departmentId"
	);

	const feeItems = feesToAssign?.data?.items;

	const columns = useMemo(() => {
		const items = feeItems || [];

		const visibleStaticFields = FIELD_DEFINITIONS.filter((field) =>
			items.some(
				(item) => item[field.key] !== null && item[field.key] !== undefined
			)
		);
		const commissionFields = buildCommissionFields(items);

		const approvalStatusIndex = visibleStaticFields.findIndex(
			(field) => field.key === "approvalStatus"
		);
		const visibleFields =
			approvalStatusIndex === -1
				? [...visibleStaticFields, ...commissionFields]
				: [
						...visibleStaticFields.slice(0, approvalStatusIndex),
						...commissionFields,
						...visibleStaticFields.slice(approvalStatusIndex)
				  ];

		const fieldColumns = visibleFields.map((field) => {
			if (field.type === "money") {
				return {
					Header: field.header,
					accessor: field.key,
					Cell: ({ cell: { row } }) => (
						<div>{numberFormatter(row.original[field.key])}</div>
					)
				};
			}

			if (field.type === "booleanText") {
				return {
					Header: field.header,
					accessor: field.key,
					Cell: ({ cell: { row } }) => (
						<div>{row.original[field.key] ? "True" : "False"}</div>
					)
				};
			}

			if (field.type === "badge") {
				return {
					Header: field.header,
					accessor: field.key,
					Cell: ({ cell: { row } }) => (
						<div>
							<Badge
								item={{
									type:
										row.original.approvalStatus?.toLowerCase() ===
										"pending"
											? "warning"
											: "success",
									title:
										row.original.approvalStatus?.toLowerCase() ===
										"pending"
											? "Pending approval"
											: "Approved"
								}}
							/>
						</div>
					)
				};
			}

			return {
				Header: field.header,
				accessor: field.key,
				Cell: ({ cell: { row } }) => (
					<div>{row.original[field.key] ?? "-"}</div>
				)
			};
		});

		return [
			...fieldColumns,
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => (
					<ActionCell
						row={row}
						filter={feesQueryParams}
						queryClient={queryClient}
					/>
				)
			}
		];
	}, [feeItems, feesQueryParams, queryClient]);

	const handleApproveAll = useCallback(() => {
		const payload = {
			FeeAssignmentId: feeItems
				?.filter((item) => item.approvalStatus?.toLowerCase() === "pending")
				.map((x) => x.id)
		};

		approveAllMutate(
			{ url: approveFeeAssignmentUrl(), data: payload },
			{
				onSuccess: () => {
					setApproveAll(false);
					queryClient.invalidateQueries(
						getSchoolFeesAssignmentApprovalsUrl(feesQueryParams)
					);
					const successFlag = window.AJS.flag({
						type: "success",
						title: "Fee assignments approved!",
						body: "You successfully approved the selected fee assignments"
					});
					setTimeout(() => {
						successFlag.close();
					}, 5000);
				},
				onError: ({ response }) => {
					const errorFlag = window.AJS.flag({
						type: "error",
						title: "Approval Failed!",
						body:
							response?.data?.message ||
							"Fee assignments weren't approved successfully"
					});
					setTimeout(() => {
						errorFlag.close();
					}, 5000);
				}
			}
		);
	}, [feeItems, approveAllMutate, queryClient, feesQueryParams]);

	if (
		isLoading ||
		isPaymentTypesLoading ||
		isLoadingStudentTypes ||
		isLoadingApprovalStatuses
	)
		return <Spinner />;

	if (
		error ||
		studentTypeError ||
		paymenttypesError ||
		facultiesError ||
		feesToAssignError ||
		approvalStatusError
	) {
		const firstError =
			error ||
			studentTypeError ||
			paymenttypesError ||
			facultiesError ||
			feesToAssignError ||
			approvalStatusError;
		return "An error has occurred: " + firstError?.message;
	}

	return (
		<section>
			<ConfirmationModal
				modalId="approve_all_school_fees"
				isOpen={approveAll}
				closeModal={() => setApproveAll(false)}
				handleClick={handleApproveAll}
				formTitle="Confirm action"
				message={`Are you sure you want to approve these ${
					feeItems?.filter(
						(item) => item.approvalStatus?.toLowerCase() === "pending"
					).length || 0
				} fee assignments? This action cannot be undone. Once approved, students in all affected departments will be able to see these fees and generate invoices.`}
				buttonLabel="Approve fees"
				isDeleteModal={false}
				isLoading={isApprovingAll}
			/>

			<div className={ContainerStyles.page_content}>
				<ViewSchoolFeesForm
					allSessions={allSessions}
					allFaculties={allFaculties}
					isFacultiesLoading={isFacultiesLoading}
					setFilter={setFilter}
					setValue={setValue}
					isLoadingLevels={isLoadingLevels}
					allLevels={allLevels}
					allPaymentTypes={allPaymentTypes}
					allStudentTypes={allStudentTypes}
					allDepartments={allDepartments}
					isLoadingDepartments={isLoadingDepartments}
					allApprovalStatuses={allApprovalStatuses}
					isLoadingApprovalStatuses={isLoadingApprovalStatuses}
					control={control}
					handleSubmit={handleSubmit}
					isFetchingFeesToAssign={isFetchingFeesToAssign}
					errors={errors}
				/>
			</div>

			<div className="d-flex justify-content-end px-4 py-3">
				<Button
					data-cy="approve_all_fees"
					type="button"
					buttonClass="standard"
					label="Approve all fees"
					onClick={() => setApproveAll(true)}
					disabled={
						!feeItems ||
						feeItems.filter(
							(item) => item.approvalStatus?.toLowerCase() === "pending"
						)?.length === 0
					}
				/>
			</div>

			<SchoolFeesTable
				data={feeItems || []}
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

export default SchoolFeesAssignmentApproval;

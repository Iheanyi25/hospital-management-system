import { useState } from "react";
import { useForm } from "react-hook-form";
import { useApiGet } from "../../../../../api/apiCall";
import {
	getFacultiesUrl,
	getSessionsUrl,
	getSchoolFeesPaymentTypesUrl,
	getPGYearOfStudyUrl,
	getPGFeeAssignmentsUrl,
	getPGStudentTypesUrl
} from "../../../../../api/urls";
import { Spinner, CenteredDialog } from "../../../../../ui_elements";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import {
	EditSchoolFees,
	ViewSchoolFeesForm,
	SchoolFeesTable
} from "./components";
import ContainerStyles from "../../../CourseManagement/pages/AssignCourse/style.module.css";
import { useDebouncedCallback } from "use-debounce";
import { PAGESIZE, SEARCH_DELAY } from "../../../../../utils/constants";

const PGSchoolFeesAssignment = () => {
	const [editOpen, setEditOpen] = useState(false);
	const [pageNumber, setPageNumber] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const debounced = useDebouncedCallback(
		(value) => {
			setSearchTerm(value);
		},
		// delay in ms
		SEARCH_DELAY.sm
	);

	const [filter, setFilter] = useState({
		studentTypeId: "",
		sessionId: "",
		level: "",
		paymentType: "",
		facultyId: "",
		pageSize: PAGESIZE.sm
	});
	const [editData, setEditData] = useState({});
	const { data: sessions, isLoading, error } = useApiGet(getSessionsUrl());

	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: {
			paymentType: {
				value: 1,
				label: "Full"
			}
		}
	});

	const {
		data: faculties,
		isLoading: isFacultiesLoading,
		error: facultiesError
	} = useApiGet(getFacultiesUrl());

	const {
		data: studentTypes,
		isLoading: isLoadingStudentTypes,
		error: studentTypeError
	} = useApiGet(getPGStudentTypesUrl(), {
		refetchOnWindowFocus: false
	});
	const {
		data: paymentTypes,
		isLoading: isPaymentTypesLoading,
		error: paymentTypesError
	} = useApiGet(getSchoolFeesPaymentTypesUrl(), {
		refetchOnWindowFocus: false
	});
	const { data: levels, isLoading: isLoadingLevels } = useApiGet(
		getPGYearOfStudyUrl(),
		{
			refetchOnWindowFocus: false
		}
	);
	const {
		data: feesToAssign,
		isLoading: isLoadingFeesToAssign,
		isFetching: isFetchingFeesToAssign,
		error: feesToAssignError
	} = useApiGet(
		getPGFeeAssignmentsUrl({ ...filter, pageNumber, searchTerm }),
		{
			enabled: !!filter.paymentType,
			keepPreviousData: true
		}
	);

	const allSessions = formatSelectItems(sessions?.data, "session", "id");
	const allPaymentTypes = formatSelectItems(
		paymentTypes?.data,
		"name",
		"name"
	);
	const allFaculties = formatSelectItems(faculties?.data, "name", "id");
	const allStudentTypes = formatSelectItems(studentTypes?.data, "name", "id");
	const allLevels = formatSelectItems(levels?.data, "name", "id");

	if (
		isLoading ||
		isFacultiesLoading ||
		isPaymentTypesLoading ||
		isLoadingStudentTypes
	)
		return <Spinner />;
	if (
		error ||
		studentTypeError ||
		paymentTypesError ||
		facultiesError ||
		feesToAssignError
	)
		return "An error has occurred: " + error?.message;

	return (
		<section>
			<CenteredDialog
				modalId="edit_school_fees"
				isOpen={editOpen}
				closeModal={() => setEditOpen(false)}
				width={705}
				formTitle="Edit school fees"
			>
				<EditSchoolFees
					data={editData}
					filter={filter}
					currentFilterState={{ ...filter, pageNumber, searchTerm }}
					closeModal={() => setEditOpen(false)}
				/>
			</CenteredDialog>
			<div className={ContainerStyles.page_content}>
				<ViewSchoolFeesForm
					allSessions={allSessions}
					allFaculties={allFaculties}
					setFilter={setFilter}
					filter={filter}
					isLoadingLevels={isLoadingLevels}
					levels={levels}
					allLevels={allLevels}
					allPaymentTypes={allPaymentTypes}
					allStudentTypes={allStudentTypes}
					control={control}
					handleSubmit={handleSubmit}
					isLoadingFeesToAssign={isLoadingFeesToAssign}
					errors={errors}
				/>
			</div>
			<SchoolFeesTable
				data={feesToAssign?.data.items || []}
				hasPerformedQuery={!!filter.studentTypeId}
				paginationProps={feesToAssign?.data?.metaData || {}}
				pageNumber={pageNumber}
				pageSize={filter.pageSize}
				setPageNumber={setPageNumber}
				debouncedSearch={debounced}
				setEditData={setEditData}
				searchValue={searchTerm}
				loading={isFetchingFeesToAssign}
				setEditOpen={setEditOpen}
			/>
		</section>
	);
};

export default PGSchoolFeesAssignment;

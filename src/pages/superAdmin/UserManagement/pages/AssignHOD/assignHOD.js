import { useState } from "react";
import { useForm } from "react-hook-form";
import { useApiGet } from "../../../../../api/apiCall";
import {
	getAllHODsUrl,
	getAllSessionsUrl,
	getFacultiesUrl,
	getStudentTypesUrl
} from "../../../../../api/urls";
import { Spinner, CenteredDialog } from "../../../../../ui_elements";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import { EditHOD, Form, Table } from "./components";
import ContainerStyles from "../../../CourseManagement/pages/AssignCourse/style.module.css";
import { PAGESIZE, SEARCH_DELAY } from "../../../../../utils/constants";
import { useDebouncedCallback } from "use-debounce";

const AssignHOD = () => {
	
	const [searchTerm, setSearchTerm] = useState("");
	const debounced = useDebouncedCallback(
		(value) => {
			setSearchTerm(value);
		},
		// delay in ms
		SEARCH_DELAY.sm
	);
	const [editOpen, setEditOpen] = useState(false);
	const [filter, setFilter] = useState({
		sessionId: "",
		facultyId: "",
		pageSize: PAGESIZE.sm,
		pageNumber: 1
	});
	const [editData, setEditData] = useState({});
	const {
		control,
		watch,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm();

	const watchData = watch({
		studentTypeId: "studentTypeId"
	});
	const { data: studentTypes, isLoading: isLoadingStudentTypes } = useApiGet(
		getStudentTypesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const {
		data: faculties,
		isLoading: isLoadingFaculties,
		error
	} = useApiGet(getFacultiesUrl(watchData?.studentTypeId?.value), {
		enabled: !!watchData?.studentTypeId?.value,
		refetchOnWindowFocus: false
	});
	const {
		data: sessions,
		isLoading: isLoadingSessions,
		error: sessionError
	} = useApiGet(getAllSessionsUrl(), {
		refetchOnWindowFocus: false
	});
	const {
		data: hods,
		isLoading: isLoadingHods,
		isFetching: isFetchingHods
	} = useApiGet(getAllHODsUrl({ ...filter, pageNumber: filter.pageNumber, searchTerm }), {
		enabled: !!filter.sessionId,
		keepPreviousData: true
	});

	const allFaculties = formatSelectItems(faculties?.data, "name", "id");
	const allSessions = formatSelectItems(sessions?.data, "session", "id");
	const allStudentTypes = formatSelectItems(studentTypes?.data, "name", "id");

	if (isLoadingSessions || isLoadingStudentTypes) return <Spinner />;
	if (error || sessionError)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<section>
			<CenteredDialog
				modalId="edit_hod"
				isOpen={editOpen}
				closeModal={() => setEditOpen(false)}
				width={705}
				formTitle="Head of Department"
			>
				<EditHOD
					data={editData}
					filter={filter}
					currentState={{ ...filter, pageNumber: filter.pageNumber, searchTerm }}
					closeModal={() => setEditOpen(false)}
				/>
			</CenteredDialog>
			<div className={ContainerStyles.page_content}>
				<Form
					allFaculties={allFaculties}
					allSessions={allSessions}
					allStudentTypes={allStudentTypes}
					control={control}
					errors={errors}
					filter={filter}
					setFilter={setFilter}
					setValue={setValue}
					handleSubmit={handleSubmit}
					isLoadingFeesToAssign={isLoadingHods}
					isLoadingFaculties={isLoadingFaculties}
				/>
			</div>
			<Table
				data={hods?.data?.items || []}
				setEditData={setEditData}
				paginationProps={hods?.data?.metaData || {}}
				setPageNumber={(page) => setFilter(prev => ({ ...prev, pageNumber: page }))}
				debouncedSearch={debounced}
				pageNumber={filter.pageNumber}
				hasPerformedQuery={!!filter.sessionId}
				pageSize={filter.pageSize}
				searchValue={searchTerm}
				loading={isFetchingHods}
				setEditOpen={setEditOpen}
			/>
		</section>
	);
};

export default AssignHOD;

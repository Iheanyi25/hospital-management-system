import { useState } from "react";
import { useForm } from "react-hook-form";
import { useApiGet } from "../../../../../api/apiCall";
import { getAllDeansUrl, getAllSessionsUrl } from "../../../../../api/urls";
import { Spinner, CenteredDialog } from "../../../../../ui_elements";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import { EditDean, Form, Table } from "./components";
import ContainerStyles from "../../../CourseManagement/pages/AssignCourse/style.module.css";
import { PAGESIZE, SEARCH_DELAY } from "../../../../../utils/constants";
import { useDebouncedCallback } from "use-debounce";

const AssignDean = () => {
	// const [pageNumber, setPageNumber] = useState(1);
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
		pageSize: PAGESIZE.sm,
		pageNumber: 1
	});
	const [editData, setEditData] = useState({});
	const {
		data: sessions,
		isLoading: isLoadingSessions,
		error: sessionError
	} = useApiGet(getAllSessionsUrl(), {
		refetchOnWindowFocus: false
	});
	const {
		data: deans,
		isLoading: isLoadingDeans,
		isFetching: isFetchingDeans
	} = useApiGet(getAllDeansUrl({ ...filter, pageNumber: filter.pageNumber, searchTerm }), {
		enabled: !!filter.sessionId,
		keepPreviousData: true
	});
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm();
	const allSessions = formatSelectItems(sessions?.data, "session", "id");

	if (isLoadingSessions) return <Spinner />;
	if (sessionError)
		return (
			"An error has occurred: " + sessionError?.response?.data?.message
		);
	return (
		<section>
			<CenteredDialog
				modalId="edit_dean"
				isOpen={editOpen}
				closeModal={() => setEditOpen(false)}
				width={705}
				formTitle="Dean"
			>
				<EditDean
					data={editData}
					filter={filter}
					currentState={{ ...filter, pageNumber:filter.pageNumber, searchTerm }}
					closeModal={() => setEditOpen(false)}
				/>
			</CenteredDialog>
			<div className={ContainerStyles.page_content}>
				<Form
					allSessions={allSessions}
					control={control}
					errors={errors}
					filter={filter}
					setFilter={setFilter}
					handleSubmit={handleSubmit}
					isLoadingFeesToAssign={isLoadingDeans}
				/>
			</div>
			<Table
				data={deans?.data?.items || []}
				setEditData={setEditData}
				paginationProps={deans?.data?.metaData || {}}
				setPageNumber={(page) => setFilter(prev => ({ ...prev, pageNumber: page }))}
				debouncedSearch={debounced}
				pageNumber={filter.pageNumber}
				hasPerformedQuery={!!filter.sessionId}
				pageSize={filter.pageSize}
				searchValue={searchTerm}
				loading={isFetchingDeans}
				setEditOpen={setEditOpen}
			/>
		</section>
	);
};

export default AssignDean;

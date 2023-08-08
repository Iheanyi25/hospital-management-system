import { CenteredDialog, Spinner } from "../../../../../ui_elements";
import styles from "./style.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useApiGet } from "../../../../../api/apiCall";
import {
	getFacultiesUrl,
	yearOfStudyUrl,
	getStudentTypesUrl,
	getUnitLoadsToManageUrl,
	getStudentModeOfEntryUrl
} from "../../../../../api/urls";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import {
	EditUnitLoad,
	ManageUnitLoadForm,
	ManageUnitLoadTable
} from "./components";
import { PAGESIZE } from "../../../../../utils/constants";

const ManageUnitLoad = () => {
	const [editOpen, setEditOpen] = useState(false);
	const [editData, setEditData] = useState({});
	const [filter, setFilter] = useState({
		facultyId: "",
		studentModeOfEntryId: "",
		studentTypeId: "",
		sessionId: "",
		semester: "",
		yearOfStudyId: "",
		searchTerm: "",
		pageSize: PAGESIZE.sm
	});

	const [pageNumber, setPageNumber] = useState(1);
	const {
		data: unitLoads,
		isLoading: isLoadingUnitLoads,
		isFetching: isFetchingUnitLoads,
		error: unitLoadsError
	} = useApiGet(
		getUnitLoadsToManageUrl({
			facultyId: filter.facultyId,
			studentModeOfEntryId: filter.studentModeOfEntryId,
			studentTypeId: filter.studentTypeId,
			semesterId: filter.semester,
			levelId: filter.yearOfStudyId,
			searchTerm: filter.searchTerm,
			pageSize: PAGESIZE.sm,
			pageNumber
		}),
		{
			enabled: !!filter.facultyId,
			keepPreviousData: true
		}
	);
	const { data: studentTypes, isLoading: isLoadingStudentTypes } = useApiGet(
		getStudentTypesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);
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
	const {
		data: faculties,
		isLoading: isLoadingFaculties,
		error
	} = useApiGet(getFacultiesUrl(watchData?.studentTypeId?.value), {
		refetchOnWindowFocus: false,
		enabled: !!watchData?.studentTypeId?.value
	});
	const { data: studentModes, isLoading: isLoadingStudentModes } = useApiGet(
		getStudentModeOfEntryUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const { data: levels, isLoading: isLoadingLevels } = useApiGet(
		yearOfStudyUrl({ studentTypeId: watchData?.studentTypeId?.value }),
		{
			refetchOnWindowFocus: false,
			enabled: !!watchData?.studentTypeId?.value
		}
	);
	const allFaculties = formatSelectItems(faculties?.data, "name", "id");
	const allStudentModes = formatSelectItems(studentModes?.data, "name", "id");
	const allStudentTypes = formatSelectItems(studentTypes?.data, "name", "id");
	const allLevels = formatSelectItems(levels?.data, "name", "id");

	if (isLoadingStudentModes || isLoadingStudentTypes || unitLoadsError)
		return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<div className={styles.container}>
			<CenteredDialog
				modalId="edit_course"
				isOpen={editOpen}
				closeModal={() => setEditOpen(false)}
				width={705}
				formTitle="Edit unit load"
			>
				<EditUnitLoad
					data={editData}
					filter={filter}
					currentFilterState={{ ...filter, pageNumber }}
					closeModal={() => setEditOpen(false)}
				/>
			</CenteredDialog>
			<div className={styles.page_content}>
				<div className="w-100">
					<ManageUnitLoadForm
						control={control}
						errors={errors}
						allFaculties={allFaculties}
						isLoadingFaculties={isLoadingFaculties}
						allStudentModes={allStudentModes}
						allStudentTypes={allStudentTypes}
						isLoadingLevels={isLoadingLevels}
						levels={levels}
						allLevels={allLevels}
						data={unitLoads?.data?.items}
						setFilter={setFilter}
						setValue={setValue}
						handleSubmit={handleSubmit}
						isLoadingUnitLoads={isLoadingUnitLoads}
					/>
					<ManageUnitLoadTable
						data={unitLoads?.data?.items || []}
						setEditOpen={setEditOpen}
						setEditData={setEditData}
						paginationProps={unitLoads?.data?.metaData || {}}
						setPageNumber={setPageNumber}
						setFilter={setFilter}
						pageNumber={pageNumber}
						pageSize={filter.pageSize}
						loading={isFetchingUnitLoads}
					/>
				</div>
			</div>
		</div>
	);
};

export default ManageUnitLoad;

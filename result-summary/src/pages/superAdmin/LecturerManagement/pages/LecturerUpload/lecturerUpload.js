import {
	CenteredDialog,
	Spinner,
	PageTitle,
	Button
} from "../../../../../ui_elements";
import styles from "./style.module.css";
import { useState } from "react";
import { useApiGet } from "../../../../../api/apiCall";
import {
	getLecturersUrl,
	getGendersUrl,
	getStudentTypesUrl
} from "../../../../../api/urls";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import { EditLecturer, LecturerTable } from "./components";
import { PAGESIZE, SEARCH_DELAY } from "../../../../../utils/constants";
import { useDebouncedCallback } from "use-debounce";
import { UploadContainer } from "./components/UploadLecturerList";

const LecturerUpload = () => {
	const [open, setOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [editData, setEditData] = useState({});
	const pageSize = PAGESIZE.sm;
	const [pageNumber, setPageNumber] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [currentId, setCurrentId] = useState(null);

	const debounced = useDebouncedCallback((value) => {
		setSearchTerm(value);
	}, SEARCH_DELAY.sm);

	const {
		data: lecturerList,
		isFetching: isFetchinglecturerList,
		error: lecturerListError
	} = useApiGet(getLecturersUrl({ pageNumber, searchTerm, pageSize }), {
		keepPreviousData: true
	});

	const { data: genderList, isLoading: genderListLoading } = useApiGet(
		getGendersUrl()
	);
	const { data: studentTypes, isLoading: isLoadingStudentTypes } = useApiGet(
		getStudentTypesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const allStudentTypes = formatSelectItems(studentTypes?.data, "name", "id");
	if (genderListLoading || isLoadingStudentTypes) return <Spinner />;
	if (lecturerListError)
		return (
			"An error has occurred: " +
			lecturerListError?.response?.data?.message
		);
	return (
		<div className={styles.container}>
			<CenteredDialog
				modalId="add_course"
				isOpen={open}
				closeModal={() => setOpen(false)}
				width={705}
				formTitle="Upload Lecturer"
			>
				<UploadContainer
					setUploadModal={setOpen}
					allStudentTypes={allStudentTypes}
					currentFilterState={{ pageNumber, searchTerm, pageSize }}
					genderList={genderList?.data}
				/>
			</CenteredDialog>
			<CenteredDialog
				modalId="edit_course"
				isOpen={editOpen}
				closeModal={() => setEditOpen(false)}
				width={705}
				formTitle="Edit lecturer"
			>
				<EditLecturer
					data={editData}
					currentFilterState={{ pageNumber, searchTerm, pageSize }}
					allStudentTypes={allStudentTypes}
					closeModal={() => setEditOpen(false)}
					currentId={currentId}
					genderList={genderList?.data}
				/>
			</CenteredDialog>
			<div className={styles.page_content}>
				<div className="w-100">
					<PageTitle
						title={"Manage Lecturer"}
						buttonGroup={
							<Button
								onClick={() => setOpen(true)}
								buttonClass="primary"
								label="Upload Lecturer"
							/>
						}
					/>
					<div className="mt-5">
						<LecturerTable
							data={lecturerList?.data?.items || []}
							setOpen={setOpen}
							setEditOpen={setEditOpen}
							setEditData={setEditData}
							paginationProps={lecturerList?.data?.metaData || {}}
							setPageNumber={setPageNumber}
							debouncedSearch={debounced}
							pageNumber={pageNumber}
							pageSize={pageSize}
							searchValue={searchTerm}
							loading={isFetchinglecturerList}
							setCurrentId={setCurrentId}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LecturerUpload;

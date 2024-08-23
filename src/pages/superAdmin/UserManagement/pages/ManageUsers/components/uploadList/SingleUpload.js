import SingleUploadForm from "./SingleUploadForm";

export const SingleUpload = ({
	allDepartments,
	allStudentTypes,
	filter,
	pageNumber,
	searchTerm,
	pageSize,
	setUploadModal,
	currentFilterState,
	genderList
}) => {
	
	return (
		<SingleUploadForm
			allDepartments={allDepartments}
			allStudentTypes={allStudentTypes}
			currentFilterState={currentFilterState}
			filter={filter}
			pageNumber={pageNumber}
			searchTerm={searchTerm}
			pageSize={pageSize}
			setUploadModal={setUploadModal}
			genderList={genderList}
		/>
	);
};

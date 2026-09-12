import Tabs, { Tab, TabList, TabPanel } from "@atlaskit/tabs";
import { SingleUpload, BulkUpload } from ".";

export const UploadContainer = ({
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
		<Tabs id="default">
			<div className="mt-3">
				<TabList>
					<Tab>Single upload</Tab>
					<Tab>Bulk upload</Tab>
				</TabList>
			</div>
			<TabPanel>
				<SingleUpload
					allDepartments={allDepartments}
					allStudentTypes={allStudentTypes}
					filter={filter}
					pageNumber={pageNumber}
					searchTerm={searchTerm}
					pageSize={pageSize}
					setUploadModal={setUploadModal}
					currentFilterState={currentFilterState}
					genderList={genderList}
				/>
			</TabPanel>
			<TabPanel>
				<BulkUpload
					allDepartments={allDepartments}
					allStudentTypes={allStudentTypes}
					filter={filter}
					pageNumber={pageNumber}
					searchTerm={searchTerm}
					pageSize={pageSize}
					setUploadModal={setUploadModal}
				/>
			</TabPanel>
		</Tabs>
	);
};

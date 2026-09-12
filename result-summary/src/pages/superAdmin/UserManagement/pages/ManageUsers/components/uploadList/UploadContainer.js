import Tabs, { Tab, TabList, TabPanel } from "@atlaskit/tabs";
import { BulkUpload } from ".";
import { AddUser } from "../addUser";

export const UploadContainer = ({
	allDepartments,
	allStudentTypes,
	setUploadModal,
	allRoles,
	allGenders,
	allCampuses,
	closeModal,
	currentFilterState
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
				<AddUser
					allRoles={allRoles}
					allDepartments={allDepartments}
					allGenders={allGenders}
					allCampuses={allCampuses}
					allStudentTypes={allStudentTypes}
					currentFilterState={currentFilterState}
					closeModal={closeModal}
				/>
			</TabPanel>
			<TabPanel>
				<BulkUpload
					allRoles={allRoles}
					allDepartments={allDepartments}
					allStudentTypes={allStudentTypes}
					setUploadModal={setUploadModal}
					currentFilterState={currentFilterState}
				/>
			</TabPanel>
		</Tabs>
	);
};

import Tabs, { Tab, TabList, TabPanel } from "@atlaskit/tabs";
import { SingleUpload, BulkUpload } from "./";

export const UploadAdmissionList = ({
	allAdmissionTypes,
	filter,
	pageNumber,
	searchTerm,
	pageSize,setUploadModal
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
					allAdmissionTypes={allAdmissionTypes}
					filter={filter}
					pageNumber={pageNumber}
					searchTerm={searchTerm}
					pageSize={pageSize}
                    setUploadModal={setUploadModal}
				/>
			</TabPanel>
			<TabPanel>
				<BulkUpload
					allAdmissionTypes={allAdmissionTypes}
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

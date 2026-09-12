import Tabs, { Tab, TabList, TabPanel } from "@atlaskit/tabs";
import { BulkUpload, SingleUpload } from "..";

export const UploadFaculty = ({ currentFilterState, setUploadModal }) => {
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
					currentFilterState={currentFilterState}
					setUploadModal={setUploadModal}
				/>
			</TabPanel>
			<TabPanel>
				<BulkUpload
					setUploadModal={setUploadModal}
					currentFilterState={currentFilterState}
				/>
			</TabPanel>
		</Tabs>
	);
};

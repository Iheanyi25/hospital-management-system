import Tabs, { TabPanel } from "@atlaskit/tabs";
import { BulkUpload } from "./";

export const UploadCourse = ({ currentFilterState, setUploadModal }) => {
	return (
		<Tabs id="default">
			<div className="mt-3"></div>
			<TabPanel>
				<BulkUpload
					setUploadModal={setUploadModal}
					currentFilterState={currentFilterState}
				/>
			</TabPanel>
		</Tabs>
	);
};

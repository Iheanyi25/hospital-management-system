import Tabs from "@atlaskit/tabs";
import { BulkUpload } from ".";

export const UploadList = ({ currentFilterState, setUploadModal }) => {
	return (
		<Tabs id="default">
			<BulkUpload
				setUploadModal={setUploadModal}
				currentFilterState={currentFilterState}
			/>
		</Tabs>
	);
};

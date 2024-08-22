import Tabs from "@atlaskit/tabs";
import { BulkUpload } from ".";

export const UploadList = ({
	currentFilterState,
	setUploadModal,
	getValues
}) => {
	return (
		<Tabs id="default">
			<BulkUpload
				setUploadModal={setUploadModal}
				getValues={getValues}
				currentFilterState={currentFilterState}
			/>
		</Tabs>
	);
};

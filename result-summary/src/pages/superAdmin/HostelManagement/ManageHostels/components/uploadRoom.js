import Tabs, { Tab, TabList, TabPanel } from "@atlaskit/tabs";
import { BulkUpload, SingleUpload } from ".";

export const UploadRoom = ({
	state,
	filter,
	setUploadModal,
	allGenders,
	allLevels,
	allCategories,
	allActivationStatuses
}) => {
	return (
		<Tabs id="default">
			<div className="mt-3">
				<TabList>
					<Tab>Create Single</Tab>
					<Tab>Bulk Create</Tab>
				</TabList>
			</div>
			<TabPanel>
				<SingleUpload
					state={state}
					filter={filter}
					setUploadModal={setUploadModal}
					allGenders={allGenders}
					allLevels={allLevels}
					allCategories={allCategories}
					allActivationStatuses={allActivationStatuses}
					/>
			</TabPanel>
			<TabPanel>
				<BulkUpload
					state={state}
					setUploadModal={setUploadModal}
					filter={filter}
					allGenders={allGenders}
					allLevels={allLevels}
					allCategories={allCategories}
					allActivationStatuses={allActivationStatuses}
				/>
			</TabPanel>
		</Tabs>
	);
};

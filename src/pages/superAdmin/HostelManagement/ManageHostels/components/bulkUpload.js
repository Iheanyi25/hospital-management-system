import { useEffect, useState } from "react";
import { RoomPreview, RoomBulkUpload } from ".";
import { ExcelRenderer } from "react-excel-renderer";

export const BulkUpload = ({
	setUploadModal,
	currentFilterState,
	state,
	allGenders,
	allLevels,
	allCategories,
	allActivationStatuses
}) => {
	const [fileData, setFileData] = useState(null);
	const [submitData, setSubmitData] = useState({})
	const [extractedData, setExtractedData] = useState({});
	const [uploaded, setUploaded] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (fileData) {
			ExcelRenderer(fileData, (err, resp) => {
				if (err) {
					setError(err);
				} else {
					setExtractedData({
						cols: resp.cols,
						rows: resp.rows
					});
				}
			});
		}
	}, [fileData]);

	if (error) return <div>Failed to extract data from excel sheet</div>;
	return (
		<div className="d-block w-100 mt-5">
			{!uploaded ? (
				<RoomBulkUpload
					setUploaded={setUploaded}
					state={state}
					uploaded={uploaded}
					setFileData={setFileData}
					setSubmitData={setSubmitData}
					allGenders={allGenders}
					allLevels={allLevels}
					allCategories={allCategories}
					allActivationStatuses={allActivationStatuses}
				/>
			) : (
				<RoomPreview
					setUploaded={setUploaded}
					state={state}
					fileData={fileData}
					submitData={submitData}
					extractedData={extractedData}
					setUploadModal={setUploadModal}
					currentFilterState={currentFilterState}
				/>
			)}
		</div>
	);
};

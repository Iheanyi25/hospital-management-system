import { useEffect, useState } from "react";
import { ExcelRenderer } from "react-excel-renderer";
import { ListPreview } from "./listPreview";
import { ListUpload } from "./listUpload";

export const BulkUpload = ({ setUploadModal, currentFilterState }) => {
	const [fileDataPayload, setFileDataPayload] = useState({
		sessionId: null,
		fileData: null
	});
	const [extractedData, setExtractedData] = useState({});
	const [uploaded, setUploaded] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (fileDataPayload.fileData) {
			ExcelRenderer(fileDataPayload.fileData, (err, resp) => {
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
	}, [fileDataPayload]);

	if (error) return <div>Failed to extract data from excel sheet</div>;
	return (
		<div className="d-block w-100 mt-5">
			{!uploaded ? (
				<ListUpload
					setUploaded={setUploaded}
					setFileDataPayload={setFileDataPayload}
				/>
			) : (
				<ListPreview
					setUploaded={setUploaded}
					fileDataPayload={fileDataPayload}
					extractedData={extractedData}
					setUploadModal={setUploadModal}
					currentFilterState={currentFilterState}
				/>
			)}
		</div>
	);
};

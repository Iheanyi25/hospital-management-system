import { useEffect, useState } from "react";
import { FeesPreview, FeesUpload } from ".";
import { ExcelRenderer } from "react-excel-renderer";

export const BulkUpload = ({ currentFilterState, departments }) => {
	const [fileData, setFileData] = useState(null);
	const [extractedData, setExtractedData] = useState({});
	const [uploaded, setUploaded] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (fileData) {
			ExcelRenderer(fileData?.file, (err, resp) => {
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
				<FeesUpload
					setUploaded={setUploaded}
					uploaded={uploaded}
					setFileData={setFileData}
				/>
			) : (
				<FeesPreview
					setUploaded={setUploaded}
					fileData={fileData}
					extractedData={extractedData}
					currentFilterState={currentFilterState}
					departments={departments}
				/>
			)}
		</div>
	);
};

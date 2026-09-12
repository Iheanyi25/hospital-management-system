import { useEffect, useState } from "react";
import { OptionsPreview, OptionstUpload } from "..";
import { ExcelRenderer } from "react-excel-renderer";

export const BulkUpload = ({ setUploadModal, currentFilterState }) => {
	const [fileData, setFileData] = useState(null);
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
				<OptionstUpload
					setUploaded={setUploaded}
					uploaded={uploaded}
					setFileData={setFileData}
				/>
			) : (
				<OptionsPreview
					setUploaded={setUploaded}
					fileData={fileData}
					extractedData={extractedData}
					setUploadModal={setUploadModal}
					currentFilterState={currentFilterState}
				/>
			)}
		</div>
	);
};

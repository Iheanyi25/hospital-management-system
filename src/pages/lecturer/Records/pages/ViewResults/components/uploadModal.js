import { useState } from "react";
import ResultPreview from "./resultPreview";
import ResultUpload from "./resultUpload";
import { ExcelRenderer } from "react-excel-renderer";
import { useEffect } from "react";

export const UploadModal = ({
	uploaded,
	setUploaded,
	courseCode,
	academicYearDetails,
	setUploadResultModal,
	setDownloadFile,
	loading,
	currentState
}) => {
	const [fileData, setFileData] = useState(null);
	const [extractedData, setExtractedData] = useState({});
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
		<>
			{!uploaded ? (
				<ResultUpload
					setUploaded={setUploaded}
					uploaded={uploaded}
					setFileData={setFileData}
					setDownloadFile={setDownloadFile}
					fileLoading={loading}
				/>
			) : (
				<ResultPreview
					setUploaded={setUploaded}
					fileData={fileData}
					extractedData={extractedData}
					courseCode={courseCode}
					currentState={currentState}
					academicYearDetails={academicYearDetails}
					setUploadResultModal={setUploadResultModal}
				/>
			)}
		</>
	);
};

import { useEffect, useState } from "react";
import { ListPreview, ListUpload } from ".";
import { ExcelRenderer } from "react-excel-renderer";

export const BulkUpload = ({
	allAdmissionTypes,
	setUploadModal,
	filter,
	pageNumber,
	pageSize,
	searchTerm
}) => {
	const [fileData, setFileData] = useState(null);
	const [extractedData, setExtractedData] = useState({});
	const [uploaded, setUploaded] = useState(false);
	const [admissionTypeId, setAdmissionTypeId] = useState("");
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
				<ListUpload
					setUploaded={setUploaded}
					setAdmissionTypeId={setAdmissionTypeId}
					uploaded={uploaded}
					allAdmissionTypes={allAdmissionTypes}
					setFileData={setFileData}
					studentTypeId={filter.studentTypeId}
				/>
			) : (
				<ListPreview
					setUploaded={setUploaded}
					fileData={fileData}
					extractedData={extractedData}
					setUploadModal={setUploadModal}
					admissionTypeId={admissionTypeId}
					pageNumber={pageNumber}
					searchTerm={searchTerm}
					pageSize={pageSize}
					filter={filter}
				/>
			)}
		</div>
	);
};

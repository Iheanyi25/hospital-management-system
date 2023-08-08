import {
	Jumbotron,
	Button,
	TMTable,
	Spinner
} from "../../../../../../ui_elements";
import { useMemo } from "react";
import UploadSuccess from "./uploadSuccess";
import { useApiPost } from "../../../../../../api/apiCall";
import { getResultsUrl, uploadScoreSheetUrl } from "../../../../../../api/urls";
import { useQueryClient } from "react-query";

const ResultPreview = ({
	setUploaded,
	extractedData,
	courseCode,
	fileData,
	academicYearDetails,
	currentState,
	setUploadResultModal
}) => {
	const { mutate, isLoading } = useApiPost();
	const queryClient = useQueryClient();

	const uploadScoreSheet = () => {
		const formData = new FormData();
		formData.append("file", fileData, fileData.name);
		const { id, session } = academicYearDetails;
		const requestBody = {
			url: uploadScoreSheetUrl({
				departmentCourseId: id,
				sessionId: session
			}),
			data: formData
		};
		mutate(requestBody, {
			onSuccess: () => {
				queryClient.invalidateQueries(getResultsUrl(currentState));
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Upload Successful",
					body: `${fileData?.name} was uploaded successfully!`
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				closeModals();
			},
			onError: (error) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "File upload Failed!",
					body: error?.response?.data?.message || `an error occured.`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
				closeModals();
			}
		});
	};

	const closeModals = () => {
		setUploaded(false); //closes second Modal
		setUploadResultModal(false); //closes first Modal
	};
	return (
		<>
			<div className="mb-5">
				<UploadSuccess courseName={fileData?.name} />
			</div>
			<Jumbotron
				headerContainer={
					<div className="d-flex justify-content-between">
						<label>Uploaded results</label>
					</div>
				}
				footerContent={
					<>
						<Button
							data-cy="complete"
							label="Complete Upload"
							buttonClass="primary"
							onClick={uploadScoreSheet}
							loading={isLoading}
							disabled={!(extractedData?.rows?.length > 0)}
						/>
						<Button
							data-cy="cancel"
							label="Cancel"
							buttonClass="standard"
							onClick={() => setUploaded(false)}
						/>
					</>
				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="container-fluid px-4 mt-3 mb-3">
					<p>
						Cross check and make sure there are no mistakes in the
						results, before you click complete upload
					</p>
					<div>
						{extractedData?.rows ? (
							<DisplyTable
								extractedDataRow={extractedData.rows}
								courseCode={courseCode}
							/>
						) : (
							<Spinner />
						)}
					</div>
				</div>
			</Jumbotron>
		</>
	);
};

export default ResultPreview;

const DisplyTable = ({ extractedDataRow, courseCode }) => {
	const headers = useMemo(() => [], []);
	extractedDataRow[2].forEach((name, index) => {
		if (previewHeadersObj[name]) {
			headers.push({
				Header: name,
				accessor: index.toString(),
				Cell: ({ cell: { row } }) => {
					return <div>{row.original[index]?.toString() || "-"}</div>;
				}
			});
		}
	});

	const columns = useMemo(() => headers, [headers]);
	const dataRows = [];
	extractedDataRow.slice(3).forEach((arr) => {
		const obj = {};
		arr.forEach((elem, i) => {
			obj[i] = elem;
		});
		dataRows.push(obj);
	});
	return (
		<TMTable
			columns={columns}
			data={dataRows}
			title={`Uploaded results for ${courseCode}`}
			isServerSidePagination={false}
		/>
	);
};

const previewHeadersObj = {
	REGNO: "REGNO",
	SN: "SN",
	FULLNAME: "FULLNAME",
	CA: "CA",
	LAB: "LAB",
	Exam: "EXAM",
	Total: "TOTAL",
	Grade: "GRADE",
	Remark: "REMARKS"
};

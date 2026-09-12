import {
	Jumbotron,
	Button,
	TMTable,
	Spinner
} from "../../../../../../ui_elements";
import { useMemo } from "react";
import { useApiPut } from "../../../../../../api/apiCall";
import {
	getAcceptanceFeesUrl,
	uploadAcceptanceFeeUrl
} from "../../../../../../api/urls";
import { useQueryClient } from "react-query";
import { UploadSuccess } from ".";
import { useHistory } from "react-router-dom";

export const FeesPreview = ({
	setUploaded,
	extractedData,
	fileData,
	departments,
	currentFilterState,
	setIsDepartmentError
}) => {
	const { mutate, isLoading } = useApiPut();
	const queryClient = useQueryClient();
	const { goBack } = useHistory();

	const uploadCourses = () => {
		if (!departments?.length > 0) {
			setIsDepartmentError(true);
			return;
		}
		const formData = new FormData();
		formData.append("file", fileData, fileData.name);
		formData.append("SessionId", currentFilterState.sessionId);
		formData.append("StudentTypeId", currentFilterState.studentTypeId);
		for (const element of departments) {
			formData.append("DepartmentId", element);
		}
		const requestBody = {
			url: uploadAcceptanceFeeUrl(),
			data: formData
		};
		mutate(requestBody, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getAcceptanceFeesUrl(currentFilterState)
				);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Upload Successful",
					body: `${fileData?.name} was uploaded successfully!`
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				goBack();
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
			}
		});
	};
	return (
		<>
			<div className="mb-5 w-100">
				<UploadSuccess courseName={fileData?.name} />
			</div>
			<Jumbotron
				headerContainer={
					<div className="d-flex justify-content-between">
						<label>Upload courses</label>
					</div>
				}
				footerContent={
					<>
						<Button
							data-cy="comp_upload"
							label="Complete Upload"
							buttonClass="primary"
							onClick={uploadCourses}
							loading={isLoading}
							disabled={!(extractedData?.rows?.length > 0)}
						/>
						<Button
							data-cy="cancel_upload"
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
						courses, before you click complete upload
					</p>
					<div>
						{extractedData?.rows ? (
							<DisplyTable
								extractedDataRow={extractedData.rows}
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

const DisplyTable = ({ extractedDataRow }) => {
	const headers = useMemo(() => [], []);
	extractedDataRow[0].forEach((name, index) => {
		if (previewHeadersObj[name]) {
			headers.push({
				Header: name,
				accessor: index.toString(),
				Cell: ({ cell: { row } }) => (
					<div>{row.original[index]?.toString() || "-"}</div>
				)
			});
		}
	});

	const columns = useMemo(() => headers, [headers]);
	const dataRows = [];
	extractedDataRow.slice(1).forEach((arr) => {
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
			title="Uploaded fees"
			isServerSidePagination={false}
		/>
	);
};

const previewHeadersObj = {
	Description: "Description",
	Amount: "Amount"
};

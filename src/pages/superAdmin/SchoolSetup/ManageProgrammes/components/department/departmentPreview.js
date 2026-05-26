import {
	Jumbotron,
	Button,
	TMTable,
	Spinner
} from "../../../../../../ui_elements";
import { useMemo } from "react";
import { useApiPost } from "../../../../../../api/apiCall";
import {
	getAllPaginatedDepartmentsUrl,
	bulkDepartmentsUploadUrl
} from "../../../../../../api/urls";
import { useQueryClient } from "react-query";
import { UploadSuccess } from "..";

export const DepartmentPreview = ({
	setUploaded,
	extractedData,
	fileData,
	setUploadModal,
	currentFilterState
}) => {
	const { mutate, isLoading } = useApiPost();
	const queryClient = useQueryClient();

	const uploadDepartments = () => {
		const formData = new FormData();
		formData.append("file", fileData, fileData.name);
		formData.append("facultyId", currentFilterState.facultyId);
		const requestBody = {
			url: bulkDepartmentsUploadUrl(),
			data: formData
		};
		mutate(requestBody, {
			onSuccess: (res) => {
				queryClient.invalidateQueries(
					getAllPaginatedDepartmentsUrl(currentFilterState)
				);
				if (res.data.message) {
					const infoFlag = window.AJS.flag({
						
						type: "info",
						title: "Upload Info",
						body: res.data.message
					});
					setTimeout(() => {
						infoFlag.close();
					}, 5000);
				} else {
					const successFlag = window.AJS.flag({
						type: "success",
						title: "Upload Successful",
						body: `${fileData?.name} was uploaded successfully!`
					});
					setTimeout(() => {
						successFlag.close();
					}, 5000);
				}

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
		setUploadModal(false); //closes first Modal
	};
	return (
		<>
			<div className="mb-5 w-100">
				<UploadSuccess courseName={fileData?.name} />
			</div>
			<Jumbotron
				headerContainer={
					<div className="d-flex justify-content-between">
						<label>Upload departments</label>
					</div>
				}
				footerContent={
					<>
						<Button
							data-cy="comp_upload"
							label="Complete Upload"
							buttonClass="primary"
							onClick={uploadDepartments}
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
						faculties, before you click complete upload
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
			title="Uploaded departments"
			isServerSidePagination={false}
		/>
	);
};

const previewHeadersObj = {
	SN: "SN",
	Name: "Name"
};

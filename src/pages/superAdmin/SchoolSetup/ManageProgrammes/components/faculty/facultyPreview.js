import {
	Jumbotron,
	Button,
	TMTable,
	Spinner
} from "../../../../../../ui_elements";
import { useMemo } from "react";
import { useApiPost } from "../../../../../../api/apiCall";
import {
	getAllPaginatedFacultiesUrl,
	bulkFacultiesUploadUrl
} from "../../../../../../api/urls";
import { useQueryClient } from "react-query";
import { UploadSuccess } from "..";
import { handleUploadExcelSuccess } from "../../../../../../utils/handleUploadExcelSuccess";

export const FacultyPreview = ({
	setUploaded,
	extractedData,
	fileData,
	setUploadModal,
	currentFilterState
}) => {
	const { mutate, isLoading } = useApiPost();
	const queryClient = useQueryClient();

	const uploadFaculties = () => {
		const formData = new FormData();
		formData.append("file", fileData, fileData.name);
		const requestBody = {
			url: bulkFacultiesUploadUrl(),
			data: formData
		};
		mutate(requestBody, {
			onSuccess: (res) => {
				queryClient.invalidateQueries(
					getAllPaginatedFacultiesUrl(currentFilterState)
				);
				handleUploadExcelSuccess(res, fileData);

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
						<label>Upload faculties</label>
					</div>
				}
				footerContent={
					<>
						<Button
							data-cy="comp_upload"
							label="Complete Upload"
							buttonClass="primary"
							onClick={uploadFaculties}
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
			title="Uploaded faculties"
			isServerSidePagination={false}
		/>
	);
};

const previewHeadersObj = {
	SN: "SN",
	Name: "Name"
};

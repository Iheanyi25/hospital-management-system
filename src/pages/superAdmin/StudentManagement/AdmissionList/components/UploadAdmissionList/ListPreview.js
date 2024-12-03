import {
	Jumbotron,
	Button,
	TMTable,
	Spinner
} from "../../../../../../ui_elements";
import { useMemo } from "react";
import { useApiPost } from "../../../../../../api/apiCall";
import {
	bulkUploadAdmissionListUrl,
	getAdmissionList
} from "../../../../../../api/urls";
import { useQueryClient } from "react-query";
import { UploadSuccess } from ".";

export const ListPreview = ({
	setUploaded,
	extractedData,
	fileData,
	filter,
	setUploadModal,
	admissionTypeId,
	pageNumber,
	pageSize,
	searchTerm,
	categoryId
}) => {
	const { mutate, isLoading } = useApiPost();
	const queryClient = useQueryClient();
	const uploadCourses = () => {
		const formData = new FormData();
		formData.append("file", fileData, fileData.name);
		formData.append("admissionTypeId", admissionTypeId);
		formData.append("categoryId", categoryId);
		formData.append("departmentId", filter.departmentId);
		filter.departmentOptionId !== undefined &&
			formData.append("departmentOptionId", filter.departmentOptionId);
		formData.append("modeOfEntryId", filter.modeOfEntryId);
		formData.append("studentTypeId", filter.studentTypeId);
		formData.append("sessionId", filter.sessionId);
		filter?.programmeId &&
			formData.append("programmeId ", filter.programmeId);
		filter?.modeOfStudyId &&
			formData.append("modeOfStudyId ", filter.modeOfStudyId);
		filter?.areaOfSpecializationId &&
			formData.append(
				"areaOfSpecializationId ",
				filter.areaOfSpecializationId
			);

		const requestBody = {
			url: bulkUploadAdmissionListUrl(),
			data: formData
		};
		mutate(requestBody, {
			onSuccess: ({ data }) => {
				queryClient.invalidateQueries(
					getAdmissionList({
						...filter,
						pageNumber,
						pageSize,
						searchTerm
					})
				);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Upload In Progress",
					body:
						data?.data ||
						`${fileData?.name} upload in progress, check back later`
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
						<label>Upload admission list</label>
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
					<p className="mb-3">
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
			isServerSidePagination={false}
		/>
	);
};

const previewHeadersObj = {
	SN: "SN",
	RegNumber: "RegNumber",
	LastName: "LastName",
	FirstName: "FirstName",
	MiddleName: "MiddleName"
};

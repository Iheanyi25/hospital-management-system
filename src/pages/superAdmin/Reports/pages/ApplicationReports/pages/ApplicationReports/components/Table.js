import { useCallback, useEffect, useMemo, useState } from "react";
import {
	TMTable,
	Search,
	Button,
	ButtonDropdown,
	SecondaryLink,
	CenteredDialog
} from "../../../../../../../../ui_elements";
import { CertificateTable } from "./CertificateTable";
import { downloadApplicationDocumentsUrl } from "../../../../../../../../api/urls";
import { useApiBlob } from "../../../../../../../../api/apiCall";
import { APPLICATION_ID } from "../../../../../../../../utils/constants";

export const Table = ({
	loading,
	data,
	isPosting,
	setPageNumber,
	debouncedSearch,
	hasPerformedQuery,
	pageSize,
	pageNumber,
	fileLoading,
	setDownloadFile,
	paginationProps,
	zipFileLoading,
	setDownloadZipFile,
	filter
}) => {
	const [open, setOpen] = useState(false);
	const [editData, setEditData] = useState({});
	const [downloadInnerZipFile, setDownloadInnerZipFile] = useState(false);
	const outputTitle = `${editData?.fullname} Documents`;
	const columns = useMemo(
		() => [
			{
				Header: "S/N",
				accessor: "serialNo",
				Cell: ({ cell: { row } }) => (
					<div>
						<span>
							{pageSize * (pageNumber - 1) + (row.index + 1)}
						</span>
					</div>
				)
			},
			{
				Header: "Application No",
				accessor: "applicationNumber"
			},
			{
				Header: "Fullname",
				accessor: "fullname"
			},
			{
				Header: "Reference Number",
				accessor: "rrr"
			},
			{
				Header: "Sex",
				accessor: "gender",
				Cell: ({ cell: { row } }) => (
					<p>{row.original?.gender?.split("")[0] || ""}</p>
				)
			},
			{
				Header: "Reg Number",
				accessor: "jambRegNumber"
			},
			{
				Header: "Department",
				accessor: "department"
			},
			{
				Header: "Certificates",
				accessor: "cert",
				Cell: ({ cell: { row } }) => (
					<SecondaryLink
						label={`View (${
							row.original.certificationsInfo?.length ?? 0
						})`}
						disabled={row.original.certificationsInfo?.length === 0}
						onClick={() => {
							setEditData(row.original);
							setOpen(true);
						}}
					/>
				)
			},
			{
				Header: "Mobile No",
				accessor: "mobileNumber"
			}
		],
		[pageNumber, pageSize]
	);

	const {
		data: zipFile,
		isLoading: loadingZipFile,
		error: zipFileError
	} = useApiBlob(
		downloadApplicationDocumentsUrl({
			...filter,
			searchTerm: editData?.applicationNumber
		}),
		{
			enabled: downloadInnerZipFile,
			refetchOnWindowFocus: false
		}
	);
	const downloadXLSZipFile = useCallback(async () => {
		setDownloadInnerZipFile(true);
		if (zipFileError || !zipFile?.data) {
			const errorFlag = window.AJS.flag({
				type: "error",
				title: `Failed To Download `,
				body: `Couldn't download documents`
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		} else {
			// file file actions.
			const url = URL.createObjectURL(new Blob([zipFile.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `${outputTitle}.zip`);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			setDownloadInnerZipFile(false);
		}
	}, [zipFile?.data, outputTitle, zipFileError]);

	useEffect(() => {
		if (zipFile && downloadInnerZipFile) {
			downloadXLSZipFile();
		}
	}, [zipFile, downloadInnerZipFile, downloadXLSZipFile]);
	const buttonGroup = [
		{
			name: "Download Certificates",
			onClick: () => setDownloadZipFile(true)
		}
	];
	const showDropdown =
		filter?.applicationTypeId === APPLICATION_ID.PG ||
		filter?.applicationTypeId === APPLICATION_ID.FIVE_YEAR_SANDWICH;
	return (
		<>
			<CenteredDialog
				modalId="cerificate"
				isOpen={open}
				closeModal={() => setOpen(false)}
				width="714px"
				formTitle={`${editData?.fullname} Certificates`}
				footerData={
					<>
						<Button
							data-cy="declare"
							label="Download All"
							buttonClass={`success`}
							onClick={() => setDownloadInnerZipFile(true)}
							loading={loadingZipFile}
						/>
					</>
				}
			>
				<CertificateTable editData={editData} filter={filter} />
			</CenteredDialog>
			<TMTable
				columns={columns}
				data={data}
				loading={loading || isPosting}
				title=" "
				pageNumber={pageNumber}
				additonalTitleData={
					<div className="d-flex align-items-center">
						{hasPerformedQuery && (
							<div className="d-flex align-items-center">
								<Search
									placeholder="Search for report"
									onChange={(e) => {
										debouncedSearch(e.target.value);
										setPageNumber(1);
									}}
								/>
								{data.length > 0 && (
									<>
										<Button
											data-cy="download_sundry_report"
											buttonClass="secondary"
											label="Download Report"
											customClass="ml-3"
											loading={fileLoading}
											onClick={() =>
												setDownloadFile(true)
											}
										/>
										{showDropdown && (
											<ButtonDropdown
												loading={zipFileLoading}
												buttonGroup={buttonGroup}
											/>
										)}
									</>
								)}
							</div>
						)}
					</div>
				}
				setPageNumber={setPageNumber}
				metaData={paginationProps}
				availablePages={paginationProps.totalPages}
			/>
		</>
	);
};

import { Button, CenteredDialog, TMTable } from "../../../../ui_elements";
import styles from "./style.module.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import { UploadList } from "./components";
import { PAGESIZE } from "../../../../utils/constants";
import { useHistory } from "react-router-dom";
import { useApiBlob, useApiGet } from "../../../../api/apiCall";
import {
	downloadPutmeResultUrl,
	getPutmeSessionApplicantCountUrl
} from "../../../../api/urls";

const PutmeResultUpload = () => {
	const [open, setOpen] = useState(false);
	const pageSize = PAGESIZE.md;
	const [pageNumber, setPageNumber] = useState(1);
	const [downloadFile, setDownloadFile] = useState(false);
	const [sessionInfo, setSessionInfo] = useState({
		session: null,
		sessionId: null
	});
	const { push } = useHistory();
	const { data, isLoading, isFetching, error } = useApiGet(
		getPutmeSessionApplicantCountUrl({
			pageSize,
			pageNumber
		}),
		{
			keepPreviousData: true
		}
	);

	const {
		data: file,
		isLoading: fileLoading,
		error: fileError
	} = useApiBlob(
		downloadPutmeResultUrl({ sessionId: sessionInfo.sessionId }),
		{
			enabled: downloadFile,
			refetchOnWindowFocus: false
		}
	);

	const downloadXLSFile = useCallback(async () => {
		if (fileError) {
			const errorFlag = window.AJS.flag({
				type: "error",
				title: `Failed To Download `,
				body: `Couldn't download template`
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
			setDownloadFile(false);
		}

		if (file) {
			const outputFilename = `${sessionInfo.session} Post UTME Results.xlsx`;
			// file file actions.
			const url = URL.createObjectURL(new Blob([file.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", outputFilename);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			const successFlag = window.AJS.flag({
				type: "success",
				title: "Result download successful"
			});
			setTimeout(() => {
				successFlag.close();
			}, 5000);
			setDownloadFile(false);
		}
	}, [file, fileError, sessionInfo]);

	useEffect(() => {
		if (downloadFile) {
			downloadXLSFile();
		}
	}, [file, downloadFile, downloadXLSFile]);

	const columns = useMemo(
		() => [
			{
				Header: "S/N",
				accessor: "sn",
				Cell: ({ cell: { row } }) => (
					<div>
						<span>
							{pageSize * (pageNumber - 1) + (row.index + 1)}
						</span>
					</div>
				)
			},
			{
				Header: "Active Session",
				accessor: `session`
			},
			{
				Header: "No of Students",
				accessor: "applicantCount"
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => (
					<div>
						<Button
							data-cy="view_results"
							label="View"
							buttonClass="standard"
							onClick={() => {
								push({
									pathname:
										"/applications/putme_result_upload/view",
									state: {
										sessionId: row?.original?.sessionId,
										session: row?.original?.session
									}
								});
							}}
						/>
						<Button
							data-cy="download_result"
							label="Download"
							buttonClass="standard"
							onClick={() => {
								setDownloadFile(true);
								setSessionInfo({
									session: row?.original?.session,
									sessionId: row?.original?.sessionId
								});
							}}
							disabled={
								row?.original?.applicantCount === 0 ||
								fileLoading
							}
						/>
					</div>
				)
			}
		],
		[pageSize, pageNumber, push, fileLoading]
	);
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<div className={styles.container}>
			<CenteredDialog
				modalId="upload_results"
				isOpen={open}
				closeModal={() => setOpen(false)}
				formTitle="Upload Results"
			>
				<UploadList
					currentFilterState={{ pageSize, pageNumber }}
					setUploadModal={setOpen}
				/>
			</CenteredDialog>
			<div className={styles.page_content}>
				<div className="w-100">
					<TMTable
						columns={columns}
						data={data?.data.items || []}
						title="Post UTME Results"
						additonalTitleData={
							<div className="d-flex align-items-center">
								<Button
									data-cy="default"
									buttonClass="primary"
									label="Upload Results"
									customClass="ml-3"
									onClick={() => setOpen(true)}
								/>
							</div>
						}
						loading={isLoading || isFetching}
						setPageNumber={setPageNumber}
						availablePages={data?.data?.metaData.totalPages}
					/>
				</div>
			</div>
		</div>
	);
};

export default PutmeResultUpload;

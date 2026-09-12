import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useApiBlob, useApiGet } from "../../../../api/apiCall";
import {
	Breadcrumbs,
	Button,
	PageTitle,
	TMTable
} from "../../../../ui_elements";
import styles from "./style.module.css";
import { PAGESIZE } from "../../../../utils/constants";
import {
	downloadPutmeResultUrl,
	getPutmeSessionResultsUrl
} from "../../../../api/urls";

const PutmeResultView = () => {
	const {
		state: { sessionId, session }
	} = useLocation();
	const { push } = useHistory();

	useEffect(() => {
		if (sessionId === null)
			return push("/applications/putme_result_upload");
	}, [sessionId, push]);

	const [pageNumber, setPageNumber] = useState(1);
	const [downloadFile, setDownloadFile] = useState(false);

	const pageTitle = `${session} Post UTME Results`;
	const pageSize = PAGESIZE.md;

	const crumbItems = [
		{
			name: "PUTME Results",
			path: "/applications/putme_result_upload"
		},
		{
			name: pageTitle,
			path: "/"
		}
	];

	const { data, isLoading, error } = useApiGet(
		getPutmeSessionResultsUrl({ sessionId, pageNumber, pageSize }),
		{
			enabled: !!sessionId || sessionId === 0,
			refetchOnWindowFocus: false
		}
	);

	const {
		data: file,
		isLoading: fileLoading,
		error: fileError
	} = useApiBlob(downloadPutmeResultUrl({ sessionId }), {
		enabled: downloadFile,
		refetchOnWindowFocus: false
	});

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
		}

		if (file) {
			const outputFilename = `${pageTitle}.xlsx`;
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
	}, [file, fileError, pageTitle]);

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
				Header: "Jamb Reg No",
				accessor: `regNumber`
			},
			{
				Header: "Full Name",
				accessor: "fullName"
			},
			{
				Header: "Score",
				accessor: "score"
			}
		],
		[pageSize, pageNumber]
	);

	if (error)
		return "An error has occurred: " + error?.response?.data?.message;

	return (
		<div className={styles.container}>
			<div className="d-flex w-100 justify-content-between">
				<div>
					<Breadcrumbs crumbs={crumbItems} />
					<PageTitle title={pageTitle} />
				</div>
				<div className="d-flex align-items-center">
					<Button
						data-cy="default"
						buttonClass="primary"
						label="Download"
						onClick={() => setDownloadFile(true)}
						loading={fileLoading}
						disabled={data?.data.items.length === 0}
					/>
				</div>
			</div>
			<div className={styles.page_content}>
				<div className="w-100">
					<TMTable
						columns={columns}
						data={data?.data.items || []}
						title={pageTitle}
						loading={isLoading}
						setPageNumber={setPageNumber}
						availablePages={data?.data?.metaData.totalPages}
					/>
				</div>
			</div>
		</div>
	);
};

export default PutmeResultView;

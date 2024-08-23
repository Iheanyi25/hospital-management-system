import { Button, TMTable } from "../../../../../ui_elements";
import styles from "./style.module.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
	downloadHostelSummaryReportsUrl,
	getHostelSummaryReportsUrl
} from "../../../../../api/urls";
import { useApiBlob, useApiGet } from "../../../../../api/apiCall";
import { PAGESIZE } from "../../../../../utils/constants";
// import { useDebouncedCallback } from "use-debounce";
import numberFormatter from "../../../../../utils/numberFormatter";

const HostelSummaryReports = () => {
	const pageSize = PAGESIZE.sm;
	// const [searchTerm, setSearchTerm] = useState("");
	// const debouncedSearch = useDebouncedCallback(
	// 	(value) => {
	// 		setSearchTerm(value);
	// 	},
	// 	// delay in ms
	// 	SEARCH_DELAY.sm
	// );
	const [pageNumber, setPageNumber] = useState(1);
	const [downloadFile, setDownloadFile] = useState(false);
	const { data, isLoading, isFetching, error } = useApiGet(
		getHostelSummaryReportsUrl({
			pageSize,
			pageNumber
			// searchTerm
		}),
		{
			keepPreviousData: true
		}
	);

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
				Header: "Hostel",
				accessor: "hostelName"
			},
			{
				Header: "Total",
				accessor: "totalBeds",
				Cell: ({ cell: { row } }) => (
					<>{numberFormatter(row.original.totalBeds) || "NONE"}</>
				)
			},
			{
				Header: "Reserved",
				accessor: "totalReservedBeds",
				Cell: ({ cell: { row } }) => (
					<>
						{numberFormatter(row.original.totalReservedBeds) ||
							"NONE"}
					</>
				)
			},
			{
				Header: "Paid",
				accessor: "totalPaidBeds",
				Cell: ({ cell: { row } }) => (
					<>{numberFormatter(row.original.totalPaidBeds) || "NONE"}</>
				)
			}
		],
		[pageSize, pageNumber]
	);
	const outputTitle = `Hostel Summary Reports`;
	const {
		data: file,
		isLoading: fileLoading,
		error: fileError
	} = useApiBlob(downloadHostelSummaryReportsUrl(), {
		enabled: downloadFile,
		refetchOnWindowFocus: false
	});
	const downloadXLSFile = useCallback(async () => {
		setDownloadFile(true);
		if (fileError || !file?.data) {
			const errorFlag = window.AJS.flag({
				type: "error",
				title: `Failed To Download `,
				body: `Couldn't download file`
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		} else {
			// file file actions.
			const url = URL.createObjectURL(new Blob([file.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `${outputTitle}.xlsx`);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			setDownloadFile(false);
		}
	}, [file, outputTitle, fileError]);
	useEffect(() => {
		if (file && downloadFile) {
			downloadXLSFile();
		}
	}, [file, downloadFile, downloadXLSFile]);
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<div className={styles.container}>
			<div className={styles.page_content}>
				<div className="w-100">
					<TMTable
						columns={columns}
						data={data?.data?.items || []}
						title="Reports"
						additonalTitleData={
							<div className="d-flex align-items-center">
								<div className="d-flex align-items-center">
									{/* <Search
										placeholder="Search for report"
										onChange={(e) => {
											debouncedSearch(e.target.value);
											setPageNumber(1);
										}}
									/> */}
									{data?.data?.items.length > 0 && (
										<Button
											data-cy="download_hostel_reports"
											buttonClass="secondary"
											label="Download Report"
											customClass="ml-3"
											loading={fileLoading}
											onClick={() =>
												setDownloadFile(true)
											}
										/>
									)}
								</div>
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

export default HostelSummaryReports;

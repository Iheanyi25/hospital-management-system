import { Spinner } from "../../../../../ui_elements";
import styles from "./style.module.css";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useApiBlob, useApiGet } from "../../../../../api/apiCall";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	getAllSessionsUrl,
	getHostelReportsUrl,
	downloadHostelReportsUrl
} from "../../../../../api/urls";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import { Form, Table, Schema } from "./components";
import { PAGESIZE, SEARCH_DELAY } from "../../../../../utils/constants";
import { useDebouncedCallback } from "use-debounce";
import { shortDate } from "../../../../../utils/formatDate";
import Tabs, { Tab, TabList } from "@atlaskit/tabs";

const HostelReports = () => {
	const [reportQuery, setReportQuery] = useState("paid");

	const [filter, setFilter] = useState({
		hostelId: "",
		hostelName: "",
		dateFrom: "",
		dateTo: "",
		searchTerm: ""
	});
	const pageSize = PAGESIZE.sm;
	const [pageNumber, setPageNumber] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [downloadFile, setDownloadFile] = useState(false);
	const debounced = useDebouncedCallback(
		(value) => {
			setSearchTerm(value);
		},
		// delay in ms
		SEARCH_DELAY.sm
	);
	const [dateFrom, setDateFrom] = useState("");
	const {
		data: reports,
		isLoading: isLoadingReports,
		isFetching: isFetchingReports
	} = useApiGet(
		getHostelReportsUrl({
			...filter,
			reportType: reportQuery,
			pageSize,
			pageNumber,
			searchTerm
		}),
		{
			enabled: !!filter.hostelId,
			keepPreviousData: true,
			refetchOnWindowFocus: false
		}
	);
	const { data: sessions, isLoading, error } = useApiGet(getAllSessionsUrl());
	const {
		control,
		watch,
		handleSubmit,
		register,
		setValue,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(Schema),
		context: {
			isDateToRequired: !!dateFrom
		}
	});
	useEffect(() => {
		const subscription = watch(({ dateFrom }) => {
			setDateFrom(dateFrom);
		});
		return () => subscription.unsubscribe();
	}, [watch]);
	const allObj = { value: "0", label: "All" };
	const allSessions = [
		allObj,
		...formatSelectItems(sessions?.data, "session", "id")
	];

	const outputTitle = `Report for ${filter.hostelName} ${
		filter.dateTo
			? ` between ${shortDate(filter.dateFrom)} and ${shortDate(
					filter.dateTo
			  )}`
			: ""
	}`;
	const {
		data: file,
		isLoading: fileLoading,
		error: fileError
	} = useApiBlob(
		downloadHostelReportsUrl({ ...filter, ...{ reportType: reportQuery } }),
		{
			enabled: downloadFile,
			refetchOnWindowFocus: false
		}
	);
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

	if (isLoading) return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<div className={styles.container}>
			<div className={styles.page_content}>
				<div className="w-100">
					<Form
						control={control}
						errors={errors}
						allSessions={allSessions}
						data={reports?.data?.items}
						setFilter={setFilter}
						setValue={setValue}
						handleSubmit={handleSubmit}
						register={register}
						dateFrom={dateFrom}
						isLoadingReports={isLoadingReports}
						setPageNumber={setPageNumber}
					/>
					<div className="w-100">
						<Tabs id="default">
							<div className="my-5">
								<TabList>
									<Tab>
										<button
											onClick={() =>
												setReportQuery("paid")
											}
											className={styles.tab_btn}
										>
											Paid
										</button>
									</Tab>
									<Tab>
										<button
											onClick={() =>
												setReportQuery("reserved")
											}
											className={styles.tab_btn}
										>
											Not Paid
										</button>
									</Tab>
									<Tab>
										<button
											onClick={() =>
												setReportQuery("vacant")
											}
											className={styles.tab_btn}
										>
											Vacant
										</button>
									</Tab>
								</TabList>
							</div>
							<Table
								data={reports?.data?.items || []}
								paginationProps={reports?.data?.metaData || {}}
								hasPerformedQuery={!!filter.hostelId}
								setPageNumber={setPageNumber}
								debouncedSearch={debounced}
								searchTerm={searchTerm}
								setFilter={setFilter}
								pageNumber={pageNumber}
								setDownloadFile={setDownloadFile}
								fileLoading={fileLoading}
								pageSize={pageSize}
								loading={isFetchingReports}
							/>
						</Tabs>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HostelReports;

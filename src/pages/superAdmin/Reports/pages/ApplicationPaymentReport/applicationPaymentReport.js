import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useApiBlob, useApiGet } from "../../../../../api/apiCall";
import {
	getApplicationTypesUrl,
	getAllSessionsUrl,
	getAllPaymentReportsUrl,
	downloadPaymentReportsUrl
} from "../../../../../api/urls";
import { Spinner } from "../../../../../ui_elements";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import { Form, Table } from "./components";
import styles from "./style.module.css";
import { PAGESIZE, SEARCH_DELAY } from "../../../../../utils/constants";
import { useDebouncedCallback } from "use-debounce";
import { findValueAndLabel } from "../../../../../utils/findValueAndLabel";

const ApplicationPaymentReport = () => {
	const pageSize = PAGESIZE.sm;
	const [searchTerm, setSearchTerm] = useState("");
	const [downloadFile, setDownloadFile] = useState(false);
	const debouncedSearch = useDebouncedCallback(
		(value) => {
			setSearchTerm(value);
		},
		// delay in ms
		SEARCH_DELAY.sm
	);
	const [pageNumber, setPageNumber] = useState(1);
	const [filter, setFilter] = useState({
		applicationTypeId: "",
		sessionId: ""
	});

	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm();
	const {
		data: applicatiionData,
		isLoading: applicationTypesLoading,
		error: applicationError
	} = useApiGet(getApplicationTypesUrl());

	const {
		data: sessions,
		isLoading: sessionsLoading,
		error: sessionsError
	} = useApiGet(getAllSessionsUrl(), {
		refetchOnWindowFocus: false
	});

	const allSessions = formatSelectItems(sessions?.data, "session", "id");
	const allApplicationTypes = formatSelectItems(
		applicatiionData?.data,
		"name",
		"id"
	);
	const sessionName = findValueAndLabel(
		filter?.sessionId,
		allSessions
	)?.label;
	const allApplicationTypeName = findValueAndLabel(
		filter?.applicationTypeId,
		allApplicationTypes
	)?.label;
	const {
		data: applications,
		isLoading: isLoadingApplications,
		isFetching: isFetchingApplications,
		error: applicationsError
	} = useApiGet(
		getAllPaymentReportsUrl({
			...filter,
			pageSize,
			pageNumber,
			searchTerm
		}),
		{
			enabled: !!filter.applicationTypeId,
			keepPreviousData: true
		}
	);
	const outputTitle = `${allApplicationTypeName} Application Payment Report for ${sessionName} session`;
	const {
		data: file,
		isLoading: fileLoading,
		error: fileError
	} = useApiBlob(downloadPaymentReportsUrl(filter), {
		enabled: downloadFile,
		refetchOnWindowFocus: false
	});
	const downloadXLSFile = useCallback(async () => {
		setDownloadFile(true);
		if (fileError || !file?.data) {
			const errorFlag = window.AJS.flag({
				type: "error",
				title: `Failed To Download `,
				body: `Couldn't download class list`
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
	if (applicationTypesLoading || sessionsLoading) return <Spinner />;
	if (applicationError || sessionsError || applicationsError)
		return "An error has occurred: " + applicationError?.message;

	return (
		<section>
			<div className={styles.page_content}>
				<Form
					allSessions={allSessions}
					allApplicationTypes={allApplicationTypes}
					setFilter={setFilter}
					filter={filter}
					control={control}
					handleSubmit={handleSubmit}
					isLoadingFeesToAssign={isLoadingApplications}
					errors={errors}
				/>
			</div>
			<div className="w-100">
				<Table
					data={applications?.data?.items || []}
					loading={isFetchingApplications}
					debouncedSearch={debouncedSearch}
					hasPerformedQuery={!!filter.applicationTypeId}
					setPageNumber={setPageNumber}
					paginationProps={applications?.data?.metaData || {}}
					pageNumber={pageNumber}
					fileLoading={fileLoading}
					setDownloadFile={setDownloadFile}
					pageSize={pageSize}
					filter={filter}
				/>
			</div>
		</section>
	);
};

export default ApplicationPaymentReport;

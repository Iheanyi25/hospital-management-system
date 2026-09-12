import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useApiBlob, useApiGet } from "../../../../../../../api/apiCall";
import {
	getApplicationTypesUrl,
	getAllSessionsUrl,
	getApplicationReportsUrl,
	getAllDepartmentsWithoutValuesUrl,
	getDepartmentJupebOptionsUrl,
	getDepartmentJupebOptionsSubjects,
	downloadApplicationReportUrl,
	downloadApplicationDocumentsUrl
} from "../../../../../../../api/urls";
import { Spinner } from "../../../../../../../ui_elements";
import { formatSelectItems } from "../../../../../../../utils/formatSelectItems";
import { Form, Table } from "./components";
import styles from "./style.module.css";
import { PAGESIZE, SEARCH_DELAY } from "../../../../../../../utils/constants";
import { useDebouncedCallback } from "use-debounce";
import { findValueAndLabel } from "../../../../../../../utils/findValueAndLabel";
import { yupResolver } from "@hookform/resolvers/yup";
import { Schema } from "./components/schema";

const ApplicationReports = () => {
	const pageSize = PAGESIZE.sm;
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearch = useDebouncedCallback(
		(value) => {
			setSearchTerm(value);
		},
		// delay in ms
		SEARCH_DELAY.sm
	);
	const [filter, setFilter] = useState({
		applicationTypeId: "",
		sessionId: "",
		dateFrom: "",
		dateTo: "",
		pageNumber: 1
	});
	const [dateFrom, setDateFrom] = useState("");
	const [isJupeb, setIsJupeb] = useState(false);
	const [isJupebOptions, setIsJupebOptions] = useState(false);

	const [downloadFile, setDownloadFile] = useState(false);
	const [downloadZipFile, setDownloadZipFile] = useState(false);

	const {
		control,
		handleSubmit,
		register,
		setValue,
		watch,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(Schema),
		context: {
			isDateToRequired: !!dateFrom,
			isSubjectCobinationRequired: !!isJupebOptions
		}
	});

	const watchData = watch({
		applicationTypeId: "applicationTypeId",
		jupebOptionId: "jupebOptionId"
	});

	useEffect(() => {
		setValue("jupebOptionId", null);
		setValue("subjectCombinationId", null);
	}, [watchData.applicationTypeId, setValue]);

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

	const {
		data: jupebOptions,
		isLoading: jupebOptionsLoading,
		error: jupebOptionsError
	} = useApiGet(getDepartmentJupebOptionsUrl(), {
		refetchOnWindowFocus: false,
		enabled: watchData?.applicationTypeId?.label === "JUPEB"
	});

	const {
		data: subjectCombination,
		isLoading: subjectCombinationLoading,
		error: subjectCombinationError
	} = useApiGet(
		getDepartmentJupebOptionsSubjects(watchData?.jupebOptionId?.value),
		{
			refetchOnWindowFocus: false,
			enabled: !!watchData?.jupebOptionId
		}
	);

	const {
		data: departments,
		isLoading: departmentLoading,
		error: departmentError
	} = useApiGet(getAllDepartmentsWithoutValuesUrl(), {
		refetchOnWindowFocus: false
	});

	const allSessions = [...formatSelectItems(sessions?.data, "session", "id")];
	const allApplicationTypes = formatSelectItems(
		applicatiionData?.data,
		"name",
		"id"
	);
	const allJupebOptions = formatSelectItems(
		jupebOptions?.data,
		"department",
		"departmentId"
	);

	const allSubjectComboOptions = formatSelectItems(
		subjectCombination?.data,
		"department",
		"departmentId"
	);

	const allDepartments = formatSelectItems(departments?.data, "name", "id");

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
		getApplicationReportsUrl({
			...filter,
			pageSize,
			pageNumber: filter.pageNumber,
			searchTerm
		}),
		{
			enabled: !!filter.applicationTypeId,
			keepPreviousData: true
		}
	);
	const outputTitle = `${allApplicationTypeName} Payment Report for ${sessionName} session`;
	const {
		data: file,
		isLoading: fileLoading,
		error: fileError
	} = useApiBlob(downloadApplicationReportUrl(filter), {
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
	}, [file?.data, outputTitle, fileError]);

	useEffect(() => {
		if (file && downloadFile) {
			downloadXLSFile();
		}
	}, [file, downloadFile, downloadXLSFile]);
	const {
		data: zipFile,
		isLoading: zipFileLoading,
		error: zipFileError
	} = useApiBlob(downloadApplicationDocumentsUrl(filter), {
		enabled: downloadZipFile,
		refetchOnWindowFocus: false
	});
	const downloadXLSZipFile = useCallback(async () => {
		setDownloadZipFile(true);
		if (zipFileError || !zipFile?.data) {
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
			const url = URL.createObjectURL(new Blob([zipFile.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `${outputTitle}.zip`);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			setDownloadZipFile(false);
		}
	}, [zipFile?.data, outputTitle, zipFileError]);

	useEffect(() => {
		if (file && downloadZipFile) {
			downloadXLSZipFile();
		}
	}, [file, downloadZipFile, downloadXLSZipFile]);

	useEffect(() => {
		const subscription = watch(
			({ dateFrom, applicationTypeId, jupebOptionId }) => {
				setDateFrom(dateFrom);
				setIsJupeb(applicationTypeId.label === "JUPEB");
				setIsJupebOptions(!!jupebOptionId);
			}
		);

		return () => subscription.unsubscribe();
	}, [watch]);

	if (applicationTypesLoading || sessionsLoading || departmentLoading)
		return <Spinner />;
	if (
		applicationError ||
		sessionsError ||
		applicationsError ||
		departmentError ||
		jupebOptionsError ||
		subjectCombinationError
	)
		return "An error has occurred: " + applicationError?.message;

	return (
		<section>
			<div className={styles.page_content}>
				<Form
					allSessions={allSessions}
					allApplicationTypes={allApplicationTypes}
					allJupebOptions={allJupebOptions}
					jupebOptionsLoading={jupebOptionsLoading}
					allDepartments={allDepartments}
					setFilter={setFilter}
					filter={filter}
					control={control}
					setValue={setValue}
					handleSubmit={handleSubmit}
					register={register}
					dateFrom={dateFrom}
					isLoadingFeesToAssign={isLoadingApplications}
					allSubjectCombination={allSubjectComboOptions}
					subjectCombinationLoading={subjectCombinationLoading}
					errors={errors}
					isJupeb={isJupeb}
					setPageNumber={(page) => setFilter(prev => ({ ...prev, pageNumber: page }))}
				/>
			</div>
			<div className="w-100">
				<Table
					data={
						applications?.data?.applicationReportResponse?.items ||
						[]
					}
					loading={isFetchingApplications}
					debouncedSearch={debouncedSearch}
					hasPerformedQuery={!!filter.applicationTypeId}
					setPageNumber={(page) => setFilter(prev => ({ ...prev, pageNumber: page }))}
					fileLoading={fileLoading}
					zipFileLoading={zipFileLoading}
					setDownloadFile={setDownloadFile}
					setDownloadZipFile={setDownloadZipFile}
					paginationProps={
						applications?.data?.applicationReportResponse
							?.metaData || {}
					}
					pageNumber={filter.pageNumber}
					pageSize={pageSize}
					filter={filter}
				/>
			</div>
		</section>
	);
};

export default ApplicationReports;

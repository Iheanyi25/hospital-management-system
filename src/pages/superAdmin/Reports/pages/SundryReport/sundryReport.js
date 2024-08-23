import { Spinner } from "../../../../../ui_elements";
import styles from "./style.module.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useApiBlob, useApiGet } from "../../../../../api/apiCall";
import {
	getDepartmentsUrl,
	getAllBursaryFeeInvoiceTypesUrl,
	getSundryReportsUrl,
	getAllFacultiesUrl,
	getAllSessionsUrl,
	downloadBursaryReportUrl
} from "../../../../../api/urls";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import { SundryReportForm, SundryReportTable } from "./components";
import { PAGESIZE, SEARCH_DELAY } from "../../../../../utils/constants";
import { useDebouncedCallback } from "use-debounce";
import { yupResolver } from "@hookform/resolvers/yup";
import { Schema } from "./components/schema";

const SundryReport = () => {
	const [filter, setFilter] = useState({
		facultyId: "",
		departmentId: "",
		bursaryFeeTypeId: "",
		dateFrom: "",
		dateTo: "",
		sessionId: "",
		searchTerm: ""
	});
	const pageSize = PAGESIZE.sm;
	const [pageNumber, setPageNumber] = useState(1);
	const [dateFrom, setDateFrom] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const [downloadFile, setDownloadFile] = useState(false);
	const debounced = useDebouncedCallback(
		(value) => {
			setSearchTerm(value);
		},
		// delay in ms
		SEARCH_DELAY.sm
	);
	const [facultyState, setFacultyState] = useState("");
	const {
		data: reports,
		isLoading: isLoadingReports,
		isFetching: isFetchingReports
	} = useApiGet(
		getSundryReportsUrl({ ...filter, pageSize, pageNumber, searchTerm }),
		{
			enabled: !!filter.sessionId,
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
		const subscription = watch(({ facultyId, dateFrom }) => {
			setFacultyState(facultyId?.value);
			setDateFrom(dateFrom);
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	const { data: departments, isLoading: isDepartmentLoading } = useApiGet(
		getDepartmentsUrl(facultyState),
		{
			refetchOnWindowFocus: false,
			enabled: !!facultyState
		}
	);

	const { data: faculties, isLoading: isLoadingFaculties } = useApiGet(
		getAllFacultiesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const { data: bursaryFees, isLoading: isLoadingBursaryFees } = useApiGet(
		getAllBursaryFeeInvoiceTypesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);
	const allDepartments = useMemo(
		() =>
			formatSelectItems(departments?.data, "department", "departmentId"),
		[departments?.data]
	);

	const allFaculties = formatSelectItems(faculties?.data, "name", "id");
	const allSessions = formatSelectItems(sessions?.data, "session", "id");
	const allBursaryFees = formatSelectItems(bursaryFees?.data, "name", "id");
	const {
		data: file,
		isLoading: fileLoading,
		error: fileError
	} = useApiBlob(downloadBursaryReportUrl(filter), {
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
			const outputFilename = `Sundry report ${filter.beginDate}-${filter.endDate}.xlsx`;
			// file file actions.
			const url = URL.createObjectURL(new Blob([file.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", outputFilename);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			setDownloadFile(false);
		}
	}, [file, filter, fileError]);
	useEffect(() => {
		if (file && downloadFile) {
			downloadXLSFile();
		}
	}, [file, downloadFile, downloadXLSFile]);
	if (isLoading || isLoadingFaculties || isLoadingBursaryFees)
		return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<div className={styles.container}>
			<div className={styles.page_content}>
				<div className="w-100">
					<SundryReportForm
						control={control}
						errors={errors}
						allFaculties={allFaculties}
						allSessions={allSessions}
						allBursaryFees={allBursaryFees}
						allDepartments={allDepartments}
						isDepartmentLoading={isDepartmentLoading}
						facultyState={facultyState}
						data={reports?.data?.items}
						dateFrom={dateFrom}
						setFilter={setFilter}
						handleSubmit={handleSubmit}
						register={register}
						setValue={setValue}
						isLoadingReports={isLoadingReports}
					/>
					<SundryReportTable
						data={reports?.data?.items || []}
						paginationProps={reports?.data?.metaData || {}}
						hasPerformedQuery={!!filter.sessionId}
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
				</div>
			</div>
		</div>
	);
};

export default SundryReport;

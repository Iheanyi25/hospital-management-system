import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useApiBlob, useApiGet } from "../../../../../api/apiCall";
import {
	getAllSessionsUrl,
	getPutmeApplicationReportsUrl,
	downloadPutmeApplicationReportsUrl,
	getFacultiesUrl,
	getDepartmentsUrl
} from "../../../../../api/urls";
import { Spinner } from "../../../../../ui_elements";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import { Form, Table } from "./components";
import styles from "./style.module.css";
import { PAGESIZE, SEARCH_DELAY } from "../../../../../utils/constants";
import { useDebouncedCallback } from "use-debounce";
import { findValueAndLabel } from "../../../../../utils/findValueAndLabel";
import { yupResolver } from "@hookform/resolvers/yup";
import { Schema } from "./components/schema";
import { useMemo } from "react";
import { shortDate } from "../../../../../utils/formatDate";

const PutmeReports = () => {
	const pageSize = PAGESIZE.sm;
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearch = useDebouncedCallback(
		(value) => {
			setSearchTerm(value);
		},
		// delay in ms
		SEARCH_DELAY.sm
	);
	const [pageNumber, setPageNumber] = useState(1);
	const [filter, setFilter] = useState({
		facultyId: "",
		departmentId: "",
		sessionId: "",
		dateFrom: "",
		dateTo: ""
	});
	const [facultyState, setFacultyState] = useState("");
	const [dateFrom, setDateFrom] = useState("");
	const [downloadFile, setDownloadFile] = useState(false);

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
			isDateToRequired: !!dateFrom
		}
	});

	const {
		data: sessions,
		isLoading: sessionsLoading,
		error: sessionsError
	} = useApiGet(getAllSessionsUrl(), {
		refetchOnWindowFocus: false
	});

	const { data: faculties, isLoading: isLoadingFaculties } = useApiGet(
		getFacultiesUrl(1),
		{
			refetchOnWindowFocus: false
		}
	);
	const { data: departments, isLoading: isDepartmentLoading } = useApiGet(
		getDepartmentsUrl(facultyState),
		{
			refetchOnWindowFocus: false,
			enabled: !!facultyState
		}
	);
	const allFaculties = formatSelectItems(faculties?.data, "name", "id");
	const allSessions = formatSelectItems(sessions?.data, "session", "id");
	const allDepartments = useMemo(
		() =>
			formatSelectItems(departments?.data, "department", "departmentId"),
		[departments?.data]
	);
	const faculty = findValueAndLabel(filter?.facultyId, allFaculties)?.label;
	const sessionName = findValueAndLabel(
		filter?.sessionId,
		allSessions
	)?.label;
	const department = findValueAndLabel(
		filter?.departmentId,
		allDepartments
	)?.label;
	const {
		data: applications,
		isLoading: isLoadingApplications,
		isFetching: isFetchingApplications,
		error: applicationsError
	} = useApiGet(
		getPutmeApplicationReportsUrl({
			...filter,
			pageSize,
			pageNumber,
			searchTerm
		}),
		{
			enabled: !!filter.sessionId,
			keepPreviousData: true
		}
	);
	const outputTitle = `PUTME Report ${
		department
			? `for the department of ${department}`
			: faculty
			? `for the ${faculty}`
			: "for all Faculties"
	} for ${sessionName} session${
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
	} = useApiBlob(downloadPutmeApplicationReportsUrl(filter), {
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

	useEffect(() => {
		const subscription = watch(({ facultyId, dateFrom }) => {
			setFacultyState(facultyId?.value);
			setDateFrom(dateFrom);
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	const onFacultyChange = (value) => {
		setFacultyState(value.value);
		setValue("facultyId", value);
		setValue("departmentId", null);
	};
	if (sessionsLoading || isLoadingFaculties) return <Spinner />;
	if (sessionsError || applicationsError)
		return "An error has occurred: " + sessionsError?.message;

	return (
		<section>
			<div className={styles.page_content}>
				<Form
					allSessions={allSessions}
					allFaculties={allFaculties}
					setFilter={setFilter}
					onFacultyChange={onFacultyChange}
					isDepartmentLoading={isDepartmentLoading}
					allDepartments={allDepartments}
					facultyState={facultyState}
					filter={filter}
					control={control}
					setValue={setValue}
					handleSubmit={handleSubmit}
					register={register}
					dateFrom={dateFrom}
					isLoadingFeesToAssign={isLoadingApplications}
					errors={errors}
					setPageNumber={setPageNumber}
				/>
			</div>
			<div className="w-100">
				<Table
					data={applications?.data?.items || []}
					loading={isFetchingApplications}
					debouncedSearch={debouncedSearch}
					hasPerformedQuery={!!filter.sessionId}
					setPageNumber={setPageNumber}
					fileLoading={fileLoading}
					setDownloadFile={setDownloadFile}
					paginationProps={applications?.data?.metaData || {}}
					pageNumber={pageNumber}
					pageSize={pageSize}
					filter={filter}
				/>
			</div>
		</section>
	);
};

export default PutmeReports;

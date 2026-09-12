import { Spinner } from "../../../../../ui_elements";
import styles from "./style.module.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useApiBlob, useApiGet } from "../../../../../api/apiCall";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	getFacultiesUrl,
	getAllSessionsUrl,
	getDepartmentsUrl,
	getStudentTypesUrl,
	getSchoolFeesPaymentTypesUrl,
	getPaymentPurposeUrl,
	getFeesReportUrl,
	downloadFeesReportUrl
} from "../../../../../api/urls";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import {
	PaymentReportsChart,
	PaymentReportsForm,
	PaymentReportsTable,
	Schema,
	Summary
} from "./components";
import { PAGESIZE, SEARCH_DELAY } from "../../../../../utils/constants";
import { useDebouncedCallback } from "use-debounce";
import Tabs, { Tab, TabList, TabPanel } from "@atlaskit/tabs";
import { findValueAndLabel } from "../../../../../utils/findValueAndLabel";
import { shortDate } from "../../../../../utils/formatDate";

const PaymentReports = () => {
	const [filter, setFilter] = useState({
		studentTypeId: "",
		paymentPurposeId: "",
		paymentTypeId: "",
		sessionId: "",
		facultyId: "",
		departmentId: "",
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
	const [facultyState, setFacultyState] = useState("");
	const [studentTypeState, setStudentTypeState] = useState("");
	const [dateFrom, setDateFrom] = useState("");
	const {
		data: reports,
		isLoading: isLoadingReports,
		isFetching: isFetchingReports
	} = useApiGet(
		getFeesReportUrl({
			...filter,
			pageSize,
			pageNumber,
			searchTerm
		}),
		{
			enabled: !!filter.studentTypeId,
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
		const subscription = watch(({ facultyId, studentTypeId, dateFrom }) => {
			setFacultyState(facultyId?.value);
			setStudentTypeState(studentTypeId?.value);
			setDateFrom(dateFrom);
		});
		return () => subscription.unsubscribe();
	}, [watch]);
	const { data: studentTypes, isLoading: isLoadingStudentTypes } = useApiGet(
		getStudentTypesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);
	const { data: paymentPurposes, isLoading: isLoadingPaymentPurposes } =
		useApiGet(getPaymentPurposeUrl(), {
			refetchOnWindowFocus: false
		});
	const { data: departments, isLoading: isDepartmentLoading } = useApiGet(
		getDepartmentsUrl(studentTypeState, facultyState),
		{
			refetchOnWindowFocus: false
		}
	);
	const { data: faculties, isLoading: isLoadingFaculties } = useApiGet(
		getFacultiesUrl(studentTypeState),
		{
			refetchOnWindowFocus: false
		}
	);
	const {
		data: paymentTypes,
		isLoading: isPaymentTypesLoading,
		error: paymentTypesError
	} = useApiGet(getSchoolFeesPaymentTypesUrl(), {
		refetchOnWindowFocus: false
	});

	const allDepartments = useMemo(
		() =>
			formatSelectItems(departments?.data, "department", "departmentId"),
		[departments?.data]
	);
	const allObj = { value: "0", label: "All" };
	const allFaculties = formatSelectItems(faculties?.data, "name", "id");
	const allStudentTypes = formatSelectItems(studentTypes?.data, "name", "id");
	const allSessions = [
		allObj,
		...formatSelectItems(sessions?.data, "session", "id")
	];
	const allPaymentTypes = formatSelectItems(paymentTypes?.data, "name", "id");
	const allPaymentPurposes = formatSelectItems(
		paymentPurposes?.data,
		"name",
		"id"
	);

	const studentType = findValueAndLabel(
		filter?.studentTypeId,
		allStudentTypes
	)?.label;
	const paymentPuporse = findValueAndLabel(
		filter?.paymentPurposeId,
		allPaymentPurposes
	)?.label;
	const faculty = findValueAndLabel(filter?.facultyId, allFaculties)?.label;
	const sessionName = findValueAndLabel(
		filter?.sessionId,
		allSessions
	)?.label;
	const department = findValueAndLabel(
		filter?.departmentId,
		allDepartments
	)?.label;

	const outputTitle = `${studentType} ${paymentPuporse} Payment Report ${
		department
			? `for the department of ${department}`
			: faculty
			? `for the faculty of ${faculty}`
			: "for all faculties"
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
	} = useApiBlob(downloadFeesReportUrl(filter), {
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
	const onFacultyChange = (value) => {
		setFacultyState(value.value);
		setValue("facultyId", value);
		setValue("departmentId", null);
	};

	const onStudentTypeChange = (value) => {
		setStudentTypeState(value.value);
		setValue("studentTypeId", value);
		setValue("facultyId", null);
		setValue("departmentId", null);
	};
	if (
		isLoading ||
		isLoadingStudentTypes ||
		isPaymentTypesLoading ||
		isLoadingPaymentPurposes
	)
		return <Spinner />;
	if (error || paymentTypesError)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<div className={styles.container}>
			<div className={styles.page_content}>
				<div className="w-100">
					<PaymentReportsForm
						control={control}
						errors={errors}
						allFaculties={allFaculties}
						allStudentTypes={allStudentTypes}
						allPaymentTypes={allPaymentTypes}
						allPaymentPurposes={allPaymentPurposes}
						allSessions={allSessions}
						allDepartments={allDepartments}
						isDepartmentLoading={isDepartmentLoading}
						isLoadingFaculties={isLoadingFaculties}
						facultyState={facultyState}
						studentTypeState={studentTypeState}
						data={reports?.data?.items}
						setFilter={setFilter}
						onStudentTypeChange={onStudentTypeChange}
						onFacultyChange={onFacultyChange}
						setValue={setValue}
						handleSubmit={handleSubmit}
						register={register}
						dateFrom={dateFrom}
						isLoadingReports={isLoadingReports}
						setPageNumber={setPageNumber}
					/>
					<Tabs id="default">
						<div className="my-5">
							<TabList>
								<Tab>Table</Tab>
								<Tab>Chart</Tab>
								<Tab>Summary</Tab>
							</TabList>
						</div>
						<TabPanel>
							<div className="w-100">
								<PaymentReportsTable
									data={
										reports?.data?.studentData?.items || []
									}
									paginationProps={
										reports?.data?.studentData?.metaData ||
										{}
									}
									hasPerformedQuery={!!filter.studentTypeId}
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
						</TabPanel>
						<TabPanel>
							<div className="w-100">
								<PaymentReportsChart
									reports={reports?.data?.groupSummary}
									outputTitle={outputTitle}
									loading={isFetchingReports}
								/>
							</div>
						</TabPanel>
						<TabPanel>
							{reports?.data ? (
								<div className="w-100">
									<Summary
										reports={reports?.data}
										loading={isFetchingReports}
									/>
								</div>
							) : (
								<>No summary avaialable!</>
							)}
						</TabPanel>
					</Tabs>
				</div>
			</div>
		</div>
	);
};

export default PaymentReports;

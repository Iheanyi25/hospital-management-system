import { useState } from "react";
import { useForm } from "react-hook-form";
import { useApiGet } from "../../../../../api/apiCall";
import {
	getAllSessionsUrl,
	getAllJupebApplicationsUrl,
	getJupebApplicationTypesUrl,
} from "../../../../../api/urls";
import { Spinner, CenteredDialog } from "../../../../../ui_elements";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import { DocumentModal, Form, Table } from "./components";
import styles from "./style.module.css";
import Tabs, { Tab, TabList, TabPanel } from "@atlaskit/tabs";
import { PAGESIZE, SEARCH_DELAY } from "../../../../../utils/constants";
import { useDebouncedCallback } from "use-debounce";

const tabValues = {
	1: null,
	2: "unapproved",
	3: "approved"
};
const JupebReports = () => {
	const [editOpen, setEditOpen] = useState(false);
	const pageSize = PAGESIZE.sm;
	const [searchTerm, setSearchTerm] = useState("");
	const [admissionStatus, setAdmissionStatus] = useState(null);
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
	const [editData, setEditData] = useState({});

	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm();
	const {
		data: applicatiionData,
		isLoading: applicationTypesLoading,
		error: applicationError
	} = useApiGet(getJupebApplicationTypesUrl());

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
	const {
		data: applications,
		isLoading: isLoadingApplications,
		isFetching: isFetchingApplications,
		error: applicationsError
	} = useApiGet(
		getAllJupebApplicationsUrl({
			...filter,
			pageSize,
			pageNumber,
			admissionStatus,
			searchTerm
		}),
		{
			enabled: !!filter.applicationTypeId,
			keepPreviousData: true
		}
	);

	if (applicationTypesLoading || sessionsLoading) return <Spinner />;
	if (applicationError || sessionsError || applicationsError)
		return "An error has occurred: " + applicationError?.message;

	return (
		<section>
			<CenteredDialog
				modalId="edit_school_fees"
				isOpen={editOpen}
				closeModal={() => setEditOpen(false)}
				width={705}
				formTitle="Document Viewer"
			>
				<DocumentModal
					data={editData}
					filter={filter}
					closeModal={() => setEditOpen(false)}
				/>
			</CenteredDialog>
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
					setPageNumber={setPageNumber}
				/>
			</div>
			<Tabs
				id="default"
				onChange={(index) => setAdmissionStatus(tabValues[index + 1])}
			>
				<div className="my-5">
					<TabList>
						<Tab>{`All (${
							applications?.data?.numberOfApplicants ?? "0"
						})`}</Tab>
						<Tab>{`Pending Approval (${
							applications?.data?.numberOfPendingApplicants ?? "0"
						})`}</Tab>
						<Tab>{`Admitted (${
							applications?.data?.numberOfAdmittedApplicants ??
							"0"
						})`}</Tab>
					</TabList>
				</div>
				<TabPanel>
					<div className="w-100">
						<Table
							data={
								applications?.data?.applicationForms?.items ||
								[]
							}
							loading={isFetchingApplications}
							setEditOpen={setEditOpen}
							filter={filter}
							admissionStatus={admissionStatus}
							searchTerm={searchTerm}
							setEditData={setEditData}
							debouncedSearch={debouncedSearch}
							hasPerformedQuery={!!filter.applicationTypeId}
							setPageNumber={setPageNumber}
							paginationProps={
								applications?.data?.applicationForms
									?.metaData || {}
							}
							pageNumber={pageNumber}
							pageSize={pageSize}
						/>
					</div>
				</TabPanel>
				<TabPanel>
					<div className="w-100">
						<Table
							data={
								applications?.data?.applicationForms?.items ||
								[]
							}
							loading={isFetchingApplications}
							filter={filter}
							admissionStatus={admissionStatus}
							searchTerm={searchTerm}
							setEditOpen={setEditOpen}
							setEditData={setEditData}
							debouncedSearch={debouncedSearch}
							hasPerformedQuery={!!filter.applicationTypeId}
							paginationProps={
								applications?.data?.applicationForms
									?.metaData || {}
							}
							pageNumber={pageNumber}
							pageSize={pageSize}
							setPageNumber={setPageNumber}
						/>
					</div>
				</TabPanel>
				<TabPanel>
					<div className="w-100">
						<Table
							data={
								applications?.data?.applicationForms?.items ||
								[]
							}
							loading={isFetchingApplications}
							filter={filter}
							admissionStatus={admissionStatus}
							searchTerm={searchTerm}
							setEditOpen={setEditOpen}
							setEditData={setEditData}
							debouncedSearch={debouncedSearch}
							hasPerformedQuery={!!filter.applicationTypeId}
							paginationProps={
								applications?.data?.applicationForms
									?.metaData || {}
							}
							pageNumber={pageNumber}
							pageSize={pageSize}
							setPageNumber={setPageNumber}
						/>
					</div>
				</TabPanel>
			</Tabs>
		</section>
	);
};

export default JupebReports;

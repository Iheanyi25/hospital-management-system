import { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory, useLocation, } from "react-router";
import {
	PageTitle,
	Button,
	TMTable,
	Breadcrumbs,
	Spinner,
	DefaultScreen,
	Badge,
	Search,
} from "../../../../../ui_elements";
import styles from "./style.module.css";
import {
	approveAllCoursesUrl,
	downloadAdviserClassListUrl,
	getAdviserClassListUrl
} from "../../../../../api/urls";
import Tabs, { Tab, TabList, TabPanel } from "@atlaskit/tabs";
import { useApiBlob, useApiGet, useApiPost } from "../../../../../api/apiCall";
import { PAGESIZE, SEARCH_DELAY } from "../../../../../utils/constants";
import { useDebouncedCallback } from "use-debounce";
import { useQueryClient } from 'react-query';

const ViewRecords = () => {
	const { push, goBack } = useHistory();
	const location = useLocation();
	const [pageNumber, setPageNumber] = useState(1);
	const [approved, setApproved] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearch = useDebouncedCallback(
		(value) => {
			setSearchTerm(value);
		},
		// delay in ms
		SEARCH_DELAY.sm
	);
	const [downloadFile, setDownloadFile] = useState(false);
	const queryClient = useQueryClient()

	const pageSize = PAGESIZE.sm;
	const {
		data: lecturerClasses,
		isLoading,
		isFetching,
		error
	} = useApiGet(
		getAdviserClassListUrl({
			sessionId: location.state?.session.value,
			semesterId: location.state?.semester?.value,
			approved: approved,
			pageNumber,
			pageSize,
			searchTerm
		}),
		{
			enabled: true,
			keepPreviousData: true
		}
	);

	const { mutate: approveAll, isLoading: isApproving } = useApiPost()

	const handleApproveAll = () => {
		const requestDet = {
			url: approveAllCoursesUrl(),
			data: {
				sessionId: location.state?.session.value,
				semesterId: location.state?.semester?.value,
				approved: true
			}
		}
		return approveAll(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getAdviserClassListUrl({
						sessionId: location.state?.session.value,
						semesterId: location.state?.semester?.value,
						approved: approved,
						pageNumber,
						pageSize,
						searchTerm
					})
				)
				const successFlag = window.AJS.flag({
					type: "success",
					title: "All Course Approved!",
					body: "You have successfully approved all courses."
				});
				setTimeout(() => {
					successFlag.close();
				}, 3000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Approval Action Failed!",
					body:
						response?.data?.message || `Coudn't approve all records!`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 3000);
			}
		})
	}

	const crumbItems = [
		{
			name: "My Class",
			path: "/class"
		},
		{
			name: "View Records",
			path: "/"
		}
	];
	if (!location.state) push("/class");

	const {
		data: file,
		isLoading: fileLoading,
		error: fileError
	} = useApiBlob(
		downloadAdviserClassListUrl({
			sessionId: location.state?.session.value,
			semesterId: location.state?.semester?.value
		}),
		{
			enabled: downloadFile,
			refetchOnWindowFocus: false
		}
	);

	const handleApproveType = (value) => {
		setApproved(value);
	}

	const downloadXLSFile = useCallback(async () => {
		setDownloadFile(true);
		if (fileError || !file?.data) {
			const errorFlag = window.AJS.flag({
				type: "error",
				title: `Failed To Download `,
				body: `Couldn't download template`
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		} else {
			const outputFilename = `Class List.xlsx`;
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
				title: "Template download successful"
			});
			setTimeout(() => {
				successFlag.close();
			}, 5000);
			setDownloadFile(false);
		}
	}, [file, fileError]);
	useEffect(() => {
		if (file && downloadFile) {
			downloadXLSFile();
		}
	}, [file, downloadFile, downloadXLSFile]);

	if (isLoading)
		return (
			<div className={styles.page_content}>
				<Spinner />
			</div>
		);
	return (
		<div className={styles.container}>
			<Breadcrumbs crumbs={crumbItems} />
			<PageTitle
				title={`${lecturerClasses?.data?.details ?? ""}`}
				buttonGroup={
					<>
						<Button
							data-cy="download_excel_temp"
							label="Download Class List"
							buttonClass="primary"
							type="button"
							onClick={() => setDownloadFile(true)}
							loading={fileLoading}
						/>
						<Button
							data-cy="back"
							label="Back"
							buttonClass="standard"
							onClick={() => goBack()}
						/>
					</>
				}
			/>


			<Tabs id="default">
				<div className="mt-5">
					<TabList>
						<div onClick={() => handleApproveType("")}>
							<Tab>All {`(${lecturerClasses?.data?.pending + lecturerClasses?.data?.approved})`}</Tab>
						</div>
						<div onClick={() => handleApproveType("false")}>
							<Tab>Pending {`(${lecturerClasses?.data?.pending})`}</Tab>
						</div>
						<div onClick={() => handleApproveType("true")}>
							<Tab>Approved {`(${lecturerClasses?.data?.approved})`}</Tab>
						</div>
					</TabList>
				</div>
				<TabPanel>
					<div className="w-100">
						<DisplayTable
							data={lecturerClasses?.data?.classList}
							title={lecturerClasses?.data?.details}
							isLoading={isLoading}
							setPageNumber={setPageNumber}
							pageNumber={pageNumber}
							pageSize={pageSize}
							isFetching={isFetching}
							debouncedSearch={debouncedSearch}
							error={error}
						/>
					</div>
				</TabPanel>
				<TabPanel>
					<div className="w-100">
						<DisplayTable
							data={lecturerClasses?.data?.classList}
							title={lecturerClasses?.data?.details}
							isLoading={isLoading}
							setPageNumber={setPageNumber}
							pageNumber={pageNumber}
							pageSize={pageSize}
							isFetching={isFetching}
							handleApproveAll={handleApproveAll}
							approved={approved}
							isApproving={isApproving}
							debouncedSearch={debouncedSearch}
							error={error}
						/>
					</div>
				</TabPanel>
				<TabPanel>
					<div className="w-100">
						<DisplayTable
							data={lecturerClasses?.data?.classList}
							title={lecturerClasses?.data?.details}
							isLoading={isLoading}
							setPageNumber={setPageNumber}
							pageNumber={pageNumber}
							pageSize={pageSize}
							isFetching={isFetching}
							debouncedSearch={debouncedSearch}
							error={error}
						/>
					</div>
				</TabPanel>
			</Tabs>



		</div>
	);
};

const DisplayTable = ({
	data,
	title,
	error,
	setPageNumber,
	isApproving,
	isLoading,
	handleApproveAll,
	approved,
	pageSize,
	isFetching,
	pageNumber,
	debouncedSearch
}) => {
	const history = useHistory();
	const location = useLocation();
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
				Header: "Matric No",
				accessor: "matricNumber"
			},
			{
				Header: "Full Name",
				accessor: "fullName"
			},
			{
				Header: "Courses Registered",
				accessor: "coursesRegistered"
			},
			{
				Header: "Course Approval",
				accessor: "courseApproval",
				Cell: ({ cell: { row } }) => (
					<Badge
						item={{
							title: row?.original?.courseApproval,
							type: statusOptions[row?.original?.courseApproval]
						}}
					/>
				)
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => {
					const nextPageCrumbs = [
						{
							name: "Class List",
							path: "/class"
						},
						{
							name: title ?? "",
							path: "/class/view",
							state: location?.state
						},
						{
							name: "Registered Courses",
							path: "/"
						}
					];
					const nextResultPageCrumbs = [
						{
							name: "Class List",
							path: "/class"
						},
						{
							name: title ?? "",
							path: "/class/view",
							state: location?.state
						},
						{
							name: "Results",
							path: "/class/results"
						}
					];
					return (
						<div className="d-flex justify-content-center align-items-center">
							<Button
								data-cy="results"
								label="View Courses"
								buttonClass="standard"
								onClick={() =>
									history.push({
										pathname: "/class/approve_courses",
										state: {
											data: row.original,
											crumbs: nextPageCrumbs
										}
									})}
								disabled={row.original.coursesRegistered <= 0}
							/>
							<Button
								data-cy="results"
								label="View Results"
								buttonClass="standard-two"
								onClick={() =>
									history.push({
										pathname: "/class/results",
										state: {
											data: row.original,
											crumbs: nextResultPageCrumbs
										}
									})
								}
								disabled={
									row.original.coursesRegistered <= 0 ||
									!row.original.hasResult
								}
							/>
						</div>
					);
				}
			}
		],
		[history, title, location, pageNumber, pageSize]
	);

	if (error)
		return (
			<div className={styles.page_content}>
				<DefaultScreen
					title="An Error Occured!"
					message={error?.response?.data?.message}
				/>
			</div>
		);
	return (
		<div className={styles.content}>
			{
				(approved === "false" && data?.items.length > 0) &&
				<div className="d-flex justify-content-end mb-4">
					<Button
						data-cy="download_excel_temp"
						label="Approve All Courses"
						buttonClass="primary"
						type="button"
						onClick={handleApproveAll}
						loading={isApproving}
					/>
				</div>
			}

			{data?.items.length > 0 ? (
				<TMTable
					columns={columns}
					data={data?.items}
					title={title}
					metaData={data?.metaData}
					additonalTitleData={
						<div className="d-flex align-items-center">
							<Search
								placeholder="Search student"
								onChange={(e) => {
									debouncedSearch(e.target.value);
									setPageNumber(1);
								}}
							/>
						</div>
					}
					availablePages={data?.metaData?.totalPages || {}}
					setPageNumber={setPageNumber}
					loading={isFetching}
				/>
			) : (
				<div className={styles.page_content}>
					<DefaultScreen
						title="No Students Found"
						message={`We found no students for the selected semester and session.`}
					/>
				</div>
			)}
		</div>
	);
};
const statusOptions = {
	Unapproved: "unapproved",
	Approved: "success",
	"Pending Approval": "warning"
};

export default ViewRecords;

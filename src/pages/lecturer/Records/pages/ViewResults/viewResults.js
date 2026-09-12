import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import Modal from "react-modal";
import { useHistory, useLocation } from "react-router-dom";
import {
	DefaultScreen,
	PageTitle,
	Button,
	Breadcrumbs,
	CenteredDialog,
	TMTable,
	Badge,
	Spinner
} from "../../../../../ui_elements";
import { UploadModal } from "./components";
import styles from "./style.module.css";
import { useApiGet, useApiBlob } from "../../../../../api/apiCall";
import {
	downloadScoreSheetUrl,
	getResultsUrl,
	getGradeSheetUrl
} from "../../../../../api/urls";
import { useReactToPrint } from "react-to-print";
import { ResultPrintOut } from "../../../../../ui_elements";
import { PAGESIZE } from "../../../../../utils/constants";

const pageStyle = `
  @page {
    // size: 80mm 50mm;
    margin-top: 3rem;
    margin-left: 3rem;
  }

  // @media all {
  //   .pagebreak {
  //     display: none;
  //   }
  // }

  @media print {
    .pagebreak {
      // page-break-before: always;

    }
  }
`;

Modal.setAppElement("#root");
const ViewResults = () => {
	const [downloadFile, setDownloadFile] = useState(false);
	const [downloadGradeSheet, setDownloadGradeSheet] = useState(false);
	const [uploaded, setUploaded] = useState(false);
	const [open, setOpen] = useState(false);
	const { goBack } = useHistory();
	const [pageNumber, setPageNumber] = useState(1);
	const pageSize = PAGESIZE.md;
	const location = useLocation();

	const componentRef = useRef();

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
		pageStyle
	});

	if (!location.state) goBack();
	const { data, isLoading, isFetching, error } = useApiGet(
		getResultsUrl({
			departmentCourseId: location.state?.id,
			sessionId: location.state?.session,
			pageSize,
			pageNumber
		}),
		{
			keepPreviousData: true
		}
	);

	const {
		data: file,
		isLoading: fileLoading,
		error: fileError
	} = useApiBlob(
		downloadScoreSheetUrl({
			departmentCourseId: location.state?.id,
			sessionId: location.state?.session
		}),
		{
			enabled: downloadFile,
			refetchOnWindowFocus: false
		}
	);

	const {
		data: gradeSheet,
		isLoading: loadingGradeSheet,
		error: requestError
	} = useApiGet(
		getGradeSheetUrl({
			departmentCourseId: location.state?.id,
			sessionId: location.state?.session
		}),
		{
			enabled: !!downloadGradeSheet,
			refetchOnWindowFocus: false
		}
	);

	useEffect(() => {
		if (gradeSheet?.success && downloadGradeSheet && !loadingGradeSheet) {
			setDownloadGradeSheet(false);
			setTimeout(() => {
				handlePrint();
			}, 1000);
		}
		if (requestError && downloadGradeSheet && !loadingGradeSheet) {
			setDownloadGradeSheet(false);
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Invalid Action!",
				body:
					requestError?.response?.data?.message ||
					`Gradesheet could not be downloaded`
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		}
	}, [
		gradeSheet,
		requestError,
		loadingGradeSheet,
		handlePrint,
		downloadGradeSheet
	]);
	const title = `${data?.data?.code} for ${data?.data?.department} ${
		data?.data?.departmentOption ? `(${data?.data?.departmentOption})` : ""
	}`;
	const downloadXLSFile = useCallback(async () => {
		setDownloadFile(true);
		if (fileError || !file?.data) {
			const errorFlag = window.AJS.flag({
				type: "error",
				title: `Failed To Download `,
				body: `Couldn't download results`
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		} else {
			const outputFilename = `${title} results.xlsx`;
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
				title: "Scoresheet download successful"
			});
			setTimeout(() => {
				successFlag.close();
			}, 5000);
			setDownloadFile(false);
		}
	}, [file, fileError, title]);
	useEffect(() => {
		if (file && downloadFile) {
			downloadXLSFile();
		}
	}, [file, downloadFile, downloadXLSFile]);
	const crumbItems = [
		{
			name: "My Courses",
			path: "/records"
		},
		{
			name: "View Records",
			path: "/records/view",
			state: {
				session: { value: location.state?.session },
				semester: { value: location.state?.semester }
			}
		},
		{
			name: "Results",
			path: "/"
		}
	];
	const scenario = {
		title: "Upload results",
		message:
			"Download the score sheet by clicking the button below. Fill in the results of your students and upload.",
		buttonGroup: (
			<>
				<Button
					data-cy="upload_result"
					label="Upload Result"
					buttonClass="primary"
					onClick={() => setOpen(true)}
				/>
				<Button
					data-cy="download_sheet"
					label="Download Scoresheet"
					buttonClass="standard"
					onClick={() => setDownloadFile(true)}
					loading={fileLoading}
				/>
			</>
		)
	};

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
				Header: "CA Score",
				accessor: "ca",
				Cell: ({ cell: { row } }) => <div>{row.original.ca || "-"}</div>
			},
			{
				Header: "Exam",
				accessor: "exam",
				Cell: ({ cell: { row } }) => (
					<div>{row.original.exam || "-"}</div>
				)
			},
			{
				Header: "Lab",
				accessor: "lab",
				Cell: ({ cell: { row } }) => (
					<div>{row.original.lab || "-"}</div>
				)
			},
			{
				Header: "Total",
				accessor: "total"
			},
			{
				Header: "Grade",
				accessor: "grade",
				Cell: ({ cell: { row } }) => (
					<div>{row.original.grade || "-"}</div>
				)
			},
			{
				Header: "Remarks",
				accessor: "session",
				Cell: ({ cell: { row } }) => (
					<div>{row.original.remarks || "-"}</div>
				)
			}
		],
		[pageNumber, pageSize]
	);

	if (isLoading) return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<div className={styles.container}>
			<CenteredDialog
				modalId="upload-result"
				isOpen={open}
				closeModal={() => setOpen(false)}
				width={uploaded ? "90vw" : null}
			>
				<UploadModal
					uploaded={uploaded}
					setUploaded={setUploaded}
					courseCode={data?.data?.code}
					academicYearDetails={location.state}
					setUploadResultModal={setOpen}
					setDownloadFile={setDownloadFile}
					currentState={{
						departmentCourseId: location.state?.id,
						sessionId: location.state?.session,
						pageSize,
						pageNumber
					}}
					loading={fileLoading}
				/>
			</CenteredDialog>
			<div className="d-none">
				<div ref={componentRef}>
					<ResultPrintOut resultData={gradeSheet?.data} />
				</div>
			</div>
			<Breadcrumbs crumbs={crumbItems} />
			<PageTitle
				title={`Results for ${title}`}
				buttonGroup={
					<>
						{data?.data?.studentGrades?.items.length === 0 ? (
							<Button
								data-cy="back"
								label="Back"
								buttonClass="standard"
								onClick={() => goBack()}
							/>
						) : (
							<div>
								<Button
									data-cy="download_grade"
									label="Download Gradesheet"
									buttonClass="primary"
									disabled={data?.data?.status === "Rejected"}
									onClick={() => setDownloadGradeSheet(true)}
									loading={loadingGradeSheet}
								/>
								<Button
									data-cy="upload_result"
									label="Upload Result"
									buttonClass="standard"
									disabled={data?.data?.status === "Approved"}
									onClick={() => setOpen(true)}
								/>
							</div>
						)}
					</>
				}
			/>

			<Badge
				item={{
					title: data?.data?.status,
					type: statusOptions[data?.data?.status]
				}}
			/>

			{data?.data.studentGrades?.items.length === 0 ? (
				<div className={styles.page_content}>
					<DefaultScreen
						title={scenario.title}
						message={scenario.message}
						buttonGroup={scenario.buttonGroup}
					/>
				</div>
			) : (
				<div className={styles.content}>
					<TMTable
						columns={columns}
						data={data?.data?.studentGrades?.items}
						availablePages={
							data?.data?.studentGrades?.metaData.totalPages
						}
						loading={isFetching}
						setPageNumber={setPageNumber}
						title={`Uploaded results`}
					/>
				</div>
			)}
		</div>
	);
};

const statusOptions = {
	"Pending Approval from HOD": "unapproved",
	Approved: "success",
	Rejected: "fail",
	"Results yet to be uploaded": "warning"
};

export default ViewResults;

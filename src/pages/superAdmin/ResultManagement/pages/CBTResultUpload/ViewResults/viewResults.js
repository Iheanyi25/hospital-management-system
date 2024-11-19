import {
	PageTitle,
	Breadcrumbs,
	Button,
	Badge,
	CenteredDialog,
	ResultTitle,
	Spinner,
	TMTable,
	ResultPrintOut
} from "../../../../../ui_elements";
import { EditStatus } from "./components";
import { useMemo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useApiGet } from "../../../../../api/apiCall";
import {
	getGradeSheetUrl,
	getSingleResultToManageUrl
} from "../../../../../api/urls";
import { PAGESIZE } from "../../../../../utils/constants";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

const pageStyle = `
  @page {
    // size: 80mm 50mm;
    margin-top: 10rem;
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

const ViewResultsUploaded = () => {
	const [editOpen, setEditOpen] = useState(false);
	const [downloadGradeSheet, setDownloadGradeSheet] = useState(false);
	const { state } = useLocation();

	const [pageNumber, setPageNumber] = useState(1);
	const ref = useRef();
	const pageSize = PAGESIZE.md;
	const crumbs = [
		{
			name: "Class list",
			path: "/results/classlist",
			search: new URLSearchParams(state?.searchParams).toString()
		},
		{
			name: "Results",
			path: ""
		}
	];
	const handlePrint = useReactToPrint({
		content: () => ref.current,
		pageStyle: pageStyle
	});

	const {
		data: gradeSheet,
		isLoading: loadingGradeSheet,
		error: requestError
	} = useApiGet(
		getGradeSheetUrl({
			departmentCourseId: state?.data?.id,
			sessionId: state?.sessionId
		}),
		{
			enabled: !!downloadGradeSheet,
			refetchOnWindowFocus: true
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
		downloadGradeSheet,
		handlePrint
	]);

	const { data, isLoading, isFetching, error } = useApiGet(
		getSingleResultToManageUrl({
			sessionId: state?.sessionId,
			id: state?.data?.id,
			pageNumber,
			pageSize
		}),
		{
			keepPreviousData: true,
			refetchOnWindowFocus: false
		}
	);

	const details = [
		{ title: "Faculty", value: data?.data?.faculty },
		{ title: "Course unit", value: data?.data?.courseUnit },
		{ title: "Department", value: data?.data?.department },
		{ title: "Programme", value: data?.data?.programme },
		{ title: "Course title", value: data?.data?.courseTitle },
		{ title: "Session", value: data?.data?.session },
		{ title: "Course code", value: data?.data?.courseCode },
		{ title: "Semester", value: data?.data?.semester }
	];

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
				accessor: "test"
			},
			{
				Header: "Exam",
				accessor: "exam"
			},
			{
				Header: "Total",
				accessor: "total"
			},
			{
				Header: "Grade",
				accessor: "grade"
			},
			{
				Header: "Remarks",
				accessor: "remarks"
			}
		],
		[pageNumber, pageSize]
	);

	if (isLoading) return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<section>
			<CenteredDialog
				modalId="edit_course"
				isOpen={editOpen}
				closeModal={() => setEditOpen(false)}
				width={605}
				formTitle="Edit result status"
			>
				<EditStatus
					closeModal={() => setEditOpen(false)}
					currentState={{
						sessionId: state?.data?.sessionId,
						id: state?.data?.id,
						pageNumber,
						pageSize
					}}
					courseCode={data?.data?.courseCode}
					departmentId={state?.searchParams?.departmentId}
				/>
			</CenteredDialog>
			<div className="d-none">
				<div ref={ref}>
					<ResultPrintOut resultData={gradeSheet?.data} />
				</div>
			</div>
			<Breadcrumbs crumbs={crumbs} />
			<PageTitle
				title={`Results for ${data?.data?.courseCode}`}
				buttonGroup={
					<>
						<Button
							data-cy="edit_stats"
							buttonClass="primary"
							label="Edit result status"
							onClick={() => setEditOpen(true)}
							disabled={data?.data?.status === "No Result"}
						/>
						<Button
							data-cy="print_res"
							buttonClass="standard"
							label="Print"
							onClick={() => setDownloadGradeSheet(true)}
							loading={loadingGradeSheet}
							disabled={data?.data?.status === "No Result"}
						/>
					</>
				}
			/>
			<Badge
				item={{
					title: data?.data?.status,
					type:
						data?.data?.status === "Approved"
							? "success"
							: data?.data?.status === "Pending Approval"
							? "warning"
							: "fail"
				}}
			/>
			<div>
				<div>
					<ResultTitle details={details} />
				</div>

				<div className="mt-5">
					<TMTable
						columns={columns}
						data={data?.data?.studentGrades?.items || []}
						title="Course List"
						availablePages={
							data?.data?.studentGrades?.metaData?.totalPages
						}
						setPageNumber={setPageNumber}
						loading={isLoading || isFetching}
						customEmptyStateMessage={
							data?.data?.status === "No Result"
								? data?.data?.status + " Found"
								: null
						}
						// hasPerformedQuery={hasPerformedQuery}
					/>
				</div>
			</div>
		</section>
	);
};

export default ViewResultsUploaded;

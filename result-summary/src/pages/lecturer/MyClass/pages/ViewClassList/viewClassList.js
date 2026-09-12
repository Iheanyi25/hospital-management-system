import { useMemo, useEffect, useState, useCallback } from "react";
import {
	PageTitle,
	Button,
	TMTable,
	Breadcrumbs,
	Spinner
} from "../../../../../ui_elements";
import styles from "./style.module.css";
import { useHistory, useLocation } from "react-router-dom";
import { useApiBlob, useApiGet } from "../../../../../api/apiCall";
import { getClassListUrl, downloadClassListUrl } from "../../../../../api/urls";
import { PAGESIZE } from "../../../../../utils/constants";

const ViewClassList = () => {
	const { goBack } = useHistory();
	const [pageNumber, setPageNumber] = useState(1);
	const location = useLocation();
	const pageSize = PAGESIZE.sm;

	if (!location.state) goBack();

	const [downloadFile, setDownloadFile] = useState(false);
	const { data, isLoading, isFetching, error } = useApiGet(
		getClassListUrl({
			departmentCourseId: location.state?.id,
			sessionId: location.state?.session,
			pageNumber,
			pageSize
		}),
		{ keepPreviousData: true, refetchOnWindowFocus: false }
	);
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
			name: "Class List",
			path: "/"
		}
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
			}
		],
		[pageNumber, pageSize]
	);
	const {
		data: file,
		isLoading: fileLoading,
		error: fileError
	} = useApiBlob(
		downloadClassListUrl({
			departmentCourseId: location.state?.id,
			sessionId: location.state?.session
		}),
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
				body: `Couldn't download class list`
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		} else {
			const outputFilename = `${data?.data?.courseCode} class list.xlsx`;
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
	}, [file, data, fileError]);
	useEffect(() => {
		if (file && downloadFile) {
			downloadXLSFile();
		}
	}, [file, downloadFile, downloadXLSFile]);
	const title = `${data?.data?.courseCode} for ${data?.data?.department} ${
		data?.data?.departmentOption ? `(${data?.data?.departmentOption})` : ""
	}`;
	if (isLoading) return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<div className={styles.container}>
			<Breadcrumbs crumbs={crumbItems} />
			<PageTitle
				title={`Class List for ${title}`}
				buttonGroup={
					<>
						<Button
							data-cy="download"
							label="Download Class List"
							buttonClass="primary"
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
			<div className={styles.content}>
				<TMTable
					columns={columns}
					data={data?.data?.students.items}
					loading={isLoading || isFetching}
					setPageNumber={setPageNumber}
					availablePages={
						data?.data?.students?.metaData?.totalPages || {}
					}
					title={`List of Students who registered for ${data?.data?.courseCode}`}
				/>
			</div>
		</div>
	);
};

export default ViewClassList;

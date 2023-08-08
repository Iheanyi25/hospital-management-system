import { useMemo } from "react";
import { useHistory, useLocation } from "react-router";
import {
	PageTitle,
	Button,
	TMTable,
	Breadcrumbs,
	Spinner,
	DefaultScreen
} from "../../../../../ui_elements";
import styles from "./style.module.css";
import { getLecturerCoursesUrl } from "../../../../../api/urls";
import { useApiGet } from "../../../../../api/apiCall";

 const ViewRecords = () => {
	const { push, goBack } = useHistory();
	const location = useLocation();

	const {
		data: lecturerCourses,
		isLoading,
		error
	} = useApiGet(
		getLecturerCoursesUrl({
			sessionId: location.state?.session.value,
			semesterId: location.state?.semester?.value
		})
	);

	const crumbItems = [
		{
			name: "Results & Class List",
			path: "/records"
		},
		{
			name: "View Records",
			path: "/"
		}
	];

	if (!location.state) {
		push("/records");
	}

	return (
		<div className={styles.container}>
			<Breadcrumbs crumbs={crumbItems} />
			<PageTitle
				title="Results and Class List"
				buttonGroup={
					<Button
						data-cy="back"
						label="Back"
						buttonClass="standard"
						onClick={() => goBack()}
					/>
				}
			/>
			<DisplayTable
				data={lecturerCourses?.data}
				isLoading={isLoading}
				error={error}
			/>
		</div>
	);
};

const DisplayTable = ({ data, isLoading, error }) => {
	const history = useHistory();
	const location = useLocation();
	const columns = useMemo(
		() => [
			{
				Header: "Course Code/Title",
				accessor: "code",
				Cell: ({ cell: { row } }) => (
					<div>
						{`${row.original?.code}/${row.original?.courseName}`}
					</div>
				)
			},
			{
				Header: "Department",
				accessor: "department"
			},
			{
				Header: "Department (Option)",
				accessor: "departmentOption"
			},
			{
				Header: "Course Unit",
				accessor: "courseUnit"
			},
			{
				Header: "No. of Results Uploaded",
				accessor: "resultsUploaded"
			},
			{
				Header: "Total Students",
				accessor: "totalStudentsRegistered"
			},
			{
				Header: "",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => (
					<div className="d-flex justify-content-center">
						<Button
							data-cy="results"
							label="Results"
							buttonClass="standard"
							onClick={() =>
								history.push({
									pathname: "/records/results",
									state: {
										id: row.original?.id,
										session: location.state?.session.value,
										semester:
											location.state?.semester?.value
									}
								})
							}
							disabled={
								row.original?.totalStudentsRegistered === 0
							}
						/>
						<Button
							data-cy="classList"
							label="Class List"
							buttonClass="standard-two"
							onClick={() =>
								history.push({
									pathname: "/records/classList",
									state: {
										id: row.original?.id,
										session: location.state?.session.value,
										semester:
											location.state?.semester?.value
									}
								})
							}
							customClass={styles.button_class_list}
							disabled={
								row.original?.totalStudentsRegistered === 0
							}
						/>
					</div>
				)
			}
		],
		[history, location]
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
	if (isLoading)
		return (
			<div className={styles.page_content}>
				<Spinner />
			</div>
		);
	return (
		<div className={styles.content}>
			{data?.length > 0 ? (
				<TMTable columns={columns} data={data} title="Courses" />
			) : (
				<div className={styles.page_content}>
					<DefaultScreen
						title="No Courses Found"
						message={`We found no courses for the selected semester and session.`}
					/>
				</div>
			)}
		</div>
	);
};

export default ViewRecords;
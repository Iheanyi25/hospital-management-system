import { useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
	PageTitle,
	Button,
	Breadcrumbs,
	TMTable,
	Spinner,
	ResultPersonnelCard
} from "../../../../../ui_elements";
import styles from "./style.module.css";
import { useApiGet } from "../../../../../api/apiCall";
import { getStudentCGPAsByIdUrl } from "../../../../../api/urls";

const ViewResults = () => {
	const { goBack, push } = useHistory();
	const { state } = useLocation();

	if (!state) goBack();
	const { userId } = state?.data;
	const { data, isLoading, isFetching, error } = useApiGet(
		getStudentCGPAsByIdUrl(userId),
		{
			keepPreviousData: true
		}
	);
	const columns = useMemo(
		() => [
			{
				Header: "Session",
				accessor: "session"
			},
			{
				Header: "Level",
				accessor: "level"
			},
			{
				Header: "Semester",
				accessor: "semester"
			},
			{
				Header: "Courses Uploaded",
				accessor: "exam",
				Cell: ({ cell: { row } }) => (
					<div>
						{row.original.courseUploaded} of{" "}
						{row.original.courseRegistered}
					</div>
				)
			},
			{
				Header: "CGPA",
				accessor: "gp"
			},
			{
				Header: "",
				accessor: "new",
				Cell: ({ cell: { row } }) => {
					const { level, semester, sessionId, semesterId } =
						row.original;
					const nextPageCrumbs = [
						...state.crumbs,
						{
							name: `${level} ${semester} semester`,
							path: "/"
						}
					];
					return (
						<Button
							buttonClass="standard-two"
							label="View"
							onClick={() =>
								push({
									pathname: "/class/results/student",
									state: {
										sessionId,
										semester: semesterId,
										userId,
										crumbs: nextPageCrumbs
									}
								})
							}
						/>
					);
				}
			}
		],
		[push, state, userId]
	);
	if (isLoading) return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<div className={styles.container}>
			<Breadcrumbs crumbs={state?.crumbs} />
			<PageTitle
				title={`${data?.data?.fullName}`}
				buttonGroup={
					<>
						<div>
							<Button
								data-cy="back"
								label="Back"
								buttonClass="standard"
								onClick={() => goBack()}
							/>
						</div>
					</>
				}
			/>

			<div className={styles.content}>
				<div className="mb-4">
					<ResultPersonnelCard data={data?.data} />
				</div>
				<TMTable
					columns={columns}
					data={data?.data?.studentSemesterGps}
					loading={isFetching}
					title={`Results`}
				/>
			</div>
		</div>
	);
};

export default ViewResults;

import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";
import {
	DefaultScreen,
	PageTitle,
	Button,
	TMTable,
	ScoreChart,
	Spinner
} from "../../../../../ui_elements";
import styles from "./style.module.css";
import { useApiGet } from "../../../../../api/apiCall";
import {
	getStudentCGPAsUrl,
	getStudentSemesterResultUrl
} from "../../../../../api/urls";

const ResultsDefault = () => {
	const { push } = useHistory();
	const [makeRequest, setMakeRequest] = useState(false);
	const [details, setDetails] = useState({ semesterId: "", sessionId: "" });
	const scenario = {
		title: "Keep track of your performance",
		message: "Your results and CGPA will show up here when it’s uploaded"
	};
	const {
		data: resultData,
		isFetching: isLoadingResultData,
		error: requestError
	} = useApiGet(
		getStudentSemesterResultUrl(details?.sessionId, details?.semesterId),
		{
			enabled: makeRequest,
			refetchOnWindowFocus: false,
			retry: false
		}
	);
	const { data, isLoading, error } = useApiGet(getStudentCGPAsUrl());
	useEffect(() => {
		if (resultData?.success && makeRequest && !isLoading) {
			push({
				pathname: "/results/result",
				state: { details: resultData?.data, fromVerify: true }
			});
		}
		if (requestError && makeRequest && !isLoading) {
			setMakeRequest(false);
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Invalid Action!",
				body:
					requestError?.response?.data?.message ||
					`Invalid action, please enter correct details`
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		}
	}, [resultData, requestError, push, makeRequest, isLoading]);

	const onSubmit = (sessionId, semesterId) => {
		setDetails({ semesterId, sessionId });
		setMakeRequest(true);
	};
	const columns = useMemo(
		() => [
			{
				Header: "Session",
				accessor: "session"
			},
			{
				Header: "Semester",
				accessor: "semester"
			},
			{
				Header: "Level",
				accessor: "level"
			},
			{
				Header: "GPA",
				accessor: "gp",
				Cell: ({ cell: { row } }) => (
					<>{row?.original?.gp?.toFixed(2)}</>
				)
			},
			{
				Header: "",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => {
					return (
						<div className="d-flex justify-content-center">
							<Button
								data-cy="view_res"
								label="View"
								buttonClass="standard-two"
								onClick={() =>
									onSubmit(
										row.original.sessionId,
										row.original.semesterId
									)
								}
								loading={
									isLoadingResultData &&
									row.original.sessionId ===
										details.sessionId &&
									row.original.semesterId ===
										details.semesterId
								}
							/>
						</div>
					);
				}
			}
		],
		[details?.sessionId, details?.semesterId, isLoadingResultData]
	);
	if (isLoading) return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;

	return (
		<div className={styles.container}>
			<PageTitle title="Results" />
			{data?.data ? (
				<div className={styles.content}>
					<div className="row">
						<div className="col-md-10 order-md-1 order-12">
							<TMTable
								columns={columns}
								data={data?.data?.studentSemesterGps}
								title="Results"
							/>
						</div>
						<div className="col-md-2 order-md-12 order-1">
							<ScoreChart studentGPA={data?.data?.cgpa} />
						</div>
					</div>
				</div>
			) : (
				<div className={styles.page_content}>
					<DefaultScreen
						title={scenario.title}
						message={scenario.message}
					/>
				</div>
			)}
		</div>
	);
};

export default ResultsDefault;

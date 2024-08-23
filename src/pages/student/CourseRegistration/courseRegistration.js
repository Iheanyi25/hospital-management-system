import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useHistory } from "react-router";
import { useApiGet } from "../../../api/apiCall";
import {
	getCoursesToAddOrDropUrl,
	getRegisteredCoursesHistoryUrl
} from "../../../api/urls";

import { Badge, Button, ProfileContext, Spinner } from "../../../ui_elements";
import { CoursesTable, EmptyState } from "./containers";
import CourseRegPrintout from "./containers/courseRegPrintout";
import { useReactToPrint } from "react-to-print";

const pageStyle = `
@page {
// size: 80mm 50mm;
margin-top: 5rem;
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

const CourseRegistration = () => {
	const studentContextData = useContext(ProfileContext);
	const [editData, setEditData] = useState({ sessionId: "", semesterId: "" });
	const history = useHistory();
	const ref = useRef();
	const handlePrint = useReactToPrint({
		content: () => ref.current,
		pageStyle: pageStyle
	});
	const { data: registeredCoursesHistory, isLoading } = useApiGet(
		getRegisteredCoursesHistoryUrl(),
		{
			refetchOnWindowFocus: false
		}
	);
	const [makeRequest, setMakeRequest] = useState(false);
	const {
		data: registeredCourses,
		isFetching,
		error: requestError
	} = useApiGet(
		getCoursesToAddOrDropUrl({
			semesterId: editData?.semesterId,
			sessionId: editData?.sessionId
		}),
		{
			enabled: makeRequest,
			refetchOnWindowFocus: false,
			retry: false
		}
	);
	const onSubmit = (data) => {
		setEditData(data);
		setMakeRequest(true);
	};

	useEffect(() => {
		if (registeredCourses?.success && makeRequest && !isFetching) {
			setTimeout(() => {
				handlePrint();
			}, 1000);
		}
		if (requestError && makeRequest && !isFetching) {
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
	}, [
		requestError,
		handlePrint,
		history,
		makeRequest,
		registeredCourses,
		isFetching
	]);
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
				Header: "Approval Status",
				accessor: "approval",
				Cell: ({ row }) => {
					return (
						<Badge
							item={{
								title:
									row?.original?.approved === true
										? "Approved"
										: row?.original?.approved === false
										? "Unapproved"
										: "Pending Approval",
								type:
									row?.original?.approved === true
										? "success"
										: row?.original?.approved === false
										? "unapproved"
										: "warning"
							}}
						/>
					);
				}
			},
			{
				Header: "",
				accessor: "btn",
				Cell: ({ row }) => {
					return (
						<div>
							<Button
								data-cy="view_reg"
								label="View"
								buttonClass="standard-two"
								onClick={() =>
									studentContextData?.profileData
										?.personalData?.role === "external"
										? history.push({
												pathname:
													"/course_registration/view",
												state: row.original
										  })
										: history.push({
												pathname: `/course_registration/${
													row.original.approved
														? "view"
														: "register"
												}`,

												state: row.original
										  })
								}
							/>
							<Button
								data-cy="view_reg"
								label="Reprint"
								buttonClass="standard"
								loading={
									row.original.sessionId ===
										editData.sessionId &&
									isFetching &&
									row.original.semesterId ===
										editData.semesterId
								}
								onClick={() =>
									onSubmit({
										sessionId: row.original.sessionId,
										semesterId: row.original.semesterId
									})
								}
							/>
						</div>
					);
				}
			}
		],
		[
			history,
			studentContextData?.profileData?.personalData?.role,
			editData,
			isFetching
		]
	);

	const tableData = {
		header: columns,
		data: registeredCoursesHistory?.data || []
	};

	const registerCourses = () => {
		history.push("/course_registration/session");
	};
	console.log(registeredCoursesHistory);
	if (isLoading) return <Spinner />;
	return (
		<section>
			<div className="d-none">
				<CourseRegPrintout
					registeredCourses={registeredCourses}
					dataRef={ref}
				/>
			</div>
			{registeredCoursesHistory?.data?.length > 0 ? (
				<CoursesTable registeredCoursesTableData={tableData} />
			) : (
				<EmptyState registerCourses={registerCourses} />
			)}
		</section>
	);
};

export default CourseRegistration;

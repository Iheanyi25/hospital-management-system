import {
	PageTitle,
	Breadcrumbs,
	PersonnelCard,
	Button,
	Badge,
	CenteredDialog,
	Spinner
} from "../../../../../ui_elements";
import styles from "./style.module.css";
import { CourseOverviewTable } from "../../../../student/CourseRegistration/components";
import { EditStatus } from "./components";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useApiGet } from "../../../../../api/apiCall";
import { getCoursesToAddOrDropUrl } from "../../../../../api/urls";

const ViewCoursesRegistered = () => {
	const [editOpen, setEditOpen] = useState(false);
	const { state } = useLocation();
	const crumbs = [
		{
			name: "Approve Courses",
			path: "/approve_courses",
			search: new URLSearchParams(state?.searchParams).toString()
		},
		{
			name: "Course Registration",
			path: ""
		}
	];
	const { sessionId, semesterId, userId } = state?.data;

	const { data, isLoading, error } = useApiGet(
		getCoursesToAddOrDropUrl({
			sessionId,
			semesterId,
			userId
		})
	);

	const details = [
		{ title: "Full Name", value: data?.data?.studentProfile?.fullname },
		{
			title: "Entry Mode",
			value: data?.data?.studentProfile?.modeOfEntry
		},
		{ title: "Matric No", value: data?.data?.studentProfile?.matricNumber },
		{ title: "Level", value: data?.data?.studentProfile?.level },
		{ title: "Faculty", value: data?.data?.studentProfile?.faculty },
		{ title: "Session", value: data?.data?.session },
		{ title: "Department", value: data?.data?.studentProfile?.department },
		{ title: "Semester", value: data?.data?.semester }
	];
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
				formTitle="Edit registered course status"
			>
				<EditStatus
					status={data?.data?.status}
					levelId={data?.data?.levelId}
					closeModal={() => setEditOpen(false)}
				/>
			</CenteredDialog>
			<Breadcrumbs crumbs={crumbs} />
			<PageTitle
				title={`Course Registration for  ${data?.data?.studentProfile?.matricNumber}`}
				buttonGroup={
					<Button
						data-cy="update"
						buttonClass="primary"
						label="Update status"
						onClick={() => setEditOpen(true)}
					/>
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
				<div className={styles.personnel_card_align}>
					<PersonnelCard
						details={details}
						user={{
							fullName: data?.data?.studentProfile?.fullname,
							passPort: data?.data?.studentProfile?.passPort
						}}
					/>
				</div>

				<CourseOverviewTable
					courses={data?.data?.registerableCourses}
					noCourseApprovalStatus
				/>
			</div>
		</section>
	);
};

export default ViewCoursesRegistered;

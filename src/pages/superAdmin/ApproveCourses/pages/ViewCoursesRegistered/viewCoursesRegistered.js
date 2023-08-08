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
import { geRegisteredCoursesForApprovalUrl } from "../../../../../api/urls";

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
	const { studentId, sessionId, semesterId, levelId } = state?.data;
	const { data, isLoading, error } = useApiGet(
		geRegisteredCoursesForApprovalUrl({
			studentId,
			sessionId,
			semester: semesterId,
			levelId
		})
	);

	const details = [
		{ title: "Full Name", value: data?.data?.studentData.fullname },
		{ title: "Entry Mode", value: data?.data?.studentData.studentModeOfEntry },
		{ title: "Matric No", value: data?.data?.studentData.matricNumber },
		{ title: "Level", value: data?.data?.studentData.level },
		{ title: "Faculty", value: data?.data?.studentData.faculty },
		{ title: "Session", value: data?.data?.studentData.session },
		{ title: "Department", value: data?.data?.studentData.department },
		{ title: "Semester", value: data?.data?.studentData.semester }
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
				formTitle="Edit registerd course status"
			>
				<EditStatus
					status={data?.data?.status}
					closeModal={() => setEditOpen(false)}
				/>
			</CenteredDialog>
			<Breadcrumbs crumbs={crumbs} />
			<PageTitle
				title={`Course Registration for  ${data?.data?.studentData.matricNumber}`}
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
							fullName: data?.data?.studentData.fullName,
							passPort: data?.data?.studentData.passPort
						}}
					/>
				</div>

				<CourseOverviewTable
					courses={data?.data?.courses}
					noCourseApprovalStatus
				/>
			</div>
		</section>
	);
};

export default ViewCoursesRegistered;

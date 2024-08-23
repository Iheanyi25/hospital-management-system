import { useState, useMemo } from "react";
import {
	PageTitle,
	Breadcrumbs,
	Button,
	CenteredDialog,
	Spinner,
	DefaultScreen
} from "../../../../ui_elements";
import { AddCourses } from "../containers";
import { Note, RegisterCoursesTable } from "../components";

import styles from "../style.module.css";
import { useHistory, useLocation } from "react-router-dom";
import { getCoursesForRegistrationUrl } from "../../../../api/urls";
import { useApiGet } from "../../../../api/apiCall";
import { useEffect } from "react";

const CoursesRegistrationStep2 = () => {
	const [open, setOpen] = useState(false);
	const crumbs = [
		{
			name: "Course Registration",
			path: "/course_registration"
		},
		{
			name: "Select Session",
			path: "/course_registration/session"
		},
		{
			name: "Register Courses",
			path: ""
		}
	];
	const location = useLocation();
	const history = useHistory();
	const [allCourses, setCourses] = useState([]);
	const [allSelectedCourses, setSelectedCourses] = useState([]);
	const [isSelecetd, setIsSelected] = useState({});
	const [totalSelectedCreditUnit, setTotalSelectedCreditUnit] = useState(0);
	const {
		data: coursesForRegistration,
		isLoading,
		error
	} = useApiGet(
		getCoursesForRegistrationUrl({
			sessionId: location.state?.sessionId,
			semester: location.state?.semesterId,
			yearOfStudyId:
				location.state?.yearOfStudyId || location.state?.levelId
		}),
		{
			retry: 1
		}
	);

	useEffect(() => {
		if (coursesForRegistration?.data?.registerableCourses) {
			setCourses(coursesForRegistration.data.registerableCourses);
			setSelectedCourses(
				coursesForRegistration.data.registerableCourses.filter(
					(course) => course.registered
				)
			);

			//select all courses initially
			const allSelectedInitially = {};
			coursesForRegistration.data.registerableCourses.forEach(
				(course) => {
					allSelectedInitially[course.courseAssignedForDepartmentId] =
						course.registered;
				}
			);
			setIsSelected(allSelectedInitially);

			//calculate total credit unit
			const totalCreditUnitSelectedInitially =
				coursesForRegistration.data.registerableCourses.reduce(
					(acc, course) =>
						acc + (course.registered ? course.unitLoadId : 0),
					0
				);
			setTotalSelectedCreditUnit(totalCreditUnitSelectedInitially);
		}
	}, [coursesForRegistration]);

	if (!location.state) history.push("/course_registration/session");

	const handleCheckboxChange = useMemo(() => {
		return (course) => {
			const { courseAssignedForDepartmentId } = course;
			if (isSelecetd[courseAssignedForDepartmentId]) {
				setSelectedCourses(
					allSelectedCourses.filter(
						(course) =>
							course.courseAssignedForDepartmentId !==
							courseAssignedForDepartmentId
					)
				);
				setIsSelected({
					...isSelecetd,
					[courseAssignedForDepartmentId]: false
				});
				setTotalSelectedCreditUnit(
					totalSelectedCreditUnit - course.unitLoadId
				);
			} else {
				setSelectedCourses([...allSelectedCourses, course]);
				setIsSelected({
					...isSelecetd,
					[courseAssignedForDepartmentId]: true
				});
				setTotalSelectedCreditUnit(
					totalSelectedCreditUnit + course.unitLoadId
				);
			}
		};
	}, [allSelectedCourses, isSelecetd, totalSelectedCreditUnit]);

	const isSchoolFeesError =
		error?.response?.data?.message === "You have not paid your fees";

	if (isLoading) return <Spinner />;
	return (
		<section>
			<CenteredDialog
				modalId="add-courses"
				isOpen={open}
				closeModal={() => setOpen(false)}
				width="80vw"
			>
				<AddCourses
					setOpen={setOpen}
					setCourses={setCourses}
					sessionId={location.state?.sessionId}
					academicYearDetails={{
						...location.state,
						levelId: coursesForRegistration?.data?.levelId
					}}
					isOriginallySelected={isSelecetd}
					courseRegData={coursesForRegistration?.data?.studentProfile}
					courseBorrowingStatus={
						coursesForRegistration?.data?.courseBorrowingStatus
					}
					setIsOriginallySelected={setIsSelected}
					setSelectedCourses={setSelectedCourses}
					setTotalSelectedCreditUnit={setTotalSelectedCreditUnit}
					totalSelectedCreditUnit={totalSelectedCreditUnit}
				/>
			</CenteredDialog>
			<Breadcrumbs crumbs={crumbs} />
			<header className="">
				{!error && (
					<PageTitle
						title="Course Registration"
						buttonGroup={
							<Button
								data-cy="add_borrow"
								buttonClass="primary"
								label="Add/Borrow Courses"
								onClick={() => setOpen(true)}
							/>
						}
					/>
				)}
				{error ? (
					<div className={styles.error_wrapper}>
						<DefaultScreen
							title={
								isSchoolFeesError
									? "Pay Your School Fees"
									: "An Error Occurred"
							}
							message={
								isSchoolFeesError
									? "You were unable to complete your course registration because you haven’t paid the school fees for this session."
									: error?.response?.data?.message
							}
							buttonGroup={
								isSchoolFeesError && (
									<Button
										data-cy="default"
										buttonClass={"primary"}
										label={
											"Pay School Fees For This Session"
										}
										onClick={() =>
											history.push(
												"/academic_fees/school_fees"
											)
										}
									/>
								)
							}
						/>
					</div>
				) : (
					<>
						{allCourses.length > 0 ? (
							<RegisterCoursesTable
								data={allCourses}
								handleCheckboxChange={handleCheckboxChange}
								isSelecetd={isSelecetd}
								selectedCourses={allSelectedCourses}
								totalSelectedCreditUnit={
									totalSelectedCreditUnit
								}
								unitLoad={coursesForRegistration.data.unitLoad}
								studentData={
									coursesForRegistration.data.studentProfile
								}
							/>
						) : (
							<div className={styles.error_wrapper}>
								<DefaultScreen
									title="No Courses Found!"
									message="We are unable to find any courses for this session and semester."
								/>
							</div>
						)}
						<Note>
							<p className={styles.note}>
								Please click on the "Check Boxes" beside each
								course to register the course or courses <br />
								<span>Note:</span> You cannot delete courses
								that have been aproved by your course advisor
							</p>
						</Note>
					</>
				)}
			</header>
		</section>
	);
};

export default CoursesRegistrationStep2;

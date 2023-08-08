import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useApiGet } from "../../../../api/apiCall";
import {
	getCoursesForRegistrationUrl,
	getSessionsUrl,
	yearOfStudyUrl
} from "../../../../api/urls";
import {
	Jumbotron,
	PageTitle,
	Breadcrumbs,
	Button,
	SMSelect,
	Spinner
} from "../../../../ui_elements";
import { SEMESTERS, STUDENT_TYPE_HOLDER } from "../../../../utils/constants";
import { formatSelectItems } from "../../../../utils/formatSelectItems";

// import styles from "../style.module.css";

const CoursesRegistrationStep1 = () => {
	const crumbs = [
		{
			name: "Course Registration",
			path: "/course_registration"
		},
		{
			name: "Select Session",
			path: ""
		}
	];
	const [cookies] = useCookies([STUDENT_TYPE_HOLDER]);
	const { [STUDENT_TYPE_HOLDER]: studentTypeId } = cookies;
	const history = useHistory();
	const { data: sessions, isLoading, error } = useApiGet(getSessionsUrl());
	const {
		data: levels,
		isLoading: isLoadingLevels,
		error: levelError
	} = useApiGet(yearOfStudyUrl({ studentTypeId }));
	const [academicYearDetails, setAcademicYearDetails] = useState({
		sessionId: "",
		semester: "",
		yearOfStudyId: ""
	});
	const [makeRequest, setMakeRequest] = useState(false);
	const {
		data: courseRegApprovalStatus,
		isFetching: isLoadingCourseRegApprovalStatus,
		error: requestError
	} = useApiGet(
		getCoursesForRegistrationUrl({
			sessionId: academicYearDetails.sessionId,
			semester: academicYearDetails.semester,
			yearOfStudyId: academicYearDetails.yearOfStudyId
		}),
		{
			enabled: makeRequest,
			refetchOnWindowFocus: false
		}
	);
	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting }
	} = useForm();

	useEffect(() => {
		if (
			courseRegApprovalStatus?.success &&
			makeRequest &&
			!isLoadingCourseRegApprovalStatus
		) {
			if (courseRegApprovalStatus.data.approved) {
				history.push({
					pathname: "/course_registration/view",
					state: {
						...academicYearDetails,
						levelId:
							courseRegApprovalStatus.data.registrableCourses[0]
								.levelId
					}
				});
			} else {
				history.push({
					pathname: "/course_registration/register",
					state: academicYearDetails
				});
			}
		}
		if (requestError && makeRequest && !isLoadingCourseRegApprovalStatus) {
			setMakeRequest(false);
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Invalid Action!",
				body:
					requestError?.response?.data?.message ||
					`Something went wrong`
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		}
	}, [
		courseRegApprovalStatus,
		makeRequest,
		requestError,
		isLoadingCourseRegApprovalStatus,
		academicYearDetails,
		history
	]);

	const allSessions = formatSelectItems(sessions?.data, "session", "id");
	const allLevels = formatSelectItems(levels?.data, "name", "id");

	const onSubmit = (data) => {
		setAcademicYearDetails({
			sessionId: data.session.value,
			semester: data.semester.value,
			yearOfStudyId: data.yearOfStudyId.value
		});
		setMakeRequest(true);
	};
	if (isLoading || isLoadingLevels) return <Spinner />;
	if (error || levelError)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<section>
			<Breadcrumbs crumbs={crumbs} />
			<header className="mt-2">
				<PageTitle title={"Course Registration"} />
			</header>
			<div className="mt-5">
				<form onSubmit={handleSubmit(onSubmit)}>
					<Jumbotron
						headerText="Select Session"
						footerContent={
							<footer className="d-flex justify-content-end align-items-center">
								{/* <Link
									data-cy="register_external"
									className={
										styles.courseRegistrationStep1_footer_text
									}
									to="#"
								>
									Click here to register as an External
									Candidate
								</Link> */}
								<Button
									data-cy="reg_as_external"
									type="submit"
									buttonClass="primary"
									label="Submit"
									loading={
										isLoadingCourseRegApprovalStatus ||
										isSubmitting
									}
								/>
							</footer>
						}
					>
						<section className="p-4">
							<div className="row">
								<div className="col-lg-3  d-flex align-items-center">
									<label className="font-weight-bold">
										Academic Session
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="session"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												{...field}
												options={allSessions}
												placeholder="Select Academic Session"
												searchable={false}
												isError={!!errors.session}
											/>
										)}
									/>
								</div>
							</div>
							<div className="row mt-4">
								<div className="col-lg-3  d-flex align-items-center">
									<label className="font-weight-bold">
										Select Level
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="yearOfStudyId"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select Level"
												options={allLevels}
												searchable={false}
												isError={!!errors.yearOfStudyId}
											/>
										)}
									/>
								</div>
							</div>
							<div className="row mt-4">
								<div className="col-lg-3  d-flex align-items-center">
									<label className="font-weight-bold">
										Select Semester
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="semester"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select Semester"
												options={SEMESTERS}
												searchable={false}
												isError={!!errors.semester}
											/>
										)}
									/>
								</div>
							</div>
						</section>
					</Jumbotron>
				</form>
			</div>
		</section>
	);
};

export default CoursesRegistrationStep1;

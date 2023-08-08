import { useRef, useEffect, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { useApiGet } from "../../../../../api/apiCall";
import { useReactToPrint } from "react-to-print";
import {
	getAllDepartmentsUrl,
	getAllSessionsUrl,
	getStudentTypesUrl,
	studentCompositeResultsUrl,
	studentSenateCompositeResultsUrl,
	yearOfStudyUrl
} from "../../../../../api/urls";
import {
	Jumbotron,
	SMSelect,
	Button,
	Spinner
} from "../../../../../ui_elements";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import styles from "./style.module.css";
import { useState } from "react";
import { DepartmentalSheet } from "./component/departmentalSheet";
import { SEMESTERS } from "../../../../../utils/constants";
import { SenateSheet } from "./component/senateSheet";
import { CollegeSheet } from "./component/collegeSheet";

const pageStyle = `
  @page {
    margin-left: 3rem;
    size: landscape;
    page-break-before: always;
  }

  // @media all {
  //   .pagebreak {
  //     display: none;
  //   }
  // }

  @media print {
    .pagebreak {
      page-break-before: always;
    }
  }
`;

const ViewResultSheet = () => {
	const {
		handleSubmit,
		control,
		watch,
		formState: { errors }
	} = useForm();

	const [makeRequest, setMakeRequest] = useState(false);
	const [makeRequestSenate, setMakeRequestSenate] = useState(false);

	const [details, setDetails] = useState({});
	const [tableData, setData] = useState([]);

	const [compositeType, setCompositeType] = useState();

	const componentRef = useRef();

	const sentateRef = useRef();

	const handlePrint = useReactToPrint({
		content: () => componentRef?.current,
		pageStyle
	});

	const handleSenatePrint = useReactToPrint({
		content: () => sentateRef?.current,
		pageStyle
	});

	const watchData = watch({
		StudentType: "StudentType"
	});

	const {
		data: compositeSheet,
		isLoading: isLoadingCompositeSheet,
		error: errorCompositeSheet
	} = useApiGet(
		studentCompositeResultsUrl({
			levelId: details?.Level?.value,
			departmentId: details?.Department?.value,
			sessionId: details?.Session?.value,
			semesterId: details?.Semester?.value,
			studentTypeId: details?.StudentType?.value
		}),
		{
			enabled: !!makeRequest,
			refetchOnWindowFocus: false
		}
	);

	const {
		data: senateCompositeSheet,
		isLoading: isLoadingSenateCompositeSheet,
		error: errorSenateCompositeSheet
	} = useApiGet(
		studentSenateCompositeResultsUrl({
			levelId: details?.Level?.value,
			departmentId: details?.Department?.value,
			sessionId: details?.Session?.value,
			semesterId: details?.Semester?.value,
			studentTypeId: details?.StudentType?.value
		}),
		{
			enabled: !!makeRequestSenate,
			refetchOnWindowFocus: false
		}
	);

	const getStudentData = useCallback(() => {
		return compositeSheet?.data?.studentCourses?.map((student, i) => {
			const registerCourses = {};

			student?.registeredCourses.forEach((registeredCourse) => {
				registerCourses[registeredCourse.courseCode] = registeredCourse;
			});

			const subjects = compositeSheet.data.courses?.map((course) => {
				if (registerCourses[course.courseCode]) {
					return {
						courseCode: course.courseCode,
						grade: registerCourses[course.courseCode].grade,
						gradePoint:
							registerCourses[course.courseCode].gradePoint,
						totalScore:
							registerCourses[course.courseCode].totalScore
					};
				} else {
					return {
						courseCode: course.courseCode,
						grade: "-",
						gradePoint: "-",
						totalScore: "-"
					};
				}
			});

			return {
				id: i + 1,
				name: student?.fullName,
				regNo: student?.registrationNumber,
				cumulativeSemesterDataResponse:
					student?.cumulativeSemesterDataResponse,
				currentSemesterDataResponse:
					student?.currentSemesterDataResponse,
				...(student?.previousSemesterDataResponse && {
					previousSemesterDataResponse:
						student?.previousSemesterDataResponse
				}),
				subjects: subjects,
				outStandingCourses: student?.outStandingCourses,
				remark: student?.remark
			};
		});
	}, [compositeSheet]);

	function sliceIntoChunks(arr, chunkSize) {
		const res = [];
		for (let i = 0; i < arr?.length; i += chunkSize) {
			const chunk = arr?.slice(i, i + chunkSize);
			res.push(chunk);
		}
		return res;
	}

	useEffect(() => {
		if (
			compositeSheet?.success &&
			makeRequest &&
			!isLoadingCompositeSheet
		) {
			setMakeRequest(false);
			setData(sliceIntoChunks(getStudentData(), getStudentData().length));
			setTimeout(() => {
				handlePrint();
			}, 1000);
		}
		if (errorCompositeSheet && makeRequest && !isLoadingCompositeSheet) {
			setMakeRequest(false);
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Invalid Action!",
				body:
					errorCompositeSheet?.response?.data?.message ||
					`Invalid action, please enter correct details`
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		}
	}, [
		compositeSheet,
		errorCompositeSheet,
		makeRequest,
		isLoadingCompositeSheet,
		getStudentData,
		handlePrint
	]);

	useEffect(() => {
		if (
			senateCompositeSheet?.success &&
			makeRequestSenate &&
			!isLoadingSenateCompositeSheet
		) {
			setMakeRequestSenate(false);
			setTimeout(() => {
				handleSenatePrint();
			}, 1000);
		}
		if (
			errorSenateCompositeSheet &&
			makeRequestSenate &&
			!isLoadingSenateCompositeSheet
		) {
			setMakeRequestSenate(false);
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Invalid Action!",
				body:
					errorSenateCompositeSheet?.response?.data?.message ||
					`Invalid action, please enter correct details`
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		}
	}, [
		senateCompositeSheet,
		errorSenateCompositeSheet,
		makeRequestSenate,
		isLoadingSenateCompositeSheet,
		handleSenatePrint
	]);

	const handleCompositeSubmit = (info) => {
		setDetails({ ...info });
		setMakeRequest(true);
	};

	const handleCollegeComposite = (info) => {
		handleCompositeSubmit(info);
		setCompositeType(true);
	};

	const handleDepartmentalComposite = (info) => {
		handleCompositeSubmit(info);
		setCompositeType(false);
	};

	const handleSenateCompositeSubmit = (info) => {
		setDetails({ ...info });
		setMakeRequestSenate(true);
	};

	const {
		data: sessions,
		isLoading: isLoadingSessions,
		error: errorSessions
	} = useApiGet(getAllSessionsUrl());

	const {
		data: studentType,
		isLoading: isLoadingStudentType,
		error: errorStudentType
	} = useApiGet(getStudentTypesUrl());

	const {
		data: department,
		isLoading: isLoadingDepartment,
		error: errorDepartment
	} = useApiGet(getAllDepartmentsUrl(watchData?.StudentType?.value), {
		enabled: !!watchData?.StudentType?.value
	});

	const {
		data: levels,
		isLoading: isLoadingLevels,
		error: errorLevels
	} = useApiGet(
		yearOfStudyUrl({ studentTypeId: watchData?.StudentType?.value }),
		{
			enabled: !!watchData?.StudentType?.value
		}
	);

	const allSessions = formatSelectItems(sessions?.data, "session", "id");

	const allStudentType = formatSelectItems(studentType?.data, "name", "id");

	const allDepartments = formatSelectItems(
		department?.data,
		"department",
		"departmentId"
	);

	const allLevels = formatSelectItems(levels?.data, "name", "id");

	if (isLoadingSessions || isLoadingStudentType) return <Spinner />;

	if (errorSessions || errorStudentType || errorDepartment || errorLevels)
		return (
			"An error has occurred: " + errorSessions?.message ||
			errorDepartment?.message ||
			errorLevels?.message
		);

	return (
		<>
			{compositeType === true ? (
				<div className="d-none">
					<div ref={componentRef}>
						<CollegeSheet
							compositeSheet={compositeSheet}
							data={tableData}
						/>
					</div>
				</div>
			) : (
				<div className="d-none">
					<div ref={componentRef}>
						<DepartmentalSheet
							compositeSheet={compositeSheet}
							data={tableData}
						/>
					</div>
				</div>
			)}
			<div className="d-none">
				<div ref={sentateRef}>
					<SenateSheet
						data={senateCompositeSheet?.data}
						info={details}
					/>
				</div>
			</div>
			<Jumbotron
				headerText={"View Result Sheets"}
				footerContent={
					<div className="d-flex justify-content-end">
						<Button
							data-cy="view_record"
							type="submit"
							buttonClass="secondary"
							label="Senate Composite Sheet"
							onClick={handleSubmit(handleSenateCompositeSubmit)}
							loading={isLoadingSenateCompositeSheet}
							disabled={isLoadingDepartment || isLoadingLevels}
						/>
						<Button
							data-cy="view_record"
							type="submit"
							buttonClass="secondary"
							label="College Composite Sheet"
							onClick={handleSubmit(handleCollegeComposite)}
							loading={compositeType && isLoadingCompositeSheet}
							disabled={isLoadingDepartment || isLoadingLevels}
						/>
						<Button
							data-cy="upload_list"
							type="button"
							buttonClass="primary"
							label="Departmental Composite Sheet"
							customClass="ml-2"
							onClick={handleSubmit(handleDepartmentalComposite)}
							loading={!compositeType && isLoadingCompositeSheet}
							disabled={isLoadingDepartment || isLoadingLevels}
						/>
					</div>
				}
			>
				<section className="p-4">
					<div className={styles.filter_container}>
						<div>
							<div className="row">
								<div className="col-lg-3  d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="student_type"
									>
										Session
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="Session"
										control={control}
										rules={{
											required: true
										}}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select Session Type"
												//   onChange={onStudentTypeChange}
												options={allSessions}
												searchable={true}
												id="Session"
												isError={!!errors.Session}
											/>
										)}
									/>
								</div>
							</div>
						</div>
						<div>
							<div className="row">
								<div className="col-lg-3  d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="student_type"
									>
										Student Type
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="StudentType"
										control={control}
										rules={{
											required: true
										}}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select Student Type"
												//   onChange={onStudentTypeChange}
												options={allStudentType}
												searchable={true}
												id="StudentType"
												isError={!!errors.StudentType}
											/>
										)}
									/>
								</div>
							</div>
						</div>

						{allDepartments.length > 0 && (
							<div>
								<div className="row">
									<div className="col-lg-3  d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="student_type"
										>
											Department
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="Department"
											control={control}
											rules={{
												required: true
											}}
											render={({ field }) => (
												<SMSelect
													{...field}
													placeholder="Select a Department"
													//   onChange={onStudentTypeChange}
													options={allDepartments}
													searchable={true}
													id="Department"
													isError={
														!!errors.Department
													}
												/>
											)}
										/>
									</div>
								</div>
							</div>
						)}
						{isLoadingDepartment && (
							<div>
								<div className="row">
									<div className="col-lg-3  d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="student_type"
										>
											Department
										</label>
									</div>
									<div className="col-lg-9">
										<Spinner />
									</div>
								</div>
							</div>
						)}

						{allLevels.length > 0 && (
							<div>
								<div className="row">
									<div className="col-lg-3  d-flex align-items-center">
										<label className="font-weight-bold">
											Level
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="Level"
											control={control}
											rules={{
												required: true
											}}
											render={({ field }) => (
												<SMSelect
													{...field}
													placeholder="Select a Level"
													//   onChange={onStudentTypeChange}
													options={allLevels}
													searchable={true}
													id="Level"
													isError={!!errors.Level}
												/>
											)}
										/>
									</div>
								</div>
							</div>
						)}

						{isLoadingLevels && (
							<div>
								<div className="row">
									<div className="col-lg-3  d-flex align-items-center">
										<label className="font-weight-bold">
											Levels
										</label>
									</div>
									<div className="col-lg-9">
										<Spinner />
									</div>
								</div>
							</div>
						)}

						<div>
							<div className="row">
								<div className="col-lg-3  d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="student_type"
									>
										Semester
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="Semester"
										control={control}
										rules={{
											required: true
										}}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select a Semester"
												//   onChange={onStudentTypeChange}
												options={SEMESTERS}
												searchable={true}
												id="Semester"
												isError={!!errors.Semester}
											/>
										)}
									/>
								</div>
							</div>
						</div>
					</div>
				</section>
			</Jumbotron>{" "}
		</>
	);
};

export default ViewResultSheet;

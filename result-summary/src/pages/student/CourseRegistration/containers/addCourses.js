import { useMemo, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Controller, useForm } from "react-hook-form";
import { useApiGet } from "../../../../api/apiCall";
import {
	getDepartmentOptionUrl,
	getDepartmentsUrl
} from "../../../../api/urlCategories/Department";
import {
	getBorrowCoursesUrl,
	getLevelForBorrowCoursesUrl,
	getRegistrableCoursesUrl
} from "../../../../api/urls";
import {
	Jumbotron,
	SMSelect,
	Button,
	PageTitle,
	TMTable,
	Checkbox,
	Spinner,
	DefaultScreen
} from "../../../../ui_elements";
import { STUDENT_TYPE_HOLDER } from "../../../../utils/constants";
import { formatSelectItems } from "../../../../utils/formatSelectItems";
import { uniqueArrayOfObjects } from "../../../../utils/uniqueObjects";
import styles from "../style.module.css";

export const AddCourses = ({
	setOpen,
	setCourses,
	academicYearDetails,
	courseBorrowingStatus,
	courseRegData,
	setSelectedCourses,
	studentData,
	adminCallback,
	isOriginallySelected,
	setIsOriginallySelected,
	setTotalSelectedCreditUnit,
	totalSelectedCreditUnit,
	isAdding
}) => {
	const [courseDetails, setCourseDetails] = useState({
		borrowLevelId: "",
		departmentId: "",
		departmentOptionId: ""
	});

	const [selectedAddOrDropCourses, setSelectedAddOrDropCourses] = useState(
		[]
	);
	const [isSelecetd, setIsSelected] = useState({});
	const { borrowLevelId, departmentId, departmentOptionId } = courseDetails;
	const [cookies] = useCookies([STUDENT_TYPE_HOLDER]);
	const { [STUDENT_TYPE_HOLDER]: studentTypeId } = cookies;
	const { data: levels, isLoading: isLoadingLevels } = useApiGet(
		getLevelForBorrowCoursesUrl(studentData?.refCode)
	);
	const { data: departments, isLoading: isLoadingDepartments } = useApiGet(
		getDepartmentsUrl(studentTypeId)
	);
	const {
		handleSubmit,
		control,
		watch,
		formState: { errors }
	} = useForm({
		defaultValues: {
			department: {
				value: courseRegData?.departmentId,
				label: courseRegData?.department
			},
			departmentOption: {
				value: courseRegData?.departmentOptionId,
				label: courseRegData?.departmentOption
			}
		}
	});

	const { data: departmentOption, isLoading: isLoadingDepartmentOption } =
		useApiGet(getDepartmentOptionUrl({ departmentId, studentTypeId }), {
			enabled: !!departmentId
		});

	const { data: addOrDropCourses, isLoading: isLoadingAddOrDropCourses } =
		useApiGet(
			studentData
				? getRegistrableCoursesUrl({
						sessionId: academicYearDetails?.sessionId,
						matricNo: academicYearDetails?.matricNo,
						registerLevelId: academicYearDetails?.levelId,
						borrowLevelId,
						departmentId,
						semester: academicYearDetails?.semester,
						departmentOptionId,
						StudentTypeId: studentData?.studentType,
						modeOfEntryId: studentData?.entryMode
				  })
				: getBorrowCoursesUrl({
						sessionId: academicYearDetails?.sessionId,
						registerLevelId: academicYearDetails?.levelId,
						borrowLevelId,
						departmentId,
						semester: academicYearDetails?.semesterId,
						departmentOptionId
				  }),
			{
				enabled:
					!!borrowLevelId &&
					!!departmentId &&
					(departmentOption?.data?.length > 0
						? !!departmentOptionId
						: true)
			}
		);

	useEffect(() => {
		const subscription = watch((formFields, { name }) => {
			if (name === "department") {
				setCourseDetails((state) => ({
					...state,
					departmentOptionId: "",
					borrowLevelId: "",
					departmentId: formFields.department?.value
				}));
			}
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	const allLevels = formatSelectItems(levels?.data, "name", "id");
	const allDepartments = formatSelectItems(
		departments?.data,
		"department",
		"departmentId"
	);
	const allDepartmentOption = formatSelectItems(
		departmentOption?.data,
		"departmentOption",
		"departmentOptionId"
	);

	const handleCheckboxChange = useMemo(() => {
		return (course) => {
			const { courseAssignedForDepartmentId } = course;
			if (isSelecetd[courseAssignedForDepartmentId]) {
				setSelectedAddOrDropCourses(
					selectedAddOrDropCourses.filter(
						(course) =>
							course.courseAssignedForDepartmentId !==
							courseAssignedForDepartmentId
					)
				);
				setIsSelected({
					...isSelecetd,
					[courseAssignedForDepartmentId]: false
				});
			} else {
				setSelectedAddOrDropCourses([
					...selectedAddOrDropCourses,
					course
				]);
				setIsSelected({
					...isSelecetd,
					[courseAssignedForDepartmentId]: true
				});
			}
		};
	}, [selectedAddOrDropCourses, isSelecetd]);

	const columns = useMemo(
		() => [
			{
				Header: "Register",
				accessor: "register",
				Cell: ({ cell: { row } }) => {
					return (
						<div className="mx-3">
							<Checkbox
								label={""}
								onSelect={() =>
									handleCheckboxChange(row.original)
								}
								checked={
									!!isSelecetd[
										row.original
											.courseAssignedForDepartmentId
									]
								}
							/>
						</div>
					);
				}
			},
			{
				Header: "Course Code",
				accessor: "courseCode"
			},
			{
				Header: "Course Title",
				accessor: "courseName"
			},
			{
				Header: "Course Unit",
				accessor: "unitLoadId"
			},
			{
				Header: "Course Type",
				accessor: "courseType"
			}
		],
		[handleCheckboxChange, isSelecetd]
	);

	const finishSelectingCourses = () => {
		if (studentData) {
			// if add course form is being accessed by admin
			adminCallback(selectedAddOrDropCourses);
		} else {
			// if add course form is being accessed by student

			//this ensure that a course that has already been added cannot be added again
			setCourses((courses) =>
				uniqueArrayOfObjects(courses.concat(selectedAddOrDropCourses))
			);
			//set the added courses to be selected by default
			setSelectedCourses((courses) =>
				uniqueArrayOfObjects(courses.concat(selectedAddOrDropCourses))
			);
			setIsOriginallySelected({ ...isOriginallySelected, ...isSelecetd });
			const totalCreditUnitSelectedInitially =
				selectedAddOrDropCourses.reduce(
					(acc, course) => acc + course.unitLoadId,
					totalSelectedCreditUnit
				);
			setTotalSelectedCreditUnit(totalCreditUnitSelectedInitially);
			setOpen(false);
		}
	};

	const onSubmitAddOrDropQuery = (data) => {
		//set the course details son as to trigger another query for add and drop courses
		setCourseDetails({
			borrowLevelId: data.level.value,
			departmentId: data.department.value,
			...(data?.departmentOption && {
				departmentOptionId: data?.departmentOption.value
			})
		});
	};
	return (
		<>
			<div className="mb-5">
				<PageTitle
					title="Add/Borrow Courses"
					buttonGroup={
						<>
							<Button
								data-cy="done_selecting"
								buttonClass="primary"
								label="Done"
								onClick={finishSelectingCourses}
								loading={isAdding}
							/>
							<Button
								data-cy="cancel"
								buttonClass="standard"
								label="Cancel"
								onClick={() => setOpen(false)}
							/>
						</>
					}
				/>
			</div>
			<form onSubmit={handleSubmit(onSubmitAddOrDropQuery)}>
				<Jumbotron
					headerText="Select Academic Details"
					footerContent={
						<Button
							data-cy="select_details"
							buttonClass="primary"
							label="Select"
							type="submit"
							loading={isLoadingAddOrDropCourses}
						/>
					}
					footerStyle="d-flex justify-content-end"
				>
					<section className="p-4">
						<div className="row">
							{isLoadingDepartments ? (
								<Spinner />
							) : (
								<>
									<div className="col-lg-3  d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="department"
										>
											Select Department
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="department"
											control={control}
											rules={{ required: true }}
											render={({ field }) => (
												<SMSelect
													{...field}
													id="department"
													options={allDepartments}
													placeholder="Select Department"
													searchable={true}
													disabled={
														!courseBorrowingStatus
													}
													isError={
														!!errors.department
													}
												/>
											)}
										/>
									</div>
								</>
							)}
						</div>
						<div className="row  mt-5">
							{isLoadingDepartmentOption ? (
								<Spinner />
							) : (
								(departmentOption?.data?.length > 0 ||
									courseRegData?.departmentOption) && (
									<>
										<div className="col-lg-3  d-flex align-items-center">
											<label
												className="font-weight-bold"
												htmlFor="departmentOption"
											>
												Department Option
											</label>
										</div>
										<div className="col-lg-9">
											<Controller
												name="departmentOption"
												control={control}
												rules={{ required: true }}
												render={({ field }) => (
													<SMSelect
														{...field}
														id="departmentOption"
														options={
															allDepartmentOption
														}
														placeholder="Select Department Option"
														searchable={false}
														disabled={
															!courseBorrowingStatus
														}
														isError={
															!!errors.departmentOption
														}
													/>
												)}
											/>
										</div>
									</>
								)
							)}
						</div>
						<div className="row  mt-5">
							{isLoadingLevels ? (
								<Spinner />
							) : (
								<>
									<div className="col-lg-3  d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="level"
										>
											Level
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="level"
											control={control}
											rules={{ required: true }}
											render={({ field }) => (
												<SMSelect
													{...field}
													id="level"
													options={allLevels}
													placeholder="Select Level"
													searchable={true}
													isError={!!errors.level}
												/>
											)}
										/>
									</div>
								</>
							)}
						</div>
					</section>
				</Jumbotron>
			</form>
			{isLoadingAddOrDropCourses ? (
				<div className="mt-5">
					<Spinner />
				</div>
			) : addOrDropCourses?.data?.length > 0 ? (
				<TMTable
					columns={columns}
					data={addOrDropCourses?.data}
					title={"Register Courses"}
				/>
			) : (
				// this additonal check is to prevent showing "No courses found" even when no query has been made
				departmentId &&
				borrowLevelId && (
					<div className={styles.error_wrapper}>
						<DefaultScreen
							title="No Courses Found"
							message="We are unable to find any courses that matches this query"
						/>
					</div>
				)
			)}
		</>
	);
};

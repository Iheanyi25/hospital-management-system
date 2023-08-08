import { useMemo, useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useApiGet } from "../../../../../../api/apiCall";
import {
	getDepartmentOptionUrl,
	getDepartmentsUrl
} from "../../../../../../api/urlCategories/Department";
import {
	getBorrowCoursesUrl,
	getLevelForBorrowCoursesUrl,
	getRegistrableCoursesUrl,
	getStudentTypesUrl
} from "../../../../../../api/urls";
import {
	Jumbotron,
	SMSelect,
	Button,
	PageTitle,
	TMTable,
	Checkbox,
	Spinner,
	DefaultScreen
} from "../../../../../../ui_elements";
import { fieldSetterAndClearer } from "../../../../../../utils/fieldSetterAndClearer";
import { formatSelectItems } from "../../../../../../utils/formatSelectItems";
import { uniqueArrayOfObjects } from "../../../../../../utils/uniqueObjects";
import styles from "../style.module.css";

export const AddCourses = ({
	setOpen,
	setCourses,
	academicYearDetails,
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
		levelId: "",
		departmentId: "",
		departmentOptionId: ""
	});
	const [selectedAddOrDropCourses, setSelectedAddOrDropCourses] = useState(
		[]
	);
	const [isSelecetd, setIsSelected] = useState({});
	const { levelId, departmentId, departmentOptionId } = courseDetails;
	const { data: levels, isLoading: isLoadingLevels } = useApiGet(
		getLevelForBorrowCoursesUrl(studentData?.userId)
	);
	const { data: studentTypes, isLoading: isLoadingStudentTypes } = useApiGet(
		getStudentTypesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const {
		handleSubmit,
		control,
		watch,
		setValue,
		formState: { errors }
	} = useForm();

	const watchData = watch({
		departmentId: "departmentId",
		studentTypeId: "studentTypeId"
	});

	const { data: departments, isLoading: isDepartmentLoading } = useApiGet(
		getDepartmentsUrl(watchData?.studentTypeId?.value),
		{
			enabled: !!watchData?.studentTypeId?.value
		}
	);

	const { data: departmentOption, isLoading: isLoadingDepartmentOption } =
		useApiGet(getDepartmentOptionUrl({ departmentId: departmentId }), {
			enabled: !!departmentId
		});

	const { data: addOrDropCourses, isLoading: isLoadingAddOrDropCourses } =
		useApiGet(
			studentData
				? getRegistrableCoursesUrl({
						sessionId: studentData?.sessionId,
						userId: studentData?.userId,
						levelId,
						departmentId,
						semesterId: studentData?.semesterId,
						departmentOptionId,
						StudentTypeId: studentData?.studentTypeId,
						StudentModeOfEntryId: studentData?.studentModeOfEntryId
				  })
				: getBorrowCoursesUrl({
						sessionId: academicYearDetails?.sessionId,
						levelId,
						departmentId,
						semester: academicYearDetails?.semester,
						departmentOptionId
				  }),
			{
				enabled:
					!!levelId &&
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
					levelId: "",
					departmentId: formFields.department?.value
				}));
			}
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	const allStudentTypes = formatSelectItems(studentTypes?.data, "name", "id");
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
				accessor: "courseTitle"
			},
			{
				Header: "Course Unit",
				accessor: "courseUnit"
			},
			{
				Header: "Course Type",
				accessor: "courseType"
			}
		],
		[handleCheckboxChange, isSelecetd]
	);

	const finishSelectingCourses = () => {
		if (selectedAddOrDropCourses?.length === 0) {
			return;
		}

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
					(acc, course) => acc + course.courseUnit,
					totalSelectedCreditUnit
				);
			setTotalSelectedCreditUnit(totalCreditUnitSelectedInitially);
			setOpen(false);
		}
	};

	const onSubmitAddOrDropQuery = (data) => {
		//set the course details son as to trigger another query for add and drop courses
		setCourseDetails({
			levelId: data.level.value,
			departmentId: data.department.value,
			departmentOptionId:
				departmentOption?.data?.length > 0
					? data?.departmentOption?.value
					: ""
		});
	};
	if (isLoadingStudentTypes) return <Spinner />;
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
								disabled={
									selectedAddOrDropCourses?.length === 0
								}
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
							<div className="col-md-12 mb-5">
								<div className="row">
									<div className="col-lg-3  d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="studentTypeId"
										>
											Student Type
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="studentTypeId"
											control={control}
											rules={{
												required: true
											}}
											render={({ field }) => (
												<SMSelect
													{...field}
													placeholder="Select Student Type"
													options={allStudentTypes}
													searchable={false}
													onChange={(value) =>
														fieldSetterAndClearer({
															value,
															setterFunc:
																setValue,
															setField:
																"studentTypeId",
															clearFields: [
																"department",
																"departmentOption",
																"level"
															]
														})
													}
													id="studentTypeId"
													isError={
														!!errors.studentTypeId
													}
												/>
											)}
										/>
									</div>
								</div>
							</div>
							{isDepartmentLoading ? (
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
						<div
							className={`row  ${
								departmentOption?.data?.length > 0 ? "mt-5" : ""
							}`}
						>
							{isLoadingDepartmentOption ? (
								<Spinner />
							) : (
								departmentOption?.data?.length > 0 && (
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
												render={({ field }) => (
													<SMSelect
														{...field}
														id="departmentOption"
														options={
															allDepartmentOption
														}
														placeholder="Select Department Option"
														searchable={false}
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
				levelId && (
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

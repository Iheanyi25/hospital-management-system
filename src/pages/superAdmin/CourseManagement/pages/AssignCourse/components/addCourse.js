import styles from "../style.module.css";
import {
	AsyncMultiSelect,
	Button,
	SMSelect,
	Spinner
} from "../../../../../../ui_elements";
import { Controller, useForm } from "react-hook-form";
import {
	getSearchRequest,
	useApiGet,
	useApiPost
} from "../../../../../../api/apiCall";
import {
	assignCoursesToDeptsUrl,
	getCoursesAssignedToDeptsUrl,
	getCoursesToManageUrl,
	getCourseTypes,
	getUnitLoads
} from "../../../../../../api/urls";
import { formatSelectItems } from "../../../../../../utils/formatSelectItems";
import { formatCourses } from "../../../../../../utils/formatCourseDisplay";
import { useQueryClient } from "react-query";
import { UploadSchema } from ".";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import cancel from "../../../../../../assets/svgs/cancel.svg";

export const AddCourse = ({ filter, currentFilterState, closeModal }) => {
	const [courses, setCourses] = useState([]);
	const courseIdInputRef = useRef();

	const {
		semesterId,
		sessionId,
		studentTypeId,
		studentModeOfEntryId,
		departmentId,
		departmentOptionId,
		levelId
	} = filter;

	const { data: courseTypes, isLoading, error } = useApiGet(getCourseTypes());
	const { data: unitLoads, isLoading: isLoadingUnitLoads } = useApiGet(
		getUnitLoads()
	);
	const { mutate, isLoading: isPosting } = useApiPost();
	const queryClient = useQueryClient();

	const clearValues = () => {
		setValue("courseId", null);
		setValue("courseUnit", null);
		setValue("courseTypeId", null);
		courseIdInputRef?.current?.clearValue();
		clearErrors();
	};
	const handleAddCourse = () => {
		trigger();

		if (
			Object.values(watchData).length === 0 ||
			Object.values(watchData).includes(null) ||
			Object.values(watchData).includes(undefined)
		) {
			return;
		}

		const filteredCourses = courses.filter(
			(course) => watchData?.courseId?.value !== course?.courseId?.value
		);

		if (courses.length < 15) {
			setCourses([...filteredCourses, watchData]);
			clearValues();
		} else {
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Exceeded Amount!",
				body: `You cannot add more than 15 courses!`
			});
			clearValues();
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		}
	};

	const removeCourse = (data) => {
		const filteredCourses = courses.filter(
			(course) => data?.courseId?.value !== course?.courseId?.value
		);

		setCourses(filteredCourses);
	};

	const validateSubmit = () => {
		if (
			watchData.courseId !== null ||
			watchData.courseUnit !== null ||
			watchData.courseTypeId !== null ||
			courses.length === 0
		) {
			return true;
		} else {
			return false;
		}
	};

	const {
		control,
		watch,
		handleSubmit,
		trigger,
		formState: { errors, isSubmitting },
		setValue,
		clearErrors,
		reset
	} = useForm({
		resolver: yupResolver(UploadSchema),
		onSubmit: handleAddCourse
	});
	const apiOptions = async (query) => {
		const data = await getSearchRequest({
			queryKey: getCoursesToManageUrl({ searchTerm: query })
		});
		return formatCourses({
			courses: data.data.items,
			courseCode: "courseCode",
			couseTitle: "title",
			value: "id"
		});
	};
	const allCourseTypes = formatSelectItems(courseTypes?.data, "name", "id");
	const allUnitLoads = formatSelectItems(unitLoads?.data, "name", "id");

	const watchData = watch({
		courseId: "courseId",
		courseUnit: "courseUnit",
		courseTypeId: "courseTypeId"
	});

	const handleFieldChange = (name, value) => {
		setValue(name, value);
		clearErrors(name);
	};

	const onSubmit = () => {
		reset(
			{ courseUnit: null, courseTypeId: null },
			{
				keepErrors: false,
				keepValues: false
			}
		);
		const requestDet = {
			url: assignCoursesToDeptsUrl(),
			data: courses.map((data) => ({
				courseId: data?.courseId.value,
				courseUnit: data.courseUnit.value,
				courseTypeId: data.courseTypeId.value,
				semesterId: semesterId,
				sessionId: sessionId,
				studentTypeId: studentTypeId,
				studentModeOfEntryId: studentModeOfEntryId,
				departmentId: departmentId,
				departmentOptionId: departmentOptionId || 0,
				levelId
			}))
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getCoursesAssignedToDeptsUrl(currentFilterState)
				);
				closeModal();
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Course Assigned Successfully!",
					body: "Your course was assigned to department successfully"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Course Assignment Failed!",
					body:
						response?.data?.message ||
						`Course wasn't assigned to department successfully`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	if (isLoading || isLoadingUnitLoads) return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;

	return (
		<form
			className={`${styles.form_content} w-100`}
			onSubmit={handleSubmit(handleAddCourse)}
		>
			<div className="d-flex flex-wrap">
				{courses.map((course, i) => (
					<span
						key={i}
						className={`d-flex align-items-center mt-2 ${styles.courseBadge}`}
					>
						<p>{course?.courseId?.label?.slice(0, 7)}</p>
						<img
							onClick={() => removeCourse(course)}
							src={cancel}
							alt=""
						/>
					</span>
				))}
			</div>
			<div className="row mb-4 mt-3">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="courseId">Course</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="courseId"
						control={control}
						rules={{ required: true }}
						render={({ field }) => (
							<AsyncMultiSelect
								placeholder="Search by course code/title"
								id="courseId"
								apiOptions={apiOptions}
								isMulti={false}
								isClearable
								{...field}
								onChange={(data) =>
									handleFieldChange("courseId", data)
								}
								ref={courseIdInputRef}
								isError={!!errors.courseId}
								errorText={
									errors.courseId && errors.courseId.message
								}
								required
							/>
						)}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="courseTypeId">Course type</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="courseTypeId"
						control={control}
						rules={{ required: true }}
						render={({ field }) => (
							<SMSelect
								{...field}
								onChange={(data) =>
									handleFieldChange("courseTypeId", data)
								}
								placeholder="Select course type"
								options={allCourseTypes}
								searchable={true}
								id="courseTypeId"
								isError={!!errors.courseTypeId}
								errorText={
									errors.courseTypeId &&
									errors.courseTypeId.message
								}
								required
							/>
						)}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="courseUnit">Unit load</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="courseUnit"
						control={control}
						rules={{ required: true }}
						render={({ field }) => (
							<SMSelect
								placeholder="Select unit load"
								options={allUnitLoads}
								searchable={true}
								id="courseUnit"
								{...field}
								onChange={(data) =>
									handleFieldChange("courseUnit", data)
								}
								isError={!!errors.courseUnit}
								errorText={
									errors.courseUnit &&
									errors.courseUnit.message
								}
								required
							/>
						)}
					/>
				</div>
			</div>
			<div className="d-flex justify-content-end">
				<Button
					data-cy="add_course"
					label="Add"
					type="button"
					buttonClass="secondary"
					loading={isSubmitting || isPosting}
					onClick={handleAddCourse}
				/>

				<Button
					onClick={onSubmit}
					label="Submit"
					buttonClass="primary"
					loading={isSubmitting || isPosting}
					disabled={validateSubmit()}
				/>
			</div>
		</form>
	);
};

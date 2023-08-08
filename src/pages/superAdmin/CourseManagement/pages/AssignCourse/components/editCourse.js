import styles from "../style.module.css";
import {
	Button,
	SMSelect,
	Spinner,
	TextField
} from "../../../../../../ui_elements";
import { Controller, useForm } from "react-hook-form";
import { useApiGet, useApiPut } from "../../../../../../api/apiCall";
import {
	editCourseAssignedToDeptsUrl,
	getCoursesAssignedToDeptsUrl,
	getCourseTypes,
	getUnitLoads
} from "../../../../../../api/urls";
import { formatSelectItems } from "../../../../../../utils/formatSelectItems";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQueryClient } from "react-query";

const UploadSchema = yup.object().shape({
	courseUnit: yup.mixed().required("please select unit load"),
	courseTypeId: yup.mixed().required("please select course type")
});

export const EditCourse = ({ data, currentFilterState, closeModal }) => {
	const {
		course,
		courseCode,
		id,
		courseTypeId,
		courseType,
		courseUnit,
		courseUnitName
	} = data;
	const { data: courseTypes, isLoading, error } = useApiGet(getCourseTypes());
	const { data: unitLoads, isLoading: isLoadingUnitLoads } = useApiGet(
		getUnitLoads()
	);
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm({
		defaultValues: {
			courseTypeId: { value: courseTypeId, label: courseType },
			courseUnit: { value: courseUnit, label: courseUnitName }
		},
		resolver: yupResolver(UploadSchema)
	});
	const { mutate, isLoading: isPosting } = useApiPut();
	const queryClient = useQueryClient();
	const allCourseTypes = formatSelectItems(courseTypes?.data, "name", "id");
	const allUnitLoads = formatSelectItems(unitLoads?.data, "name", "id");
	const onSubmit = (data) => {
		const { courseTypeId, courseUnit } = data;
		const requestDet = {
			url: editCourseAssignedToDeptsUrl(id),
			data: {
				courseUnit: courseUnit.value,
				courseTypeId: courseTypeId.value
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getCoursesAssignedToDeptsUrl(currentFilterState)
				);
				closeModal();
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Course Acction Successful!",
					body: "Your course records were updated successfully!"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Course Acction Failed!",
					body:
						response?.data?.message ||
						`Course records weren't updated successfully!`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};
	if (isLoading || isLoadingUnitLoads) return <Spinner />;
	if (error) return "An error has occurred: " + error?.response?.data?.message;
	return (
		<form
			className={`${styles.form_content} w-100 mt-5`}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="course">Course</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="course"
						placeholder="Enter maximum unit"
						type="text"
						name="course"
						value={course}
						disabled
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="courseCode">Course Code</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="courseCode"
						placeholder="Enter maximum unit"
						type="text"
						name="courseCode"
						value={courseCode}
						disabled
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
						render={({ field }) => (
							<SMSelect
								placeholder="Select course type"
								options={allCourseTypes}
								searchable={true}
								id="courseTypeId"
								{...field}
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
						render={({ field }) => (
							<SMSelect
								placeholder="Select unit load"
								options={allUnitLoads}
								searchable={true}
								id="courseUnit"
								{...field}
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
					data-cy="update_course"
					label="Update"
					buttonClass="primary"
					loading={isSubmitting || isPosting}
				/>
			</div>
		</form>
	);
};

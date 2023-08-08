import {
	AsyncMultiSelect,
	Button,
	TextField
} from "../../../../../../ui_elements";
import { useApiPost } from "../../../../../../api/apiCall";
import { Controller, useForm } from "react-hook-form";
import {
	// editAssignCourseToLecturer,
	postLecturerCourseUpdate,
	getAllLecturerCourses
} from "../../../../../../api/urls";
import { useQueryClient } from "react-query";
import { lecturersApiOptions } from "../../../../../../utils/apiOptions";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const schema = yup.object().shape({
	LecturerId: yup.mixed().required("please select a lecturer")
});

export const EditLecturerCourseAssignment = ({
	editData,
	filter,
	closeModal,
	pageNumber,
	searchTerm
}) => {
	const queryClient = useQueryClient();
	const { mutate, isLoading } = useApiPost();
	const {
		control,
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting }
	} = useForm({
		defaultValues: {
			CourseTitle: `${editData?.courseCode} - ${editData?.courseTitle}`,
			LecturerId: editData?.Lecturer
		},
		resolver: yupResolver(schema)
	});

	const onSubmit = (data) => {
		const requestDet = {
			url: postLecturerCourseUpdate(),
			data: {
				Id: editData?.id ? editData?.id : 0,
				LecturerId: data.LecturerId.value,
				LevelId: filter.levelId,
				CourseCode: editData.courseCode,
				SessionId: filter?.sessionId ?? 0,
				SemesterId: filter.semesterId,
				StudentTypeId: filter.studentTypeId,
				DepartmentId: filter.departmentId,
				DepartmentOptionId: filter.departmentOptionId
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getAllLecturerCourses({ ...filter, pageNumber, searchTerm })
				);
				closeModal();
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Course assignment successfully edited!",
					body: "You successfully edited course assigned"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Course Assignment edit Failed!",
					body:
						response?.data?.message ||
						`Course Assignment wasn't edited successfully`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="CourseTitle">Course Title</label>
				</div>
				<div className="col-lg-9">
					<TextField
						placeholder="Enter course title"
						id="CourseTitle"
						name="CourseTitle"
						register={register}
						error={errors.CourseTitle}
						errorText={
							errors.CourseTitle && errors.CourseTitle.message
						}
						disabled
						required
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="Lecturer">Lecturer</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="LecturerId"
						control={control}
						rules={{ required: true }}
						render={({ field }) => (
							<AsyncMultiSelect
								placeholder="Search by lecturer name/email"
								id="LecturerId"
								apiOptions={lecturersApiOptions}
								isMulti={false}
								isClearable
								onChange={(data) =>
									setValue(
										"LecturerId",
										data?.length > 0 ? data : null
									)
								}
								{...field}
								isError={!!errors.LecturerId}
								errorText={
									errors.LecturerId &&
									errors.LecturerId.message
								}
								required
							/>
						)}
					/>
				</div>
			</div>
			<div className="d-flex justify-content-end">
				<Button
					label="Update"
					buttonClass="primary"
					data-cy="edit_course_assignment_button"
					loading={isSubmitting || isLoading}
				/>
			</div>
		</form>
	);
};

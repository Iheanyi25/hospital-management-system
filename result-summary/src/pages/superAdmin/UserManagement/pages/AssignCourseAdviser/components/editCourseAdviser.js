import {
	AsyncMultiSelect,
	Button,
	TextField
} from "../../../../../../ui_elements";
import { useApiPost } from "../../../../../../api/apiCall";
import { Controller, useForm } from "react-hook-form";
import {
	assignLevelCourseAdvisersUrl,
	getLevelCourseAdvisersUrl
} from "../../../../../../api/urls";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQueryClient } from "react-query";
import { lecturersAssignmentApiOptions } from "../../../../../../utils/apiOptions";

export const schema = yup.object().shape({
	userId: yup.mixed().required("please select a lecturer")
});
export const EditCourseAdviser = ({
	data,
	filter,
	currentState,
	closeModal
}) => {
	const { departmentId, levelId } = data;
	const queryClient = useQueryClient();
	const { mutate, isLoading } = useApiPost();
	const {
		control,
		setValue,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm({ resolver: yupResolver(schema) });
	const onSubmit = (data) => {
		const requestDet = {
			url: assignLevelCourseAdvisersUrl(),
			data: {
				userId: data?.userId.value,
				departmentId,
				sessionId: filter?.sessionId,
				studentTypeId: filter?.studentTypeId,
				levelId
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getLevelCourseAdvisersUrl(currentState)
				);
				closeModal();
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Course Adviser Assingment Successful!"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Course Adviser Assignment Failure",
					body: response?.data?.message || `Operation Failure`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	return (
		<form className={`w-100 mt-5`} onSubmit={handleSubmit(onSubmit)}>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="department">Department</label>
				</div>
				<div className="col-lg-9">
					<TextField
						type="text"
						placeholder="Enter department"
						id="department"
						value={data?.departmentName}
						disabled
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="department">Level</label>
				</div>
				<div className="col-lg-9">
					<TextField
						type="text"
						placeholder="Enter department"
						id="department"
						value={data?.level}
						disabled
					/>
				</div>
			</div>
			{data.lecturerName && (
				<div className="row mb-4">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor="currentAdviser">
							Current Course Adviser
						</label>
					</div>
					<div className="col-lg-9">
						<TextField
							type="text"
							placeholder="Enter currentAdviser"
							id="currentAdviser"
							value={data?.lecturerName}
							disabled
						/>
					</div>
				</div>
			)}

			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="userId">New Course Adviser</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="userId"
						control={control}
						rules={{ required: true }}
						render={({ field }) => (
							<AsyncMultiSelect
								placeholder="Search by lecturer name or email"
								id="userId"
								apiOptions={lecturersAssignmentApiOptions}
								isMulti={false}
								isClearable
								onChange={(data) =>
									setValue(
										"userId",
										data?.length > 0 ? data : null
									)
								}
								{...field}
								isError={!!errors.userId}
								errorText={
									errors.userId && errors.userId.message
								}
								required
							/>
						)}
					/>
				</div>
			</div>
			<div className="d-flex justify-content-end">
				<Button
					label={data?.lecturerId ? "Update" : "Assign"}
					data-cy="update_hod"
					buttonClass="primary"
					loading={isSubmitting || isLoading}
				/>
			</div>
		</form>
	);
};

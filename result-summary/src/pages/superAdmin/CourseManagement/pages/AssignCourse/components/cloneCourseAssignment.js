import styles from "../style.module.css";
import { Button, SMSelect } from "../../../../../../ui_elements";
import { Controller, useForm } from "react-hook-form";
import { useApiPost } from "../../../../../../api/apiCall";
import { cloneCourseAssignmentUrl } from "../../../../../../api/urls";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const UploadSchema = yup.object().shape({
	oldSessionId: yup.mixed().required("please select session to clone from"),
	newSessionId: yup.mixed().required("please select session to clone to")
});

export const CloneCourseAssignment = ({ allSessions, closeModal }) => {
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm({
		resolver: yupResolver(UploadSchema)
	});

	const { mutate, isLoading: isPosting } = useApiPost();
	const onSubmit = (data) => {
		const { oldSessionId, newSessionId } = data;
		const requestDet = {
			url: cloneCourseAssignmentUrl(),
			data: {
				NewSessionId: newSessionId.value,
				OldSessionId: oldSessionId.value
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				closeModal();
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Course Action Successful!",
					body: "Your course assignment was cloned successfully!"
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
						`Course assignment wasn't cloned correctly!`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};
	return (
		<form
			className={`${styles.form_content} w-100 mt-5`}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="oldSessionId">From</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="oldSessionId"
						control={control}
						render={({ field }) => (
							<SMSelect
								placeholder="Select Session to clone from"
								options={allSessions}
								searchable={true}
								id="oldSessionId"
								{...field}
								isError={!!errors.oldSessionId}
								errorText={
									errors.oldSessionId &&
									errors.oldSessionId.message
								}
								required
							/>
						)}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="newSessionId">To</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="newSessionId"
						control={control}
						render={({ field }) => (
							<SMSelect
								placeholder="Select Session to clone to"
								options={allSessions}
								searchable={true}
								id="newSessionId"
								{...field}
								isError={!!errors.newSessionId}
								errorText={
									errors.newSessionId &&
									errors.newSessionId.message
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
					label="Clone Courses"
					buttonClass="primary"
					loading={isSubmitting || isPosting}
				/>
			</div>
		</form>
	);
};

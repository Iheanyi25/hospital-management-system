import styles from "../style.module.css";
import { useForm } from "react-hook-form";
import { Button, TextField } from "../../../../../../ui_elements";
import { yupResolver } from "@hookform/resolvers/yup";
import { UploadSchema } from "./uploadSchema";
import { useApiPost } from "../../../../../../api/apiCall";
import {
	getCoursesToManageUrl,
	postCourseSingUploadUrl
} from "../../../../../../api/urls";
import { useQueryClient } from "react-query";

export const SingleUpload = ({ setUploadModal, currentFilterState }) => {
	const { mutate, isLoading } = useApiPost();
	const queryClient = useQueryClient();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm({
		resolver: yupResolver(UploadSchema)
	});
	const onSubmit = (data) => {
		const requestDet = {
			url: postCourseSingUploadUrl(),
			data: {
				Title: data.Title.toUpperCase(),
				CourseCode: data.CourseCode.toUpperCase()
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getCoursesToManageUrl(currentFilterState)
				);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Course Upload Success!",
					body: "Your course was uploaded successfully"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				setUploadModal(false);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Course Upload Failed!",
					body:
						response?.data?.message ||
						`Course wasn't uploaded successfully`
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
					<label htmlFor="Title">Course title</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="Title"
						placeholder="Enter course title"
						type="text"
						name="Title"
						register={register}
						error={errors.Title}
						errorText={errors.Title && errors.Title.message}
						required
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="CourseCode">Course code</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="CourseCode"
						placeholder="Enter course code"
						type="text"
						name="CourseCode"
						register={register}
						error={errors.CourseCode}
						errorText={
							errors.CourseCode && errors.CourseCode.message
						}
						required
					/>
				</div>
			</div>
			<div className="d-flex justify-content-end">
				<Button
					data-cy="upload_single_course"
					label="Upload"
					buttonClass="primary"
					loading={isSubmitting || isLoading}
				/>
			</div>
		</form>
	);
};

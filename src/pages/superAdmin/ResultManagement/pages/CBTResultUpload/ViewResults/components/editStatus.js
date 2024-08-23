import styles from "../style.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	Button,
	RadioButtons,
	TextField,
	ValidationText
} from "../../../../../../ui_elements";
import { useLocation } from "react-router-dom";
import { useApiPost } from "../../../../../../api/apiCall";
import { useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { postResultApprovalUrl } from "../../../../../../api/urls";

export const Schema = yup.object().shape({
	status: yup.string().required("please choose your status"),
	comment: yup
		.string()
		.when("$isCommentRequired", (isCommentRequired, schema) => {
			if (isCommentRequired) {
				return schema.required("please enter a comment");
			}
			return schema.default("");
		})
});

export const EditStatus = ({
	closeModal,
	currentState,
	courseCode,
	departmentId
}) => {
	const { state } = useLocation();
	const { mutate, isLoading } = useApiPost();
	const queryClient = useQueryClient();
	const [watchData, setWatchData] = useState({
		status: "Approve"
	});
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm({
		defaultValues: {
			status: "Approve"
		},
		resolver: yupResolver(Schema),
		context: {
			isCommentRequired: watchData?.status === "Approve" ? false : true
		}
	});
	useEffect(() => {
		const subscription = watch(({ status }) => {
			setWatchData({
				status
			});
		});
		return () => subscription.unsubscribe();
	}, [watch]);
	const onSubmit = async (data) => {
		const requestDet = {
			url: postResultApprovalUrl(),
			data: {
				courseCode,
				departmentId,
				sessionId: state?.data?.sessionId,
				approved: data.status === "Approve" ? true : false,
				comment: data.comment
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(currentState);
				closeModal();
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Course Approval Successful!",
					body: `Course was ${
						data.status === "Approve" ? "approved" : "unapproved"
					} successfully`
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Course Approval Failed!",
					body:
						response?.data?.message ||
						`Course wasn't ${
							data.status === "Approve"
								? "approved"
								: "unapproved"
						} successfully`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};
	return (
		<form
			className={`${styles.form_content} w-100 mt-4`}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="row mb-4">
				<div className="col-lg-3">
					<label>Status</label>
				</div>
				<div className="col-lg-9" name="gender">
					<RadioButtons
						label="Approve"
						value="Approve"
						name="status"
						register={register}
						checked={watchData?.status === "Approve"}
					/>
					<RadioButtons
						label="Unapprove"
						value="Unapprove"
						name="status"
						register={register}
						checked={watchData?.status === "Unapprove"}
					/>
					<>
						{errors.status && errors.status.message && (
							<ValidationText
								status={"error"}
								message={errors.status.message}
							/>
						)}
					</>
				</div>
			</div>
			{watchData?.status === "Unapprove" && (
				<div className="row mb-4">
					<div className="col-lg-3">
						<label>Reason</label>
					</div>
					<div className="col-lg-9">
						<TextField
							autoComplete="off"
							placeholder="What is your reason for rejecting this?"
							className="w-100"
							inputType="textarea"
							name="comment"
							register={register}
							required
							error={errors.comment}
							errorText={errors.comment && errors.comment.message}
						/>
					</div>
				</div>
			)}
			<div className="d-flex justify-content-end">
				<Button
					data-cy="update_res"
					label="Update"
					buttonClass="primary"
					loading={isLoading}
				/>
			</div>
		</form>
	);
};

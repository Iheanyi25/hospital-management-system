import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { TextField, Button } from "../../ui_elements";
import AuthPageWrapper from "./AuthPageWrapper";
import styles from "./auth_style.module.css";
import { sendResetPasswordMailUrl } from "../../api/urls";
import { useApiPost } from "../../api/apiCall";
import { useHistory } from "react-router-dom";

const sendResetPasswordMailSchema = yup.object().shape({
	email: yup.string().email().required()
});

const ForgotPassword = () => {
	const { push } = useHistory();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm({
		resolver: yupResolver(sendResetPasswordMailSchema)
	});
	const mutation = useApiPost();

	const onSubmit = (data) => {
		const requestDet = {
			url: sendResetPasswordMailUrl(data.email)
		};
		return mutation.mutate(requestDet, {
			onSuccess: () => {
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Reset Password Email Successfully Sent!"
				});
				push("verify_confirmation");
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Failed to send reset password email!",
					body:
						response?.data?.message ||
						response?.data?.title ||
						`check your details `
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	return (
		<AuthPageWrapper>
			<h1 className={`${styles.auth_main_header}`}>Forgot Password</h1>
			<p className={`${styles.auth_sub_header}`}>
				Enter your email to reset your password
			</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="my-4 px-5 w-100 text-left">
					<label
						className={`${styles.auth_label} my-3`}
						htmlFor="email"
					>
						Email
					</label>
					<TextField
						id="email"
						placeholder="Enter your email"
						type="email"
						name="email"
						register={register}
						required
						error={errors.email}
						errorText={errors.email && errors.email.message}
					/>
				</div>
				<div className="d-flex border-top px-5 py-2 justify-content-end">
					<Button
						data-cy="reset_password"
						label="Reset Password"
						type="submit"
						buttonClass="primary"
						loading={isSubmitting || mutation.isLoading}
					/>
				</div>
			</form>
		</AuthPageWrapper>
	);
};

export default ForgotPassword;
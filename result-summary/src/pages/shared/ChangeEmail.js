import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { TextField, Button, AuthPageGlobalWrapper } from "../../ui_elements";
import AuthPageWrapper from "./AuthPageWrapper";
import styles from "./auth_style.module.css";
import { sendSetupEmailUrl } from "../../api/urls";
import { useApiPost } from "../../api/apiCall";
import { useHistory, useLocation } from "react-router-dom";

const changePasswordSchema = yup.object().shape({
	email: yup.string().email().required()
});

const ChangeEmail = () => {
	const { goBack } = useHistory();
	const { state } = useLocation();
	if (!state?.fromLogin) goBack();
	const { push } = useHistory();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm({
		resolver: yupResolver(changePasswordSchema)
	});
	const mutation = useApiPost();

	const onSubmit = (data) => {
		const requestDet = {
			url: sendSetupEmailUrl(state?.id, data.email)
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
					title: "Account verification failed!",
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
		<AuthPageGlobalWrapper>
			<AuthPageWrapper>
				<h1 className={`${styles.auth_main_header}`}>
					Verify your account
				</h1>
				<p className={`${styles.auth_sub_header}`}>
					Enter a valid email address to receive account setup
					instructions
				</p>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="my-4 px-md-5 px-2 w-100 text-left">
						<label
							className={`${styles.auth_label} my-3`}
							htmlFor="email"
						>
							Email address
						</label>
						<TextField
							id="email"
							placeholder="Enter your email address"
							type="email"
							name="email"
							register={register}
							required
							error={errors.email}
							errorText={errors.email && errors.email.message}
						/>
					</div>
					<div className="d-flex border-top px-md-5 px-2 py-2 justify-content-end">
						<Button
							data-cy="reset_password"
							label="Verify account"
							type="submit"
							buttonClass="primary"
							loading={isSubmitting || mutation.isLoading}
						/>
					</div>
				</form>
			</AuthPageWrapper>
		</AuthPageGlobalWrapper>
	);
};

export default ChangeEmail;

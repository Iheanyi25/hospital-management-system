import React from "react";
import queryString from "query-string";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { TextField, Button } from "../../ui_elements";
import AuthPageWrapper from "./AuthPageWrapper";
import styles from "./auth_style.module.css";
import { useApiPost } from "../../api/apiCall";
import { resetPasswordUrl, verifyUserUrl } from "../../api/urls";
import { useHistory } from "react-router-dom";
import { checkForValidPassword } from "../../utils/formValidations";

const resetPasswordSchema = yup.object().shape({
	newPassword: yup
		.string()
		.required("New password is required")
		.test(
			"validate password",
			"password must be between 8 to 15 characters which contains at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
			checkForValidPassword
		),
	confirmPassword: yup
		.string()
		.test("passwords-match", "passwords do not match", function (value) {
			return this.parent.newPassword === value;
		})
});

const ResetPassword = () => {
	const { push } = useHistory();
	const parsed = queryString.parse(window.location.search);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm({
		resolver: yupResolver(resetPasswordSchema)
	});
	const mutation = useApiPost();

	const onSubmit = (data) => {
		const requestDet =
			parsed.i !== "cu"
				? {
						url: resetPasswordUrl(),
						data: {
							newPassword: data.newPassword,
							authenticationToken: parsed?.w,
							email: parsed?.q
						}
				  }
				: {
						url: verifyUserUrl(),
						data: {
							username: parsed.q,
							newPassword: data.newPassword,
							emailConfirmationAuthenticationToken: parsed?.w,
							resetPasswordAuthenticationToken: parsed?.e
						}
				  };
		return mutation.mutate(requestDet, {
			onSuccess: () => {
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Password successfully updated!"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				push("/login");
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Failed to change password!",
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
			<h1 className={`${styles.auth_main_header}`}>Reset Password</h1>
			<p className={`${styles.auth_sub_header}`}>
				Create a new password to sign in with
			</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="my-3 px-5 w-100 text-left">
					<label
						className={`${styles.auth_label} my-3`}
						htmlFor="new_password"
					>
						New Password
					</label>
					<TextField
						id="new_password"
						placeholder="New Password"
						type="password"
						name="newPassword"
						required
						register={register}
						error={errors.newPassword}
						errorText={
							errors.newPassword && errors.newPassword.message
						}
					/>
				</div>
				<div className="pb-4 px-5 w-100 text-left">
					<label
						className={`${styles.auth_label} my-3`}
						htmlFor="retype_password"
					>
						Retype Password
					</label>
					<TextField
						id="retype_password"
						placeholder="Retype Password"
						type="password"
						name="confirmPassword"
						required
						register={register}
						error={errors.confirmPassword}
						errorText={
							errors.confirmPassword &&
							errors.confirmPassword.message
						}
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

export default ResetPassword;

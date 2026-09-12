import React, { useState } from "react";
import { Button, SecondaryLink } from "../../ui_elements";
import AuthPageWrapper from "./AuthPageWrapper";
import styles from "./auth_style.module.css";
import { loginUrl, twoFactorAuthUrl } from "../../api/urls";
import { useApiPost } from "../../api/apiCall";
import { useHistory, useLocation } from "react-router-dom";
import OtpInput from "react-otp-input";
import useAuthAction from "../../custom-hooks/useAuthAction";

const OtpVerfication = () => {
	const { goBack } = useHistory();
	const { setLoginPrarms } = useAuthAction();
	const { state } = useLocation();
	const [otp, setOtp] = useState("");
	if (!state?.fromLogin) goBack();
	const { mutate, isLoading } = useApiPost();
	const { mutate: checkStatus, isLoading: isChecking } = useApiPost();
	const onSubmit = (e) => {
		e.preventDefault();
		const requestDet = {
			url: twoFactorAuthUrl(),
			data: { userId: state?.data?.userId, token: otp }
		};
		return mutate(requestDet, {
			onSuccess: ({ data }) => {
				setLoginPrarms(data);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Login Failed!",
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

	const resendVerificationCode = () => {
		const requestDet = {
			url: loginUrl(),
			data: {
				userName: state?.data?.userName.trim(),
				password: state?.data?.password
			}
		};
		return checkStatus(requestDet, {
			onSuccess: () => {
				const successFlag = window.AJS.flag({
					type: "success",
					title: "OTP Resent Successfully!"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: () => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "OTP wasn't sent successfully!"
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	return (
		<AuthPageWrapper>
			<h1 className={`${styles.auth_main_header}`}>Verification Code</h1>
			<p className={`${styles.auth_sub_header}`}>
				Enter the verification code sent to your registered email
			</p>
			<form onSubmit={onSubmit}>
				<div className="my-4 px-md-5 px-0 w-100 m-auto">
					<OtpInput
						value={otp}
						onChange={(e) => setOtp(e)}
						numInputs={6}
						containerStyle="justify-content-between"
						inputStyle={styles.otp_input_style}
					/>
				</div>
				<SecondaryLink
					label={
						isChecking ? "Sending..." : "Resend Verification code"
					}
					type="button"
					disabled={isChecking}
					onClick={resendVerificationCode}
				/>
				<div className="d-flex border-top px-5 py-2 mt-3 justify-content-end">
					<Button
						data-cy="reset_password"
						label="Continue"
						type="submit"
						buttonClass="primary"
						disabled={otp.length < 6 || isChecking}
						loading={isLoading}
					/>
				</div>
			</form>
		</AuthPageWrapper>
	);
};

export default OtpVerfication;

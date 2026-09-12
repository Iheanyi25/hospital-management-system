import React from "react";
import { Link, useHistory } from "react-router-dom";
import { TextField, Button } from "../../../ui_elements";
import styles from "./style.module.css";
import auth_styles from "../auth_style.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useApiPost } from "../../../api/apiCall";
import { useForm } from "react-hook-form";
import { loginUrl } from "../../../api/urls";
import AuthPageWrapper from "../AuthPageWrapper";
import useAuthAction from "../../../custom-hooks/useAuthAction";
import { SCHOOL_DETAILS, USER_TYPES } from "../../../utils/constants";
import Curve1 from "../../../assets/images/Ellipse1.png"
import Curve2 from "../../../assets/images/Ellipse2.png"
// import Curve3 from "../../../assets/images/Ellipse1.png"


export const LoginSchema = yup.object().shape({
	userName: yup.string().required("please input your username"),
	password: yup.string().required("please input your password")
});

const Login = () => {
	const { push } = useHistory();
	const { setLoginPrarms } = useAuthAction();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm({ resolver: yupResolver(LoginSchema) });

	const mutation = useApiPost();

	const onSubmit = (data) => {
		const requestDet = {
			url: loginUrl(),
			data: {
				userName: data.userName.trim(),
				password: data.password
			}
		};
		return mutation.mutate(requestDet, {
			onSuccess: ({ data }) => {
				const userRole = data?.data?.userType?.toLowerCase()?.trim();
				if (data?.data?.oldUser) {
					if (USER_TYPES.includes(userRole)) {
						if (data?.data?.twoFactor) {
							push({
								pathname: "/verify_otp",
								state: {
									data: {
										...data?.data,
										userName: requestDet.data.userName,
										password: requestDet.data.password
									},
									fromLogin: true
								}
							});
						} else {
							setLoginPrarms(data);
						}
					} else {
						const errorFlag = window.AJS.flag({
							type: "error",
							title: "Login Failed!",
							body: `User type can't be granted log in access`
						});
						setTimeout(() => {
							errorFlag.close();
						}, 5000);
					}
				} else {
					push({
						pathname: "/change_email",
						state: {
							id: data?.data?.userId,
							fromLogin: true
						}
					});
				}
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Login Failed!",
					body:
						response?.data?.message ||
						`Login failed, please check your details `
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};
	return (
		<div className={`${styles.login_row} mx-0 row w-100`}>

			<form
				className={`${styles.login_content} col-12 col-md-12 col-lg-8 d-flex justify-content-center align-items-center`}
				onSubmit={handleSubmit(onSubmit)}
			>
				<AuthPageWrapper>
					<h1 className={`${auth_styles.auth_main_header}`}>
						{`Welcome to ${SCHOOL_DETAILS.shortForm}`}
					</h1>
					<div className={`${auth_styles.auth_sub_header}`}>
						Login to access portal
					</div>
					<div className="px-5 pb-4">
						<div className="my-3 w-100 text-left">
							<label
								className={`${styles.login_label} my-3`}
								htmlFor="username"
							>
								Username
							</label>
							<TextField
								id="username"
								placeholder="Enter username"
								type="text"
								name="userName"
								register={register}
								required
								error={errors.userName}
								errorText={
									errors.userName && errors.userName.message
								}
							/>
						</div>
						<div className="w-100 text-left">
							<label
								className={`${styles.login_label} my-3`}
								htmlFor="password"
							>
								Password
							</label>
							<TextField
								id="password"
								placeholder="Enter password"
								type="password"
								name="password"
								register={register}
								required
								error={errors.password}
								errorText={
									errors.password && errors.password.message
								}
							/>
						</div>
						<Link
							data-cy="forgot_password"
							to="/forgot_password"
							className={`${styles.link_class_forgot} d-flex align-items-center justify-content-end`}
						>
							Forgot Password?
						</Link>
					</div>
					<div className="d-flex border-top justify-content-between px-5 py-2">
						<p className="d-flex align-items-center">
							New Student?{" "}
							<Link
								data-cy="verify_account"
								to="/verify_account"
								className={`${styles.link_class} d-flex align-items-center ml-1`}
							>
								Verify account
							</Link>
						</p>
						<Button
							data-cy="sign_in"
							label="Sign in"
							type="submit"
							buttonClass="primary"
							loading={isSubmitting || mutation.isLoading}
						/>
					</div>
				</AuthPageWrapper>
			</form>
			<div
				className={`${styles.login_inner_wrapper} col-12 col-md-12 col-lg-4 px-0`}
			>
				<div className={`${styles.curve_section1}`}>
					<img src={Curve1} alt="curve" />
					<img src={Curve2} alt="curve" />
				</div>
				<div className={`${styles.login_text}`}>
					<h5>Ready to Leave a Lasting Impact? </h5>
					<p>Sign in to begin your journey towards intellectual freedom</p>
				</div>
				<div className={`${styles.curve_section2}`}>
					<img src={Curve1} alt="curve" />
					<img src={Curve2} alt="curve" />
				</div>
			</div>
		</div>
	);
};

export default Login;

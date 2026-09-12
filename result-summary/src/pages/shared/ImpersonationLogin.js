import React, { useLayoutEffect } from "react";
import queryString from "query-string";
import {
	Button,
	DefaultScreen,
	ImpersonationCard,
	Spinner
} from "../../ui_elements";
import AuthPageWrapper from "./AuthPageWrapper";
import styles from "./auth_style.module.css";
import { useApiGet, useApiPost } from "../../api/apiCall";
import { getImpersonatorDetailsUrl, impersonateUserUrl } from "../../api/urls";
import { useHistory } from "react-router-dom";
import useAuthAction from "../../custom-hooks/useAuthAction";

const ImpersonationLogin = () => {
	const { goBack, replace } = useHistory();
	const parsed = queryString.parse(window.location.search);
	const { setLoginPrarms, logout } = useAuthAction();

	if (!parsed?.cuid) goBack();

	const { data, isLoading, error } = useApiGet(
		getImpersonatorDetailsUrl({
			userIdToImpersonate: parsed?.uidti,
			impersonatorId: parsed?.cuid,
			token: parsed?.it
		}),
		{
			refetchOnWindowFocus: false
		}
	);
	const mutation = useApiPost();
	useLayoutEffect(() => {
		logout();
	}, [logout]);
	const onSubmit = (e) => {
		e.preventDefault();
		const requestDet = {
			url: impersonateUserUrl(),
			data: {
				impersonatorId: parsed?.cuid,
				userIdToImpersonate: parsed?.uidti,
				token: parsed?.it
			}
		};
		return mutation.mutate(requestDet, {
			onSuccess: ({ data }) => {
				setLoginPrarms(data);
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
	if (isLoading)
		return (
			<div style={{ height: "100vh" }}>
				<Spinner />
			</div>
		);
	if (error)
		return (
			<div
				style={{ height: "100vh" }}
				className="d-flex justify-content-center align-items-center"
			>
				<DefaultScreen
					title="An Error Occurred"
					message={error?.response?.data?.message}
					buttonGroup={
						<>
							<Button
								data-cy="default"
								buttonClass="primary"
								label="Go to Home Page"
								onClick={() => replace("/")}
							/>
							<Button
								data-cy="login"
								buttonClass="standard"
								label={"Go to Login"}
								onClick={() => replace("/login")}
							/>
						</>
					}
				/>
			</div>
		);

	return (
		<AuthPageWrapper>
			<h1 className={`${styles.auth_main_header} ${styles.text_yellow}`}>
				Impersonation Mode
			</h1>
			<p className={`${styles.auth_sub_header}`}>
				Your are about to impersonate the user below do you wish to
				continue?
			</p>
			<div>
				<div className="mx-5 my-5">
					<ImpersonationCard
						fullName={data?.data?.fullname}
						email={data?.data?.email}
						passport={data?.data?.passport}
						role={data?.data?.roles}
					/>
				</div>
				<div className="d-flex border-top px-md-5 px-2 py-2 justify-content-end">
					<Button
						data-cy="impersonate"
						label="Continue"
						type="button"
						onClick={onSubmit}
						buttonClass="primary"
						loading={mutation.isLoading}
					/>
				</div>
			</div>
		</AuthPageWrapper>
	);
};

export default ImpersonationLogin;

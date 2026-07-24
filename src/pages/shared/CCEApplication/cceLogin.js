import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, AuthPageGlobalWrapper } from "../../../ui_elements";
import styles from "../auth_style.module.css";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { cceLoadApplicationFormUrl } from "../../../api/urls";
import { useDispatch } from "react-redux";
import { CCE_APPLICATION } from "../../../store/constant";
import { cceInitialState } from "../../../store/reducers/cceReducer";
import { useApiGet } from "../../../api/apiCall";
import AuthPageWrapper from "../AuthPageWrapper";

export const cceLoginSchema = yup.object().shape({
	rrr: yup.string().required("please input your Reference Number")
});

const CCELogin = () => {
	const { push, replace } = useHistory();
	const [makeRequest, setMakeRequest] = useState(false);
	const dispatch = useDispatch();
	const [rrr, setRrr] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({ resolver: yupResolver(cceLoginSchema) });

	const {
		data,
		isFetching: isLoading,
		error: requestError
	} = useApiGet(cceLoadApplicationFormUrl(rrr), {
		enabled: makeRequest,
		refetchOnWindowFocus: false
	});

	useEffect(() => {
		if (data?.success && makeRequest && !isLoading) {
			dispatch({
				type: CCE_APPLICATION,
				payload: cceInitialState(data?.data)
			});
			if (data?.data?.formCompleted === true) {
				push({
					pathname: "/cce_application/preview",
					state: { details: rrr }
				});
			} else {
				replace({
					pathname: "/cce_application",
					state: { details: data?.data, fromVerify: true }
				});
			}
		}
		if (requestError && makeRequest && !isLoading) {
			setMakeRequest(false);
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Invalid Action!",
				body:
					requestError?.response?.data?.message ||
					`Invalid action, please enter correct details`
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		}
	}, [
		data,
		requestError,
		push,
		replace,
		makeRequest,
		isLoading,
		dispatch,
		rrr
	]);

	const onSubmit = (data) => {
		setRrr(data.rrr);
		setMakeRequest(true);
	};

	return (
		<AuthPageGlobalWrapper>
			<AuthPageWrapper>
				<form onSubmit={handleSubmit(onSubmit)} className="mt-4">
					<h1 className={`${styles.auth_main_header}`}>Login</h1>
					<p className={`${styles.auth_sub_header}`}>
						CCE APPLICATION FORM
					</p>
					<div className="my-3 px-5 w-100 text-left">
						<label
							className={`${styles.auth_label} my-3`}
							htmlFor="rrr"
						>
							Reference Number
						</label>
						<TextField
							id="rrr"
							placeholder="Enter your Reference Number"
							type="text"
							name="rrr"
							register={register}
							required
							error={errors.rrr}
							errorText={errors.rrr && errors.rrr.message}
						/>
					</div>
					<div className="d-flex border-top px-5 py-2 mt-4 justify-content-end">
						<Button
							data-cy="login"
							label="Login"
							type="submit"
							buttonClass="primary"
							loading={isLoading}
						/>
					</div>
				</form>
			</AuthPageWrapper>
		</AuthPageGlobalWrapper>
	);
};

export default CCELogin;

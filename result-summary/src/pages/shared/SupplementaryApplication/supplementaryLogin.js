import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, AuthPageGlobalWrapper } from "../../../ui_elements";
import styles from "../auth_style.module.css";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SAVE_SUPPLEMENTARY_INFO } from "../../../store/constant";
import { useApiGet } from "../../../api/apiCall";
import AuthPageWrapper from "../AuthPageWrapper";
import { supplementaryInitialState } from "../../../store/reducers/supplementaryReducer";
import { supplementaryLoadApplicationFormUrl } from "../../../api/urlCategories/SupplementaryApplication";

export const supplementaryLoginSchema = yup.object().shape({
	jambRegNumber: yup.string().required("please input your reg. number")
});

const SupplementaryLogin = () => {
	const { push } = useHistory();
	const [makeRequest, setMakeRequest] = useState(false);
	const dispatch = useDispatch();
	const [jambRegNumber, setJambRegNumber] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({ resolver: yupResolver(supplementaryLoginSchema) });

	const {
		data,
		isFetching: isLoading,
		error: requestError
	} = useApiGet(supplementaryLoadApplicationFormUrl(jambRegNumber), {
		enabled: makeRequest,
		refetchOnWindowFocus: false,
		retry: false
	});

	useEffect(() => {
		if (
			data?.success &&
			data?.data?.basicInformation?.supplementaryFormCompleted &&
			makeRequest &&
			!isLoading
		) {
			return push({
				pathname: "/supplementary_application_details",
				state: { fromLogin: true, details: data?.data }
			});
		}
		if (data?.success && makeRequest && !isLoading) {
			dispatch({
				type: SAVE_SUPPLEMENTARY_INFO,
				payload: supplementaryInitialState(data?.data)
			});
			push({
				pathname: "/supplementary_application",
				state: { fromVerify: true }
			});
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
	}, [data, requestError, push, makeRequest, isLoading, dispatch]);

	const onSubmit = (data) => {
		setJambRegNumber(data.jambRegNumber);
		setMakeRequest(true);
	};

	return (
		<AuthPageGlobalWrapper>
			<AuthPageWrapper>
				<form onSubmit={handleSubmit(onSubmit)} className="mt-4">
					<h1 className={`${styles.auth_main_header}`}>Login</h1>
					<p className={`${styles.auth_sub_header}`}>
						ADMISSION SHOPPING APPLICATION FORM
					</p>
					<div className="my-3 px-5 w-100 text-left">
						<label
							className={`${styles.auth_label} my-3`}
							htmlFor="reg_no"
						>
							Registration Number
						</label>
						<TextField
							id="reg_no"
							placeholder="Enter your JAMB registration number"
							type="text"
							name="jambRegNumber"
							register={register}
							required
							error={errors.jambRegNumber}
							errorText={
								errors.jambRegNumber &&
								errors.jambRegNumber.message
							}
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

export default SupplementaryLogin;

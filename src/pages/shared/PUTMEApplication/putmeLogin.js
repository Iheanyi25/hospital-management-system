import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, AuthPageGlobalWrapper } from "../../../ui_elements";
import styles from "../auth_style.module.css";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { putmeLoadApplicationFormUrl } from "../../../api/urls";
import { useDispatch } from "react-redux";
import { SAVE_PUTME_INFO } from "../../../store/constant";
import { useApiGet } from "../../../api/apiCall";
import AuthPageWrapper from "../AuthPageWrapper";
import { putmeInitialState } from "../../../store/reducers/putmeReducer";
// import { checkIfPutmeFormat } from "../../../utils/formValidations";

export const putmeLoginSchema = yup.object().shape({
	jambRegNumber: yup.string().required("please input your reg. number")
	// .test("PUTME_CHECK", "not a valid jamb reg. number", checkIfPutmeFormat)
});

const PUTMELogin = () => {
	const { push } = useHistory();
	const [makeRequest, setMakeRequest] = useState(false);
	const dispatch = useDispatch();
	const [jambRegNumber, setJambRegNumber] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({ resolver: yupResolver(putmeLoginSchema) });

	const {
		data,
		isFetching: isLoading,
		error: requestError
	} = useApiGet(putmeLoadApplicationFormUrl(jambRegNumber), {
		enabled: makeRequest,
		refetchOnWindowFocus: false,
		retry: false
	});

	useEffect(() => {
		if (
			data?.success &&
			data?.data?.formCompleted &&
			makeRequest &&
			!isLoading
		) {
			return push({
				pathname: "/putme_application_details",
				state: { fromLogin: true, details: data?.data }
			});
		}
		if (data?.success && makeRequest && !isLoading) {
			dispatch({
				type: SAVE_PUTME_INFO,
				payload: putmeInitialState(data?.data)
			});

			push({
				pathname: "/putme_application",
				state: {
					fromVerify: true,
					fromJamb: data?.data?.appliedForJamb
				}
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
						ADMISSION SCREENING APPLICATION FORM
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

export default PUTMELogin;

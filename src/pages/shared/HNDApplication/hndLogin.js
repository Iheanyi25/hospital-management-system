import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, AuthPageGlobalWrapper } from "../../../ui_elements";
import styles from "../auth_style.module.css";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { hndLoadApplicationFormUrl } from "../../../api/urls";
import { useDispatch } from "react-redux";
import { SAVE_PUTME_INFO } from "../../../store/constant";
import { useApiGet } from "../../../api/apiCall";
import AuthPageWrapper from "../AuthPageWrapper";
import { putmeInitialState } from "../../../store/reducers/putmeReducer";
// import { checkIfPutmeFormat } from "../../../utils/formValidations";

export const hndLoginSchema = yup.object().shape({
	mobileNumber: yup.string().required("please input your phone number")
});

const HNDLogin = () => {
	const { push } = useHistory();
	const [makeRequest, setMakeRequest] = useState(false);
	const dispatch = useDispatch();
	const [mobileNumber, setMobileNumber] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({ resolver: yupResolver(hndLoginSchema) });

	const {
		data,
		isFetching: isLoading,
		error: requestError
	} = useApiGet(hndLoadApplicationFormUrl(mobileNumber), {
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
				pathname: "/hnd_application_details",
				state: { fromLogin: true, details: data?.data }
			});
		}
		if (data?.success && makeRequest && !isLoading) {
			dispatch({
				type: SAVE_PUTME_INFO,
				payload: putmeInitialState(data?.data)
			});

			push({
				pathname: "/hnd_application",
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

	console.log(data)
	
	const onSubmit = (data) => {
		setMobileNumber(data.mobileNumber);
		setMakeRequest(true);
	};

	return (
		<AuthPageGlobalWrapper>
			<AuthPageWrapper>
				<form onSubmit={handleSubmit(onSubmit)} className="mt-4">
					<h1 className={`${styles.auth_main_header}`}>Higher National Diploma (HND)</h1>
					<p className={`${styles.auth_sub_header}`}>
						Login to fill the form
					</p>
					<div className="my-3 px-5 w-100 text-left">
						<label
							className={`${styles.auth_label} my-3`}
							htmlFor="mobileNo"
						>
							Phone Number
						</label>
						<TextField
							id="mobileNo"
							placeholder="Enter your phone number"
							type="text"
							name="mobileNumber"
							register={register}
							required
							error={errors.mobileNumber}
							errorText={
								errors.mobileNumber &&
								errors.mobileNumber.message
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

export default HNDLogin;

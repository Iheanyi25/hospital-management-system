import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, AuthPageGlobalWrapper } from "../../../ui_elements";
import styles from "../auth_style.module.css";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { staffRequestLoadApplicationFormUrl } from "../../../api/urls";
import { useDispatch } from "react-redux";
import { STAFF_REQUEST } from "../../../store/constant";
import { useApiGet } from "../../../api/apiCall";
import AuthPageWrapper from "../AuthPageWrapper";
import { staffRequestInitialState } from "../../../store/reducers/staffRequestReducer";

export const staffRequestLoginSchema = yup.object().shape({
	jambRegNumber: yup.string().required("please input your reg. number")
});

const StaffRequestLogin = () => {
	const { push, replace } = useHistory();
	const [makeRequest, setMakeRequest] = useState(false);
	const dispatch = useDispatch();
	const [jambRegNumber, setJambRegNumber] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({ resolver: yupResolver(staffRequestLoginSchema) });

	const {
		data,
		isFetching: isLoading,
		error: requestError
	} = useApiGet(staffRequestLoadApplicationFormUrl(jambRegNumber), {
		enabled: makeRequest,
		refetchOnWindowFocus: false
	});

	useEffect(() => {
		if (data?.success && makeRequest && !isLoading) {
			dispatch({
				type: STAFF_REQUEST,
				payload: staffRequestInitialState(data?.data)
			});
			if (data?.data?.basicInformation?.supplementaryFormCompleted) {
				push({
					pathname: "/staff_request_application/preview",
					state: { details: jambRegNumber }
				});
			} else {
				replace({
					pathname: "/staff_request_application",
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
		jambRegNumber
	]);

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
						STAFF REQUEST APPLICATION FORM
					</p>
					<div className="my-3 px-5 w-100 text-left">
						<label
							className={`${styles.auth_label} my-3`}
							htmlFor="reg_no"
						>
							JAMB Reg No
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

export default StaffRequestLogin;

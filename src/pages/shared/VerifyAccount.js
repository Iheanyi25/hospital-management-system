import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button } from "../../ui_elements";
import AuthPageWrapper from "./AuthPageWrapper";
import styles from "./auth_style.module.css";
import { useApiGet } from "../../api/apiCall";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { getInitialStudentProfileUrl } from "../../api/urls";
import { useDispatch } from "react-redux";
import { SAVE_STUDENT_DATA } from "../../store/constant";
import { initialState } from "../../store/reducers/createStudentReducer";

export const verifyAccountSchema = yup.object().shape({
	jambRegNumber: yup.string().required("please input your reg. number")
});

const VerifyAccount = () => {
	const { push } = useHistory();
	const [makeRequest, setMakeRequest] = useState(false);
	const dispatch = useDispatch();
	const [jambRegNumber, setJambRegNumber] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({ resolver: yupResolver(verifyAccountSchema) });

	const {
		data,
		isFetching: isLoading,
		error: requestError
	} = useApiGet(getInitialStudentProfileUrl(jambRegNumber), {
		enabled: makeRequest,
		refetchOnWindowFocus: false
	});
	useEffect(() => {
		if (data?.success && makeRequest && !isLoading) {
			dispatch({
				type: SAVE_STUDENT_DATA,
				payload: initialState(data?.data)
			});
			push({
				pathname: "/create_profile",
				state: { details: data?.data, fromVerify: true }
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
		<AuthPageWrapper>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h1 className={`${styles.auth_main_header}`}>
					Verify your account
				</h1>
				<p className={`${styles.auth_sub_header}`}>
					Enter your registration number to verify your account
				</p>
				<div className="my-3 px-md-5 px-2 w-100 text-left">
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
							errors.jambRegNumber && errors.jambRegNumber.message
						}
					/>
				</div>
				<div className="d-flex border-top px-md-5 px-2 py-2 mt-4 justify-content-end">
					<Button
						data-cy="verify_account"
						label="Verify Account"
						type="submit"
						buttonClass="primary"
						loading={isLoading}
					/>
				</div>
			</form>
		</AuthPageWrapper>
	);
};

export default VerifyAccount;

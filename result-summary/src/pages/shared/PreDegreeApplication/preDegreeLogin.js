import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, AuthPageGlobalWrapper } from "../../../ui_elements";
import styles from "../auth_style.module.css";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { preDegreeLoadApplicationFormUrl } from "../../../api/urls";
import { useDispatch } from "react-redux";
import { SAVE_PRE_DEGREE_INFO } from "../../../store/constant";
import { useApiGet } from "../../../api/apiCall";
import AuthPageWrapper from "../AuthPageWrapper";
import { predegreeInitialState } from "../../../store/reducers/predegreeReducer";

export const preDegreeLoginSchema = yup.object().shape({
	rrr: yup.string().required("please input your reg. number")
});

const PreDegreeApplication = () => {
	const { push } = useHistory();
	const [makeRequest, setMakeRequest] = useState(false);
	const dispatch = useDispatch();
	const [RRR, setRRR] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({ resolver: yupResolver(preDegreeLoginSchema) });

	const {
		data,
		isFetching: isLoading,
		error: requestError
	} = useApiGet(preDegreeLoadApplicationFormUrl(RRR), {
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
				pathname: "/pre_degree_application_details",
				state: { fromLogin: true, details: data?.data }
			});
		}
		if (data?.success && makeRequest && !isLoading) {
			dispatch({
				type: SAVE_PRE_DEGREE_INFO,
				payload: predegreeInitialState(data?.data)
			});
			push({
				pathname: "/pre_degree_application",
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
		setRRR(data.rrr);
		setMakeRequest(true);
	};

	return (
		<AuthPageGlobalWrapper>
			<AuthPageWrapper>
				<form onSubmit={handleSubmit(onSubmit)} className="mt-4">
					<h1 className={`${styles.auth_main_header}`}>
						Pre Degree Application Login
					</h1>
					<p className={`${styles.auth_sub_header} text-uppercase`}>
						Application Form
					</p>
					<div className="my-3 px-5 w-100 text-left">
						<label
							className={`${styles.auth_label} my-3`}
							htmlFor="reg_no"
						>
							Reference Number
						</label>
						<TextField
							id="reg_no"
							placeholder="Enter Reference Number"
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

export default PreDegreeApplication;

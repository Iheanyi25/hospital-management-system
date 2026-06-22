import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button } from "../../../ui_elements";
import styles from "../auth_style.module.css";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { previewJupebApplicationUrl } from "../../../api/urls";
import { useDispatch } from "react-redux";
import { JUPEP_APPLICATIONS } from "../../../store/constant";
import { useApiGet } from "../../../api/apiCall";
import AuthPageWrapper from "../AuthPageWrapper";
import { jupebApplicationsInitialState } from "../../../store/reducers/jupebReducer";

export const jupebApplicationsLoginSchema = yup.object().shape({
	rrr: yup.string().required("please input your RRR")
});

const JupebApplicationLogin = () => {
	const { push } = useHistory();
	const [makeRequest, setMakeRequest] = useState(false);
	const dispatch = useDispatch();
	const [rrr, setRRR] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({ resolver: yupResolver(jupebApplicationsLoginSchema) });

	const {
		data,
		isFetching,
		error: requestError
	} = useApiGet(previewJupebApplicationUrl(rrr), {
		enabled: makeRequest,
		refetchOnWindowFocus: false
	});

	useEffect(() => {
		if (data?.success && makeRequest && !isFetching) {
			if (!data?.data?.completed) {
				dispatch({
					type: JUPEP_APPLICATIONS,
					payload: jupebApplicationsInitialState(data?.data)
				});
				push({
					pathname: "/sub_degree_application",
					state: { details: data?.data, fromVerify: true }
				});
			} else {
				push({
					pathname: "/sub_degree_application/preview",
					state: { details: rrr, fromVerify: true }
				});
			}
		}
		if (requestError && makeRequest && !isFetching) {
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
	}, [data, requestError, push, makeRequest, isFetching, dispatch, rrr]);

	const onSubmit = (data) => {
		setRRR(data.rrr);
		setMakeRequest(true);
	};

	return (
		<AuthPageWrapper>
			<form onSubmit={handleSubmit(onSubmit)} className="mt-4">
				<h1 className={`${styles.auth_main_header}`}>Login</h1>
				<p className={`${styles.auth_sub_header}`}>
					Login to fill Sub-degree Application form
				</p>
				<div className="my-3 px-5 w-100 text-left">
					<label
						className={`${styles.auth_label} my-3`}
						htmlFor="reg_no"
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
						loading={isFetching}
					/>
				</div>
			</form>
		</AuthPageWrapper>
	);
};

export default JupebApplicationLogin;

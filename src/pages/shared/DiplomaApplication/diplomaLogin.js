import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, AuthPageGlobalWrapper } from "../../../ui_elements";
import AuthPageWrapper from "../AuthPageWrapper";
import styles from "../auth_style.module.css";
import { useApiGet } from "../../../api/apiCall";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { getDiplomaApplication } from "../../../api/urls";
import { useDispatch } from "react-redux";
import { SAVE_DIPLOMA_INFO } from "../../../store/constant";
import { diplomaApplicationInitialState } from "../../../store/reducers/diplomaReducer";

export const schema = yup.object().shape({
	rrr: yup.string().required("Please enter Reference Number")
});

const PGLogin = () => {
	const { push } = useHistory();
	const [makeRequest, setMakeRequest] = useState(false);
	const dispatch = useDispatch();
	const [rrr, setRrr] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({ resolver: yupResolver(schema) });

	const {
		data,
		isFetching,
		error: requestError
	} = useApiGet(getDiplomaApplication(rrr), {
		enabled: makeRequest,
		refetchOnWindowFocus: false
	});
	useEffect(() => {
		if (data?.success && makeRequest && !isFetching) {
			if (data?.data?.formCompleted) {
				dispatch({
					type: SAVE_DIPLOMA_INFO,
					payload: diplomaApplicationInitialState(data?.data)
				});
				push({
					pathname: "/diploma_preview"
					// state: { rrr, fromPGReprintLogin: true }
				});
			} else {
				dispatch({
					type: SAVE_DIPLOMA_INFO,
					payload: diplomaApplicationInitialState(data?.data)
				});
				push({
					pathname: "/diploma_application",
					state: { rrr, fromDiplomaLogin: true }
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
		setRrr(data.rrr);
		setMakeRequest(true);
	};

	return (
		<AuthPageGlobalWrapper>
			<AuthPageWrapper>
				<form onSubmit={handleSubmit(onSubmit)}>
					<h1 className={`${styles.auth_main_header} mt-3`}>Login</h1>
					<p className={`${styles.auth_sub_header}`}>
						Login to fill Diploma Application form
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
							data-cy="pg_login"
							label="Login"
							type="submit"
							buttonClass="primary"
							loading={isFetching}
						/>
					</div>
				</form>
			</AuthPageWrapper>
		</AuthPageGlobalWrapper>
	);
};

export default PGLogin;

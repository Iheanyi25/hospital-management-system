import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button } from "../../../ui_elements";
import AuthPageWrapper from "../AuthPageWrapper";
import styles from "../auth_style.module.css";
import { useApiGet } from "../../../api/apiCall";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { verifyPGPaymentUrl } from "../../../api/urls";
import { useDispatch } from "react-redux";
import { SAVE_PG_INFO } from "../../../store/constant";
import { pgApplicationInitialState } from "../../../store/reducers/pgReducer";

export const verifyAccountSchema = yup.object().shape({
	rrr: yup.string().required("please input your Reference Number")
});

const PGLogin = () => {
	const { push } = useHistory();
	const [makeRequest, setMakeRequest] = useState(false);
	const dispatch = useDispatch();
	const [rrr, setRRR] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({ resolver: yupResolver(verifyAccountSchema) });

	const {
		data,
		isFetching,
		error: requestError
	} = useApiGet(verifyPGPaymentUrl(rrr), {
		enabled: makeRequest,
		refetchOnWindowFocus: false
	});
	useEffect(() => {
		if (data?.success && makeRequest && !isFetching) {
			if (data?.data?.isFormCompleted) {
				push({
					pathname: "/pg_application_details",
					state: { rrr, fromPGReprintLogin: true }
				});
			} else {
				dispatch({
					type: SAVE_PG_INFO,
					payload: pgApplicationInitialState(data?.data)
				});
				push({
					pathname: "/pg_application",
					state: { fromPGLogin: true }
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
	}, [data, rrr, requestError, push, makeRequest, isFetching, dispatch]);

	const onSubmit = (data) => {
		setRRR(data.rrr);
		setMakeRequest(true);
	};

	return (
		<AuthPageWrapper>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h1 className={`${styles.auth_main_header} mt-3`}>
					Post Graduate Application
				</h1>
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
	);
};

export default PGLogin;

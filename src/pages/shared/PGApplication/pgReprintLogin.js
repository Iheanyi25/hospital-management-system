import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button } from "../../../ui_elements";
import AuthPageWrapper from "../AuthPageWrapper";
import styles from "../auth_style.module.css";
import { useApiGet } from "../../../api/apiCall";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { getPGTrackingVerificationUrl } from "../../../api/urls";
import { useDispatch } from "react-redux";

export const verifyAccountSchema = yup.object().shape({
	rrr: yup.string().required("please input your reg. number")
});

const PGReprintLogin = () => {
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
		isLoading,
		error: requestError
	} = useApiGet(getPGTrackingVerificationUrl(rrr), {
		enabled: makeRequest,
		refetchOnWindowFocus: false
	});
	useEffect(() => {
		if (data?.success && makeRequest && !isLoading) {
			push({
				pathname: "/pg_application_details",
				state: {
					rrr,
					fromPGReprintLogin: true
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
	}, [data, requestError, push, rrr, makeRequest, isLoading, dispatch]);

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
				<p className={`${styles.auth_sub_header}`}>
					Reprint Application Form
				</p>
				<div className="my-3 px-5 w-100 text-left">
					<label
						className={`${styles.auth_label} my-3`}
						htmlFor="rrr"
					>
						RRR Number
					</label>
					<TextField
						id="rrr"
						placeholder="Enter your RRR number"
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
						data-cy="pg_reprint_login"
						label="Login"
						type="submit"
						buttonClass="primary"
						loading={isLoading}
					/>
				</div>
			</form>
		</AuthPageWrapper>
	);
};

export default PGReprintLogin;

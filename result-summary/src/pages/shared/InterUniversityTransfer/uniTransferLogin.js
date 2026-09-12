import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, AuthPageGlobalWrapper } from "../../../ui_elements";
import AuthPageWrapper from "../AuthPageWrapper";
import styles from "../auth_style.module.css";
import style from "./style.module.css";
import { useApiGet } from "../../../api/apiCall";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { verifyTransferPaymentUrl } from "../../../api/urls";
import { useDispatch } from "react-redux";
import { SAVE_UNI_TRANSFER_INFO } from "../../../store/constant";
import { uniTransferApplicationInitialState } from "../../../store/reducers/uniTransferReducer";

export const verifyAccountSchema = yup.object().shape({
	regNumber: yup.string().required("please input reg number")
});

const UniTransferLogin = () => {
	const { push } = useHistory();
	const [makeRequest, setMakeRequest] = useState(false);
	const dispatch = useDispatch();
	const [regNumber, setRegNumber] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({ resolver: yupResolver(verifyAccountSchema) });

	const {
		data,
		isFetching,
		error: requestError
	} = useApiGet(verifyTransferPaymentUrl(regNumber), {
		enabled: makeRequest,
		refetchOnWindowFocus: false
	});
	useEffect(() => {
		if (data?.success && makeRequest && !isFetching) {
			if (data?.data?.formCompleted) {
				dispatch({
					type: SAVE_UNI_TRANSFER_INFO,
					payload: uniTransferApplicationInitialState(data?.data)
				});
				push({
					pathname: "/uni_transfer_application_details",
					state: {
						regNumber: regNumber
					}
				});
			} else {
				dispatch({
					type: SAVE_UNI_TRANSFER_INFO,
					payload: uniTransferApplicationInitialState(data?.data)
				});
				push({
					pathname: "/uni_transfer_application",
					state: { fromUniTransferLogin: true }
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
	}, [
		data,
		regNumber,
		requestError,
		push,
		makeRequest,
		isFetching,
		dispatch
	]);

	const onSubmit = (data) => {
		setRegNumber(data.regNumber);
		setMakeRequest(true);
	};

	return (
		<AuthPageGlobalWrapper>
			<AuthPageWrapper>
				<form onSubmit={handleSubmit(onSubmit)}>
					<h1 className={`${styles.auth_main_header} mt-3`}>
						Inter University Transfer Form
					</h1>
					<p className={style.sub_header}>Login to Fill the form</p>
					<div className="my-3 px-5 w-100 text-left">
						<label
							className={`${styles.auth_label} my-3`}
							htmlFor="regNumber"
						>
							JAMB Reg No:
						</label>
						<TextField
							id="regNumber"
							placeholder="Enter JAMB Reg No"
							type="text"
							name="regNumber"
							register={register}
							required
							error={errors.regNumber}
							errorText={
								errors.regNumber && errors.regNumber.message
							}
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

export default UniTransferLogin;

import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, AuthPageGlobalWrapper } from "../../../ui_elements";
import AuthPageWrapper from "../AuthPageWrapper";
import styles from "../auth_style.module.css";
import { useApiGet } from "../../../api/apiCall";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { loadFiveYearSandwichApplicationUrl } from "../../../api/urls";
import { useDispatch } from "react-redux";
import { SAVE_FIVE_YEAR_SANDWICH_APPLICATION } from "../../../store/constant";
import { fiveYearSandwichApplicationInitialState } from "../../../store/reducers/fiveYearSandwichReducer";

export const verifyAccountSchema = yup.object().shape({
	rrr: yup.string().required("please input your RRR")
});

const FiveYearSandwichLogin = () => {
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
	} = useApiGet(loadFiveYearSandwichApplicationUrl(rrr), {
		enabled: makeRequest,
		refetchOnWindowFocus: false
	});
	useEffect(() => {
		if (data?.success && makeRequest && !isFetching) {
			if (data?.data?.formCompleted) {
				push({
					pathname: "/five_year_sandwich_application_details",
					state: { rrr, fromReprintLogin: true }
				});
			} else {
				dispatch({
					type: SAVE_FIVE_YEAR_SANDWICH_APPLICATION,
					payload: fiveYearSandwichApplicationInitialState(data?.data)
				});
				push({
					pathname: "/five_year_sandwich_application",
					state: { fromLogin: true }
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
		<AuthPageGlobalWrapper>
			<AuthPageWrapper>
				<form onSubmit={handleSubmit(onSubmit)}>
					<h1 className={`${styles.auth_main_header} mt-3`}>
						5-Year Sandwich Form
					</h1>
					<div className="my-3 px-5 w-100 text-left">
						<label
							className={`${styles.auth_label} my-3`}
							htmlFor="rrr"
						>
							RRR Number
						</label>
						<TextField
							id="email"
							placeholder="Enter your RRR Number"
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
							data-cy="four_year_sandwich_login"
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

export default FiveYearSandwichLogin;

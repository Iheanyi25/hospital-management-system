import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Hat } from "../../../../../assets/svgs";
import {
	Button,
	Note,
	SecondaryLink,
	TextField
} from "../../../../../ui_elements";

import * as yup from "yup";

import styles from "../components.module.css";

import { useApiGet } from "../../../../../api/apiCall";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TENECE_SUPPORT_URL } from "../../../../../utils/constants";
import { checkAdmissionStatusUrl } from "../../../../../api/urls";

export const StatusSchema = yup.object().shape({
	jambRegNumber: yup.string().required("please input your reg number")
});

export const StatusCheck = () => {
	const { push } = useHistory();

	const [makeRequest, setMakeRequest] = useState(false);
	const [jambRegNumber, setJambRegNumber] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({ resolver: yupResolver(StatusSchema) });

	const {
		data,
		isFetching: isLoading,
		error: requestError
	} = useApiGet(checkAdmissionStatusUrl(jambRegNumber), {
		enabled: makeRequest,
		refetchOnWindowFocus: false
	});
	useEffect(() => {
		if (data?.success) {
			let {
				invoiceGenerationErrorResponse,
				invoicePaymentErrorResponse,
				noAdmissionErrorResponse
			} = data?.data?.applicantErrorResponse;

			if (
				!invoiceGenerationErrorResponse &&
				!invoicePaymentErrorResponse &&
				!noAdmissionErrorResponse
			) {
				return push({
					pathname: `/prospective_students`,
					state: { ...data?.data?.applicantInfo, type: "success" },
					hash: "#success"
				});
			}

			if (noAdmissionErrorResponse) {
				return push({
					pathname: `/prospective_students`,
					state: {
						...data?.data?.applicantInfo,
						type: "noAdmission"
					},
					hash: "#failure"
				});
			}

			if (invoiceGenerationErrorResponse) {
				return push({
					pathname: `/prospective_students`,
					state: {
						...data?.data?.applicantInfo,
						type: "noInvoice"
					},
					hash: "#unpaid"
				});
			}

			if (invoicePaymentErrorResponse) {
				return push({
					pathname: `/prospective_students`,
					state: {
						...data?.data?.applicantInfo,
						type: "unpaid"
					},
					hash: "#unpaid"
				});
			}
		}

		if (requestError) {
			setMakeRequest(false);
			if (
				requestError?.response?.data?.message ===
				"Please proceed to generate your invoice to check your admission status"
			) {
				push({
					pathname: `/prospective_students`,
					state: { ...data?.data, type: "unpaid" },
					hash: "#unpaid"
				});
			}
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Invalid Action!",
				body:
					requestError?.response?.data?.message ||
					`Invalid action, please enter correct details`
			});
			setTimeout(() => {
				errorFlag.close();
			}, 3000);
		}
	}, [data, requestError, push]);

	const onSubmit = (data) => {
		setJambRegNumber(data.jambRegNumber);
		setMakeRequest(true);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={`${styles.container} pt-4`}>
					<div className="d-flex justify-content-center">
						<Hat className="text-center" />
					</div>
					<h1 className={`${styles.header} my-5`}>
						Check Admission Status
					</h1>
					<div className="mx-4">
						<div className="w-100 text-left">
							<label className={`my-3`} htmlFor="jambRegNumber">
								JAMB NO
							</label>
							<TextField
								id="jambRegNumber"
								placeholder="Enter Jamb Registration Number"
								type="text"
								name="jambRegNumber"
								register={register}
								error={errors.userName}
								errorText={
									errors.userName && errors.userName.message
								}
								required
							/>
						</div>
					</div>
					<div
						className={`${styles.footer} mt-5 py-2 d-flex justify-content-end`}
					>
						<Button
							label="Confirm Status"
							buttonClass="primary mr-4"
							type="submit"
							loading={isLoading}
						/>
					</div>
				</div>
			</form>
			<div className={`${styles.noteContainer}`}>
				<Note
					paragraph={
						<span>
							If you experience any difficulty, kindly contact our
							support{" "}
							<SecondaryLink
								label="here"
								onClick={() =>
									window.open(TENECE_SUPPORT_URL, "_blank")
								}
							/>
						</span>
					}
				/>
			</div>
		</>
	);
};

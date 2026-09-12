import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import { useApiPost } from "../../../../../api/apiCall";
import { generateAdmissionStatusInvoiceUrl } from "../../../../../api/urls";

import { Hat } from "../../../../../assets/svgs";
import { Button, Note } from "../../../../../ui_elements";

import styles from "../components.module.css";

export const StatusUnpaid = () => {
	const { mutate, isLoading: isChecking } = useApiPost();

	const { state } = useLocation();
	const { push } = useHistory();

	if (!state || !state?.type) {
		push("/prospective_students");
	}

	const handleInvoiceGeneration = async () => {
		const requestBody = {
			url: generateAdmissionStatusInvoiceUrl(state.jambRegNumber)
		};
		mutate(requestBody, {
			onSuccess: (data) => {
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Invoice successfully generated!",
					body: "You generated an invoice for payment successfully"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				push({
					pathname: `/admission_status_reciepts`,
					state: { data: data?.data }
				});
			},
			onError: (error) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Invalid Action!",
					body:
						error?.response?.data?.message ||
						"Invoice generation failed! Try again"
				});
				setTimeout(() => {
					errorFlag.close();
				}, 3000);
			}
		});
	};

	return (
		<div className={`${styles.container} pt-4`}>
			<div className="d-flex justify-content-center">
				<Hat className="text-center" />
			</div>
			<h1 className={`${styles.header} my-5`}>Check Admission Status</h1>
			<div className="mx-4">
				<Note
					blueVariant={true}
					paragraph={`Hello ${state?.fullName}, 
					${
						state.type === "noInvoice"
							? "you have not generated your Admission Checking invoice"
							: "you have not made payment for your generated invoice."
					}
					Click on the button below to proceed.`}
				/>
			</div>
			<div
				className={`${styles.footer} mt-5 py-2 d-flex justify-content-end`}
			>
				<Button
					label={
						state.type === "noInvoice"
							? "Proceed to Generate Invoice"
							: "Proceed to Payment"
					}
					buttonClass="primary mr-4"
					loading={isChecking}
					onClick={handleInvoiceGeneration}
				/>
			</div>
		</div>
	);
};

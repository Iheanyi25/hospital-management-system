import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { tiggerRemitaPaymentUrl } from "../../api/urls";
import { Button } from "../button/Button";
import { useApiPost } from "../../api/apiCall";
import { PaymentModal } from "../paymentModal/paymentModal";

export const RemitaPaymentButton = ({ paymentDetails }) => {
	const { goBack } = useHistory();
	const { mutate, isLoading, isSuccess } = useApiPost();
	const [rocket, setRocket] = useState(false);
	const [completedFlow, setCompletedFlow] = useState(false);
	const [successful, setSuccessful] = useState(false);

	useEffect(() => {
		if (isLoading) {
			setRocket(true);
		} else {
			setTimeout(() => {
				setRocket(false);
				if (isSuccess) setCompletedFlow(true);
			}, 23000);
		}
	}, [isLoading, isSuccess]);

	const makePayment = () => {
		const paymentEngine = window.RmPaymentEngine.init({
			key: process.env.REACT_APP_REMITA_KEY,
			processRrr: true,
			transactionId: "",
			channel: "CARD",
			extendedData: {
				customFields: [
					{
						name: "rrr",
						value: paymentDetails?.rrr
					}
				]
			},
			onSuccess: () => {
				onSubmit();
			},
			onError: (response) => {
				console.log("callback Error Response", response);
			},
			onClose: () => {
				console.log("closed");
			}
		});
		paymentEngine.showPaymentWidget();
	};

	const onSubmit = () => {
		const requestDet = {
			url: tiggerRemitaPaymentUrl(paymentDetails?.rrr)
		};
		return mutate(requestDet, {
			onSuccess: () => {
				setSuccessful(true);
			},
			onError: ({ response }) => {
				setRocket(false);
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Something Went Wrong!",
					body:
						response?.data?.message ||
						response?.data?.title ||
						`confirm from admin that this payment was successful`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};
	useEffect(() => {
		const script = document.createElement("script");
		script.src = process.env.REACT_APP_RETIA_SCRIPT_URL;

		// live
		// script.src = "https://login.remita.net/payment/v1/remita-pay-inline.bundle.js";
		script.async = true;
		script.onload = () => console.log("Loaded...");
		document.body.appendChild(script);
	}, []);

	useEffect(() => {
		const unloadCallback = (event) => {
			event.preventDefault();
			event.returnValue = "";
			return "";
		};

		window.addEventListener("beforeunload", unloadCallback);
		return () => window.removeEventListener("beforeunload", unloadCallback);
	}, []);

	useEffect(() => {
		if (completedFlow && successful) {
			goBack();
			const successFlag = window.AJS.flag({
				type: "success",
				title: "Payment Successful",
				body: ` Your payment was made successfully!`
			});
			setTimeout(() => {
				successFlag.close();
			}, 5000);
		}
	}, [completedFlow, successful, goBack]);

	return (
		<>
			<PaymentModal isOpen={rocket} />
			<Button
				data-cy="pay_with_atm"
				label="Pay with ATM Card"
				onClick={() => makePayment()}
				type={"submit"}
				buttonClass="success"
				loading={isLoading}
				disabled={isLoading}
			/>
		</>
	);
};

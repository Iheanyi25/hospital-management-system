import { useState, useEffect } from "react";
import { ConfirmationModal } from "../../../../../../ui_elements";
import { useHistory } from "react-router";

import { SearchApplication } from "./components";
import { Caution, Success } from "../../../../../../assets/svgs";
import { useApiGet } from "../../../../../../api/apiCall";
import { getInvoiceUrl } from "../../../../../../api/urls";

const VerifyRemitaStatus = () => {
	const [makeRequest, setMakeRequest] = useState(false);
	const [rrr, setRrr] = useState("");
	const [verificationIcon, setVerificationIcon] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const [responseMessage, setResponseMessage] = useState("");
	const { push } = useHistory();

	const verifyError = (error) => {
		if (typeof error === "string") {
			setResponseMessage(error);
		} else if (error?.response?.data?.message) {
			setResponseMessage(error.response.data.message);
		}
	};

	const {
		data: verificationResponse,
		isLoading,
		isError,
		error
	} = useApiGet(getInvoiceUrl(rrr), {
		enabled: makeRequest,
		refetchOnWindowFocus: false,
		onError: verifyError
	});

	const validationChecker = (paymentStatus, rrr) => {
		if (paymentStatus) {
			return setVerificationIcon(<Success />);
		} else {
			return setVerificationIcon(<Caution />);
		}
	};

	useEffect(() => {
		if (verificationResponse?.data && makeRequest) {
			if (verificationResponse.data.paymentStatus) {
				const pathname =
					verificationResponse.data.paymentPurposeId === 1
						? "/invoice_management/school_fees/receipt"
						: "/invoice_management/acceptance/fee_receipt";
				push({
					pathname,
					state: verificationResponse.data
				});
			} else {
				setResponseMessage(
					`The invoice with reference ${rrr} has not been paid yet.`
				);
				validationChecker(false, rrr);
				setOpenModal(true);
				setMakeRequest(false);
			}
		} else if (isError && makeRequest) {
			verifyError(error);
			validationChecker(false, rrr);
			setOpenModal(true);
			setMakeRequest(false);
		}
	}, [
		error,
		isError,
		makeRequest,
		rrr,
		verificationResponse,
		push,
		isLoading
	]);

	return (
		<section>
			<ConfirmationModal
				isOpen={openModal}
				closeModal={() => setOpenModal(false)}
				verificationIcon={verificationIcon}
				isVerificationAlert={true}
				formTitle="Verify Remita Status"
				message={`${responseMessage}`}
				buttonLabel="Delete Invoice"
			/>
			<SearchApplication
				isLoading={isLoading}
				setMakeRequest={setMakeRequest}
				setRrr={setRrr}
			/>
		</section>
	);
};

export default VerifyRemitaStatus;

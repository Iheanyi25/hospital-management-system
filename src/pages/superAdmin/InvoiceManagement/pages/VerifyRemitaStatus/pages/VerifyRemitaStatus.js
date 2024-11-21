import { useState, useEffect } from "react";
import { ConfirmationModal } from "../../../../../../ui_elements";

import { SearchApplication } from "./components";
import { Caution, Success } from "../../../../../../assets/svgs";
import { useApiGet } from "../../../../../../api/apiCall";
import { verifyRemitaStatus } from "../../../../../../api/urls";

const VerifyRemitaStatus = () => {
	const [makeRequest, setMakeRequest] = useState(false);
	const [rrr, setRrr] = useState("");
	const [verificationIcon, setVerificationIcon] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const [responseMessage, setResponseMessage] = useState("");

	const verifyError = (error) => {
		setResponseMessage(error?.response?.data?.message);
	};

	const {
		data: verificationResponse,
		isLoading,
		isError,
		error
	} = useApiGet(verifyRemitaStatus(rrr), {
		enabled: makeRequest,
		refetchOnWindowFocus: false,
		onError: verifyError
	});

	const validationChecker = (message, rrr) => {
		if (
			message ===
				`An error occurred while verifying the status of the reference ${rrr}` ||
			message ===
				`The invoice with reference ${rrr} has not been paid yet.`
		) {
			return setVerificationIcon(<Caution />);
		} else if (
			message === `The invoice with reference ${rrr} has been paid.`
		) {
			return setVerificationIcon(<Success />);
		}
	};

	useEffect(() => {
		if (verificationResponse) {
			setResponseMessage(verificationResponse?.data);
			validationChecker(verificationResponse?.data, rrr);
			setOpenModal(true);
			setMakeRequest(false);
		} else if (isError) {
			verifyError(error);
			validationChecker(responseMessage, rrr);
			setOpenModal(true);
			setMakeRequest(false);
		}
	}, [
		error,
		isError,
		makeRequest,
		responseMessage,
		rrr,
		verificationResponse
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

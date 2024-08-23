import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useApiGet } from "../../../../../api/apiCall";
import {
	getAllSessionsUrl,
	getPGApplicationTypesUrl
} from "../../../../../api/urls";
import { Note, PaymentOptions, Spinner } from "../../../../../ui_elements";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import { UserDetailsForm } from "../../components";
import { JupebStudentForms } from "../../components";

const GenerateJupebStudentsPaymentInvoice = () => {
	const [userFormState, setUserFormState] = useState(false);
	const [makeRequest, setMakeRequest] = useState(false);
	const [userFormData, setUserFormData] = useState({});
	const [jupebApplicationId, setJupebAplicationId] = useState("");
	const { data: applicatiionData, isLoading: applicationTypesLoading } =
		useApiGet(getPGApplicationTypesUrl());

	const { data: sessions, isLoading: sessionsLoading } = useApiGet(
		getAllSessionsUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const location = useLocation();

	const { state } = location;

	const allSessions = formatSelectItems(sessions?.data, "session", "id");
	const allApplicationTypes = formatSelectItems(
		applicatiionData?.data,
		"name",
		"id"
	);

	if (sessionsLoading || applicationTypesLoading) return <Spinner />;
	return (
		<>
			{!userFormState && (
				<Note
					blueVariant={true}
					paragraph={`To begin your application process, kindly supply the required details and click "Submit" to proceed. We will check if you have already generated an invoice, if we don't find one, we will present you with an invoice generation form.
				`}
				/>
			)}
			<JupebStudentForms
				allApplicationTypes={allApplicationTypes}
				setUserFormState={setUserFormState}
				setUserFormData={setUserFormData}
				userFormState={userFormState}
				userFormData={userFormData}
				state={state}
				setJupebAplicationId={setJupebAplicationId}
				makeRequest={makeRequest}
				setMakeRequest={setMakeRequest}
			/>
			{userFormState && (
				<UserDetailsForm
					allSessions={allSessions}
					userFormData={userFormData}
					applicationId={jupebApplicationId}
					makeRequest={makeRequest}
				/>
			)}
			<div className="mt-5">
				<PaymentOptions />
			</div>
		</>
	);
};

export default GenerateJupebStudentsPaymentInvoice;

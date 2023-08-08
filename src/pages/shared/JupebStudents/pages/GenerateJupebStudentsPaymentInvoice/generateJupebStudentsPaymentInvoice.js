 import { useState } from "react";
import { useApiGet } from "../../../../../api/apiCall";
import {
	getAllSessionsUrl,
	getJupebApplicationTypesUrl
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
		useApiGet(getJupebApplicationTypesUrl());

	const { data: sessions, isLoading: sessionsLoading } = useApiGet(
		getAllSessionsUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

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

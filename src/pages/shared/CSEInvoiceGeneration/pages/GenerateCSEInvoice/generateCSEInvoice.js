import { useState } from "react";
import { useApiGet } from "../../../../../api/apiCall";
import { getAllSessionsUrl } from "../../../../../api/urls";
import { Note, Spinner } from "../../../../../ui_elements";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import { UserDetailsForm } from "../../components";
import { CCEStudentForms } from "../../components";
import { useLocation, useHistory } from "react-router-dom";

const GenerateCCEInvoice = () => {
	const [userFormState, setUserFormState] = useState(false);
	const [makeRequest, setMakeRequest] = useState(false);
	const [userFormData, setUserFormData] = useState({});
	const [jupebApplicationId, setJupebAplicationId] = useState("");

	const { data: sessions, isLoading: sessionsLoading } = useApiGet(
		getAllSessionsUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const allSessions = formatSelectItems(sessions?.data, "session", "id");

	const location = useLocation();
	const history = useHistory();

	const { state } = location;
	const { goBack } = history;

	if (!location.state) goBack();

	if (sessionsLoading) return <Spinner />;
	return (
		<>
			{!userFormState && (
				<Note
					blueVariant={true}
					paragraph={`To begin your application process, kindly supply the required details and click "Submit" to proceed. We will check if you have already generated an invoice, if we don't find one, we will present you with an invoice generation form.
				`}
				/>
			)}
			<CCEStudentForms
				setUserFormState={setUserFormState}
				setUserFormData={setUserFormData}
				userFormState={userFormState}
				userFormData={userFormData}
				setJupebAplicationId={setJupebAplicationId}
				makeRequest={makeRequest}
				setMakeRequest={setMakeRequest}
				state={state}
			/>
			{userFormState && (
				<UserDetailsForm
					allSessions={allSessions}
					userFormData={userFormData}
					applicationId={jupebApplicationId}
					makeRequest={makeRequest}
				/>
			)}
		</>
	);
};

export default GenerateCCEInvoice;

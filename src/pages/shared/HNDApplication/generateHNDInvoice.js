// import { useState } from "react";
// import {
// 	useLocation,
// 	useHistory
// } from "react-router-dom/cjs/react-router-dom.min";
// import { useApiGet } from "../../../../../api/apiCall";
// import {
// 	getAllSessionsUrl,
// 	getApplicationTypesUrl
// } from "../../../../../api/urls";
// import { Note, Spinner } from "../../../../../ui_elements";
// import { formatSelectItems } from "../../../../../utils/formatSelectItems";
// import { UserDetailsForm } from "../../components";
// import { JupebDetailsForm } from "../../components";

// const GenerateJambPaymentInvoice = () => {
// 	const [userFormState, setUserFormState] = useState(false);
// 	const [makeRequest, setMakeRequest] = useState(false);
// 	const [userFormData, setUserFormData] = useState({});
// 	const {
// 		data: applicatiionData,
// 		isLoading: applicationTypesLoading,
// 	} = useApiGet(getApplicationTypesUrl());

// 	const {
// 		data: sessions,
// 		isLoading: sessionLoading,
// 	} = useApiGet(getAllSessionsUrl(), {
// 		refetchOnWindowFocus: false
// 	});

// 	const allSessions = formatSelectItems(sessions?.data, "session", "id");

// 	const allApplicationTypes = formatSelectItems(
// 		applicatiionData?.data,
// 		"name",
// 		"id"
// 	);

// 	const location = useLocation();
// 	const history = useHistory();

// 	const { state } = location;
// 	const { goBack } = history;

// 	if (!location.state) goBack();

// 	if ((applicationTypesLoading || sessionLoading)) return <Spinner />;

// 	return (
// 		<>
// 			{!userFormState && (
// 				<Note
// 					blueVariant={true}
// 					paragraph={`To begin your application process, kindly supply the required details and click "Submit" to proceed. We will check if you have already generated an invoice, if we don't find one, we will present you with an invoice generation form.
// 				`}
// 				/>
// 			)}
// 			<JupebDetailsForm
// 				allApplicationTypes={allApplicationTypes}
// 				setUserFormState={setUserFormState}
// 				setUserFormData={setUserFormData}
// 				userFormState={userFormState}
// 				userFormData={userFormData}
// 				state={state}
// 				makeRequest={makeRequest}
// 				setMakeRequest={setMakeRequest}
// 			/>
// 			{userFormState && (
// 				<UserDetailsForm
// 					allSessions={allSessions}
// 					userFormData={userFormData}
// 					applicationId={state?.application?.id}
// 					state={state}
// 					makeRequest={makeRequest}
// 				/>
// 			)}
// 		</>
// 	);
// };

// export default GenerateJambPaymentInvoice;

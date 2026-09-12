import { useHistory, useLocation } from "react-router-dom";
import { useApiGet } from "../../../../api/apiCall";
import {
	getPGRefereeStatusUrl,
	getPGTrackingVerificationUrl,
	getPGTranscriptRequestUrl,
	verifyPGPaymentUrl
} from "../../../../api/urls";
import { Spinner } from "../../../../ui_elements";
import styles from "../style.module.css";
import { Cards, Title, TrackReferee } from "./components";
const PGApplicationDetails = () => {
	const { push } = useHistory();
	const { state } = useLocation();
	if (!state?.fromPGReprintLogin) push("/pg_reprint_login");
	const rrr = state?.rrr;
	const { data, isLoading, error } = useApiGet(
		getPGTrackingVerificationUrl(rrr),
		{
			refetchOnWindowFocus: false
		}
	);
	const {
		data: transcriptRequest,
		isLoading: isLoadingTranscriptRequest,
		error: transcriptError
	} = useApiGet(getPGTranscriptRequestUrl(rrr), {
		refetchOnWindowFocus: false
	});

	const {
		data: refereeStatuses,
		isLoading: isLoadingRefereeStatuses,
		isFetching: isFetchingRefereeStatuses,
		error: statusError
	} = useApiGet(getPGRefereeStatusUrl(rrr), {
		refetchOnWindowFocus: false
	});
	const {
		data: formDetails,
		isLoading: isLoadingFormDetails,
		error: formDetailsError
	} = useApiGet(verifyPGPaymentUrl(rrr), {
		refetchOnWindowFocus: false
	});
	if (
		isLoading ||
		isLoadingTranscriptRequest ||
		isLoadingRefereeStatuses ||
		isLoadingFormDetails
	)
		return <Spinner />;
	if (error || transcriptError || statusError || formDetailsError)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<div className={styles.container}>
			<Title info={data?.data} />
			<DisplayCurrentScreen
				validRoute={state}
				rrr={rrr}
				transcriptRequest={transcriptRequest?.data}
				refereeStatuses={refereeStatuses?.data}
				formDetails={formDetails?.data}
				isFetchingRefereeStatuses={isFetchingRefereeStatuses}
			/>
		</div>
	);
};

const DisplayCurrentScreen = ({
	validRoute,
	transcriptRequest,
	rrr,
	refereeStatuses,
	isFetchingRefereeStatuses,
	formDetails
}) => {
	const location = useLocation();
	switch (location.hash) {
		case "#referee_status":
			return (
				<TrackReferee
					refereeStatuses={refereeStatuses}
					isFetchingRefereeStatuses={isFetchingRefereeStatuses}
					rrr={rrr}
				/>
			);
		default:
			return (
				<Cards
					validRoute={validRoute}
					transcriptRequest={transcriptRequest}
					formDetails={formDetails}
				/>
			);
	}
};

export default PGApplicationDetails;

import { useHistory, useLocation } from "react-router-dom";
import styles from "../style.module.css";
import { Cards, Title } from "./components";

const PUTMEApplicationDetails = () => {
	const { replace } = useHistory();
	const { state } = useLocation();
	if (!state?.fromLogin) replace("/putme_login");
	
	return (
		<div className={styles.container}>
			<Title info={state?.details?.putmePersonalInfoResponse} />
			<Cards details={state?.details} />
		</div>
	);
};
export default PUTMEApplicationDetails;

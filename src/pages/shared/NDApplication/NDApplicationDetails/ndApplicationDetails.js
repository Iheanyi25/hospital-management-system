import { useHistory, useLocation } from "react-router-dom";
import styles from "../style.module.css";
import { Cards, Title } from "./components";

const NdApplicationDetails = () => {
	const { replace } = useHistory();
	const { state } = useLocation();

	if (!state?.fromLogin) replace("/nd_login");

	return (
		<div className={styles.container}>
			<Title info={state?.details?.personalInfoResponse} />
			<Cards details={state?.details} />
		</div>
	);
};
export default NdApplicationDetails;

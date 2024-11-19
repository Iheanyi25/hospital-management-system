import { useHistory, useLocation } from "react-router-dom";
import styles from "../style.module.css";
import { Cards, Title } from "./components";

const SupplementaryApplicationDetails = () => {
	const { replace } = useHistory();
	const { state } = useLocation();
	if (!state?.fromLogin) replace("/supplementary_login");

	return (
		<div className={styles.container}>
			<Title info={state?.details?.basicInformation} />
			<Cards details={state?.details} />
		</div>
	);
};
export default SupplementaryApplicationDetails;
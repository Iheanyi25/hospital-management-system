import logo from "../../../../../../assets/images/logo.png";
import { SCHOOL_DETAILS } from "../../../../../../utils/constants";
import styles from "../style.module.css";

export const PrintOutLogo = ({ office, address }) => {
	return (
		<div className="d-flex align-items-center gap-3 pb-3">
			<aside className={styles.logo_container}>
				<img src={logo} alt="logo" />
			</aside>
			<aside className={styles.logo_text}>
				<h2>{SCHOOL_DETAILS.name}</h2>
				<h3>{office}</h3>
				{address && <h4>{address}</h4>}
			</aside>
		</div>
	);
};

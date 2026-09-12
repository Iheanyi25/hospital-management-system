import React from "react";
import { useHistory } from "react-router-dom";
import christmasLogoSingle from "../../assets/images/christmasLogoSingle.png";
import logoSingle from "../../assets/images/logoSingle.png";
import ChristmasLogo from "../../assets/images/bannerLight.png";
import styles from "./auth_style.module.css";
import { checkIfChristmasPeriod } from "../../utils/checkIfChristmasPeriod";

export default function AuthPageWrapper({ children }) {
	const { push } = useHistory();
	return (
		<div className={`${styles.auth_container}`}>
			<div className={`${styles.auth_card} bg-white`}>
				{checkIfChristmasPeriod() && (
					<>
						<img
							src={ChristmasLogo}
							alt="christmas Light"
							className={`${styles.light}`}
						/>
					</>
				)}
				<div className={`mt-5 pt-2 mr-3 ${styles.logo}`}>
					<img
						src={
							checkIfChristmasPeriod()
								? christmasLogoSingle
								: logoSingle
						}
						alt="Akwapoly Logo"
						onClick={() => push("/")}
					/>
				</div>
				{children}
			</div>
		</div>
	);
}

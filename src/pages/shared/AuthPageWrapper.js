import React from "react";
import { useHistory } from "react-router-dom";
import logo from "../../assets/images/sideLogo.png";
import christmasLogo from "../../assets/images/christmasLogo.png";
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
							alt="chrsitmas Light"
							className={`${styles.light}`}
						/>
					</>
				)}
				<div className={`mt-5 pt-2 ${styles.logo}`}>
					{checkIfChristmasPeriod() ? (
						<>
							<img src={christmasLogo} alt="fupre logo" />
						</>
					) : (
						<>
							<img
								src={
									checkIfChristmasPeriod()
										? christmasLogo
										: logo
								}
								alt="Login Logo"
								onClick={() => push("/")}
							/>
						</>
					)}
				</div>
				{children}
			</div>
		</div>
	);
}

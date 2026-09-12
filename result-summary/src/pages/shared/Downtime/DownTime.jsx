import styles from "./downtime.module.css";
import { useHistory } from "react-router-dom";
import downtimeImg from "../../../assets/images/downTime.png";
import { Button } from "../../../ui_elements";

const DownTime = () => {
	const { goBack } = useHistory();
	const handleContactSupport = () => {
		const zohoButton = document.getElementById("feedbacklabel");

		if (zohoButton) {
			zohoButton.click();
		} else {
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Invalid Action!",
				body: `Zoho support not found. Please contact support through the available channels.`
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		}
	};
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.illustration}>
					<img src={downtimeImg} alt="Maintenance Illustration" />
				</div>

				<h1 className={styles.title}>Temporarily Unavailable</h1>

				<p className={styles.description}>
					We're experiencing an unexpected interruption. Our team has
					been alerted and is actively working to restore access as
					quickly as possible.
				</p>

				<div className={styles.buttonGroup}>
					<Button
						label={"Contact Support"}
						buttonClass={"standard"}
						onClick={handleContactSupport}
					/>

					<Button
						label={"Refresh Page"}
						onClick={goBack}
						buttonClass={"primary"}
					/>
				</div>
			</div>
		</div>
	);
};

export default DownTime;

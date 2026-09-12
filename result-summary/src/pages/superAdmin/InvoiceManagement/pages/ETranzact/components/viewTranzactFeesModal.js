import styles from "../style.module.css";
import { Button } from "../../../../../../ui_elements";




export const ViewTranzactFeesDetails = ({ data, closeModal }) => {
	return (
		<div className={styles.receipt_container}>
			<div className={styles.details_table}>
				<div className={styles.row}>
					<span className={styles.label}>Fullname:</span>
					<span className={styles.value}>{data?.fullName}</span>
				</div>
				<div className={styles.row}>
					<span className={styles.label}>Confirmation Order Number:</span>
					<span className={styles.value}>{data?.confirmationOrderNumber}</span>
				</div>
				<div className={styles.row}>
					<span className={styles.label}>Receipt Number:</span>
					<span className={styles.value}>{data?.receiptNumber}</span>
				</div>
				<div className={styles.row}>
					<span className={styles.label}>Amount:</span>
					<span className={styles.value}>{data?.amount}</span>
				</div>
				<div className={styles.row}>
					<span className={styles.label}>Payment Description:</span>
					<span className={styles.value}>{data?.paymentDescription}</span>
				</div>
				<div className={styles.row}>
					<span className={styles.label}>Address:</span>
					<span className={styles.value}>{data?.address}</span>
				</div>
			</div>
			<div className={styles.button_wrapper}>
				<Button
					label="Back"
					onClick={closeModal}
					buttonClass="orange"
				/>
			</div>
		</div>
	);
};

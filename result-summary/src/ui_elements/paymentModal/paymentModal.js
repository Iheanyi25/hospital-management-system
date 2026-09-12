import styles from "./styles.module.css";
import { CenteredDialog } from "../centeredDialog/centeredDialog";
import { ModalScene } from "./components/modalScene";

export const PaymentModal = ({ isOpen, closeModal }) => {
	return (
		<CenteredDialog
			width={"1128px"}
			closeModal={closeModal}
			isOpen={isOpen}
			customStyles={styles.additionModalStyles}
		>
			<ModalScene />
		</CenteredDialog>
	);
};

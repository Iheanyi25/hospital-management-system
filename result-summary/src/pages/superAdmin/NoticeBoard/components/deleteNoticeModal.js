import { ConfirmationModal } from "../../../../ui_elements";
import styles from "../style.module.css";

export const DeleteNoticeModal = ({
	isOpen,
	closeModal,
	handleDelete,
	isDeleting
}) => {
	return (
		<ConfirmationModal
			isOpen={isOpen}
			closeModal={closeModal}
			formTitle="Delete notice"
			handleClick={handleDelete}
			isLoading={isDeleting}
			buttonLabel={"Delete notice"}
			message={
				<div className={styles.delete_modal_body}>
					<p>
						Are you sure you want to <span>delete</span> this
						notice?. This action cannot be undone.
					</p>
				</div>
			}
		/>
	);
};

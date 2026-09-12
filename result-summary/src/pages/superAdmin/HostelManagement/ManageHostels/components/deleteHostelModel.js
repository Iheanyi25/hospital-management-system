import { ConfirmationModal } from "../../../../../ui_elements";
import styles from "../style.module.css";

export const DeleteHostelModel = ({
	isOpen,
	closeModal,
	handleDelete,
	currentData,
	isDeleting
}) => {
	return (
		<ConfirmationModal
			isOpen={isOpen}
			closeModal={closeModal}
			formTitle={`Delete ${currentData?.name}`}
			handleClick={handleDelete}
			isLoading={isDeleting}
			buttonLabel={"Delete Hostel"}
			message={
				<div className={styles.delete_modal_body}>
					<p>
						Are you sure you want to <span>delete</span> this
						hostel?. This action cannot be undone.
					</p>
				</div>
			}
		/>
	);
};

import { ConfirmationModal } from "../../../../../../ui_elements";
import styles from "../../style.module.css";

export const DeleteFacultyModal = ({
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
			formTitle={`Delete Faculty`}
			handleClick={handleDelete}
			isLoading={isDeleting}
			buttonLabel={"Yes, Delete"}
			message={
				<div className={styles.delete_modal_body}>
					<p>
						Are you sure you want to delete{" "}
						<span>{currentData?.name}</span> this action can’t be
						undone. Do you want to proceed?
					</p>
				</div>
			}
		/>
	);
};

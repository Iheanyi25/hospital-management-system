import { ConfirmationModal } from "../../../../../../ui_elements";
import styles from "../../style.module.css";

export const DeleteOptionsModal = ({
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
			formTitle={`Delete Option`}
			handleClick={handleDelete}
			isLoading={isDeleting}
			buttonLabel={"Yes, Delete"}
			message={
				<div className={styles.delete_modal_body}>
					<p>
						Are you sure you want to delete{" "}
						<span>{currentData?.departmentOption}</span> this action can’t be
						undone. Do you want to proceed?
					</p>
				</div>
			}
		/>
	);
};

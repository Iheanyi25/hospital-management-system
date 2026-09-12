import { ConfirmationModal } from "../../../../../ui_elements";
import styles from "../style.module.css";

export const DeleteCategoryModal = ({
	isOpen,
	closeModal,
	handleDelete,
	isDeleting
}) => {
	return (
		<ConfirmationModal
			isOpen={isOpen}
			closeModal={closeModal}
			formTitle="Delete category"
			handleClick={handleDelete}
			isLoading={isDeleting}
			buttonLabel={"Delete category"}
			message={
				<div className={styles.delete_modal_body}>
					<p>
						Are you sure you want to <span>delete</span> this
						category?. This action cannot be undone.
					</p>
				</div>
			}
		/>
	);
};

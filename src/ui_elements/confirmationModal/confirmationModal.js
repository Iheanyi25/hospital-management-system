import React from "react";
import { Button, CenteredDialog } from "..";
import "./confirmationModal.css";

export const ConfirmationModal = ({
	modalId = "confirm_item",
	isOpen = false,
	closeModal = () => {},
	width = 584,
	formTitle = "Delete course",
	message = "Are you sure you want to delete this course",
	buttonLabel = "Delete course",
	handleClick = () => {},
	isDeleteModal = true,
	isLoading
}) => {
	return (
		<CenteredDialog
			modalId={modalId}
			isOpen={isOpen}
			closeModal={closeModal}
			width={width}
			title={formTitle}
			customStyles="modal-adjustment"
			footerData={
				<>
					<Button
						data-cy={`default_${modalId}`}
						label={buttonLabel}
						buttonClass={isDeleteModal ? "danger" : "primary"}
						onClick={handleClick}
						loading={isLoading}
					/>
					<Button
						data-cy={`cancel_${modalId}`}
						label="Cancel"
						buttonClass="standard"
						onClick={closeModal}
					/>
				</>
			}
		>
			<p className="mb-4">{message}</p>
		</CenteredDialog>
	);
};

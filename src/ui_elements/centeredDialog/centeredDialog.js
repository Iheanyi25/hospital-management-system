import Modal from "react-modal";
import "./centeredDialog.css";

export const CenteredDialog = ({
	modalId,
	title,
	children,
	footerData,
	customStyles,
	isOpen,
	closeModal,
	afterOpenModal,
	width = 744,
	formTitle
}) => {
	return (
		<Modal
			id={modalId}
			isOpen={isOpen}
			onAfterOpen={afterOpenModal}
			onRequestClose={closeModal}
			className={`mymodal`}
			overlayClassName="myoverlay"
			closeTimeoutMS={500}
		>
			<div role="document" style={{ width }} className="modal_body">
				<div className="modal-content" style={{ border: 0 }}>
					{title && (
						<div className="modal-header px-4">
							<h5 className="modal-title">{title}</h5>
						</div>
					)}
					{formTitle && (
						<div className="px-4 d-flex justify-content-between align-items-center">
							<h5 className="modal-title">{formTitle}</h5>
							<button
								className="aui-icon aui-icon-small aui-iconfont-cross"
								onClick={closeModal}
							>
								close side menu
							</button>
						</div>
					)}
					<div className="px-4 pt-4">{children}</div>
					{footerData && (
						<div className="modal-footer px-4">{footerData}</div>
					)}
				</div>
			</div>
		</Modal>
	);
};

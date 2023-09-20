import { LandingBadge } from "../../../../ui_elements";
import styles from "../style.module.css";
import DOMPurify from "dompurify";
import close from "../../../../assets/svgs/cancel.svg";
import { fullDate } from "../../../../utils/formatDate";
import Modal from "react-modal";

export const LandingModal = ({ isOpen, closeModal, data }) => {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={closeModal}
			className={styles.modal_wrapper}
			overlayClassName="myoverlay"
			closeTimeoutMS={500}
		>
			<div
				role="document"
				style={{ width: "1128px" }}
				className="modal_body"
			>
				<div key={data?.id} className={styles.modal_header}>
					<p className={styles.modal_title}>General Notice</p>
					<button
						onClick={() => closeModal(false)}
						className={styles.close_button}
					>
						<img src={close} alt="" />
					</button>
				</div>
				<div className={styles.landing_wrapper}>
					{data?.map((data) => {
						const badgeState = {
							Undergraduate: "undergraduate",
							"Prospective Students": "prospectiveStudent",
							Postgraduate: "bursaryPayments",
							"All Students": "allStudents",
							Staff: "allStaff"
						};
						return (
							<div
								key={data?.id}
								className={styles.landing_container}
							>
								<div className={styles.landing_header}>
									<LandingBadge
										state={
											badgeState[data?.category] || "-"
										}
										message={
											badgeState[data?.category] || "-"
										}
									/>
								</div>
								<div className={styles.landing_title}>
									<h3>{data?.name}</h3>
									<p>{fullDate(data?.startDate)}</p>
								</div>
								<div
									dangerouslySetInnerHTML={{
										__html: DOMPurify.sanitize(
											data?.description
										)
									}}
									className={styles.landing_modal_info}
								/>
								<h3 className={styles.landing_modal_info_name}>
									{data?.sender}
								</h3>
							</div>
						);
					})}
				</div>
			</div>
		</Modal>
	);
};

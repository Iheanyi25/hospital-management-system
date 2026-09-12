import { CenteredDialog, LandingBadge } from "../../../../ui_elements";
import styles from "../style.module.css";
import close from "../../../../assets/svgs/cancel.svg";
import { fullDate } from "../../../../utils/formatDate";
import DOMPurify from "dompurify";


export const NoticesModal = ({ isOpen, closeModal, data }) => {
	const badgeState = {
		Undergraduate: "undergraduate",
		"Prospective Students": "prospectiveStudent",
		Postgraduate: "bursaryPayments",
		"All Students": "allStudents",
		Staff: "allStaff"
	};
	return (
		<CenteredDialog
			width={"1128px"}
			closeModal={closeModal}
			isOpen={isOpen}
			customStyles={styles.additionModalStyles}
		>
			<div className={styles.modal_header}>
				<button
					onClick={() => closeModal(false)}
					className={styles.close_button}
				>
					<img src={close} alt="" />
				</button>
			</div>

			<div key={data?.id} className={styles.landing_container}>
				<div className={styles.landing_header}>
					<LandingBadge
						state={badgeState[data?.category] || "-"}
						message={badgeState[data?.category] || "-"}
					/>
				</div>
				<div className={styles.landing_title}>
					<h3>{data?.title}</h3>
					<p>{fullDate(data?.startDate)}</p>
				</div>
				<div
					dangerouslySetInnerHTML={{
						__html: DOMPurify.sanitize(data?.description)
					}}
					className={styles.landing_modal_info}
				/>
				<h3 className={styles.landing_modal_info_name}>
					{data?.senderName}
				</h3>
			</div>
		</CenteredDialog>
	);
};

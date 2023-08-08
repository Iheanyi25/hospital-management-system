import { CenteredDialog, LandingBadge } from "../../../../ui_elements";
import styles from "../style.module.css";
import DOMPurify from "dompurify";
import close from "../../../../assets/svgs/cancel.svg";
import { fullDate } from "../../../../utils/formatDate";

export const LandingModal = ({ isOpen, closeModal, data }) => {
	return (
		<CenteredDialog
			width={"1128px"}
			closeModal={closeModal}
			isOpen={isOpen}
			customStyles={styles.additionModalStyles}
		>
			<div key={data?.id} className={styles.modal_header}>
				<button
					onClick={() => closeModal(false)}
					className={styles.close_button}
				>
					<img src={close} alt="" />
				</button>
			</div>
			{data?.map((data) => {
				const badgeState = {
					Undergraduate: "undergraduate",
					"Prospective Students": "prospectiveStudent",
					Postgraduate: "bursaryPayments",
					"All Students": "allStudents",
					Staff: "allStaff"
				};
				return (
					<div key={data?.id} className={styles.landing_container}>
						<div className={styles.landing_header}>
							<LandingBadge
								state={badgeState[data?.category] || "-"}
								message={badgeState[data?.category] || "-"}
							/>
						</div>
						<div className={styles.landing_title}>
							<h3>{data?.name}</h3>
							<p>{fullDate(data?.startDate)}</p>
						</div>
						<div
							dangerouslySetInnerHTML={{
								__html: DOMPurify.sanitize(data?.description)
							}}
							className={styles.landing_modal_info}
						/>
						<h3 className={styles.landing_modal_info_name}>
							{data?.sender}
						</h3>
					</div>
				);
			})}
		</CenteredDialog>
	);
};

import styles from "./styles.module.css";
import accordionDown from "../../assets/svgs/accordionDown.svg";
import { useState } from "react";

export const Accordion = ({ title, defaultState = false, children }) => {
	const [expand, setExpand] = useState(defaultState);

	return (
		<>
			<div
				onClick={() => setExpand(!expand)}
				className={`d-flex align-items-center justify-content-between pb-2 ${styles.accordion_container}`}
			>
				<p className={styles.accordion_title}>{title}</p>
				<button className={styles.accordion_down_button}>
					<img
						className={
							expand
								? styles.rotate_accordian_img
								: styles.normal_accordion_img
						}
						src={accordionDown}
						alt=""
					/>
				</button>
			</div>
			<div
				className={
					expand
						? styles.accordion_body_expand
						: styles.accordion_body
				}
			>
				{children}
			</div>
		</>
	);
};

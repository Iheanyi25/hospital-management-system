import { useState } from "react";
import styles from "./styles.module.css";

export const ApplicationTabs = ({ items }) => {
	const storedItem = localStorage.getItem("applicationTabInfo");

	const [currentItem, setCurrentItem] = useState(
		storedItem || items[0].title
	);

	const handleClick = (info) => {
		localStorage.setItem("applicationTabInfo", info);
		setCurrentItem(info);
	};

	return (
		<div
			className={`d-flex w-100 justify-content-center ${styles.application_tab_container}`}
		>
			<div className={styles.application_tab_tabs}>
				{items.map((info, i) => (
					<div
						key={i}
						onClick={() => handleClick(info.title)}
						className={`${styles.application_tab} ${
							currentItem === info.title
								? styles.active_tab_applications
								: ""
						}`}
					>
						<div
							className={`${styles.application_tab_indicator} ${
								currentItem === info.title
									? styles.application_tab_indicator_show
									: ""
							}`}
						/>
						<p className={styles.application_tab_text}>
							{info.title}
						</p>
					</div>
				))}
			</div>
			{items.map(
				(info, i) =>
					currentItem === info.title && (
						<div
							key={i * 100000}
							className={styles.application_body}
						>
							{info.body}
						</div>
					)
			)}
		</div>
	);
};

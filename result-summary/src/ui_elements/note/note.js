import React from "react";
import { Info } from "../../assets/svgs";

import styles from "./note.module.css";

export const Note = ({ blueVariant = false, paragraph = "" }) => {
	return (
		<div
			className={`${styles.container} d-flex p-3 ${
				blueVariant ? styles.blueVariant : ""
			}`}
		>
			<Info />
			<div className="ml-3">
				<span className="">Note:</span>
				<p className={`mt-2 ${styles.paragraph}`}>{paragraph}</p>
			</div>
		</div>
	);
};

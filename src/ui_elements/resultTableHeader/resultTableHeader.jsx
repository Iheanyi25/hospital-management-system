import React from "react";
import { logo } from "../../assets/images";
import styles from "./styles.module.css";

export const TableHeader = ({ details, result}) => {

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<img src={logo} alt="School Logo" className={styles.logo} />
				<div className={styles.schoolInfo}>
					<h1>AKWA IBOM STATE POLYTECHNIC, IKOT OSURUA</h1>
					<h2>SCHOOL OF {details?.faculty}</h2>
					<h3>{details?.semester} {result ? "EXAMINATION RESULT" : "summary of semester examination results"}</h3>
				</div>
				<div className={styles.headerGrid}>
					<div>
						<div className={styles.gridItem}>
							<span>SESSION:</span>
							<span>{details?.session}</span>
						</div>
						<div className={styles.gridItem}>
							<span>DEPARTMENT:</span>
							<span>{details?.department}</span>
						</div>
						<div className={styles.gridItem}>
							<span>SEMESTER:</span>
							<span>{details?.semester}</span>
						</div>
					</div>

					<div>
						
						<div className={styles.gridItem}>
							<span>PROGRAMME:</span>
							<span>{details?.programme}</span>
						</div>
						<div className={styles.gridItem}>
							<span>DATE:</span>
							<span>{details?.date}</span>
						</div>
					</div>


				</div>
			</div>
		</div>
	);
};

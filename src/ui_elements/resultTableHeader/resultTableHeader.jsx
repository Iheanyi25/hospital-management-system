import React from "react";
import { logo } from "../../assets/images";
import styles from "./styles.module.css";

export const ResultTableHeader = ({ details }) => {
	return (
		<div className={styles.container}>
			<header>
				<img src={logo} alt="logo" />
				<h1>akwa ibom state polytechnic, ikot osurua</h1>
			</header>
			<div>
				<h2>{details?.faculty}</h2>
				<h2>semester examination result</h2>
			</div>
			<div className={styles.headerGrid}>
				<div className={styles.gridItem}>
					<span>department</span>
					<span>{details?.department}</span>
				</div>
				<div className={styles.gridItem}>
					<span>semester</span>
					<span>{details?.semester}</span>
				</div>
				<div className={styles.gridItem}>
					<span>date</span>
					<span>{details?.date}</span>
				</div>
				<div className={styles.gridItem}>
					<span>programme</span>
					<span>{details?.programme}</span>
				</div>
				<div className={styles.gridItem}>
					<span>session</span>
					<span>{details?.session}</span>
				</div>
			</div>
		</div>
	);
};

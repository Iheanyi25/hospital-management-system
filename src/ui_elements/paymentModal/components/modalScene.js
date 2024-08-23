import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Stars } from "./stars";
import styles from "../styles.module.css";
import Rocket from "../../../assets/images/rocket.png";

export const ModalScene = () => {
	const [stars, setStars] = useState([]);

	useEffect(() => {
		const count = 50;
		const newStars = [];
		for (let i = 0; i < count; i++) {
			newStars.push(<Stars key={i} />);
		}
		setStars(newStars);
	}, []);
	return (
		<div
			className={`${styles.scene} d-flex justify-content-center align-items-center`}
		>
			<>{stars}</>
			<div
				className={`${styles.modalDetails} d-flex justify-content-center align-items-center flex-column`}
			>
				<h4>Payment processing, please wait...</h4>
				<div className={`${styles.rocket}`}>
					<img src={Rocket} alt={"Rocket payment"} />
				</div>
			</div>
		</div>
	);
};

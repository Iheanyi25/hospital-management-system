import { useState } from "react";
import { useEffect } from "react";
import styles from "../styles.module.css";

export const Stars = () => {
	const [position, setPosition] = useState({});

	useEffect(() => {
		const x = Math.floor(Math.random() * window.innerWidth);
		const duration = Math.random() * 1;
		const height = Math.random() * 100;

		setPosition({
			left: `${x}px`,
			width: "1px",
			height: `${height}px`,
			animationDuration: `${duration}s`
		});
	}, []);

	return <i style={position} className={`${styles.star}`} />;
};

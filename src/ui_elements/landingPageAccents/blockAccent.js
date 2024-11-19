import React from "react";
import styles from "./styles.module.css";

export const BlockAccent = ({ size, top, left }) => {
	const sizes = {
		height: `${size}px`,
		width: `${size}px`,
		top: `${top}%`,
		left: `${left}%`
	};
	return (
		<div
			className={`${styles.accent}`}
			style={{
				height: sizes.height,
				width: sizes.width,
				top: sizes.top,
				left: sizes.left
			}}
		/>
	);
};

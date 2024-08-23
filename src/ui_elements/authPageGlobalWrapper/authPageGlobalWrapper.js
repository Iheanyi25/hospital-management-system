import React from "react";
import styles from "./styles.module.css";

export const AuthPageGlobalWrapper = ({ children }) => {
	return <div className={styles.container}>{children}</div>;
};

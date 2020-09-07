import React from "react";
import styles from "../CSS/sidebar.module.css";

const Sidebar = ({ children }) => {
	return <aside className={styles.aside}>{children}</aside>;
};

export default Sidebar;

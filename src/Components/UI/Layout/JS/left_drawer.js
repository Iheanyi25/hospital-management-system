import React from "react";
import styles from "../CSS/left_drawer.module.css";

const LeftDrawer = (props) => {
	return (
		<div
			className={
				props.open
					? [styles.leftSideDrawer, styles.leftSideDrawerOpen].join(
							" "
					  )
					: [styles.leftSideDrawer, styles.leftSideDrawerClose].join(
							" "
					  )
			}
		>
			{props.children}
		</div>
	);
};

export default LeftDrawer;

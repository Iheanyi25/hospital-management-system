import logo from "../../../../assets/images/sideLogo.png";
import styles from "./styles.module.css";

const PrintOutLogo = ({
	office,
	indexing,
	showBorderBottom,
	showBorderBottomSub
}) => {
	return (
		<div className="d-flex align-items-center flex-column gap-3 pb-3  w-100">
			<div
				className="d-flex  align-items-center justify-content-end w-100 mb-4 "
				style={{ paddingRight: "80px" }}
			>
				<small style={{ color: "#253858" }}>{indexing}</small>
			</div>
			<aside
				className={styles.logo_container}
				style={!showBorderBottom ? { border: "none" } : {}}
			>
				<img src={logo} alt="logo" />
			</aside>
			<aside
				className={styles.logo_text}
				style={
					!showBorderBottomSub
						? { border: "none" }
						: { paddingBottom: "10px" }
				}
			>
				<h2>{office}</h2>
			</aside>
		</div>
	);
};
export default PrintOutLogo;

import styles from "./style.module.css";
import tick from "../../../../../../assets/svgs/greenTick.svg";

const UploadSuccess = ({ courseName }) => {
	return (
		<div className={`${styles.success_container} d-flex`}>
			<img src={tick} alt="done" className="mr-4" />
			<div className="w-100">
				<h2>Upload Complete</h2>
				<h4>Your file was successfully uploaded</h4>
				<div className="d-flex justify-content-between">
					<p>Results for {courseName}</p>
					<p>100%</p>
				</div>
				<div className={styles.progress_bar}></div>
			</div>
		</div>
	);
};

export default UploadSuccess;

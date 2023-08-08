import styles from "../../style.module.css";

export const Title = ({ info }) => {
	return (
		<div className="row justify-content-center">
			<div className={`col-12 mx-0 col-lg-10 ${styles.title_container}`}>
				<p className="mb-2">
					Dear{" "}
					<span className="text-bold">
						{`${info?.surname ?? ""} ${info?.firstname ?? ""} ${
							info?.middlename ?? ""
						},`.toUpperCase()}
					</span>
				</p>
				<p className="mb-2">
					Your Application has been Received Successfully.
				</p>
				<p>
					Application Number:{" "}
					<span className="text-bold">{info?.applicationNo}</span>
				</p>
			</div>
		</div>
	);
};

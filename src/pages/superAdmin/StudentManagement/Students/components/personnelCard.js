import Avatar from "react-avatar";
import styles from "./style.module.css";

export const PersonnelCard = ({ details, user, noMargin }) => {
	return (
		<section className={`${noMargin ?? "mt-5"}`}>
			<div className="row">
				<div className="col-md-3 d-flex align-items-center">
					<Avatar
						className={`${styles["info-avatar"]}`}
						name={user?.fullName}
						size="160"
						src={user?.passport}
						round={false}
						maxInitials={2}
					/>
				</div>
				<div className="col-md-8 d-flex align-items-center">
					<div className="row">
						{details?.map((detail, index) => (
							<div className="col-md-6" key={index}>
								<div
									className={`d-flex align-items-center ${styles["info-container"]}`}
								>
									<p className="col-md-6">
										{`${detail.title}:`}{" "}
									</p>

									<p className="font-weight-bold col-md-8">
										{detail.value}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

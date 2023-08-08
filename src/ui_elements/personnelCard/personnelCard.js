import Avatar from "react-avatar";
import logo from "../../assets/images/logo.png";
import "./personnelCard.css";

export const PersonnelCard = ({ details, user, noMargin, noLogo }) => {
	return (
		<section className={`${noMargin ?? "mt-5"} personnel_card_align`}>
			{!noLogo && (
				<header className="d-flex justify-content-center mb-5">
					<img src={logo} alt={"logo"} className="personnel-image" />
				</header>
			)}
			<div className="row">
				<div className="col-md-3 d-flex align-items-center">
					<Avatar
						className="info-avatar"
						name={user?.fullName}
						size="160"
						src={user?.passPort}
						round={false}
						maxInitials={2}
					/>
				</div>
				<div className="col-md-1" />

				<div className="col-md-8 d-flex align-items-center">
					<div className="row">
						{details?.map((detail, index) => (
							<div className="col-md-6" key={index}>
								<div className="d-flex align-items-center info-container">
									<p className="col-md-4">
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

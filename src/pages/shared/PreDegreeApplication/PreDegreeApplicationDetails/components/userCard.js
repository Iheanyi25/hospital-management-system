import Avatar from "react-avatar";

export const UserCard = ({ details, user, noMargin }) => {
	return (
		<section className={`${noMargin ?? "mt-5"}`}>
			<div className="row">
				<div className="col-4">
					<Avatar
						className="info-avatar"
						name={user?.fullName}
						size="200"
						src={user?.passport}
						round={false}
						maxInitials={2}
					/>
				</div>
				<div className="col-8 d-flex align-items-center">
					<div className="row">
						{details?.map((detail, index) => (
							<div className="col-md-12" key={index}>
								<div className="d-flex align-items-center">
									<p className="col-md-5">
										{`${detail.title}:`}{" "}
									</p>

									<p className="font-weight-bold col-md-7">
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

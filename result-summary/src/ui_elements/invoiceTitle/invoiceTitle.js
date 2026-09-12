import Avatar from "react-avatar";
import "./invoiceTitle.css";

export const InvoiceTitle = ({ noMargin, details, user }) => {
	return (
		<section
			className={`${
				noMargin ?? "mt-5"
			} personnel_card_align border border-bottom-0`}
		>
			<div className="row">
				<div className="col-md-2" />
				<div className="col-md-3 d-flex align-items-center">
					<Avatar
						className="info-avatar"
						name={user?.fullName}
						size="225"
						src={user?.passPort}
						round={false}
						maxInitials={2}
						color="#00875a"
					/>
				</div>
				<div className="col-md-1" />

				<div className="col-md-4 d-flex align-items-center">
					<div className="row">
						{details?.map((detail, index) => (
							<div>
								<div
									className="d-flex align-items-center info-container"
									key={index}
								>
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
				<div className="col-md-2" />
			</div>
		</section>
	);
};

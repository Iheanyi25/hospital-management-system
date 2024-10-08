import Avatar from "react-avatar";

export const UserCard = ({ details, user, noMargin }) => {
	return (
		<section className={`${noMargin ?? "mt-5"}`}>
			<div className="d-flex mb-4">
				<Avatar
					name={user?.fullname}
					size={240}
					round={false}
					src={user?.passport}
					className="mx-auto"
				/>
			</div>
			<div className="d-flex align-items-center mt-5">
				<div className="row">
					{details?.map((detail, index) => (
						<div
							className="col-md-12 d-flex justify-content-center"
							key={index}
						>
							<div className="d-flex align-items-baseline w-75 ml-5">
								<p className="text-start col-md-5 ml-5">
									{`${detail.title}:`}{" "}
								</p>

								<p className="text-start font-weight-bold col-md-7">
									{detail.value}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

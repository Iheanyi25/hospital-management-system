import logo from "../../assets/images/logo.png";
import "./resultTitle.css";

export const ResultTitle = ({ details }) => {
	return (
		<section className="mt-5">
			<header className="d-flex justify-content-center">
				<img src={logo} alt={"logo"} className="personnel-image" />
			</header>
			<div className="mt-5 row">
				<div className="col-md-9 d-flex align-items-center">
					<div className="row">
						{details?.map((detail, index) => (
							<div className="col-md-6">
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
				<div className="col-md-3 d-flex  justify-content-end">
					<div className="col-md-6 info-container">
						<p className="info-container">A (70-100%)</p>
						<p className="info-container">B (60-69%)</p>
						<p className="info-container">C (50-59%) </p>
						<p className="info-container">D (45-49%)</p>
					</div>
					<div className="col-md-6 info-container">
						<p className="info-container">E (40-44%)</p>
						<p className="info-container">F (0-39%)</p>
					</div>
				</div>
			</div>
		</section>
	);
};

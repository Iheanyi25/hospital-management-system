import Avatar from "react-avatar";
import "./userCard.css";

export const UserCard = ({ data }) => {
	const details = [
		{ title: "Full Name", description: data?.fullName },
		{ title: "Matric No", description: data?.matricNumber },
		{
			title: "Department",
			description: data?.department
		}
	];
	return (
		<section className={`class_personal_container`}>
			<div className="row justify-content-center align-items-center ">
				<div className="col-md-6 col-12">
					<div className="d-flex justify-content-center align-items-center class_list_subcontainer">
						<Avatar
							round="12px"
							size="88px"
							name={data?.fullName}
							src={data?.passport}
						/>
						<div className="w-100 ml-3">
							{details.map((item, index) => (
								<div
									className={`row w-100 rcr_title ${
										index === details.length - 1
											? ""
											: " mb-1"
									}`}
									key={index}
								>
									<div className="col-3">
										<p>{`${item.title}:`}</p>
									</div>
									<div className="col-9">
										<p>
											<b>{item.description}</b>
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="col-4">
					{/* <div className="d-flex justify-content-between">
						{courseDetails.map((item, index) => (
							<div className="rcr_title2" key={index}>
								<p>{item.title}</p>
								<h4>{item.description}</h4>
							</div>
						))}
					</div> */}
				</div>
				<div className="col-2 d-flex justify-content-end">
					{/* <div className="rcr_title3">
						<h3>{data?.cgpa?.toFixed(2)}</h3>
						<p>CGPA 5.0 Scale</p>
					</div> */}
				</div>
			</div>
		</section>
	);
};

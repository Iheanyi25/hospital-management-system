import Avatar from "react-avatar";
import "./impersonationCard.css";

export const ImpersonationCard = ({ fullName, passport, email, role }) => {
	return (
		<div className="imp_card_container d-flex flex-wrap align-items-center">
			<div>
				<Avatar
					className="imp_card_avatar"
					name={fullName}
					size="100"
					src={passport}
					round={true}
					maxInitials={2}
				/>
			</div>
			<div className="d-block ml-4 text-left">
				<h4>{fullName}</h4>
				<p className="text-lowercase">{email}</p>
				<h5>{role}</h5>
			</div>
		</div>
	);
};

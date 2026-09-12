import "./landingCard.css";

export const LandingCard = ({ title, info, img, children }) => {

	return (
		<div className="landing_card_container">
			<img src={img} alt="" />
			<h4 className="landing_card_title">{title}</h4>
			<p className="landing_card_info">{info}</p>
			{children}
		</div>
	);
};

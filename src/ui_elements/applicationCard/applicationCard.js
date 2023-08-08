import "./applicationCard.css";
import link1 from "../../assets/svgs/link5.svg";
import { Button } from "../button/Button";

export const ApplicationCard = ({
	title,
	info,
	img = link1,
	label,
	onClick,
	disabled = false
}) => {
	return (
		<div className="pg_card_container">
			<img src={img} alt="" />
			<h4 className="pg_card_title">{title}</h4>
			<p className="pg_card_info">{info}</p>
			<div className="d-flex justify-content-center">
				<Button
					label={label}
					buttonClass="primary"
					customClass="w-100"
					onClick={onClick}
					disabled={disabled}
				/>
			</div>
		</div>
	);
};

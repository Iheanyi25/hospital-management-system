import { ReactComponent as BedSpaceSvg } from "../../assets/svgs/bedSpaceSvg.svg";
import numberFormatter from "../../utils/numberFormatter";
import "./BedSpaceCard.css";

export const BedSpaceCard = ({
	price = "24,000",
	numeration = "A",
	disabled = false,
	selected = false,
	onClick
}) => {
	return (
		<div className="bed-sapce-container">
			{disabled || selected ? (
				<div
					className={`room-disabled-container ${
						selected ? " room-card-selected" : ""
					}`}
				></div>
			) : null}
			<div
				onClick={onClick}
				className={`bed-space-card d-flex align-items-center justify-content-center ${
					disabled ? " room-disabled" : ""
				} ${selected ? " room-card-selected-bg" : ""}`}
			>
				<BedSpaceSvg
					id="bed_space_svg"
					className={`${selected ? "room-card-selected-svg" : ""}`}
				/>
				<p className="bed-space-numeration">{numeration}</p>
				<p className="bed-space-price">&#8358;{numberFormatter(price)}</p>
			</div>
		</div>
	);
};

import "./HostelCard.css";
import { ReactComponent as HosteSvg } from "../../assets/svgs/hostelImg.svg";
import { ReactComponent as MapMarker } from "../../assets/svgs/map-marker.svg";
import { ReactComponent as BedSpace } from "../../assets/svgs/bed-space.svg";
import { ReactComponent as User } from "../../assets/svgs/user-icon.svg";
import { Badge } from "../badge/badge";
import { Button } from "../button/Button";

export const HostelCard = ({
	hostelName = "Mary JohnDoe Hostel",
	location = "Emene, Enugu Nigeria",
	price = "24,000",
	noOfRooms = 423,
	noOfBedSpaces = 1234,
	noOfBedSpacesLeft = 32,
	gender = "Male",
	disabled = false,
	onClick
}) => {
	const roomPercentage = () => {
		return (noOfBedSpacesLeft / noOfBedSpaces) * 100;
	};

	return (
		<div className="hostel-outer-container">
			{disabled && <div className="hostel-disabled-container"></div>}
			<div
				className={`hostel-card-container ${
					disabled ? " hostel-disabled" : ""
				}`}
			>
				<HosteSvg />
				<div className="textContainer">
					<h5>{hostelName}</h5>
					<div className="d-flex align-items-center mt-1 hostel-location-container">
						<MapMarker />
						<p className="ml-2 hostel-location">{location}</p>
					</div>
					<div className="d-flex align-items-center mt-3 hostel-info">
						<p>
							{noOfRooms}
							<span className="ml-2">
								room{noOfRooms > 1 && "s"}
							</span>
						</p>
						<span className="mx-3 hostel-info-bar">|</span>
						<div className="d-flex align-items-center">
							<BedSpace />
							<p className="ml-2 mr-3">{noOfBedSpaces}</p>
							<Badge
								item={{
									title: `${noOfBedSpacesLeft || 0} left`,
									type:
										roomPercentage() < 50 ||
										noOfBedSpaces === 0
											? "unapproved"
											: "success"
								}}
							/>
						</div>
						<span className="mx-3 hostel-info-bar">|</span>
						<div className="d-flex align-items-center">
							<User />
							<p className="ml-2">{gender}</p>
						</div>
					</div>
				</div>{" "}
				<div className="spacer"></div>
				<div className="amount-side">
					<h6>
						{price}
						<span>/room</span>
					</h6>
					<Button
						label={"Select"}
						buttonClass={"mt-3 primary"}
						customClass={"hostel-card-btn"}
						disabled={disabled}
						onClick={onClick}
					/>
				</div>
			</div>
		</div>
	);
};

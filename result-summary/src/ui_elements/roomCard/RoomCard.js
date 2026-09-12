import { ReactComponent as BedSpace } from "../../assets/svgs/bed-space.svg";
import { Badge } from "../badge/badge";
import "./RoomCard.css";

export const RoomCard = ({
	roomName = "Room 1",
	noOfBedSpaces = "4",
	noOfBedSpacesLeft = "2",
	customClass,
	onClick,
	disabled
}) => {
	const roomPercentage = () => {
		return (noOfBedSpacesLeft / noOfBedSpaces) * 100;
	}

	return (
		<div
			className={`hostel-room-container d-flex align-items-center justify-content-center ${customClass} ${
				disabled === false ? "roomCardDisabled" : ""
			}`}
			onClick={disabled === false ? null : onClick}
		>
			<p className="mt-3 roomName text-capitalize">{roomName}</p>
			<div className="d-flex align-items-center mt-4">
				<BedSpace />
				<p className="ml-2 mr-4">{noOfBedSpaces}</p>
				<Badge
					item={{
						title: `${noOfBedSpacesLeft || 0} left`,
						type:
							roomPercentage() < 50 || noOfBedSpaces === 0
								? "unapproved"
								: "success"
					}}
				/>
			</div>
		</div>
	);
};

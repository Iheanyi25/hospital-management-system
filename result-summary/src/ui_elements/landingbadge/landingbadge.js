import undergraduate from "../../assets/svgs/undergraduate.svg";
import prospectiveStudent from "../../assets/svgs/prospectiveStudent.svg";
import bursaryPayments from "../../assets/svgs/busaryPayments.svg";
import allStudents from "../../assets/svgs/allStudents.svg";
import allStaff from "../../assets/svgs/allStaff.svg";

import "./landingbadge.css";

export const LandingBadge = ({ state, message }) => {
	const img = {
		undergraduate: undergraduate,
		prospectiveStudent: prospectiveStudent,
		bursaryPayments: bursaryPayments,
		allStudents: allStudents,
		allStaff: allStaff
	};

	return (
		<div className={`landingBadgeContainer ${state}`}>
			{<img src={img[state]} alt="" />}
			<p>{message}</p>
		</div>
	);
};

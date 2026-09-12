import React from "react";
import "./alerts.css";

const Alerts = () => {
	return (
		<div className="alert_container d-flex justify-content-center align-items-center">
			<div className="">
				<p>Enrollee Added</p>
				<p> You successfully added this person</p>
				<p className="alert_text_link">View Profile</p>
			</div>
		</div>
	);
};
export { Alerts };

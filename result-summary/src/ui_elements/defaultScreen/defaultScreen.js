import React from "react";
import "./defaultScreen.css";

export const DefaultScreen = ({ title, message, buttonGroup }) => (
	<div className="default-header px-2">
		<h5 className="text-center">{title}</h5>
		<p className="text-center">{message}</p>
		<div className="d-flex">{buttonGroup && buttonGroup}</div>
	</div>
);

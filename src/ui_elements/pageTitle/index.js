import React from "react";
import "./pageTitle.css";
export const PageTitle = ({ title, buttonGroup }) => {
	return (
		<div className="d-flex align-items-center justify-content-between page_title_custom">
			<h4 className="m-0">{title}</h4>
			<div className="d-flex">{buttonGroup ? buttonGroup : null}</div>
		</div>
	);
};

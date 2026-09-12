import React from "react";
import { LoaderLogo } from "../../assets/svgs";
import "./pageLoader.css";

export const PageLoader = () => {
	return (
		<div className="page_loader_container">
			<div className="loader" />
			<LoaderLogo className="top" />
		</div>
	);
};

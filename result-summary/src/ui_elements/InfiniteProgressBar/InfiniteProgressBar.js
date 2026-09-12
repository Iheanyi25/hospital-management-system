import React from "react";
import "./InfiniteProgressBar.css";

export const InfiniteProgressBar = ({ height = "2.5px", width = "100%" }) => {
	return (
		<div className="progress infinite-progress-bar" style={{ height }}>
			<div
				className="progress-bar"
				role="progressbar"
				style={{ width }}
			></div>
		</div>
	);
};

import React from "react";

const Spinner = ({ height = "100%", width = "100%" }) => {
	return (
		<div
			className="spinner-container d-flex justify-content-center align-items-center"
			style={{ height, width }}
		>
			<div className="spinner-border text-primary" role="status">
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);
};

export { Spinner };

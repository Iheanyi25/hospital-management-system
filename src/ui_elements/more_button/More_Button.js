import React from "react";

import "./More_Button.css";

const MoreButton = ({ onClick, className = "", ...rest }) => {
	return (
		<button
			className={`rse-more-button ${className}`}
			onClick={onClick}
			{...rest}
		>
			<span className="aui-icon aui-icon-small aui-iconfont-more"></span>
		</button>
	);
};

export { MoreButton };

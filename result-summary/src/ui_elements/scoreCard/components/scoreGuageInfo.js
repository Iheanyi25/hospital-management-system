import React from "react";

const ScoreGuageInfo = ({ overall, studentGPA }) => {
	return (
		<React.Fragment>
			<span className="score-value">{studentGPA}</span>
			<span>out of {overall}</span>
			<span className="visual-indicator"></span>
		</React.Fragment>
	);
};

export default ScoreGuageInfo;

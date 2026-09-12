import React, { useEffect, useRef } from "react";

const CircularScoreGuage = ({ studentGPA = null }) => {
	const progressRef = useRef(null);
	useEffect(() => {
		progressRef.current.style.transition = `stroke-dashoffset 4s ease-in-out 0s`;
		const dashOffset = 500 - (studentGPA * 312) / 5;
		progressRef.current.style.strokeDashoffset = dashOffset;
	}, [studentGPA]);

	return (
		<React.Fragment>
			<svg>
				<circle key={studentGPA} ref={progressRef} cx={60} cy={60} r={50} />
			</svg>
		</React.Fragment>
	);
};

export default CircularScoreGuage;

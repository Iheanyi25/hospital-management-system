import React from "react";
import CircularScoreGuage from "./components/circularScoreGuage";
import ScoreGuageInfo from "./components/scoreGuageInfo";
import "./scoreCard.css";

const ScoreChart = ({
	showChart = true,
	studentGPA = 3,
	overall = 5,
	scoreCardTitle = "CGPA"
}) => {
	return (
		<React.Fragment>
			{showChart && (
				<section className="res-score-card--wrapper">
					<p className="card-title">{scoreCardTitle}</p>

					<div className="res-score-card--container">
						<div className="res-score-card">
							<ScoreGuageInfo
								overall={overall}
								studentGPA={convertToDP(studentGPA)}
							/>
							<CircularScoreGuage studentGPA={studentGPA} />
						</div>
					</div>
				</section>
			)}
		</React.Fragment>
	);
};

const convertToDP = (num, dp = 2) => {
	return Number(num).toFixed(dp);
};
export { ScoreChart };

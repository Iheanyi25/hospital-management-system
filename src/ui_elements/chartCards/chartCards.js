import "./chartCards.css";

export const ChartCards = ({ children, height }) => {
	return (
		<div style={{ height: height }} className="chart_card_container">
			{children || "content"}
		</div>
	);
};

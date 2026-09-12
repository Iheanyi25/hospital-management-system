import "./scoreButtons.css";

const ScoreButtons = ({
	scoringLimit = 5,
	notApplicable,
	scoringText,
	onChange,
	score
}) => {
	const items = Array.from({ length: scoringLimit + 1 }, (_, index) => index);

	return (
		<div className="score_buttons_container">
			<section className="d-flex score_buttons_section my-4">
				{items.map((item, index) => {
					const stringifyItems = `${item}`;
					return (
						<div
							className="d-flex align-items-center justify-content-center"
							style={{
								width: `${100 / items.length}%`,
								cursor: "pointer",
								background: score === stringifyItems ? "#EBECF0" : ""
							}}
							key={index}
							onClick={() => {
								onChange(stringifyItems);
							}}
						>
							{stringifyItems}
							<br />
							{scoringText ? scoringText[item - 1] : ""}
						</div>
					);
				})}
			</section>
			{notApplicable ? (
				<section className="score_buttons_section mb-4">
					<div
						className="w-25 d-flex align-items-center justify-content-center"
						style={{
							cursor: "pointer",
							background: score === "n/a" ? "#EBECF0" : ""
						}}
						onClick={() => onChange("n/a")}
					>
						Not Applicable
					</div>
				</section>
			) : null}
		</div>
	);
};

export { ScoreButtons };

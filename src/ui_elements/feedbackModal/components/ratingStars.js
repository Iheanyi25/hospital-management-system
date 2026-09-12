import React from "react";
import styles from "../style.module.css";
import Star from "./star";
import { ratingData } from "./data";

const RatingStars = ({ rating, onChange }) => {
	return (
		<div className={styles.star_wrapper}>
			{ratingData.map(({ color, value, label }) => {
				const isActive = rating === value;
				return (
					<div
						key={value}
						className={styles.star_item}
						onClick={() => onChange("rating", value)}
					>
						<Star isActive={isActive} fill={color} />
						<p
							className={`text-center ${styles.star_item_text}`}
							style={{
								color: isActive ? color : undefined
							}}
						>
							{label} ({value}/5)
						</p>
					</div>
				);
			})}
		</div>
	);
};

export default RatingStars;

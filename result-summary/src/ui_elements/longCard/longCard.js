import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Badge } from "../badge/badge";
import "./longCard.css";

const LongCard = ({
	items = [
		{
			title: "Self Appraisal by appraisee",
			badgeContent: "Approved",
			link: "#"
		}
	]
}) => {
	const history = useHistory();
	return (
		<div>
			{items.map((item, index) => (
				<div
					className="long_card_container d-flex justify-content-between mb-1"
					key={index}
				>
					<aside className="d-flex">
						<h5 className="mr-2">{item.title}</h5>
						<Badge
							item={{
								title: item.badgeContent,
								type:
									item.badgeContent === "Appraised"
										? "success"
										: item.badgeContent === "Unappraised"
										? "fail"
										: "warning"
							}}
						/>
					</aside>
					{item.disabled ? null : (
						<aside>
							<Link
								data-cy={item.link}
								onClick={() => history.push(item.link)}
							>
								View
							</Link>
						</aside>
					)}
				</div>
			))}
		</div>
	);
};

export { LongCard };

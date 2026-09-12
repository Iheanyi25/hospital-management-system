import React from "react";
import "./badge.css";

const Badge = ({ item = { title: "Approved", type: "success" } }) => {
	const mapStatusToStyle = {
		warning: "warn",
		success: "success",
		fail: "rejected",
		unapproved: "unapproved"
	};
	return (
		<span className={`aui-lozenge res-${mapStatusToStyle[item.type]}-tag`}>
			{item.title}
		</span>
	);
};

export { Badge };

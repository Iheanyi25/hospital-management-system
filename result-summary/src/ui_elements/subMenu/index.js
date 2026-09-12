import React from "react";
import { useHistory } from "react-router-dom";
import "./subMenu.css";

const SubMenu = ({ subHeaderPaths }) => {
	let history = useHistory();

	return (
		<div className="d-flex justify-content-start pl-3 sub_header bg-white">
			{subHeaderPaths.map((link) => {
				if (link.roles) {
					return (
						<span
							className={`mx-3 ${
								history.location.pathname.includes(link.path) ? "active" : ""
							} py-3`}
							onClick={() => history.push(`${link.path}`)}
						>
							{link.name}
						</span>
					);
				} else {
					return null;
				}
			})}
		</div>
	);
};

export { SubMenu };

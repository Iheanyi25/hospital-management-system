import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./tabs.css";

const Tabs = ({ tabItems, onTabChange }) => {
	const history = useHistory();
	const [items, setItems] = useState([]);
	const [currentTab, setCurrentTab] = useState("");
	let location = useLocation();
	let currentHash = location.hash;
	currentHash = currentHash.replaceAll("%20", " ").replaceAll("#", "");

	useEffect(() => {
		if (currentHash) {
			setCurrentTab(currentHash.split(" ")[0]);
		}
		if (location.hash === "") {
			setCurrentTab(tabItems[0].title.split(" ")[0]);
		}
		window.AJS.tabs.setup();
	}, [currentHash, location.hash, tabItems]);

	useEffect(() => {
		setItems(tabItems);
	}, [tabItems]);

	return (
		<div className="rse-tabs">
			<div className="aui-tabs horizontal-tabs red-tabs">
				<ul className="tabs-menu">
					{items.map((item, index) => {
						if (currentTab === item.title.split(" ")[0]) {
							return (
								<li className={`menu-item active-tab`}>
									<a
										href={`#tabs-${index}`}
										onClick={() => {
											history.replace(`#${item.title}`);
											if (onTabChange) onTabChange();
										}}
									>
										{item.title}
									</a>
								</li>
							);
						} else if (item.disabled) {
							return (
								<li className={`menu-item disable-tab`}>
									<a href="#tabs">{item.title}</a>
								</li>
							);
						} else {
							return (
								<li className={`menu-item`}>
									<a
										href={`#tabs-${index}`}
										onClick={() => {
											history.replace(`#${item.title}`);
											if (onTabChange) onTabChange();
										}}
									>
										{item.title}
									</a>
								</li>
							);
						}
					})}
				</ul>
				{items.map((item, index) => {
					if (currentTab === item.title.split(" ")[0]) {
						return (
							<div className="tabs-pane active-pane" id={`tabs-${index}`}>
								{item.content}
							</div>
						);
					} else {
						return (
							<div className="tabs-pane" id={`tabs-${index}`}>
								{item.content}
							</div>
						);
					}
				})}
			</div>
		</div>
	);
};

export { Tabs };

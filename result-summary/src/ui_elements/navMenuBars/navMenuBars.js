/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useHistory } from "react-router-dom";

import "./navMenuBars.css";

const NavMenuBar = ({ navMenuItems, customStyles }) => {
	const { location, push } = useHistory();

	const handleSelect = (path, dropList) => {
		if (dropList?.length > 0) {
			return;
		} else {
			push(path);
		}
	};
	return (
		<nav className={`res-nav-menu ${customStyles && customStyles}`}>
			<ul>
				{navMenuItems?.map((item, index) => {
					const { title, path, dropItems } = item;

					return (
						<React.Fragment key={index}>
							<li
								key={`nav${index}`}
								onClick={() => handleSelect(path, dropItems)}
								className={`${
									location.pathname.includes(path) &&
									"res-active-menu"
								} ${
									dropItems?.length > 0 &&
									"aui-dropdown2-trigger"
								}`}
								aria-controls={`nav-link-${index}`}
							>
								<span className="res-nav-item-content d-flex align-items-center">
									<p className="mb-0">{title}</p>
									{dropItems?.length > 0 && (
										<span className="aui-icon aui-icon-small aui-iconfont-arrow-down-small"></span>
									)}
								</span>
							</li>
							{dropItems?.length > 0 && (
								<aui-dropdown-menu id={`nav-link-${index}`}>
									{dropItems?.map((drop, index) => {
										const {
											header,
											subHeader,
											icon,
											path
										} = drop;
										return (
											<a
												className="d-flex align-items-center justify-content-between"
												href={path}
												key={index}
											>
												<div className="d-flex align-items-center justify-content-even mr-2">
													<div className="dropdown-icon">
														{icon}
													</div>
													<div className="d-flex flex-column justify-content-center">
														<p className="link-dropdown-header p-0 m-0">
															{header}
														</p>
														<p className="link-dropdown-subheader p-0 m-0">
															{subHeader}
														</p>
													</div>
												</div>
												{location.pathname === path && (
													<span class="aui-icon aui-icon-small aui-iconfont-check res-active-role">
														active
													</span>
												)}
											</a>
										);
									})}
								</aui-dropdown-menu>
							)}
						</React.Fragment>
					);
				})}
			</ul>
		</nav>
	);
};

export { NavMenuBar };

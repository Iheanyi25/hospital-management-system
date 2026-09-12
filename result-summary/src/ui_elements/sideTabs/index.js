import React from "react";
import "./sideTabs.css";

import { Link, useHistory, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";

export const SideTabs = ({
	navItems,
	navClass,
	disallowForwardMovement = false
}) => {
	const { hash } = useLocation();
	const { push } = useHistory();
	const [currentIndex, setCurrentIndex] = useState(0);

	const currentHash = useMemo(() => {
		if (!hash) {
			return navItems[0].hashName;
		} else {
			return hash;
		}
	}, [hash, navItems]);
	useEffect(() => {
		navItems.forEach((item, index) => {
			if (item.hashName === currentHash) {
				setCurrentIndex(index);
			}
		});
	}, [currentHash, navItems]);
	return (
		<nav className={`reu-tabs ${navClass}`}>
			<ul className="list-unstyled cursor-pointer tabs-top-list">
				{navItems?.map(
					({ linkName, hashName, state, subItems }, index) => {
						return index === 0 ? (
							<li key={hashName} className={`pl-3 py-1`}>
								<Link
									data-cy={
										subItems?.[0]?.hashName || hashName
									}
									to={{
										hash:
											subItems?.[0]?.hashName || hashName,
										state
									}}
									className={`top-list-item ${
										currentHash?.includes(hashName) ||
										!currentHash
											? "active-link"
											: ""
									} ${
										disallowForwardMovement &&
										currentIndex < index
											? "tab-disabled"
											: ""
									}`}
									onClick={(e) => {
										e.preventDefault();
										push({
											hash:
												subItems?.[0]?.hashName ||
												hashName,
											state
										});
									}}
								>
									{linkName}
								</Link>
								{subItems ? (
									<ul className="list-unstyled cursor-pointer ml-4 tabs-sub-list">
										{subItems.map(
											(
												{ hashName, linkName, state },
												index
											) => (
												<li
													key={index}
													className="my-3"
												>
													<Link
														data-cy={hashName}
														to={{
															hash: hashName,
															state
														}}
														className={`${
															hashName ===
															currentHash
																? "active-link"
																: ""
														}`}
													>
														{linkName}
													</Link>
												</li>
											)
										)}
									</ul>
								) : (
									""
								)}
							</li>
						) : (
							<li key={hashName} className={`pl-3 py-1`}>
								<Link
									data-cy={
										subItems?.[0]?.hashName || hashName
									}
									to={{
										hash:
											subItems?.[0]?.hashName || hashName,
										state
									}}
									className={`top-list-item ${
										currentHash?.includes(hashName)
											? "active-link"
											: ""
									}${
										disallowForwardMovement &&
										currentIndex < index
											? "tab-disabled"
											: ""
									}`}
									onClick={(e) => {
										e.preventDefault();
										push({
											hash:
												subItems?.[0]?.hashName ||
												hashName,
											state
										});
									}}
								>
									{linkName}
								</Link>
								{subItems ? (
									<ul className="list-unstyled cursor-pointer ml-4 tabs-sub-list">
										{subItems.map((item, index) => (
											<li key={index} className="my-3">
												<Link
													data-cy={item.hashName}
													to={item.hashName}
													className={`${
														item.hashName ===
														currentHash
															? "active-link"
															: ""
													}`}
												>
													{item.linkName}
												</Link>
											</li>
										))}
									</ul>
								) : (
									""
								)}
							</li>
						);
					}
				)}
			</ul>
		</nav>
	);
};

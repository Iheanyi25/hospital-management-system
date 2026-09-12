import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./breadcrumb.css";

const Breadcrumbs = ({ crumbs }) => {
	const [collapsedCrumb, setcollapsedCrumb] = useState(false);

	crumbs.forEach((crumb) => {
		if (crumb?.name?.length > 24) {
			crumb.name = crumb.name.slice(0, 24) + "...";
		}
		return crumb;
	});

	useEffect(() => {
		if (crumbs.length > 4) setcollapsedCrumb(true);
	}, [crumbs]);

	if (crumbs.length <= 1) {
		return null;
	}

	if (crumbs.length > 4 && collapsedCrumb === true) {
		return (
			<ol className="aui-nav aui-nav-breadcrumbs">
				<li>
					<Link
						data-cy={crumbs[0].name}
						key={crumbs[0].name}
						to={crumbs[0].path}
					>
						{crumbs[0].name}
					</Link>
				</li>
				<li
					className="collapse-icon"
					// onClick={() => setcollapsedCrumb(false)}
				>
					...
				</li>
				<li className="aui-nav-selected">
					<span key={crumbs[crumbs.length - 1].name} className="bold">
						{crumbs[crumbs.length - 1].name}
					</span>
				</li>
			</ol>
		);
	}

	return (
		<ol className="aui-nav aui-nav-breadcrumbs">
			{crumbs.map(({ name, path, state, search }, key) =>
				key + 1 === crumbs.length ? (
					<li className="aui-nav-selected" key={key}>
						<span key={key} className="bold">
							{name}
						</span>
					</li>
				) : (
					<li key={key}>
						<Link
							data-cy={path}
							key={key}
							to={{ pathname: path, state, search }}
						>
							{name}
						</Link>
					</li>
				)
			)}
		</ol>
	);
};

export { Breadcrumbs };

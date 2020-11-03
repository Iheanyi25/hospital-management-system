import React, { useState, useEffect } from 'react';

const Success = ({ message, history, nextRoute }) => {
	const [view, setView] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setView(!view);
		}, 2000);
		return () => {
			history.push(`${nextRoute}`);
		};
	}, [nextRoute, history, view]);

	return (
		<div className="alert alert-success alert-align" role="alert">
			<h3 className="text-light">Success!</h3>
			<h6 className="text-light">{message}</h6>
		</div>
	);
};

export { Success };

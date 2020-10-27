import React from 'react';

const Success = () => {
	return (
		<div className="alert alert-danger" role="alert">
			<p className="text-white border-bottom border-dark">Oops!</p>
			<h2 className="text-white">No internet</h2>
            <p className="text-white">Check your internet connection and try again</p>
		</div>
	);
};

export default Success;

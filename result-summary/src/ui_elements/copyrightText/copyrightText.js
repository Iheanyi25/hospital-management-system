import React from "react";
import { SCHOOL_DETAILS } from "../../utils/constants";
const { name, location } = SCHOOL_DETAILS;

export const CopyrightText = () => {
	const date = new Date();
	return (
		<div>
			<p className="text-center">
				{`Copyright ©️ ${date.getFullYear()} ${name}, ${location}`}
			</p>
			{/* <br /> */}
			<p className="text-center">
				Powered by Tenece Professional Services
			</p>
		</div>
	);
};

import React from "react";
import { useState } from "react";

import "./boxInput.css";

const BoxInput = ({ name, className, items, setFieldValue }) => {
	const [activeBox, setActiveBox] = useState(null);

	const handleClick = (index) => {
		setActiveBox(index + 1);
	};

	return (
		<div name={name} className={`d-flex ${className}`}>
			{items?.map((item, index) => (
				<div
					key={index}
					className={`w-100 text-center box-input-item ${
						activeBox === index + 1 ? "active-box" : ""
					}`}
					onClick={(e) => {
						handleClick(index);
						setFieldValue(name, `${index + 1}`);
					}}
				>
					<h5>{index + 1}</h5>
					<h5>{item}</h5>
				</div>
			))}
		</div>
	);
};

export { BoxInput };

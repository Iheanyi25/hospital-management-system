import React from "react";
import { ValidationText } from "../validationText/validationText";
import "./radioButtons.css";

const RadioButtons = ({
	checked,
	name,
	value,
	disabled,
	label,
	defaultChecked,
	validationType,
	message,
	onChange,
	register = () => {},
	required
}) => {
	return (
		<>
			<div className="rse-radio" key={`radio-${value}`}>
				<input
					className="rse-radio"
					type="radio"
					checked={checked}
					name={name}
					value={value}
					id={value}
					disabled={disabled}
					defaultChecked={defaultChecked}
					onChange={onChange}
					{...register(name, { required })}
				/>
				<label htmlFor={value}>{label}</label>
			</div>
			{validationType && (
				<ValidationText status={validationType} message={message} />
			)}
		</>
	);
};

export { RadioButtons };

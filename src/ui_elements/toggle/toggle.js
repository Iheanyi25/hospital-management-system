import React from "react";
import Toggle from "@atlaskit/toggle";
import "./toggle.css";

export const ToggleElement = ({
	label,
	id = "toggle-default",
	checked,
	size = "large",
	onChange = () => {},
	isDisabled = false,
	...restProps
}) => {
	return (
		<>
			<Toggle
				id={id}
				isChecked={checked}
				size={size}
				onChange={onChange}
				isDisabled={isDisabled}
				{...restProps}
			/>
			{label && (
				<label htmlFor={id} className="toggle-style ml-1">
					{label}
				</label>
			)}
		</>
	);
};

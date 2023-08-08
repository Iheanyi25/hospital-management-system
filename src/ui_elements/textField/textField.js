import React, { useState } from "react";
import { ValidationText } from "../validationText/validationText";
import "./textField.css";

/**
 * type is for the input type itself
 * inputType is to choose between "textarea" or 'input'
 * error is the error state of the textField
 * icon should take icons in a html elements
 * errorText holds the error message if you want to show one
 *
 */
const TextField = ({
	type = "text",
	inputType = "input",
	className = "",
	disabled = false,
	placeholder = "",
	error = false,
	icon = "",
	errorText = "",
	rows = 3,
	name = "",
	onChange = () => {},
	register = () => {},
	setValue = () => {},
	required,
	id,
	...restProps
}) => {
	const [showPassword, setShowPassword] = useState(false);
	const renderInput = () => {
		if (icon === "") {
			return (
				<input
					type={type}
					className={`rse-text-field ${
						error && "rse-error-field"
					} ${className}`}
					placeholder={placeholder}
					disabled={disabled}
					onChange={onChange}
					name={name}
					id={id}
					{...register(name, { required })}
					{...restProps}
				/>
			);
		} else {
			return (
				<div className="rse-withIcon-field">
					<input
						type={type}
						className={`rse-text-field ${
							error && "rse-error-field"
						} ${className}`}
						placeholder={placeholder}
						disabled={disabled}
						onChange={onChange}
						name={name}
						{...register(name, { required })}
						{...restProps}
					/>
					{icon}
				</div>
			);
		}
	};

	return (
		<div className="rse-field-wrap">
			{inputType === "input" ? (
				type === "password" ? (
					<div className="rse-withIcon-field">
						<input
							type={showPassword ? "name" : type}
							className={`rse-text-field ${
								error && "rse-error-field"
							} ${className}`}
							placeholder={placeholder}
							disabled={disabled}
							onChange={onChange}
							name={name}
							{...register(name, { required })}
							{...restProps}
						/>
						<span
							className="aui-icon aui-icon-small aui-iconfont-lock"
							onClick={() => {
								setShowPassword(!showPassword);
							}}
						>
							password
						</span>
					</div>
				) : (
					renderInput()
				)
			) : inputType === "textarea" ? (
				<textarea
					className={`rse-textarea ${
						error && "rse-error-field"
					} ${className}`}
					rows={rows}
					placeholder={placeholder}
					disabled={disabled}
					onChange={onChange}
					name={name}
					{...register(name, { required })}
					{...restProps}
				/>
			) : (
				""
			)}
			<div>
				{errorText.length > 0 && (
					<ValidationText status={"error"} message={errorText} />
				)}
			</div>
		</div>
	);
};

export { TextField };

import React, { forwardRef } from "react";
import Select from "react-select";
import { ValidationText } from "..";

export const selectStyles = ({ isError }) => ({
	input: (styles) => ({
		...styles,
		"&:not(.aui-no-focusvisible) :focus-visible": {
			boxShadow: "none",
			border: "1px solid white"
		}
	}),
	control: (styles, { isDisabled }) => ({
		...styles,
		borderRadius: "4px",
		border: `1px solid ${isError ? "red" : "#dfe1e6"}`,
		minHeight: "40px",
		color: isDisabled ? "#a5adba" : "#97a0af",
		backgroundColor: isDisabled ? "#f4f5f7" : "var(--dark-bg-text-color)"
	}),
	placeholder: (styles) => ({
		...styles,
		fontSize: "14px",
		fontWeight: 450,
		lineHeight: "20px",
		color: "#97a0af"
	}),
	valueContainer: (styles) => ({
		...styles,
		borderLeft: "none",
		fontSize: "14px",
		minHeight: "40px",
	}),
	indicatorSeparator: (styles) => ({
		...styles,
		display: "none",
		fontSize: "14px"
	}),
	dropdownIndicator: (styles) => ({
		...styles,
		color: "#42526E",
		fontSize: "14px"
	}),
	autosizeInput: (styles) => ({
		...styles,
		"&:not(.aui-no-focusvisible) :focus-visible": { boxShadow: "none" }
	}),
});

export const SMSelect = forwardRef(
	(
		{
			options = [
				{ label: "Un-appraised", value: "Un-appraised" },
				{ label: "In-progress", value: "In-progress" },
				{ label: "completed", value: "completed" }
			],
			onChange = () => {},
			selectWidth = "100%",
			placeholder = "Hello",
			disabled,
			loading,
			defaultInputValue,
			value,
			searchable,
			id,
			isError = false,
			errorText = "",
			...field
		},
		ref
	) => {
		return (
			<div className="d-flex">
				<div style={{ width: selectWidth }}>
					<Select
						options={options}
						placeholder={placeholder}
						onChange={onChange}
						styles={selectStyles({ isError })}
						isDisabled={disabled}
						isLoading={loading}
						defaultInputValue={defaultInputValue}
						value={value}
						isSearchable={searchable}
						id={id}
						ref={ref}
						{...field}
					/>
					<div>
						{errorText.length > 0 && (
							<ValidationText
								status={"error"}
								message={errorText}
							/>
						)}
					</div>
				</div>
			</div>
		);
	}
);

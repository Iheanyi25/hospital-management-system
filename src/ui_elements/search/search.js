import React from "react";
import { ValidationText } from "..";
import searchIcon from "../../assets/svgs/searchIcon.svg";
import "./search.css";

export const Search = ({
	placeholder = "Enter a search term",
	onChange = () => {},
	name = "rse-search",
	value,
	register = () => {},
	required,
	errorText = "",
	error = false,
	...rest
}) => {
	return (
		<>
			<div
				className={`rse-search-container ${error && "rse-error-field"}`}
				{...rest}
			>
				<input
					type="search"
					name={name}
					id="rse-search"
					placeholder={placeholder}
					onChange={onChange}
					{...register(name, { required })}
					value={value}
					{...rest}
				/>

				<img src={searchIcon} alt="search icon" />
			</div>
			<div>
				{errorText.length > 0 && (
					<ValidationText status={"error"} message={errorText} />
				)}
			</div>
		</>
	);
};

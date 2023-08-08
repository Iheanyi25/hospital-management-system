import React, { useState, useEffect } from "react";

import dropDown from "../../assets/svgs/chevron-down.svg";
import { ValidationText } from "../validationText/validationText";

import "./style.css";

const Searchable = ({
	data,
	placeHolder,
	handleSelect,
	input,
	name,
	errorText,
	disabled,
	onFocus = () => {},
	onChange = () => {}
}) => {
	const [show, setShow] = useState(false);

	// const [value, setValue] = useState("");

	const showDropDown = () => {
		setShow(!show);
	};

	const selectField = (val) => {
		handleSelect(val);
		showDropDown();
	};

	useEffect(() => {
		// handles closing of the drop down
		const handleShowDropDown = () => {
			if (show) {
				setShow(false);
			}
		};
		window.addEventListener("click", handleShowDropDown);
		return () => window.removeEventListener("click", handleShowDropDown);
	}, [show]);

	return (
		<div style={{ position: "relative" }}>
			<div
				className="searchable_container"
				style={{ border: errorText ? "1px solid red" : "" }}
			>
				<input
					autoComplete="off"
					name={name}
					onFocus={onFocus}
					onChange={onChange}
					value={input}
					placeholder={placeHolder}
					onClick={showDropDown}
					disabled={disabled}
				/>
				<div onClick={showDropDown} className="searchable_icon">
					<img src={dropDown} alt={""} />
				</div>
			</div>
			{show ? (
				<div className="searchable_dropdown">
					{data
						?.filter(
							(item) =>
								item &&
								item
									?.toLowerCase()
									?.includes(input?.toLowerCase())
						)
						.map((data, i) => (
							<p onClick={() => selectField(data)} key={i}>
								{data}
							</p>
						))}
				</div>
			) : (
				<></>
			)}
			{errorText ? (
				<div>
					<ValidationText status={"error"} message={errorText} />
				</div>
			) : (
				""
			)}
		</div>
	);
};

export { Searchable };

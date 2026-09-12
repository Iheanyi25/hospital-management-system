import React from "react";
import select from "../../assets/svgs/select-clear.svg";
import { ValidationText } from "../validationText/validationText";
import upload from "../../assets/images/upload.png";
import "./style.css";

const FIleUpload = ({
	loader,
	className,
	name,
	onChange,
	errorText,
	currentValue,
	clearFieldValue
}) => {
	return (
		<div>
			{!currentValue ? (
				<div
					className={`upload_dotted_box  ${className} ${
						errorText ? "upload_error" : ""
					} `}
				>
					<div>
						{loader ? "" : ""}
						<img src={upload} alt="upload" />
						<p>
							Drag and drop your file(s) or{" "}
							<span>browse to upload</span>
						</p>
					</div>
					<div>
						<input
							type="file"
							onChange={onChange}
							name={name}
							value={""}
						/>
					</div>
				</div>
			) : (
				""
			)}
			{currentValue ? (
				<div className="upload_file_info p-2">
					<span>{currentValue.name}</span>
					<img
						className="cursor-pointer"
						src={select}
						alt={""}
						onClick={clearFieldValue}
					/>
				</div>
			) : (
				""
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

export { FIleUpload };

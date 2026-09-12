import React from "react";
import { ValidationText } from "../validationText/validationText";
import upload from "../../assets/images/upload.png";
import "./style.css";

export const SignatureUpload = ({
	loader,
	className,
	name,
	onChange,
	register = () => {},
	errorText,
	currentValue,
	parentRef,
	required = true,
	fileName,
	accept
}) => {
	return (
		<div>
			<div
				className={`upload_dotted_box ${
					currentValue
						? "hide_signature_display"
						: "show_signature_display"
				}  ${className} ${errorText ? "upload_error" : ""} `}
			>
				<div>
					{loader ? "" : ""}
					<img src={upload} alt="upload" />
					{fileName && (
						<p>
							<strong>{fileName}</strong> selected for upload!
						</p>
					)}
					<p>
						Drag and drop your file(s) or{" "}
						<span>browse to upload</span>
					</p>
				</div>
				<div>
					<input
						accept={accept || ""}
						type="file"
						name={name}
						ref={parentRef}
						onChange={onChange}
						{...register(name, { required })}
					/>
				</div>
			</div>
			{currentValue ? (
				<div
					className={`upload_dotted_box  ${className} ${
						errorText ? "upload_error" : ""
					} `}
				>
					<div className="signature_view_state d-flex justify-content-center align-items-center">
						<div>
							<img
								src={
									typeof currentValue === "string"
										? currentValue
										: URL.createObjectURL(currentValue)
								}
								alt="upload"
							/>
							<input
								accept={accept || ""}
								type="file"
								name={name}
								ref={parentRef}
								onChange={onChange}
								{...register(name, { required })}
							/>
						</div>
					</div>
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

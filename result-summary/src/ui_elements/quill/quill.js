import { ValidationText } from "../validationText/validationText";
import "./quill.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const Quill = ({
	theme = "snow",
	className = "",
	disabled = false,
	placeholder = "",
	error = false,
	errorText = "",
	onChange = () => {},
	setValue = () => {},
	value,
	id,
	...restProps
}) => (
	<div>
		<ReactQuill
			theme={theme}
			className={`rse-textarea ${
				error && "rse-error-field"
			} ${className}`}
			placeholder="Enter the description"
			value={value}
			onChange={onChange}
			{...restProps}
		/>
		<div>
			{errorText.length > 0 && (
				<ValidationText status={"error"} message={errorText} />
			)}
		</div>
	</div>
);

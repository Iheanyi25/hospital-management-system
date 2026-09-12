import React, { useRef } from "react";
import "./checkbox.css";

const Checkbox = ({
	label = "Default checkbox",
	disabled = false,
	checked = false,
	indeterminate = false,
	value = "",
	id = "id",
	onSelect = () => {},
	labelClassName = ""
}) => {
	const ref = useRef();
	return (
		<div
			className={`rse-check-wrap d-flex align-items-center ${
				checked ? "checked" : ""
			}`}
		>
			<span
				className="rse-checkbox"
				onClick={() => ref?.current?.click()}
			>
				<input
					type="checkbox"
					id={id}
					disabled={disabled}
					checked={checked}
					defaultValue={value}
					onChange={onSelect}
					ref={ref}
				/>
				<div className="d-flex align-items-center justify-content-center">
					{indeterminate ? (
						<IndeterminateMark className="rse-checkbox-mark" />
					) : (
						<Mark className="rse-checkbox-mark" />
					)}
				</div>
			</span>
			<label
				className={`mb-0 check-label ${labelClassName}`}
				htmlFor={id}
			>
				{label}
			</label>
		</div>
	);
};

const Mark = ({ className }) => {
	return (
		<svg
			width="9"
			height="7"
			viewBox="0 0 9 7"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				className={className}
				d="M1.71929 2.80529C1.62704 2.70978 1.5167 2.6336 1.39469 2.58119C1.27269 2.52878 1.14147 2.50119 1.00869 2.50004C0.87591 2.49888 0.744231 2.52419 0.621334 2.57447C0.498438 2.62475 0.386786 2.699 0.292893 2.79289C0.199001 2.88679 0.124748 2.99844 0.0744668 3.12133C0.0241859 3.24423 -0.00111606 3.37591 3.77564e-05 3.50869C0.00119157 3.64147 0.0287774 3.77269 0.0811864 3.89469C0.133595 4.0167 0.209778 4.12704 0.305288 4.21929L2.30529 6.21929C2.49282 6.40676 2.74712 6.51207 3.01229 6.51207C3.27745 6.51207 3.53176 6.40676 3.71929 6.21929L7.71929 2.21929C7.8148 2.12704 7.89098 2.0167 7.94339 1.89469C7.9958 1.77269 8.02339 1.64147 8.02454 1.50869C8.02569 1.37591 8.00039 1.24423 7.95011 1.12133C7.89983 0.998438 7.82558 0.886787 7.73168 0.792894C7.63779 0.699001 7.52614 0.624748 7.40324 0.574467C7.28035 0.524186 7.14867 0.498884 7.01589 0.500038C6.88311 0.501192 6.75189 0.528778 6.62988 0.581187C6.50788 0.633596 6.39754 0.709779 6.30529 0.805289L3.01229 4.09829L1.71929 2.80529Z"
				fill="#FAFBFC"
			/>
		</svg>
	);
};

const IndeterminateMark = ({ className }) => {
	return (
		<svg
			width="8"
			height="3"
			viewBox="0 0 8 3"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				className={className}
				d="M7 0.5H1C0.447715 0.5 0 0.947715 0 1.5C0 2.05228 0.447715 2.5 1 2.5H7C7.55228 2.5 8 2.05228 8 1.5C8 0.947715 7.55228 0.5 7 0.5Z"
				fill="#FAFBFC"
			/>
		</svg>
	);
};

export { Checkbox };

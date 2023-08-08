import "./secondaryLink.css";

export const SecondaryLink = ({
	label,
	disabled = false,
	onClick,
	linkType = "primary-link",
	customClass,
	...rest
}) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`sec-link ${linkType} ${customClass ? customClass : ""}`}
			{...rest}
		>
			{label}
		</button>
	);
};

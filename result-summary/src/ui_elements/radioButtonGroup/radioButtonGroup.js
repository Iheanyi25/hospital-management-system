import React from "react";
import { ValidationText } from "../validationText/validationText";

import "./radioButtonGroup.css";

const RadioButtonGroup = ({
	children,
	groupName: name,
	validationType,
	message = "Some helpful text"
}) => {
	const childrenWithExtraProp = React.Children.map(children, (child) =>
		React.cloneElement(child, { name })
	);

	return (
		<fieldset className="rse-radio-group">
			{childrenWithExtraProp}
			{validationType && (
				<ValidationText status={validationType} message={message} />
			)}
		</fieldset>
	);
};

export { RadioButtonGroup };

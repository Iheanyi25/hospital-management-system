import React from "react";
import "./buttonGroup.css";
import { Button, MoreButton } from "../index";

const ButtonGroup = ({
	primaryLabel = "Primary Action",
	secondaryLabel = "Secondary Action",
	primaryAction = () => {},
	secondaryAction = () => {}
}) => {
	return (
		<div className="aui-buttons d-flex align-items-center rse-button-group">
			<Button
				buttonClass="primary mx-0"
				label={primaryLabel}
				onClick={primaryAction}
			/>
			<Button
				buttonClass="standard mx-0"
				label={secondaryLabel}
				onClick={secondaryAction}
			/>
			<MoreButton className="mx-0" />
		</div>
	);
};

export { ButtonGroup };

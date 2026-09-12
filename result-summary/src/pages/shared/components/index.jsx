import React from "react";
import Form1 from "./cleranceForms/Form1";
import Form2 from "./cleranceForms/Form2";
import Form3 from "./cleranceForms/Form3";
import Form4 from "./cleranceForms/Form4";
import Form5 from "./cleranceForms/Form5";
import Form6 from "./cleranceForms/Form6";

const CleranceFormsComponents = () => {
	return (
		<div
			style={{
				background: "#FAFBFC",
				padding: "4rem 0",
				display: "flex",
				flexDirection: "column",
				gap: "1rem"
			}}
		>
			<Form1 />
			<Form2 />
			<Form3 />
			<Form4 />
			<Form5 />
			<Form6 />
		</div>
	);
};

export default CleranceFormsComponents;

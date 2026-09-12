import React from "react";
import { RadioButtons } from "..";

export const AppraisalCard = ({
	header,
	subHeader,
	items,
	radioText,
	noBoarder
}) => {
	return (
		<div
			className={`pb-3 ${
				noBoarder ? "" : "border-bottom"
			} self_appraisal_generic_container`}
		>
			{header ? (
				<div className="border-bottom px-4 py-3 jumbotron-header">{header}</div>
			) : null}
			{subHeader ? (
				<h6 className="px-4 text-uppercase mt-4">{subHeader}</h6>
			) : null}
			{radioText ? (
				<div className="mt-4">
					<div className="self_appraisal_generic_class px-2">
						<p>{radioText}</p>
					</div>
					{items.map((item, index) => (
						<div
							className="d-flex align-items-center px-4 self_appraisal_radio"
							key={index}
						>
							<RadioButtons />
							<p>{item.label}</p>
						</div>
					))}
				</div>
			) : (
				items.map((item, index) => (
					<div className="d-flex self_appraisal_generic_class px-2" key={index}>
						<h5 className="mr-4">{item.title}</h5>
						<p className="text-capitalize">{item.description}</p>
					</div>
				))
			)}
		</div>
	);
};

export const QualificationsCard = ({ items }) => (
	<div>
		{items.map((item, index) => (
			<div key={index}>
				{item.title !== "Uploaded Certificate" && (
					<div className="d-flex self_appraisal_generic_class px-2">
						<h5 className="mr-4">{item.title}</h5>
						<p className="text-capitalize">{item.description}</p>
					</div>
				)}
				{item.title === "Uploaded Certificate" && (
					<div className="d-flex align-items-center self_appraisal_generic_class px-2">
						<h5 className="mr-4">{item.title}</h5>
						<div className="d-flex align-items-center upload_docs_file">
							<p className="text-capitalize">{item.description}</p>
						</div>
					</div>
				)}
			</div>
		))}
	</div>
);

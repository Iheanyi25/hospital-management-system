import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { ApplicationCard } from "../../../../../ui_elements";
import { SCHOOL_DETAILS } from "../../../../../utils/constants";
import { PgPreview } from "../../pgPreview";
import { PGTranscriptRequestForm } from "../../pgTranscriptRequestForm";
import styles from "../../style.module.css";

const pageStyle = `
@page {
// size: 80mm 50mm;
margin-top: 1rem;
}

// @media all {
//   .pagebreak {
//     display: none;
//   }
// }

@media print {
.pagebreak {
// page-break-before: always;

}
}
`;

const requestFormPageStyle = `
@page {
// size: 80mm 50mm;
margin-top: 15rem;
}

// @media all {
//   .pagebreak {
//     display: none;
//   }
// }

@media print {
.pagebreak {
// page-break-before: always;

}
}
`;

export const Cards = ({ validRoute, transcriptRequest, formDetails }) => {
	const { push } = useHistory();
	const componentRef = useRef();
	const requestFormRef = useRef();
	const handleAcknowledgmentForm = useReactToPrint({
		content: () => componentRef.current,
		pageStyle
	});
	const handleRequestForm = useReactToPrint({
		content: () => requestFormRef.current,
		pageStyle: requestFormPageStyle
	});
	const items = [
		{
			title: "Acknowledgement Slip",
			description:
				"Click the link below to print out your acknowledgement slip.",
			linkTitle: "Print Acknowledgement Slip",
			onClick: () => handleAcknowledgmentForm()
		},
		{
			title: "Transcript Request Form",
			description:
				"Click the link below to print your transcript request form.",
			linkTitle: "Print Request Form",
			onClick: () => handleRequestForm()
		},
		{
			title: "Referee Status",
			description: "Manage and track your referees' responses. ",
			linkTitle: "Check Referee Status",
			onClick: () => push({ hash: "referee_status", state: validRoute })
		}
	];
	return (
		<>
			<div className="d-none">
				<PgPreview
					componentRef={componentRef}
					formDetails={formDetails}
				/>
			</div>
			<div className="d-none">
				<PGTranscriptRequestForm
					componentRef={requestFormRef}
					transcriptRequest={transcriptRequest}
				/>
			</div>
			<div className="row justify-content-center mt-5">
				<div className={`col-12 col-lg-10 px-0`}>
					<div className="row">
						{items.map((item, index) => (
							<div className="col-12 col-md-4" key={index}>
								<ApplicationCard
									title={item.title}
									info={item.description}
									label={item.linkTitle}
									onClick={item.onClick}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="row justify-content-center mt-5">
				<div className={`col-12 col-lg-8 px-0`}>
					<div className={styles.more_info}>
						<p>
							{`Kindly proceed to ${SCHOOL_DETAILS.shortForm} PG School with printed copies
							of the ACKNOWLEDGEMENT SLIP, REFEREE forms and
							copies of all necessary credentials for
							documentation.`}
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

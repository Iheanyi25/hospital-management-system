import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { ApplicationCard } from "../../../../../ui_elements";
import { PUTMEInvitationLetter } from "../../putmeInvitationLetter";
import PUTMEPreview from "../../putmePreview";
import { PutmeResult } from "../../putmeResult";

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

export const Cards = ({ details }) => {
	const componentRef = useRef();
	const requestFormRef = useRef();
	const resultRef = useRef();
	const handPUTMEPrintOut = useReactToPrint({
		content: () => componentRef.current,
		pageStyle
	});
	const handleScreeningPrintOut = useReactToPrint({
		content: () => requestFormRef.current,
		pageStyle: requestFormPageStyle
	});
	const handleResultPrintOut = useReactToPrint({
		content: () => resultRef.current,
		pageStyle: requestFormPageStyle
	});
	const items = [
		{
			title: "PUTME Print Out",
			description:
				"Click the link below to print out your Post UTME slip.",
			linkTitle: "Print PUTME Slip",
			onClick: () => handPUTMEPrintOut()
		},
		{
			title: "Pre-Admission Screening",
			description:
				"Click the link below to print your pre-admission screening invitation letter",
			linkTitle: "Print Invitation Letter",
			onClick: () => handleScreeningPrintOut(),
			disabled: !details?.screeningVenue
		},
		{
			title: "PUTME Result",
			description:
				"Click the link below to print your pre-admission screening result",
			linkTitle: "Print Result",
			onClick: () => handleResultPrintOut(),
			disabled: !details?.putmeProgrammeInfoResponse?.putmeScore
		}
	];
	return (
		<>
			<div className="d-none">
				<PUTMEPreview componentRef={componentRef} details={details} />
			</div>
			<div className="d-none">
				<PUTMEInvitationLetter
					componentRef={requestFormRef}
					details={details}
				/>
			</div>
			<div className="d-none">
				<PutmeResult componentRef={resultRef} details={details} />
			</div>
			<div className="row justify-content-center mt-5">
				<div className={`col-12 col-lg-10 px-0`}>
					<div className="row">
						{items.map(
							(
								{
									title,
									description,
									linkTitle,
									onClick,
									disabled
								},
								index
							) => (
								<div className="col-12 col-md-4" key={index}>
									<ApplicationCard
										title={title}
										info={description}
										label={linkTitle}
										onClick={onClick}
										disabled={disabled}
									/>
								</div>
							)
						)}
					</div>
				</div>
			</div>
		</>
	);
};

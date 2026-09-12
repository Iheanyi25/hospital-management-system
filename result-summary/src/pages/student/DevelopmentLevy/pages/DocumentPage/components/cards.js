import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { ApplicationCard } from "../../../../../../ui_elements";
import AcceptanceLetter from "../../AcceptanceLetterPrinout/acceptanceLetter";
import AdmissionParticulars from "../../AdmissionParticularsPrintout/admissionParticulars";
import Form18 from "../../Form18/form18";
import Form19 from "../../Form19/form19";
// import { PUTMEInvitationLetter } from "../../../putmeInvitationLetter";
// import PUTMEPreview from "../../../putmePreview";
// import { PutmeResult } from "../../../putmeResult";

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

const form19Style = `
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

export const Cards = ({ details, state }) => {
	const componentRef = useRef();
	const requestFormRef = useRef();
	const resultRef = useRef();
	const form19 = useRef();
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
	const handleForm19 = useReactToPrint({
		content: () => form19.current,
		pageStyle: form19Style
	});
	const items = [
		{
			title: "Development Levy",
			description:
				"Click the button below to print your Acceptance letter.",
			linkTitle: "Print Acceptance Letter",
			onClick: () => handPUTMEPrintOut()
		},
		{
			title: "Admission Particulars",
			description:
				"Click the button below to print your admission particulars",
			linkTitle: "Print Particulars",
			onClick: () => handleScreeningPrintOut()
		},
		{
			title: "Form 18",
			description: "Click the button below to print your form 18",
			linkTitle: "Print Form 18",
			onClick: () => handleResultPrintOut()
		},
		{
			title: "Form 19",
			description: "Click the button below to print your form 19",
			linkTitle: "Print Form 19",
			onClick: () => handleForm19()
		}
	];
	return (
		<>
			<div className="d-none">
				<AcceptanceLetter componentRef={componentRef} state={state} />
			</div>
			<div className="d-none">
				<AdmissionParticulars
					componentRef={requestFormRef}
					state={state}
				/>
			</div>
			<div className="d-none">
				<Form18 componentRef={resultRef} state={state} />
			</div>
			<div className="d-none">
				<Form19 componentRef={form19} state={state} />
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
								<div className="col-12 col-md-3" key={index}>
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

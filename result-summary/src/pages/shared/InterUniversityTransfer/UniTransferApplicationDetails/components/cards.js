import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { ApplicationCard } from "../../../../../ui_elements";
import { UniTransferPreview } from '../../uniTransferPreview';
import { UniTransferRefereeLetter } from "../../uniTransferRefereeLetter";

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

const refereeFormPageStyle = `
@page {
// size: 80mm 50mm;
margin-top: 5rem;
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

export const Cards = ({ uniTransferState }) => {
	const componentRef = useRef();
	const refereeFormRef = useRef();
	const handleAcknowledgmentForm = useReactToPrint({
		content: () => componentRef.current,
		pageStyle
	});
	const handleRequestForm = useReactToPrint({
		content: () => refereeFormRef.current,
		pageStyle: refereeFormPageStyle
	});
	const items = [
		{
			title: "Acknowledgement slip",
			description:
				"Click the link below to print out your acknowledgement slip.",
			linkTitle: "Print Acknowledgement Slip",
			onClick: () => handleAcknowledgmentForm()
		},
		{
			title: "Referee's Form",
			description:
				"Click the link below to print your Referee's Form.",
			linkTitle: "Print Referee's Form",
			onClick: () => handleRequestForm()
		},
	];

	return (
		<>
			<div className="d-none">
				<UniTransferPreview
					componentRef={componentRef}
					formDetails={uniTransferState}
				/>
			</div>

			<div className="d-none">
				<UniTransferRefereeLetter
					componentRef={refereeFormRef}
					formDetails={uniTransferState}
				/>
			</div>
			<div className="row justify-content-center mt-5">
				<div className="col-12 col-lg-10 px-0">
					<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
						{items.map((item, index) => (
							<div className="col" key={index}>
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


		</>
	);
};

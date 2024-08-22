import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { ApplicationCard } from "../../../../../ui_elements";
import PredegreePreview from "../../predegreePreview";

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


export const Cards = ({ details }) => {
	const componentRef = useRef();
	const handlePrintout = useReactToPrint({
		content: () => componentRef.current,
		pageStyle
	});
	const items = [
		{
			title: "Pre-Degree Print Out",
			description:
				"Click the link below to print out your slip.",
			linkTitle: "Print Pre-Degree Slip",
			onClick: () => handlePrintout()
		},
	];
	return (
		<>
			<div className="d-none">
				<PredegreePreview componentRef={componentRef} details={details} />
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

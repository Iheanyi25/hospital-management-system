import { useHistory, useLocation } from "react-router-dom";
import { Button, PageTitle } from "../../../../ui_elements";
import styles from "../style.module.css";
import { ChangeOfDepartmentPreview } from "../changeOfDepartmentPreview";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

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

const ChangeOfDepartmentApplicationDetails = () => {
	const { push } = useHistory();
	const { state } = useLocation();
	const componentRef = useRef();
	const handleAcknowledgmentForm = useReactToPrint({
		content: () => componentRef.current,
		pageStyle
	});

	if (!state) push("/");

	return (
		<div className={styles.container}>
			<PageTitle
				title=""
				buttonGroup={
					<>
						<Button
							data-cy="print"
							buttonClass="primary mb-5"
							label="Print"
							onClick={handleAcknowledgmentForm}
						/>
					</>
				}
			/>
			<ChangeOfDepartmentPreview
				componentRef={componentRef}
				formDetails={state}
			/>
		</div>
	);
};

export default ChangeOfDepartmentApplicationDetails;

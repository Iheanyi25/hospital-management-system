import { useHistory, useLocation } from "react-router-dom";
import { useApiGet } from "../../../../api/apiCall";
import { loadFourYearSandwichApplicationUrl } from "../../../../api/urls";
import { Button, PageTitle, Spinner } from "../../../../ui_elements";
import styles from "../style.module.css";
import { FourYearSandwichPreview } from "../fourYearSandwichPreview";
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

const FourYearSandwichApplicationDetails = () => {
	const { push } = useHistory();
	const { state } = useLocation();
	const componentRef = useRef();
	const handleAcknowledgmentForm = useReactToPrint({
		content: () => componentRef.current,
		pageStyle
	});

	if (!state?.rrr) push("/four_year_sandwich_login");
	const rrr = state?.rrr;
	const {
		data: formDetails,
		isLoading: isLoadingFormDetails,
		error: formDetailsError
	} = useApiGet(loadFourYearSandwichApplicationUrl(rrr), {
		refetchOnWindowFocus: false
	});
	if (isLoadingFormDetails) return <Spinner />;
	if (formDetailsError)
		return (
			"An error has occurred: " +
			formDetailsError?.response?.data?.message
		);
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
			<FourYearSandwichPreview
				componentRef={componentRef}
				formDetails={formDetails?.data}
			/>
		</div>
	);
};

export default FourYearSandwichApplicationDetails;

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Jumbotron, Row, Spinner } from "../../../../ui_elements";
import styles from "./style.module.css";
import { useApiGet } from "../../../../api/apiCall";
import { getStudentProfileUrl } from "../../../../api/urls";
import RegistrationForm from "../../../shared/components/pgRegistrationForm/regForm";

const pageStyle = `
@page {
// size: 80mm 50mm;
margin-top: 10rem;
margin-left: 5rem;
margin-right: 5rem;
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

const PgDocuments = () => {
	const { data, isLoading, error } = useApiGet(
		getStudentProfileUrl({ refCode: false }),
		{
			refetchOnWindowFocus: false
		}
	);

	const regRef = useRef();

	const handleRegPrint = useReactToPrint({
		content: () => regRef.current,
		pageStyle: pageStyle
	});

	const items = [
		{
			title: "Print Registration Number Slip",
			id: "print",
			label: "Print",
			buttonClass: "primary",
			onClick: handleRegPrint
		}
	];
	if (isLoading) return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<section>
			<div className="d-none">
				<RegistrationForm ref={regRef} details={data} />
			</div>
			<Jumbotron headerText={<span>Documents</span>}>
				<div className="">
					{items.map((item, index) => (
						<div className={styles.item} key={index}>
							<Row
								title={item.title}
								id={item.id}
								label={item.label}
								buttonClass={item.buttonClass}
								onClick={item.onClick}
							/>
						</div>
					))}
				</div>
			</Jumbotron>
		</section>
	);
};

export default PgDocuments;

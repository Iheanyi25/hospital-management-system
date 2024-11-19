import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Jumbotron, Row, Spinner } from "../../../../ui_elements";
import Form1 from "../../../shared/components/cleranceForms/Form1";
import Form2 from "../../../shared/components/cleranceForms/Form2";
import Form3 from "../../../shared/components/cleranceForms/Form3";
import Form4 from "../../../shared/components/cleranceForms/Form4";
import Form5 from "../../../shared/components/cleranceForms/Form5";
import Form6 from "../../../shared/components/cleranceForms/Form6";
import styles from "./style.module.css";
import { useApiGet } from "../../../../api/apiCall";
import { getStudentProfileUrl } from "../../../../api/urls";
import AdmissionNotificationSlip from "../../../shared/components/cleranceForms/admissionNotification";
import CredentialsCheck from "../../../shared/components/cleranceForms/checkingOfAdmission";

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

const Documents = () => {
	const { data, isLoading, error } = useApiGet(
		getStudentProfileUrl({ refCode: false }),
		{
			refetchOnWindowFocus: false
		}
	);

	const form1Ref = useRef();
	const form2Ref = useRef();
	const form3Ref = useRef();
	const form4Ref = useRef();
	const form5Ref = useRef();
	const form6Ref = useRef();
	const admissionNotificationRef = useRef();
	const credentialsCheckRef = useRef();



	const handleForm1Print = useReactToPrint({
		content: () => form1Ref.current,
		pageStyle: pageStyle
	});

	const handleForm2Print = useReactToPrint({
		content: () => form2Ref.current,
		pageStyle: pageStyle
	});

	const handleForm3Print = useReactToPrint({
		content: () => form3Ref.current,
		pageStyle: pageStyle
	});

	const handleForm4Print = useReactToPrint({
		content: () => form4Ref.current,
		pageStyle: pageStyle
	});

	const handleForm5Print = useReactToPrint({
		content: () => form5Ref.current,
		pageStyle: pageStyle
	});

	const handleForm6Print = useReactToPrint({
		content: () => form6Ref.current,
		pageStyle: pageStyle
	});

	const handleAdmissionNotificationPrint = useReactToPrint({
		content: () => admissionNotificationRef.current,
		pageStyle: pageStyle
	});


	const handleCredentialsPrint = useReactToPrint({
		content: () => credentialsCheckRef.current,
		pageStyle: pageStyle
	});

	const items = [
		{
			title: "Acceptance of Offer of Admission and Pledge",
			id: "print",
			label: "Print",
			buttonClass: "primary",
			onClick: handleForm1Print
		},
		{
			title: "Letter of Undertaking",
			id: "print",
			label: "Print",
			buttonClass: "primary",
			onClick: handleForm2Print
		},
		{
			title: "Provisional Clearance",
			id: "print",
			label: "Print",
			buttonClass: "primary",
			onClick: handleForm3Print
		},

		{
			title: "Admission Notification Slip",
			id: "print",
			label: "Print",
			buttonClass: "primary",
			onClick: handleAdmissionNotificationPrint
		},

		{
			title: "Checking Of Credentials",
			id: "print",
			label: "Print",
			buttonClass: "primary",
			onClick: handleCredentialsPrint
		},
		{
			title: "Authority to serve as an Admission Letter",
			id: "print",
			label: "Print",
			buttonClass: "primary",
			onClick: handleForm4Print
		},
		{
			title: "Class Admit Card",
			id: "print",
			label: "Print",
			buttonClass: "primary",
			onClick: handleForm5Print
		},
		{
			title: "Student Information Card",
			id: "print",
			label: "Print",
			buttonClass: "primary",
			onClick: handleForm6Print
		}
	];
	if (isLoading) return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<section>
			<div className="d-none">
				<Form1 ref={form1Ref} details={data} />
				<Form2 ref={form2Ref} details={data} />
				<Form3 ref={form3Ref} details={data} />
				<Form4 ref={form4Ref} details={data} />
				<Form5 ref={form5Ref} details={data} />
				<Form6 ref={form6Ref} details={data} />
				<CredentialsCheck ref={credentialsCheckRef} details={data} />
				<AdmissionNotificationSlip ref={admissionNotificationRef} details={data} />
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

export default Documents;

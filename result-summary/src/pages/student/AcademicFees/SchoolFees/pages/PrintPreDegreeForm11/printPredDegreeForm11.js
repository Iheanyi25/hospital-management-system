import {
	Breadcrumbs,
	PageTitle,
	Button,
	Spinner,
	ProfileContext
} from "../../../../../../ui_elements";
import styles from "./style.module.css";
import logo from "../../../../../../assets/images/sideLogo.png";
import { useReactToPrint } from "react-to-print";
import { useContext, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useApiGet } from "../../../../../../api/apiCall";
import { getFeeRecieptUrl } from "../../../../../../api/urlCategories/Payment";
import Avatar from "react-avatar";
import Barcode from "react-barcode";

const pageStyle = `
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

const PrintPreDegreeForm11 = () => {
	const { state } = useLocation();
	const { push } = useHistory();
	const { data, isLoading, error } = useApiGet(
		getFeeRecieptUrl({
			sessionId: state?.sessionId,
			levelId: state?.levelId,
			paymentTypeId: state?.paymentTypeId,
			paymentPurposeId: state?.paymentPurposeId
		})
	);
	const ref = useRef();
	const userData = useContext(ProfileContext);
	const handlePrint = useReactToPrint({
		content: () => ref.current,
		pageStyle: pageStyle
	});
	const crumbItems = [
		{
			name: "School Fees",
			path: "/academic_fees/school_fees"
		},
		{
			name: "Form 11",
			path: "/"
		}
	];

	// const contents = [
	// 	{
	// 		title: "Date of Payment",
	// 		details: shortDate(data?.data?.paymentDate)
	// 	},
	// 	{
	// 		title: "Date of Printing",
	// 		details: shortDate(data?.data?.datePrinted)
	// 	},
	// 	{ title: "Breakdown", details: "-" },
	// 	{
	// 		title: "Amount Paid",
	// 		details: <>&#8358;{numberFormatter(data?.data?.amount)}</>
	// 	},
	// 	{ title: "Concerned Session", details: data?.data?.session },
	// 	{ title: "Student Name", details: data?.data?.fullName },
	// 	{ title: "Matriculation Number", details: data?.data?.matricNumber },
	// 	{
	// 		title: "JAMB Registration Number",
	// 		details: data?.data?.jambRegNumber
	// 	},
	// 	{ title: "Student Type", details: data?.data?.studentType },
	// 	{ title: "Faculty", details: data?.data?.faculty },
	// 	{ title: "Department", details: data?.data?.department },
	// 	{ title: "Sex", details: data?.data?.gender },
	// 	{ title: "Student Level", details: data?.data?.level },
	// 	{ title: "Payment Type", details: data?.data?.paymentType },
	// 	{ title: "Payment Purpose", details: data?.data?.paymentPurpose },
	// 	{ title: "Student Reference Number", details: data?.data?.rrr }
	// ];

	if (!(state?.sessionId || state?.yearofStudyId)) {
		push("/academic_fees/school_fees");
	}

	if (isLoading) return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;

	return (
		<div className="row">
			<div className="col-12 col-md-1"></div>
			<div className="col-12 col-md-10">
				<div>
					<Breadcrumbs crumbs={crumbItems} />
					<PageTitle
						title="Form 11"
						buttonGroup={
							data?.data && (
								<Button
									data-cy="print"
									buttonClass="success"
									label="Print"
									onClick={handlePrint}
								/>
							)
						}
					/>
				</div>
				<div className={styles.page_content} ref={ref}>
					<div className={styles.reciept_content}>
						<div className="d-flex justify-content-center">
							<div>
								<img
									src={logo}
									alt="Logo"
									className={styles.img}
								/>
							</div>
						</div>
						<div className="border-top border-bottom py-2 mt-5 text-center">
							<h3>PRE DEGREE PROGRAMME DETAILS</h3>
							<h5 className="text-uppercase text-muted font-weight-normal">
								FORM 11
							</h5>
						</div>
						<div className="d-flex flex-wrap justify-content-between mt-4 px-4">
							<div className="w-50">
								<div className="row my-4">
									<h5 className="col-sm-4">Full Name:</h5>
									<h4 className="col-8 text-uppercase">
										{data?.data?.fullName}
									</h4>
								</div>
								<div className="row my-4">
									<h5 className="col-sm-4">
										Application No:
									</h5>
									<h4 className="col-8 text-uppercase">
										{data?.data?.jambRegNumber}
									</h4>
								</div>
								<div className="row my-4">
									<h5 className="col-sm-4">
										Pre Degree Reg. No:
									</h5>
									<h4 className="col-8 text-uppercase">
										{data?.data?.matricNumber}
									</h4>
								</div>
								<div className="row my-4">
									<h5 className="col-sm-4">Session:</h5>
									<h4 className="col-8 text-uppercase">
										{data?.data?.session}
									</h4>
								</div>
							</div>
							<div>
								<Avatar
									name={
										userData?.profileData?.personalData
											?.fullname
									}
									size={160}
									round={false}
									src={
										userData?.profileData?.personalData
											?.passport
									}
									className="mx-auto"
								/>
							</div>
						</div>
						{/* <div className={`row ${styles.header}`}>
							<div className="col-7 d-flex align-items-center">
								<h6>FEE TYPE</h6>
							</div>
							<div className="col-5 d-flex align-items-center">
								<h6>AMOUNT (₦)</h6>
							</div>
						</div> */}
						{/* <div>
							{data?.data?.breakDown?.map((content, index) => (
								<div
									className={`row ${styles.body} border-bottom`}
									key={index}
								>
									<div className="col-7 d-flex align-items-center">
										<p>{content?.description}</p>
									</div>
									<div className="col-5 d-flex align-items-center border-left">
										<p className="text-uppercase">
											&#8358;
											{numberFormatter(content?.amount)}
										</p>
									</div>
								</div>
							))}
						</div> */}
						{/* <div className="mt-5 px-4">
							<div>
								<div className="row my-3">
									<h5 className="col-sm-2">
										The Total Sum of
									</h5>
									<h4 className="col-10 border-bottom pb-2">
										{`${numberToWords(
											data?.data?.amount
										)} Naira Only.`}
									</h4>
								</div>
								<div className="row my-3">
									<h5 className="col-sm-2">
										Being Payment For
									</h5>
									<h4 className="col-10 border-bottom pb-2">
										{data?.data?.paymentPurpose}
									</h4>
								</div>
								<div className="row my-3">
									<h5 className="col-sm-2">
										Date of Payment
									</h5>
									<h4 className="col-10 border-bottom pb-2">
										{shortDate(data?.data?.paymentDate)}
									</h4>
								</div>
								<div className="row my-3">
									<h5 className="col-sm-2">
										Receipt Printed on
									</h5>
									<h4 className="col-10 border-bottom pb-2">
										{shortDate(data?.data?.datePrinted)}
									</h4>
								</div>
							</div>
						</div> */}
						<div className={styles.code}>
							<Barcode value={data?.data?.jambRegNumber} />
						</div>
					</div>
				</div>
			</div>
			<div className="col-12 col-md-1"></div>
		</div>
	);
};

export default PrintPreDegreeForm11;

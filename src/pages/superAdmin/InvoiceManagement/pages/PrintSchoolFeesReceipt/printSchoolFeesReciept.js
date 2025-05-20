import {
	Breadcrumbs,
	PageTitle,
	Button,
	Spinner,
	ProfileContext
} from "../../../../../../src/ui_elements";
import styles from "./style.module.css";
import logo from "../../../../../../src/assets/images/sideLogo.png";
import numberToWords from "../../../../../../src/utils/numberToWords";
import { useReactToPrint } from "react-to-print";
import { useContext, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Avatar from "react-avatar";
import Barcode from "react-barcode";
import { useApiGet } from "../../../../../api/apiCall";
import { getFeeDetailsWithInvoiceUrl } from "../../../../../api/urls";
import { STUDENT_TYPES } from "../../../../../utils/constants";
import { shortDate } from "../../../../../utils/formatDate";
import numberFormatter from "../../../../../utils/numberFormatter";

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

const PrintSchoolFeesReceipt = () => {
	const { state } = useLocation();
	const { push } = useHistory();
	const studentData = useContext(ProfileContext);
	const programDetails = studentData?.profileData?.programmeDetail;
	const { data, isLoading, error } = useApiGet(
		getFeeDetailsWithInvoiceUrl(state?.invoiceCode),
		{
			enabled: !!state?.invoiceCode,
			refetchOnWindowFocus: false,
			retry: false
		}
	);
	const ref = useRef();
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
			name: "School Fees Reciept",
			path: "/"
		}
	];

	if (!state?.invoiceCode) {
		push("/invoice_management/verify_remita_status");
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
						title="School Fees Reciept"
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
							<h3>OFFICIAL FEE RECEIPT</h3>
							<h5 className="text-uppercase text-muted font-weight-normal">
								rrr number:{data?.data?.rrr}
							</h5>
						</div>
						<div className="d-flex flex-wrap justify-content-between mt-4 px-4">
							<div className="w-50">
								<div className="row my-3">
									<h5 className="col-sm-4">
										Matric/Jamb No:
									</h5>
									<h4 className="col-8 text-uppercase">
										{data?.data?.matricNumber}
									</h4>
								</div>
								<div className="row my-3">
									<h5 className="col-sm-4">Full Name:</h5>
									<h4 className="col-8 text-uppercase">
										{data?.data?.fullName}
									</h4>
								</div>
								<div className="row my-3">
									<h5 className="col-sm-4">Department:</h5>
									<h4 className="col-8 text-uppercase">
										{data?.data?.department}
									</h4>
								</div>
								<div className="row my-3">
									<h5 className="col-sm-4">Level:</h5>
									<h4 className="col-8 text-uppercase">
										{data?.data?.level}
									</h4>
								</div>
							</div>
							<div>
								<Avatar
									name={state?.fullname}
									size={160}
									round={false}
									src={data?.data?.passport}
									className="mx-auto"
								/>
							</div>
						</div>
						<div className={`row ${styles.header}`}>
							<div className="col-7 d-flex align-items-center">
								<h6>FEE TYPE</h6>
							</div>
							<div className="col-5 d-flex align-items-center">
								<h6>AMOUNT (₦)</h6>
							</div>
						</div>
						<div>
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
						</div>
						<div className="mt-5 px-4">
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
						</div>
						<div className={styles.code}>
							<Barcode value={data?.data?.rrr} />
						</div>
					</div>
				</div>
			</div>
			<div className="col-12 col-md-1"></div>
		</div>
	);
};

export default PrintSchoolFeesReceipt;

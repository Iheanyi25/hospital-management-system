import "./invoice.css";
import logo from "../../assets/images/invoice-logo.png";
import numberFormatter from "../../utils/numberFormatter";
import { shortDate } from "../../utils/formatDate";
import { useHistory } from "react-router-dom";
import { SCHOOL_DETAILS } from "../../utils/constants";
const { name, location } = SCHOOL_DETAILS;
export const Invoice = ({ details, noRedirect = false }) => {
	const { replace } = useHistory();
	const redirectLinks = {
		ACPT: "/acceptance",
		1: "/school_fees"
	};
	return (
		<div className="invoice-container">
			<div className="invoice-header d-flex justify-content-between align-items-center flex-wrap pb-4">
				<img src={logo} alt="Logo" />
				<div>
					<h4>{`Remita Retrieval Reference # ${details?.rrr}`}</h4>
					<h6>
						Transaction Reference
						<b>{`# ${details?.transactionRef}`}</b>
					</h6>
					<h6>
						Invoice <b>{`# ${details?.invoiceNumber}`}</b>
					</h6>
					<h6>{`Invoice Date: ${shortDate(details?.date)}`}</h6>
				</div>
			</div>
			<div className="invoice-body pt-5">
				<div className="d-flex justify-content-between align-items-center flex-wrap">
					<div className="invoice-address">
						<div className="mb-4">
							<h4>Invoice To:</h4>
							<h6 className="text-uppercase">
								<b>{details?.fullName}</b>
							</h6>
							<h6>
							{`${name}, ${location}`}
							</h6>
						</div>
						<div>
							<h4>Pay To:</h4>
							<h5 className="text-uppercase">
							{`${name}, ${location}`}
							</h5>
						</div>
					</div>
					{!details.isPaid && (
						<a
							href={details?.cardPaymentLink}
							target="_blank"
							rel="noreferrer"
							className="invoice-link rse-button"
							onClick={() => {
								if (!noRedirect) {
									replace(
										redirectLinks[
											details.recieptItems[0].paymentPurposeId
										]
									);
								}
							}}
						>
							Pay with ATM Card
						</a>
					)}
				</div>
				<div className="invoice-table">
					<div className="row invoice-table-header px-4 py-3">
						<div className="col-6">
							<h5>Description</h5>
						</div>
						<div className="col-3">
							<h5>Amount</h5>
						</div>
						<div className="col-3">
							<h5>Payment Type</h5>
						</div>
					</div>
					<div className="invoice-table-children">
						{details?.recieptItems?.map((item, index) => (
							<div
								className="row px-4 py-3 border-bottom"
								key={index}
							>
								<div className="col-6 invoice-description-container">
									<p>{item.description}</p>
								</div>
								<div className="col-3">
									<p>
										&#8358; {numberFormatter(item.amount)}
									</p>
								</div>
								<div className="col-3">
									<p>{item.paymentType}</p>
								</div>
							</div>
						))}
					</div>
					<div className="row px-4 py-3 invoice-table-total">
						<div className="col-6">
							<p>Total</p>
						</div>
						<div className="col-3">
							<p>&#8358; {numberFormatter(details?.total)}</p>
						</div>
					</div>
				</div>
				<div className="border-top border-bottom py-3 invoice-important">
					<p className="m-0">
						Kindly ensure your payment is made with an RRR generated
						from the Portal
					</p>
				</div>
				<div className="invoice-powered">
					<p className="m-0">
						Powered by Tenece Professional Services
					</p>
				</div>
			</div>
		</div>
	);
};

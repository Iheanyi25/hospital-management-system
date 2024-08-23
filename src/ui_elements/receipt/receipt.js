
import "./receipt.css";
import logo from "../../assets/images/invoice-logo.png"
import numberFormatter from "../../utils/numberFormatter";
import numberToWords from "../../utils/numberToWords";
import { shortDate } from "../../utils/formatDate";
import Barcode from "react-barcode";
export const Receipt = ({ details }) => {
    const today = new Date()


    return (
        <div className="receipt-container">
            <div className="receipt-header">
                <img src={logo} alt="Logo" />
                <h1>{details?.title}</h1>
                <h6>RRR NUMBER: {details?.rrr}</h6>
            </div>
            <div className="receipt-body pt-5">
                <div>
                    <div className="receipt-address">
                        <div className="mb-4 row">
                            <div className="col-md-2 col-sm-2">
                                <h4>Matric/Jamb No:</h4>
                            </div>
                            <div className="col-md-7 col-sm-5">
                                <h4>{details?.matricNumber}</h4>
                            </div>
                        </div>

                        <div className="mb-4 row">
                            <div className="col-md-2 col-sm-2">
                                <h4>Full Name:</h4>
                            </div>
                            <div className="col-md-7 col-sm-5">
                                <h4>{details?.fullName}</h4>
                            </div>
                        </div>

                        <div className="mb-4 row">
                            <div className="col-md-2 col-sm-2">
                                <h4>Department:</h4>
                            </div>
                            <div className="col-md-7 col-sm-5">
                                <h4>{details?.department}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="receipt-table">
                    <div className="row receipt-table-header px-2 py-3">
                        <div className="col-2">
                            <h5>S/N</h5>
                        </div>
                        <div className="col-5">
                            <h5>FEE TYPE</h5>
                        </div>

                        <div className="col-3">
                            <h5>AMOUNT (₦)</h5>
                        </div>
                    </div>
                    <div className="receipt-table-children">
                        {details?.recieptItems?.map((item, index) => (
                            <div
                                className="row px-2 py-2 border-bottom"
                                key={index}
                            >
                                <div className="col-2 receipt-description-container">
                                    <p className="text-left">
                                        {index + 1}
                                    </p>
                                </div>
                                <div className="col-5 receipt-description-container">
                                    <p className="text-left">
                                        {item.description}
                                    </p>
                                </div>
                                <div className="col-2">
                                    <p className="text-left">
                                        &#8358; {numberFormatter(item.amount)}
                                    </p>
                                </div>
                                <div className="col-3">
                                    <p className="text-left">
                                        {item.paymentType}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="row px-4 py-1 receipt-table-total">
                        <div className="col-6">
                            <p>Total</p>
                        </div>
                        <div className="col-3">
                            <p>&#8358; {numberFormatter(details?.total)}</p>
                        </div>
                    </div>

                    <div className="row px-4 py-1 receipt-in-words">
                        <div className="mb-4 p-0 row d-flex">
                            <h4 className="col-md-2 col-sm-2">The Total Sum of</h4>
                            <div className="col-md-6 col-sm-5 receipt-in-words-value">
                                <h4>{numberToWords(details?.total)} Naira Only</h4>
                            </div>

                        </div>
                        <div className="mb-4 p-0 row d-flex">
                            <h4 className="col-md-2 col-sm-2">Being Payment For</h4>
                            <div className="col-md-6 col-sm-5 receipt-in-words-value">
                                <h4>{details?.title}</h4>
                            </div>

                        </div>
                        <div className="mb-4 p-0 row d-flex">
                            <h4 className="col-md-2 col-sm-2">Date of Payment</h4>
                            <div className="col-md-6 col-sm-5 receipt-in-words-value">
                                <h4>{shortDate(details?.date)}</h4>
                            </div>
                        </div>
                        <div className="mb-4 p-0 row d-flex">
                            <h4 className="col-md-2 col-sm-2 ">Receipt Printed on</h4>
                            <div className="col-md-6 col-sm-5 receipt-in-words-value">
                                <h4>{shortDate(today)}</h4>
                            </div>
                        </div>
                    </div>


                </div>
                <div className="border-top border-bottom py-3 receipt-important">
                    <Barcode value={details?.rrr} />

                </div>
                <div className="receipt-powered">
                    <p className="m-0">
                        Powered by Tenece Professional Services
                    </p>
                </div>
            </div>
        </div>
    );
};

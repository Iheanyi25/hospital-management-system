import {
    PageTitle,
    Button,
    Receipt,
    Spinner
} from "../../../../ui_elements";
import styles from "./style.module.css"
import { useReactToPrint } from "react-to-print";
import { useEffect, useRef } from "react";
import { getSundryInvoiceReceiptUrl } from "../../../../api/urls";
import { useApiGet } from "../../../../api/apiCall";
import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";


const pageStyle = `
@page {
// size: 80mm 50mm;
margin-top: 2rem;
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

const FeeReceipt = () => {
    const ref = useRef();
    const { replace } = useHistory()
    const params = new URLSearchParams(window.location.search);
    const ENCRYPTED_TOKEN = params.get('q');
    const { state } = useLocation()

    const handlePrint = useReactToPrint({
        content: () => ref.current,
        pageStyle: pageStyle
    });


    const { data, isLoading, error } = useApiGet(getSundryInvoiceReceiptUrl({
        invoiceNumber: ENCRYPTED_TOKEN || state?.data,
        ...(!!ENCRYPTED_TOKEN && { decode: true })
    }), {
        refetchOnWindowFocus: false
    });


    useEffect(() => {
        if (!state && !ENCRYPTED_TOKEN) {
            return replace("/")
        }
    }, [ENCRYPTED_TOKEN, replace, state]);


    if (isLoading) return <Spinner />;
    if (error && params)
        return "An error has occurred: " + error?.response?.data?.message;

    const details = {
        title: data?.data?.title,
        fullName: data?.data?.fullName,
        rrr: data?.data?.rrr,
        transactionRef: data?.transactionReference,
        invoiceNumber: data?.invoiceCode,
        matricNumber: data?.data?.matricNumber,
        level: data?.level,
        department: data?.data?.department,
        studentType: data?.studentType,
        schoolName: data?.schoolName,
        date: data?.data?.paymentDate,
        cardPaymentLink: data?.cardPaymentLink,
        isPaid: data?.isPaid,
        recieptItems: data?.data?.breakDown,
        total: data?.data?.amount
    };

    return (
        <div className="row">
            <div className="col-12 col-md-1"></div>
            <div className="col-12 col-md-10">
                <div>
                    <PageTitle
                        title="Receipt"
                        buttonGroup={
                            <Button
                                data-cy="print"
                                buttonClass="primary"
                                label="Print"
                                onClick={handlePrint}
                            />
                        }
                    />
                </div>
                <div className={styles.page_content} ref={ref}>
                    <Receipt details={details} />
                </div>
            </div>
        </div>
    );
};

export default FeeReceipt;
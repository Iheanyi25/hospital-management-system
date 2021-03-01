import React, { useState, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../api/fetcher";
import {
  getDAllrugDispencingInvoicesUrl,
  getDrugsInAnInvoice,
  markInvoiceAsDispensedUrl,
} from "../../../api/URLs";
import { PageLoader, Table } from "../../../Components";
import formatAmount from "../../../utils/formatAmount";
import formatDate from "../../../utils/formatDate";
import paid from "../../../assets/img/paid.svg";
import notpaid from "../../../assets/img/notpaid.svg";
import { observer } from "mobx-react";
import { UserContext } from "../../../mobx/UserState";
import { PrescriptionReciept } from "../../../Components/Modals";
import { notification } from "../../../utils/notification";
import ReceiptModal from "../../../Components/Modals/ReceiptModal";
import TableSize from "../../../Components/DataTable/TableSize";
import ActionButton from "../../../Components/DataTable/ActionButton";

const ManagePrescriptionInvoice = observer(() => {
  const {
    user: { userType },
  } = useContext(UserContext);
  const [drugs, setDrugs] = useState([]);
  const [isFetchingDrugs, setIsFetchingDrugs] = useState(false);
  const invoicesUrl = getDAllrugDispencingInvoicesUrl();
  const getDAllrugDispencingInvoicesConfig = fetchConfig({
    url: invoicesUrl,
    method: "get",
  });
  const { data, error, mutate } = useRequest(
    getDAllrugDispencingInvoicesConfig,
    {
      revalidateOnFocus: false,
    }
  );
  const fetchDrugsInAnInvoice = async (invoiceNumber) => {
    const invoicesUrl = getDrugsInAnInvoice(invoiceNumber);
    const getDrugsInAnInvoiceConfig = fetchConfig({
      url: invoicesUrl,
      method: "get",
    });
    const response = await fetchWrapper(getDrugsInAnInvoiceConfig);
    console.log(response);
    setDrugs(response?.data?.drugsInInvoice);
    setIsFetchingDrugs(false);
    // this.setState({ drugs: response?.data?.drugsInInvoice || [], isFetchingDrugs: false });
  };

  const markInvoiceAsDispensed = async (id) => {
    try {
      const markInvoiceUrl = markInvoiceAsDispensedUrl(id);
      const markInvoiceAsDispensedConfig = fetchConfig({
        url: markInvoiceUrl,
        method: "post",
      });
      const res = await fetchWrapper(markInvoiceAsDispensedConfig);

      notification.success({ message: res.data.message });
      mutate();
    } catch (error) {
      console.log(error);
      notification.error({ message: error?.response?.data.message });
    }
  };
  let dataTable = [];
  if (data) {
    dataTable = data.drugInvoices.map((drugInvoice, index) => {
      if (userType === "Admin") {
        return {
          "#": ++index,
          "Patient Name": `${drugInvoice?.patient?.firstName} ${drugInvoice?.patient?.lastName}`,
          "Invoice No": drugInvoice?.invoiceNumber,
          "Date Generated": formatDate(drugInvoice?.dateGenerated),
          "Total Cost": formatAmount(drugInvoice?.amountTotal),
          Status:
            drugInvoice?.paymentStatus === "NOT PAID" ? (
              <>
                <img src={notpaid} alt="not paid" /> Not paid
              </>
            ) : (
              <>
                <img src={paid} alt="paid" /> Paid
              </>
            ),
          Dispensed:
            drugInvoice?.isDispensed === false ? (
              <>
                <img src={notpaid} alt="not paid" /> Not dispensed
              </>
            ) : (
              <>
                <img src={paid} alt="paid" /> Dispensed
              </>
            ),
          Actions: (
            <AdminActionTable
              drugInvoice={drugInvoice}
              fetchDrugsInAnInvoice={fetchDrugsInAnInvoice}
              markInvoiceAsDispensed={markInvoiceAsDispensed}
            />
          ),
        };
      } else if (userType === "Pharmacy") {
        return {
          "#": ++index,
          "Patient Name": `${drugInvoice?.patient?.firstName} ${drugInvoice?.patient?.lastName}`,
          "Invoice No": drugInvoice?.invoiceNumber,
          "Date Generated": formatDate(drugInvoice?.dateGenerated),
          "Total Cost": formatAmount(drugInvoice?.amountTotal),
          Status:
            drugInvoice?.paymentStatus === "NOT PAID" ? (
              <>
                <img src={notpaid} alt="not paid" /> Not paid
              </>
            ) : (
              <>
                <img src={paid} alt="paid" /> Paid
              </>
            ),
          Dispensed:
            drugInvoice?.isDispensed === false ? (
              <>
                <img src={notpaid} alt="not paid" /> Not dispensed
              </>
            ) : (
              <>
                <img src={paid} alt="paid" /> Dispensed
              </>
            ),
          Actions: (
            <PharmacistActionTable
              drugInvoice={drugInvoice}
              fetchDrugsInAnInvoice={fetchDrugsInAnInvoice}
              markInvoiceAsDispensed={markInvoiceAsDispensed}
            />
          ),
        };
      } else {
        return {
          "#": ++index,
          "Patient Name": `${drugInvoice?.patient?.firstName} ${drugInvoice?.patient?.lastName}`,
          "Invoice No": drugInvoice?.invoiceNumber,
          "Date Generated": formatDate(drugInvoice?.dateGenerated),
          "Total Cost": formatAmount(drugInvoice?.amountTotal),
          Status:
            drugInvoice?.paymentStatus === "NOT PAID" ? (
              <>
                <img src={notpaid} alt="not paid" /> Not paid
              </>
            ) : (
              <>
                <img src={paid} alt="paid" /> Paid
              </>
            ),
          Dispensed:
            drugInvoice?.isDispensed === false ? (
              <>
                <img src={notpaid} alt="not paid" /> Not dispensed
              </>
            ) : (
              <>
                <img src={paid} alt="paid" /> Dispensed
              </>
            ),
          Actions: <AccountantActionTable drugInvoice={drugInvoice} />,
        };
      }
    });
  }
  if (error) return <div>failed to load</div>;
  return (
    <Fragment>
      <PageLoader />
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <header className="page-header justify-content-between d-flex align-items-center mb-2">
            <h4 className="page-title">Prescription Invoices</h4>
          </header>
          <div className="page-content">
            <TableSize
              size={data ? formatAmount(data.drugInvoices.length) : 0}
              heading="No of Prescription Invoices"
            />
          </div>
          <div className="page-content">
            {data && <Table content={dataTable} />}
          </div>
        </div>
      </main>
      <ReceiptModal modalId="view-reciept">
        <PrescriptionReciept
          costingDetails={drugs}
          isFetchingDrugs={isFetchingDrugs}
        />
      </ReceiptModal>
    </Fragment>
  );
});

const AdminActionTable = ({
  drugInvoice,
  fetchDrugsInAnInvoice,
  markInvoiceAsDispensed,
}) => {
  return (
    <ActionButton>
      {drugInvoice?.paymentStatus === "NOT PAID" ? (
        <Link
          to={{
            pathname: `/AdminPaymentForPrescription/${drugInvoice.id}`,
            state: drugInvoice,
          }}
          className="btn btn-sm btn-block"
        >
          <span className="btn-icon icofont-server mr-2" />
          Pay now
        </Link>
      ) : (
        <Link
          to="#"
          className="btn btn-sm btn-block"
          data-toggle="modal"
          data-target="#view-reciept"
          onClick={() => fetchDrugsInAnInvoice(drugInvoice.invoiceNumber)}
        >
          <span className="btn-icon icofont-server mr-2" />
          View Reciept
        </Link>
      )}
      {drugInvoice?.isDispensed === false &&
      drugInvoice?.paymentStatus !== "NOT PAID" ? (
        <Link
          to="#"
          className="btn btn-sm btn-block"
          onClick={() => markInvoiceAsDispensed(drugInvoice.id)}
        >
          <span className="btn-icon icofont-server mr-2" />
          Dispense
        </Link>
      ) : null}
    </ActionButton>
  );
};
const PharmacistActionTable = ({
  drugInvoice,
  fetchDrugsInAnInvoice,
  markInvoiceAsDispensed,
}) => {
  return (
    <ActionButton>
      {drugInvoice?.paymentStatus === "NOT PAID " ? null : (
        <Link
          to="#"
          className="btn btn-sm btn-block"
          data-toggle="modal"
          data-target="#view-reciept"
          onClick={() => fetchDrugsInAnInvoice(drugInvoice.invoiceNumber)}
        >
          <span className="btn-icon icofont-server mr-2" />
          View Reciept
        </Link>
      )}
      {drugInvoice?.isDispensed === false ? (
        <Link
          to="#"
          className="btn btn-sm btn-block"
          onClick={() => markInvoiceAsDispensed(drugInvoice.id)}
        >
          <span className="btn-icon icofont-server mr-2" />
          Dispense
        </Link>
      ) : null}
    </ActionButton>
  );
};
const AccountantActionTable = ({ drugInvoice, fetchDrugsInAnInvoice }) => {
  return (
    <ActionButton>
      {drugInvoice?.paymentStatus === "NOT PAID" ? (
        <Link
          to={{
            pathname: `/AccountPaymentForPrescription/${drugInvoice.id}`,
            state: drugInvoice,
          }}
          className="btn btn-sm btn-block"
        >
          <span className="btn-icon icofont-server mr-2" />
          Pay now
        </Link>
      ) : (
        <Link
          to="#"
          className="btn btn-sm btn-block"
          data-toggle="modal"
          data-target="#view-reciept"
          onClick={() => fetchDrugsInAnInvoice(drugInvoice.invoiceNumber)}
        >
          <span className="btn-icon icofont-server mr-2" />
          View Reciept
        </Link>
      )}
    </ActionButton>
  );
};

export default ManagePrescriptionInvoice;

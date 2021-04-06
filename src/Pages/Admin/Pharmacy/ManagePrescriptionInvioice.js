import React, { useState, useContext, Fragment } from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../api/fetcher";
import {
  getAllDrugDispencingInvoicesUrl,
  getDrugsInAnInvoice,
  markInvoiceAsDispensedUrl,
} from "../../../api/URLs";
import { PageLoader, Table } from "../../../Components";
import formatAmount from "../../../utils/formatAmount";
import formatDate from "../../../utils/formatDate";
import paid from "../../../assets/img/paid.svg";
import notpaid from "../../../assets/img/notpaid.svg";
import incomplete from "../../../assets/img/incomplete.svg";
import { observer } from "mobx-react";
import { UserContext } from "../../../mobx/UserState";
import { PrescriptionReciept } from "../../../Components/Modals";
import { notification } from "../../../utils/notification";
import ReceiptModal from "../../../Components/Modals/ReceiptModal";
import TableSize from "../../../Components/DataTable/TableSize";
import {
  AccountantActionTable,
  AdminActionTable,
  PharmacistActionTable,
} from "./Components/prescription-invoice/PrescriptionActionTable";

const ManagePrescriptionInvoice = observer(({ isDashboard }) => {
  const [drugs, setDrugs] = useState([]);
  const [isFetchingDrugs, setIsFetchingDrugs] = useState(false);
  const invoicesUrl = getAllDrugDispencingInvoicesUrl();
  const getAllrugDispencingInvoicesConfig = fetchConfig({
    url: invoicesUrl,
    method: "get",
  });
  const { data, error, mutate } = useRequest(
    getAllrugDispencingInvoicesConfig,
    {
      revalidateOnFocus: false,
    }
  );
  console.log(data, 37623);
  const fetchDrugsInAnInvoice = async (invoiceNumber) => {
    const invoicesUrl = getDrugsInAnInvoice(invoiceNumber);
    const getDrugsInAnInvoiceConfig = fetchConfig({
      url: invoicesUrl,
      method: "get",
    });
    const response = await fetchWrapper(getDrugsInAnInvoiceConfig);
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
      return {
        "#": ++index,
        "Patient Name": `${drugInvoice?.patient?.firstName} ${drugInvoice?.patient?.lastName}`,
        "Invoice No": drugInvoice?.invoiceNumber,
        "Date Generated": formatDate(drugInvoice?.dateGenerated),
        "Total Cost": formatAmount(drugInvoice?.amountTotal),
        "Amount due":
          drugInvoice?.amountToBePaidByPatient === 0
            ? "Covered"
            : formatAmount(drugInvoice?.amountToBePaidByPatient),
        Status:
          drugInvoice?.paymentStatus === "NOT PAID" ? (
            <span>
              <img src={notpaid} alt="not paid" /> Not paid
            </span>
          ) : drugInvoice?.paymentStatus === "Awaiting HMO Payment" ? (
            <span>
              <img src={incomplete} alt="not paid" /> HMO
            </span>
          ) : (
            <span>
              <img src={paid} alt="paid" /> Paid
            </span>
          ),
        Dispensed:
          drugInvoice?.isDispensed === false ? (
            <span>
              <img src={notpaid} alt="not paid" /> Not dispensed
            </span>
          ) : (
            <span>
              <img src={paid} alt="paid" /> Dispensed
            </span>
          ),
        Actions: (
          <ActionCatgeories
            drugInvoice={drugInvoice}
            fetchDrugsInAnInvoice={fetchDrugsInAnInvoice}
            markInvoiceAsDispensed={markInvoiceAsDispensed}
          />
        ),
      };
    });
  }

  if (error) return <div>failed to load</div>;
  return (
    <Fragment>
      <PageLoader />
      <main className={!isDashboard && "main-content"}>
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <header className="page-header justify-content-between d-flex align-items-center mb-2">
            <h4 className="page-title">Prescription Invoices</h4>
          </header>
          {!isDashboard && (
            <div className="page-content">
              <TableSize
                size={data ? formatAmount(data.drugInvoices.length) : 0}
                heading="No of Prescription Invoices"
              />
            </div>
          )}
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

export default ManagePrescriptionInvoice;

const ActionCatgeories = observer(
  ({ drugInvoice, fetchDrugsInAnInvoice, markInvoiceAsDispensed }) => {
    const {
      user: { userType },
    } = useContext(UserContext);

    const catgories = {
      Pharmacy: (
        <PharmacistActionTable
          drugInvoice={drugInvoice}
          fetchDrugsInAnInvoice={fetchDrugsInAnInvoice}
          markInvoiceAsDispensed={markInvoiceAsDispensed}
        />
      ),
      Accountant: (
        <AccountantActionTable
          drugInvoice={drugInvoice}
          fetchDrugsInAnInvoice={fetchDrugsInAnInvoice}
        />
      ),
      Admin: (
        <AdminActionTable
          drugInvoice={drugInvoice}
          fetchDrugsInAnInvoice={fetchDrugsInAnInvoice}
          markInvoiceAsDispensed={markInvoiceAsDispensed}
        />
      ),
    };
    return catgories[userType] || "";
  }
);

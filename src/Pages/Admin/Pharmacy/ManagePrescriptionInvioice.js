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

// let $ = window.$;
// $.DataTables = require("datatables.net");
// class ManagePrescriptionInvoice extends React.Component {
//   static contextType = UserContext;
//  state = {
//     prescriptionInvoices: [],
//     drugs: [],
//     isFetchingDrugs: true
//   };
//   async componentDidMount() {
//     await this.fetchPrescriptionInvoices();
//   }

//   async fetchPrescriptionInvoices() {
//     const invoicesUrl = getDAllrugDispencingInvoicesUrl();
//     const getDAllrugDispencingInvoicesConfig = fetchConfig({
//       url: invoicesUrl,
//       method: "get",
//     });
//     const response = await fetchWrapper(getDAllrugDispencingInvoicesConfig);
//     this.$el = $(this.el);
//     this.$el.DataTable().destroy();
//     console.log(response, 88888);
//     this.setState(
//       { prescriptionInvoices: response?.data?.drugInvoices || [] },
//       () => this.sync()
//       );
//   }
//   async fetchDrugsInAnInvoice(invoiceNumber) {
//     const invoicesUrl = getDrugsInAnInvoice(invoiceNumber);
//     const getDrugsInAnInvoiceConfig = fetchConfig({
//       url: invoicesUrl,
//       method: "get",
//     });
//     const response = await fetchWrapper(getDrugsInAnInvoiceConfig);
//     console.log(response);
//     this.setState({ drugs: response?.data?.drugsInInvoice || [], isFetchingDrugs: false });
//   }

//   async markInvoiceAsDispensed(id) {
//     try {
//       const markInvoiceUrl = markInvoiceAsDispensedUrl(id);
//     const markInvoiceAsDispensedConfig = fetchConfig({
//       url: markInvoiceUrl,
//       method: "post",
//     });
//     const res = await fetchWrapper(markInvoiceAsDispensedConfig);

//       notification.success({ message: res.data.message})
//       this.fetchPrescriptionInvoices();
//     } catch (error) {
//       console.log(error);
//       notification.error({ message: error?.response?.data.message })
//     }

//   }

//   sync() {
//     this.$el = $(this.el);
//     this.$el.DataTable();
//   }
//   render() {
//     const {
//       user: { userType },
//     } = this.context;
//     const { prescriptionInvoices, drugs } = this.state;;
//     return (
//       <>
//         <PageLoader />

//         <main className="main-content">
//           <div className="app-loader">
//             <i className="icofont-spinner-alt-4 rotate" />
//           </div>
//           <div className="main-content-wrap">
//             <header className="page-header justify-content-between d-flex align-items-center mb-2">
//               <h4 className="page-title">Prescription Invoices</h4>
//             </header>
//             <div className="row">
//               <div className="col col-12 col-md-6 col-xl-4">
//                 <div className="card animated fadeInUp delay-02s bg-light">
//                   <div className="card-body">
//                     <div className="row align-items-center">
//                       <div className="col col-5">
//                         <div className="icon p-0 fs-48 text-primary opacity-50 icofont-wheelchair"></div>
//                       </div>
//                       <div className="col col-7">
//                         <h6 className="mt-0 mb-1">
//                           No of prescription invoice
//                         </h6>
//                         <div className="count text-primary fs-20">
//                           {formatAmount(prescriptionInvoices.length)}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="page-content">
//               <div className="card mb-0">
//                 <div className="card-body">
//                   <div>
//                     <div className="table-responsive">
//                       <table
//                         ref={(el) => (this.el = el)}
//                         className="table table-striped"
//                         data-paging="true"
//                         data-info="true"
//                       >
//                         <thead>
//                           <tr>
//                             <th>#</th>
//                             <th>Patient Name</th>
//                             <th>Invoice No</th>
//                             <th>Date Generated</th>
//                             <th>Total Cost</th>
//                             <th>Status</th>
//                             <th>Dispensed</th>
//                             <th>Action</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {prescriptionInvoices?.map(
//                             (prescriptionInvoice, index) => (
//                               <tr>
//                                 <td>
//                                   <div className="text-muted text-nowrap">
//                                     {index + 1}
//                                   </div>
//                                 </td>
//                                 <td>
//                                   <div className="text-muted text-nowrap">
//                                     {`${prescriptionInvoice?.patient?.firstName} ${prescriptionInvoice?.patient?.lastName}`}
//                                   </div>
//                                 </td>
//                                 <td>
//                                   <div className="text-muted text-nowrap">
//                                     {prescriptionInvoice?.invoiceNumber}
//                                   </div>
//                                 </td>
//                                 <td>
//                                   <div className="text-muted text-nowrap">
//                                     {formatDate(
//                                       prescriptionInvoice?.dateGenerated
//                                     )}
//                                   </div>
//                                 </td>
//                                 <td>
//                                   <div className="text-muted text-nowrap">
//                                     {formatAmount(
//                                       prescriptionInvoice?.amountTotal
//                                     )}
//                                   </div>
//                                 </td>
//                                 <td>
//                                   <div className="text-muted text-nowrap">
//                                     {prescriptionInvoice?.paymentStatus ===
//                                     "NOT PAID" ? (
//                                       <>
//                                         <img src={notpaid} alt="not paid" /> Not
//                                         paid
//                                       </>
//                                     ) : (
//                                       <>
//                                         <img src={paid} alt="paid" /> Paid
//                                       </>
//                                     )}
//                                   </div>
//                                 </td>
//                                 <td>
//                                   <div className="text-muted text-nowrap">
//                                     {prescriptionInvoice?.isDispensed ===
//                                     false ? (
//                                       <>
//                                         <img src={notpaid} alt="not paid" /> Not
//                                         dispensed
//                                       </>
//                                     ) : (
//                                       <>
//                                         <img src={paid} alt="paid" /> Dispensed
//                                       </>
//                                     )}
//                                   </div>
//                                 </td>
//                                 <td>
//                                   {userType === "Admin" ? (
//                                     <div className="btn-group">
//                                       <button
//                                         type="button"
//                                         className="btn btn-primary btn-sm btn-block dropdown-toggle"
//                                         data-toggle="dropdown"
//                                         aria-haspopup="true"
//                                         aria-expanded="false"
//                                       >
//                                         Action
//                                       </button>
//                                       <div className="dropdown-menu">
//                                         {prescriptionInvoice?.paymentStatus ===
//                                         "NOT PAID" ? (
//                                           <Link
//                                             to={{
//                                               pathname:
//                                                 userType === "Admin"
//                                                   ? `/AdminPaymentForPrescription/${prescriptionInvoice.id}`
//                                                   : `/AccountPaymentForPrescription/${prescriptionInvoice.id}`,
//                                               state: prescriptionInvoice,
//                                             }}
//                                             className="btn btn-sm btn-block"
//                                           >
//                                             <span className="btn-icon icofont-server mr-2" />
//                                             Pay now
//                                           </Link>
//                                         ) : (
//                                           <Link
//                                             to="#"
//                                             className="btn btn-sm btn-block"
//                                             data-toggle="modal"
//                                             data-target="#view-reciept"
//                                             onClick={() =>
//                                               this.fetchDrugsInAnInvoice(
//                                                 prescriptionInvoice.invoiceNumber
//                                               )
//                                             }
//                                           >
//                                             <span className="btn-icon icofont-server mr-2" />
//                                             View Reciept
//                                           </Link>
//                                         )}
//                                         {prescriptionInvoice?.isDispensed ===
//                                           false &&
//                                         prescriptionInvoice?.paymentStatus !==
//                                           "NOT PAID" ? (
//                                           <Link
//                                             to="#"
//                                             className="btn btn-sm btn-block"
//                                             onClick={() =>
//                                               this.markInvoiceAsDispensed(
//                                                 prescriptionInvoice.id
//                                               )
//                                             }
//                                           >
//                                             <span className="btn-icon icofont-server mr-2" />
//                                             Dispense
//                                           </Link>
//                                         ) : null}
//                                       </div>
//                                     </div>
//                                   ) : userType === "Accountant" ? (
//                                     <div className="btn-group">
//                                       <button
//                                         type="button"
//                                         className="btn btn-primary btn-sm btn-block dropdown-toggle"
//                                         data-toggle="dropdown"
//                                         aria-haspopup="true"
//                                         aria-expanded="false"
//                                       >
//                                         Action
//                                       </button>
//                                       <div className="dropdown-menu">
//                                         {prescriptionInvoice?.paymentStatus ===
//                                         "NOT PAID" ? (
//                                           <Link
//                                             to={{
//                                               pathname:
//                                                 userType === "Admin"
//                                                   ? `/AdminPaymentForPrescription/${prescriptionInvoice.id}`
//                                                   : `/AccountPaymentForPrescription/${prescriptionInvoice.id}`,
//                                               state: prescriptionInvoice,
//                                             }}
//                                             className="btn btn-sm btn-block"
//                                           >
//                                             <span className="btn-icon icofont-server mr-2" />
//                                             Pay now
//                                           </Link>
//                                         ) : (
//                                           <Link
//                                             to="#"
//                                             className="btn btn-sm btn-block"
//                                             data-toggle="modal"
//                                             data-target="#view-reciept"
//                                             onClick={() =>
//                                               this.fetchDrugsInAnInvoice(
//                                                 prescriptionInvoice.invoiceNumber
//                                               )
//                                             }
//                                           >
//                                             <span className="btn-icon icofont-server mr-2" />
//                                             View Reciept
//                                           </Link>
//                                         )}
//                                       </div>
//                                     </div>
//                                   ) : userType === "Pharmacy" ? (
//                                     prescriptionInvoice?.paymentStatus ===
//                                     "NOT PAID" ? (
//                                       "No action"
//                                     ) : (
//                                       <div className="btn-group">
//                                         <button
//                                           type="button"
//                                           className="btn btn-primary btn-sm btn-block dropdown-toggle"
//                                           data-toggle="dropdown"
//                                           aria-haspopup="true"
//                                           aria-expanded="false"
//                                         >
//                                           Action
//                                         </button>

//                                         <div className="dropdown-menu">
//                                           {prescriptionInvoice?.paymentStatus ===
//                                           "NOT PAID " ? null : (
//                                             <Link
//                                               to="#"
//                                               className="btn btn-sm btn-block"
//                                               data-toggle="modal"
//                                               data-target="#view-reciept"
//                                               onClick={() =>
//                                                 this.fetchDrugsInAnInvoice(
//                                                   prescriptionInvoice.invoiceNumber
//                                                 )
//                                               }
//                                             >
//                                               <span className="btn-icon icofont-server mr-2" />
//                                               View Reciept
//                                             </Link>
//                                           )}
//                                           {prescriptionInvoice?.isDispensed ===
//                                           false ? (
//                                             <Link
//                                               to="#"
//                                               className="btn btn-sm btn-block"
//                                               onClick={() =>
//                                                 this.markInvoiceAsDispensed(
//                                                   prescriptionInvoice.id
//                                                 )
//                                               }
//                                             >
//                                               <span className="btn-icon icofont-server mr-2" />
//                                               Dispense
//                                             </Link>
//                                           ) : null}
//                                         </div>
//                                       </div>
//                                     )
//                                   ) : null}
//                                 </td>
//                               </tr>
//                             )
//                           )}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//         <ReceiptModal modalId="view-reciept">
//         <PrescriptionReciept costingDetails={drugs} isFetchingDrugs={this.state.isFetchingDrugs} />
//       </ReceiptModal>
//       </>
//     );
//   }
// }
// export default observer(ManagePrescriptionInvoice);

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
  const { data, error } = useRequest(getDAllrugDispencingInvoicesConfig, {
    revalidateOnFocus: false,
  });
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
      this.fetchPrescriptionInvoices();
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

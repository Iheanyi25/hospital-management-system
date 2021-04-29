import React, { useContext, useState, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { PageLoader, Table } from "../../../Components";
import formatAmount from "../../../utils/formatAmount";
import formatDate from "../../../utils/formatDate";
import paid from "../../../assets/img/paid.svg";
import notpaid from "../../../assets/img/notpaid.svg";
import incomplete from "../../../assets/img/incomplete.svg";
import { getAllServiceRequestInvoiceUrl, getServicesInAnInvoiceUrl } from "../../../api/URLs";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../api/fetcher";
import { UserContext } from "../../../mobx/UserState";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import TableSize from "../../../Components/DataTable/TableSize";
import ActionButton from "../../../Components/DataTable/ActionButton";
import { ServiceReciept } from "../../../Components/Modals/ServiceReciept";
import ReceiptModal from "../../../Components/Modals/ReceiptModal";

const ManageServiceRequest = observer(() => {
  const [isFetchingServices, setIsFetchingServices] = useState(false);
  const [services, setServices] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const {
    user,
    user: { userType },
  } = useContext(UserContext);
  const getAllServiceRequestInvoice = getAllServiceRequestInvoiceUrl(
    pageNumber,
    pageSize
  );
  const getAllServiceRequestInvoiceConfig = fetchConfig({
    url: getAllServiceRequestInvoice,
    method: "get",
  });
  const { data, error } = useRequest(getAllServiceRequestInvoiceConfig, {
    revalidateOnFocus: false,
  });
  const fetchServicesInAnInvocice = async (invoiceId) => {
    console.log(439545, "Hii");
    setIsFetchingServices(true);
    const getServicesInAnInvoice = getServicesInAnInvoiceUrl(invoiceId, 1, 200);
    const getServiceInvoiceConfig = fetchConfig({
      url: getServicesInAnInvoice,
      method: "get",
    });
    const res = await fetchWrapper(getServiceInvoiceConfig);
    setServices(res?.data?.serviceRequests);
    setIsFetchingServices(false);
  };
  let dataTable = [];
  if (data) {
    dataTable = data.serviceInvoices.map((serviceInvoice, index) => {
      return {
        "#": ++index,
        "Patient's Name": serviceInvoice?.fullname,
        "No. of Services": serviceInvoice?.noofServices,
        "Invoice No.": serviceInvoice?.invoiceNumber,
        "Date Generated": formatDate(serviceInvoice?.dateGenerated),
        "Total Cost": formatAmount(serviceInvoice?.amountTotal),
        "Amount Due":
          serviceInvoice?.amountToBePaidByPatient === 0
            ? "Covered"
            : formatAmount(serviceInvoice?.amountToBePaidByPatient),
        Status: (
          <>
            {serviceInvoice?.paymentStatus === "NOT PAID" ? (
              <>
                <img src={notpaid} alt="not paid" /> Not paid
              </>
            ) : serviceInvoice?.paymentStatus === "Awaiting HMO Payment" ? (
              <span>
                <img src={incomplete} alt="not paid" /> HMO
              </span>
            ) : serviceInvoice?.paymentStatus === "PAID" ? (
              <>
                <img src={paid} alt="paid" /> Paid
              </>
            ) : (
              <>
                <img src={incomplete} alt="paid" /> Incomplete
              </>
            )}
          </>
        ),
        Actions: (
          <ServiceInvoiceTableAction
            serviceInvoice={serviceInvoice}
            user={user}
            fetchServicesInAnInvocice={fetchServicesInAnInvocice}
          />
        ),
      };
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
            <h4 className="page-title">Service Request Invoices</h4>
            {userType === "Admin" ? (
              <NavLink className="btn btn-primary" to="/AdminServiceRequests">
                Request Service
              </NavLink>
            ) : null}
          </header>

          <div className="page-content">
            <TableSize
              size={data ? data.serviceInvoices.length : 0}
              heading="No. of Service Requests"
            />
          </div>
          <div className="page-content">
            {data && (
              <Table
                content={dataTable}
                paginationDetails={data.paginationDetails}
                setPageNumber={setPageNumber}
                pageNumber={pageNumber}
                pageSize={pageSize}
                setPageSize={setPageSize}
              />
            )}
          </div>
        </div>
      </main>
      <ReceiptModal modalId="showInvoice">
        <ServiceReciept
          services={services}
          isFetchingServices={isFetchingServices}
        />
      </ReceiptModal>
    </Fragment>
  );
});

const ServiceInvoiceTableAction = ({
  serviceInvoice,
  user,
  fetchServicesInAnInvocice,
}) => {
  const { userType } = user;
  return (
    <ActionButton>
      {userType === "LabAttendant" ? null : serviceInvoice?.paymentStatus ===
          "NOT PAID" || serviceInvoice?.paymentStatus === "INCOMPLETE" ? (
        <NavLink
          to={{
            pathname:
              userType === "Admin"
                ? `/AdminPaymentForService/${serviceInvoice.id}`
                : `/AccountPaymentForService/${serviceInvoice.id}`,
            state: {
              invoiceId: serviceInvoice.id,
              patientId: serviceInvoice.patientId,
              invoiceNumber: serviceInvoice.invoiceNumber,
              user: toJS(user),
            },
          }}
          className="btn btn-sm btn-block"
        >
          <span className="btn-icon icofont-stethoscope-alt mr-2" />
          Pay for Services
        </NavLink>
      ) : null}

      <NavLink
        to={{
          pathname:
            userType === "Admin"
              ? `/AdminViewServiceRequestContents/${serviceInvoice.id}`
              : userType === "LabAttendant"
              ? `/LabServiceRequestContents/${serviceInvoice.id}`
              : `/AccountServiceRequestContents/${serviceInvoice.id}`,
          state: {
            invoiceId: serviceInvoice.id,
            patientId: serviceInvoice.patientId,
            invoiceNumber: serviceInvoice.invoiceNumber,
            paymentStatus: serviceInvoice.paymentStatus,
            user: toJS(user),
          },
        }}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        View Content
      </NavLink>
      {serviceInvoice?.paymentStatus === "PAID" ? (
        <button
          data-toggle="modal"
          data-target="#showInvoice"
          className="btn btn-sm btn-block"
          onClick={() => fetchServicesInAnInvocice(serviceInvoice.id)}
        >
          <span className="btn-icon icofont-server mr-2" />
          View Reciept
        </button>
      ) : null}
    </ActionButton>
  );
};

export default ManageServiceRequest;

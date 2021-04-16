import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { PageLoader, Table } from "../../../Components";
import formatAmount from "../../../utils/formatAmount";
import paid from "../../../assets/img/paid.svg";
import notpaid from "../../../assets/img/notpaid.svg";
import incomplete from "../../../assets/img/incomplete.svg";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { getServicesInAnInvoiceUrl } from "../../../api/URLs";
import ActionButton from "../../../Components/DataTable/ActionButton";
import TableSize from "../../../Components/DataTable/TableSize";

const ServiceRequestContents = ({ match, location }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const {
    state: {
      invoiceNumber,
      patientId,
      paymentStatus,
      user,
      user: { userType },
    },
  } = location;
  const {
    params: { invoiceId },
  } = match;
  const getServicesInAnInvoice = getServicesInAnInvoiceUrl(
    invoiceId,
    pageNumber,
    pageSize
  );
  const getServicesInAnInvoiceConfig = fetchConfig({
    url: getServicesInAnInvoice,
    method: "get",
  });
  const { data, error } = useRequest(getServicesInAnInvoiceConfig, {
    revalidateOnFocus: false,
  });
  console.log(data);

  let dataTable = [];
  if (data) {
    dataTable = data.serviceRequests.map((request, index) => {
      if (userType === "Admin" || userType === "LabAttendant"|| userType === "Accountant") {
        return {
          "#": ++index,
          "Service Name": request?.serviceName,
          "Service Category": request?.service?.serviceCategory?.name,
          Amount: formatAmount(request?.cost) ?? "",
          Status: (
            <>
              {request?.status === "Awaiting HMO Payment" ? (
                <>
                  <img src={incomplete} alt="not paid" /> Awaiting HMO
                </>
              ) : request?.status === "Awaiting HMO Payment" ? (
                <>
                  <img src={notpaid} alt="paid" /> Not Paid
                </>
              ) : (
                <>
                  <img src={paid} alt="paid" /> Paid
                </>
              )}
            </>
          ),
          Actions: (
            <ServiceRequestContentTableAction
              request={request}
              userType={userType}
            />
          ),
        };
      } else {
        return {
          "#": ++index,
          "Patient's Name": `${request?.patientFirstName} ${request?.patientLastName}`,
          "Service Category": request?.serviceCategoryName,
          "Service Name": request?.serviceName,
          Amount: formatAmount(request?.amount) ?? "",
          Status: (
            <>
              {request?.status === "Awaiting HMO Payment" ? (
                <>
                  <img src={incomplete} alt="not paid" /> Awaiting HMO
                </>
              ) : request?.status === "Awaiting HMO Payment" ? (
                <>
                  <img src={notpaid} alt="paid" /> Not Paid
                </>
              ) : (
                <>
                  <img src={paid} alt="paid" /> Paid
                </>
              )}
            </>
          ),
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
            <h4 className="page-title">
              {`Services Request in Invoice #${invoiceNumber}`}
            </h4>
            {paymentStatus === "PAID" || user.userType === "LabAttendant" ? null : (
              <Link
                className="btn btn-primary"
                to={{
                  pathname:
                    user.userType === "Admin"
                      ? `/AdminPaymentForService/${invoiceId}`
                      : `/AccountPaymentForService/${invoiceId}`,
                  state: {
                    invoiceId: invoiceId,
                    patientId: patientId,
                    invoiceNumber: invoiceNumber,
                    user,
                  },
                }}
              >
                Pay For Services
              </Link>
            )}
          </header>

          <div className="page-content">
            <TableSize
              size={data ? data.serviceRequests.length : 0}
              heading="No. of Services in Invoice"
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
    </Fragment>
  );
};

const ServiceRequestContentTableAction = ({ request, userType }) => {
  return request.status === "PAID" ||
    request.status === "Awaiting HMO Payment" ? (
    <ActionButton>
      <Link
        to={
          userType === "Admin"
            ? `/AdminUploadServiceRequestResult/${request.id}`
            : `/LabUploadServiceRequestResult/${request.id}`
        }
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-stethoscope-alt mr-2" />
        Upload Result
      </Link>

      <Link
        to={
          userType === "Admin"
            ? `/AdminViewLabResults/${request.id}`
            : `/LabViewLabResults/${request.id}`
        }
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        View Result
      </Link>
    </ActionButton>
  ) : (
    "Pay for service"
  );
};

export default ServiceRequestContents;

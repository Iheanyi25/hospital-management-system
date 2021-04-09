import React, { useState, useContext, Fragment } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { fetchConfig } from "../../api/fetchConfig";
import { useRequest } from "../../api/fetcher";
import {
  getAdmissionInvoiceUrl,
  getServiceRequestsInAnInvoiceUrl,
} from "../../api/URLs";
import { PageLoader, Table } from "../../Components";
import formatDate from "../../utils/formatDate";
import formatAmount from "../../utils/formatAmount";
import { observer } from "mobx-react";
import ActionButton from "../../Components/DataTable/ActionButton";
import TableSize from "../../Components/DataTable/TableSize";
import paid from "../../assets/img/paid.svg";
import notpaid from "../../assets/img/notpaid.svg";
import { UserContext } from "../../mobx/UserState";

const ManageServiceRequests = observer(() => {
  const {
    user: { userType },
  } = useContext(UserContext);
  const { id } = useParams();
  const {
    location: { state: dischargeStatus },
  } = useHistory();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  // Fetching admission invoice
  const invoicesUrl = getAdmissionInvoiceUrl(id);
  const getAdmissionInvoiceConfig = fetchConfig({
    url: invoicesUrl,
    method: "get",
  });
  const { data } = useRequest(getAdmissionInvoiceConfig, {
    revalidateOnFocus: false,
  });

  // Fetching service invoice
  const serviceRequest = getServiceRequestsInAnInvoiceUrl(
    data?.admissionInvoice.id,
    pageNumber,
    pageSize
  );
  const getServiceRequestInvoice = fetchConfig({
    url: serviceRequest,
    method: "get",
  });
  const { data: invoice, error } = useRequest(getServiceRequestInvoice, {
    revalidateOnFocus: false,
  });

  let dataTable = [];
  if (invoice) {
    dataTable = invoice.serviceRequests.map(
      ({ service: { name, dateCreated, cost }, id, status }, index) => {
        return {
          "#": ++index,
          "Service Name": name,
          "Date Generated": formatDate(dateCreated),
          Cost: formatAmount(cost),
          Status: (
            <>
              {status === "UNDONE" ? (
                <>
                  <img src={notpaid} alt="undone" /> Undone
                </>
              ) : (
                <>
                  <img src={paid} alt="done" /> Done
                </>
              )}
            </>
          ),
          Actions: (
            <ServiceActionTable
              serviceId={id}
              userType={userType}
              dischargeStatus={dischargeStatus}
            />
          ),
        };
      }
    );
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
            <h4 className="page-title" style={{ textTransform: "capitalize" }}>
              erjkrfekjrf
            </h4>
          </header>
          <div className="page-content">
            <TableSize
              size={
                data ? formatAmount(invoice?.serviceRequests.length ?? 0) : 0
              }
              heading="No of Services"
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
});

const ServiceActionTable = ({ serviceId, userType, dischargeStatus }) => {
  return (
    <ActionButton>
      {dischargeStatus ? null : (
        <Link
          to={
            userType === "Admin"
              ? `/AdminUploadAdmissionsServiceRequestResult/${serviceId}`
              : `/LabUploadAdmissionsServiceRequestResult/${serviceId}`
          }
          className="btn btn-sm btn-block"
        >
          <span className="btn-icon icofont-stethoscope-alt mr-2" />
          Upload Result
        </Link>
      )}
      <Link
        to={
          userType === "Admin"
            ? `/AdminViewAdmissionsServiceRequestResults/${serviceId}`
            : `/LabViewAdmissionsServiceRequestResults/${serviceId}`
        }
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        View Result
      </Link>
    </ActionButton>
  );
};

export default ManageServiceRequests;

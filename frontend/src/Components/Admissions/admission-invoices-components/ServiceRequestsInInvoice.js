import React, { useState, Fragment } from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { getServiceRequestsInAnInvoiceUrl } from "../../../api/URLs";
import formatDate from "../../../utils/formatDate";
import formatAmount from "../../../utils/formatAmount";
import { Table } from "../../DataTable";
import paid from "../../../assets/img/paid.svg";
import notpaid from "../../../assets/img/notpaid.svg";

const ServiceRequestsInInvoice = ({ admissionInvoiceId }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const invoicesUrl = getServiceRequestsInAnInvoiceUrl(admissionInvoiceId, pageNumber, pageSize);
  const getAdmissionInvoiceConfig = fetchConfig({
    url: invoicesUrl,
    method: "get",
  });
  const { data, error } = useRequest(getAdmissionInvoiceConfig, {
    revalidateOnFocus: false,
  });
  console.log(data);
  let dataTable = [];
  if (data) {
    dataTable = data.serviceRequests.map(
      ({ service: { name, dateCreated, cost }, status }, index) => {
        return {
          "#": ++index,
          "Service Name": (
            <span style={{ textTransform: "capitalize" }}>{name}</span>
          ),
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
        };
      }
    );
  }
  if (error) return <div>failed to load</div>;
  return (
    <Fragment>
      {data && (
        <Table
          content={dataTable}
          tableID={"serviceRequests" + data.serviceRequests.length}
          key={"serviceRequests" + data.serviceRequests.length}
          paginationDetails={data.paginationDetails}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      )}
    </Fragment>
  );
};

export { ServiceRequestsInInvoice };

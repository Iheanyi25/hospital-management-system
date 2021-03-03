import React, { useState, Fragment } from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { getServiceRequestsInAnInvoiceUrl } from "../../../api/URLs";
import formatDate from "../../../utils/formatDate";
import formatAmount from "../../../utils/formatAmount";
import { Table } from "../../DataTable";

const ServiceRequestsInInvoice = ({ admissionInvoiceId }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const invoicesUrl = getServiceRequestsInAnInvoiceUrl(admissionInvoiceId);
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
    dataTable = data.serviceRequests.map(({ service }, index) => {
      return {
        "#": ++index,
        "Patient's Name": service?.fullname,
        "No. of Services": service?.noofServices,
        "Date Generated": formatDate(service?.dateGenerated),
        "Total Cost": formatAmount(service?.cost),
        Status: (
          <>
            {/* {service?.paymentStatus === "NOT PAID" ? (
              <>
                <img src={notpaid} alt="not paid" /> Not paid
              </>
            ) : service?.paymentStatus === "PAID" ? (
              <>
                <img src={paid} alt="paid" /> Paid
              </>
            ) : (
              <>
                <img src={incomplete} alt="paid" /> Incomplete
              </>
            )} */}
          </>
        ),
      };
    });
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

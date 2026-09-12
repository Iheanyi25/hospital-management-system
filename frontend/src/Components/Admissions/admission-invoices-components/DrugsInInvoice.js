import React, { useState, Fragment } from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { getDrugsInAnAdmissionInvoiceUrl } from "../../../api/URLs";
import { Table } from "../../DataTable";

const DrugsInInvoice = ({ admissionInvoiceId }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const invoicesUrl = getDrugsInAnAdmissionInvoiceUrl(
    admissionInvoiceId,
    pageNumber,
    pageSize
  );
  const getAdmissionInvoiceConfig = fetchConfig({
    url: invoicesUrl,
    method: "get",
  });
  const { data, error } = useRequest(getAdmissionInvoiceConfig, {
    revalidateOnFocus: false,
  });
  let dataTable = [];
  if (data) {
    dataTable = data.drugsInInvoice.map(({ drug }, index) => {
      return {
        "#": ++index,
        "Drug Name": drug?.name ?? "N/A",
        "Generic Name": drug?.genericName ?? "N/A",
        Type: (
          <div
            className="text-muted text-nowrap"
            style={{ textTransform: "capitalize" }}
          >
            {drug?.drugType ?? "N/A"}
          </div>
        ),
        Manufacturer: drug?.manufacturer ?? "N/A",
      };
    });
  }
  if (error) return <div>failed to load</div>;
  return (
    <Fragment>
      {data && (
        <Table
          content={dataTable}
          tableID={"drugsInInvoice" + data.drugsInInvoice.length}
          key={"drugsInInvoice" + data.drugsInInvoice.length}
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

export { DrugsInInvoice };

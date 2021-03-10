import React, { useState, Fragment } from "react";
import { useRequest } from "../../../api/fetcher";
import { getAdmissionTransactionsUrl } from "../../../api/URLs";
import formatDate from "../../../utils/formatDate";
import formatAmount from "../../../utils/formatAmount";
import { Table } from "../../DataTable";
import { fetchConfig } from "../../../api/fetchConfig";

const TransactionHistory = ({ admissionId }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const transactionsUrl = getAdmissionTransactionsUrl(admissionId);
  const getAdmissionInvoiceConfig = fetchConfig({
    url: transactionsUrl,
    method: "get",
  });
  const { data, error } = useRequest(getAdmissionInvoiceConfig, {
    revalidateOnFocus: false,
  });
  console.log(data);
  let dataTable = [];
  if (data) {
    dataTable = data.admissionTransactions?.map(
      ({ initiator, trasactionDate, paymentMethod, amount }, index) => {
        return {
          "#": ++index,
          Initiator: `${initiator?.firstName} ${initiator?.lastName}`,
          "Amount (NGN)": formatAmount(amount),
          "Payment Method": (
            <span style={{ textTransform: "capitalize" }}>{paymentMethod}</span>
          ),
          "Date of Payment": formatDate(trasactionDate),
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

export { TransactionHistory };

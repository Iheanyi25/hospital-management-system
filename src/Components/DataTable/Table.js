import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NoDataState from "../EmptyState/NoDataState";
const $ = window.$;

const notReadyStyle = {
  visibility: "hidden",
  opacity: 0,
  transition: "visibility 0s linear 300ms, opacity 300ms",
};

const readyStyle = {
  visibility: "visible",
  opacity: 1,
  transition: "visibility 0s linear 0s, opacity 300ms",
};

const Table = ({
  content,
  tableID,
  exportAction,
  paginationDetails,
  pageNumber,
  setPageNumber,
  pageSize,
  setPageSize,
}) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if ($) {
      const sync = () => {
        if (content.length > 0) {
          if (exportAction) {
            $(`#custom_table_${tableID}`).DataTable({
              dom: "Bfrtip",
              buttons: ["copyHtml5", "excelHtml5", "pdfHtml5", "csvHtml5"],
            });
          } else {
            $(`#custom_table_${tableID}`).DataTable();
          }
          setIsReady(true);
        }
      };
      sync();
    }
  }, [tableID, content, exportAction]);

  return (
    <>
      <div
        className="table-responsive"
        style={isReady ? readyStyle : notReadyStyle}
      >
        <table
          className="table table-striped"
          data-paging="true"
          data-info="true"
          data-searching="true"
          id={`custom_table_${tableID}`}
        >
          {content.length > 0 && <TableContent tableContent={content} />}
        </table>
      </div>
      <div className="d-flex mt-6">
        {content.length > 0 && paginationDetails ? (
          <PaginationElement
            paginationDetails={paginationDetails}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        ) : null}
      </div>
      <div>{content.length === 0 && <NoDataState />}</div>
    </>
  );
};

export { Table };

const TableContent = ({ tableContent }) => {
  const headers = Object.keys(tableContent[0]).map((item, index) => (
    <th key={index}>{item}</th>
  ));
  const body = tableContent.map((item, i) => {
    return (
      <tr key={i}>
        {Object.values(item).map((currentValue, index) => (
          <td key={index}>{currentValue}</td>
        ))}
      </tr>
    );
  });

  return (
    <>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{body}</tbody>
    </>
  );
};

const PaginationElement = ({
  paginationDetails,
  setPageNumber,
  pageNumber,
  pageSize,
  setPageSize,
}) => {
  console.log(paginationDetails);
  const { hasNext, hasPrevious, totalPages } = paginationDetails;
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  // const x = [1, 1, 1, 1, 1, 1,1 ,1,1,1, 1,1,1 ,1,1 ,1,1 ,1,1 ,1,1 ,1,1 ,1 ,1,1, 1 ,1, 1,1,1,1,1]
  return (
    <div className="card animated fadeInUp delay-01s bg-light mt-5">
      <div className="card-body d-flex">
        <label className="mr-4 font-weight-normal">
          Show{" "}
          <select
            style={{ width: "auto", display: "inline-block" }}
            className="custom-select custom-select-sm form-control form-control-sm"
            name="serviceCategoryId"
            onChange={(e) => setPageSize(e.target.value)}
            value={pageSize}
          >
            <option>50</option>
            <option>100</option>
            <option>150</option>
            <option>200</option>
          </select>{" "}
          entries
        </label>
        <nav aria-label="...">
          <ul className="pagination">
            <li className={`page-item ${hasPrevious ? null : "disabled"}`}>
              <Link
                className="page-link"
                tabindex="-1"
                to="#"
                onClick={() => setPageNumber(pageNumber - 1)}
              >
                Previous
              </Link>
            </li>
            {pages.map((page) => (
              <li
                className={`page-item ${page === pageNumber ? "active" : null}`}
              >
                <Link
                  className="page-link"
                  to="#"
                  onClick={() => setPageNumber(page)}
                >
                  {page}
                </Link>
              </li>
            ))}
            <li className={`page-item ${hasNext ? null : "disabled"}`}>
              <Link
                className="page-link"
                to="#"
                onClick={() => setPageNumber(pageNumber + 1)}
              >
                Next
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

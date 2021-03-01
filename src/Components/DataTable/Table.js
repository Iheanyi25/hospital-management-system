import React, { useEffect, useState } from "react";
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

const Table = ({ content, tableID, exportAction }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if ($) {
      const sync = () => {
        if (content.length > 0) {
          if (exportAction) {
            $(`#custom_table_${tableID}`).DataTable({
              retrieve: true,
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

import React, { useEffect, useState } from "react";
import NoDataState from "../EmptyState/NoDataState";
import { PaginationElement } from "./PaginationElement";
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

const SelectableTable = ({
  content,
  tableID,
  exportAction,
  paginationDetails,
  pageNumber,
  setPageNumber,
  pageSize,
  setPageSize,
  totalIds,
  selectedValue,
  setSelectedValue,
}) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if ($) {
      const sync = () => {
        if (content.length > 0) {
          $(`#custom_table_${tableID}`).DataTable();
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
          className="table table-striped table-hover"
          data-paging="true"
          data-info="true"
          data-searching="true"
          id={`custom_table_${tableID}`}
        >
          {content.length > 0 && (
            <TableContent
              tableContent={content}
              totalIds={totalIds}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            />
          )}
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

export { SelectableTable };

const TableContent = ({
  tableContent,
  totalIds,
  selectedValue,
  setSelectedValue,
}) => {
  const headers = Object.keys(tableContent[0]).map((item, index) => (
    <th key={index}>{item}</th>
  ));
  const body = tableContent.map((item, i) => {
    return (
      <tr
        key={i}
        id={totalIds[i]}
        style={{cursor: 'pointer'}}
        className={selectedValue === totalIds[i] ? "text-white bg-primary" : ""}
        onClick={() => setSelectedValue(totalIds[i])}
      >
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

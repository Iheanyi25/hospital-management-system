import React, { useEffect } from "react";

let $ = undefined;
let interval = undefined;
let tableID = Math.random();
tableID = tableID.toString().replace(".", "_");

const Table = ({ content }) => {
  console.log("table updated");
  useEffect(() => {
    setJquery();
  }, []);

  const sync = () => {
    let element = $(`#custom_table_${tableID}`);
    element.DataTable();
  };

  const setJquery = () => {
    interval = setInterval(() => {
      if (window.$) {
        clearInterval(interval);
        $ = window.$;
        sync();
      }
    }, 1000);
  };

  const formatContent = () => {
    let headers = Object.keys(content[0]).map((item, index) => (
      <th key={index}>{item}</th>
    ));
    let body = content.map((item, i) => {
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

  return (
    <>
      <div className="table-responsive">
        <table
          className="table table-striped"
          data-paging="true"
          data-info="true"
          data-searching="true"
          id={`custom_table_${tableID}`}
        >
          {formatContent()}
        </table>
      </div>
    </>
  );
};

export { Table };

import React from "react";
import { Table } from "../../../../Components";
import { Link } from "react-router-dom";

export default function CreateServiceTable({ items, deleteService }) {
  let dataTable = [];
  if (items) {
    dataTable = items.map((item, index) => {
      return {
        "#": index + 1,
        Service: item.service,
        Category: item.category,
        Actions: (
          <Link
            title="Delete"
            to="#"
            onClick={() => deleteService(index)}
            className="text-danger mr-4"
          >
            <span className="btn-icon icofont-delete-alt" />
          </Link>
        ),
      };
    });
  }

  return (
    <div>
      <Table content={dataTable} emptyTable={<EmptyTable />}/>
    </div>
  );
}

const EmptyTable = () => {
  return (
    // <tr>
    //   <td colSpan="4">
        <p className="w-50 text-secondary">
          You can always change the service category, if you want to add
          different services from different categories
        </p>
    //   </td>
    // </tr>
  );
};

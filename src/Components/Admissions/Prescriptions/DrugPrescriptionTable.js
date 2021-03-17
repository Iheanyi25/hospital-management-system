import React from "react";
import { Table } from "../../DataTable";
import remove from "../../../assets/img/remove.svg";
import { Link } from "react-router-dom";

export default function DrugPrescriptionTable({
  selectedDrugs,
  removeFromSelected,
}) {
    console.log(selectedDrugs,666)
  let dataTable = [];
//   if (selectedDrugs) {
    dataTable = selectedDrugs.map((item, index) => {
      return {
        "#": <strong>{index + 1}</strong>,
        "Drug Name": <strong>{item?.name ?? "N/A"}</strong>,
        Quantity: (
          <strong>
            {Number(item?.numberOfUnits) === 1
              ? `${item?.numberOfUnits} tablet, `
              : Number(item?.numberOfUnits) > 1
              ? `${item?.numberOfUnits} tablets, `
              : null}
            {Number(item?.numberOfContainers) === 1
              ? `${item?.numberOfContainers} pack, `
              : Number(item?.numberOfContainers) > 1
              ? `${item?.numberOfContainers} packs,  `
              : null}
            {Number(item?.numberOfCartons) === 1
              ? `${item?.numberOfCartons} carton `
              : Number(item?.numberOfCartons) > 1
              ? `${item?.numberOfCartons} cartons `
              : null}
          </strong>
        ),
        Actions: (
          <Link
            title="Delete"
            to="#"
            onClick={() => removeFromSelected(index)}
            className="text-danger mr-4"
          >
            <img src={remove} alt="delete" />
          </Link>
        ),
      };
    });
//   }

  return <Table content={dataTable} emptyTable={EmptyTableState} />;
}

const EmptyTableState = () => {
  return (
    // <tr>
      <td colSpan="4">
        <p className="w-50 text-secondary">
          Search and select the drugs prescribed to the patient
        </p>
      </td>
    // </tr>
  );
};

import React from "react";
import { Table } from "../../../Components";
import formatDate from "../../../utils/formatDate";
import { Link } from "react-router-dom";

export default function DashboardPrescriptionList({ prescriptions }) {
  let dataTable = [];
  if (prescriptions) {
    dataTable = prescriptions.map((prescription, index) => {
      console.log(prescription);
      return {
        "#": ++index,
        "Patient Name": `${prescription?.patient?.firstName} ${prescription?.patient?.lastName}`,
        "Doctor Name": `${prescription?.doctor?.firstName} ${prescription?.doctor?.lastName}`,
        "Date of Prescription": formatDate(prescription?.datePrescribed) || "",
        Action: <PharmacyDashboardActionButton prescription={prescription} />,
      };
    });
  }
  return (
    <div className="card mb-0">
      <div className="card-header">Recent Prescriptions</div>
      <div className="card-body">
        <div>
          <div className="table-responsive">
            <Table content={dataTable} />
          </div>
        </div>
      </div>
    </div>
  );
}

const PharmacyDashboardActionButton = ({ prescription }) => {
  return (
    <div className="btn-group">
      <button
        type="button"
        className="btn btn-primary btn-sm btn-block dropdown-toggle"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Action
      </button>
      <div className="dropdown-menu">
        <Link
          to={`/PharmacyDrugPrescription/${prescription?.id}`}
          className="btn btn-sm btn-block"
        >
          <span className="btn-icon icofont-server mr-2" />
          Dispense
        </Link>
      </div>
    </div>
  );
};

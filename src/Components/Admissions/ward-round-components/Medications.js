import React, { useState } from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { getMedicationsUrl } from "../../../api/URLs";
import formatDate from "../../../utils/formatDate";
import { Table } from "../../DataTable";
import UpdateMedications from "../../Modals/UpdateMedications";

const Medications = ({ admissionId }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getMedications = getMedicationsUrl(admissionId, pageNumber, pageSize);
  const getMedicationsConfig = fetchConfig({
    url: getMedications,
    method: "get",
  });
  const { data } = useRequest(getMedicationsConfig, {
    revalidateOnFocus: false,
  });
  console.log(data, 11116666);
  let dataTable = [];
  if (data) {
    dataTable = data?.medications.map((medication, index) => {
      return {
        "#": ++index,
        Medication: `${medication.medication}`,
        Dose: `${medication.dosage}`,
        FreQ: `${medication?.frequency || "N/A"}`,
        Start: formatDate(medication.startDate),
        Stop: formatDate(medication.endDate),
        Status: `${medication.status}`,
      };
    });
  }
  return (
    <div className="row justify-content-center w-75 mx-auto mt-5">
      <div className="col-md-12">
        <div className="card border-light">
          <div className="card-body">
            <div className="d-flex justify-content-between align-item-between">
              <h5 className="m-0">Observation Chart</h5>
              <button
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#update-medication"
              >
                Update
              </button>
            </div>
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
          </div>
        </div>
      </div>
      <UpdateMedications />
    </div>
  );
};
export default Medications;

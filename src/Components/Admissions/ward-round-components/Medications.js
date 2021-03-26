import React, { useState } from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { getMedicationsUrl } from "../../../api/URLs";
import formatDate from "../../../utils/formatDate";
import { Table } from "../../DataTable";
import ActionButton from "../../DataTable/ActionButton";
import { AdministerMedication } from "../../Modals";
import UpdateMedications from "../../Modals/UpdateMedications";

const Medications = ({ admissionId }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getMedications = getMedicationsUrl(admissionId, pageNumber, pageSize);
  const getMedicationsConfig = fetchConfig({
    url: getMedications,
    method: "get",
  });
  const { data, mutate } = useRequest(getMedicationsConfig, {
    revalidateOnFocus: false,
  });
  console.log(data, 11116666);
  let dataTable = [];
  if (data) {
    dataTable = data?.medications.map((medication, index) => {
      const {
        administrationInstruction,
        dosage,
        frequency,
        startDate,
        endDate,
        status,
      } = medication;
      return {
        "#": ++index,
        "Administration Instructions": `${administrationInstruction ?? "N/A"}`,
        Drug: `${medication?.drug?.name ?? "N/A"}`,
        Dosage: `${dosage ?? "N/A"}`,
        FreQ: `${frequency ?? "N/A"}`,
        Start: formatDate(startDate ?? "N/A"),
        Stop: formatDate(endDate ?? "N/A"),
        Status: `${status ?? "N/A"}`,
        Action: <ActionTableAction />,
      };
    });
  }
  return (
    <div className="row justify-content-center mx-auto mt-5">
      <div className="col-md-12">
        <div className="card border-light">
          <div className="card-body">
            <div className="d-flex justify-content-between align-item-between">
              <h5 className="m-0">Medication</h5>
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
      <UpdateMedications admissionId={admissionId} mutate={mutate} />
    </div>
  );
};

const ActionTableAction = () => {
  return (
    <>
      <ActionButton>
        <button
          data-toggle="modal"
          data-target="#administer-medication"
          // onClick={() => deleteService(id)}
          className="btn btn-sm btn-block"
        >
          <span className="btn-icon icofont-server mr-2" />
          Update status
        </button>
      </ActionButton>
      <AdministerMedication />
    </>
  );
};
export default Medications;

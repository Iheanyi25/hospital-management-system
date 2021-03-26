import React, { useState } from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { getDrugMedicationsUrl } from "../../../api/URLs";
import { Link } from "react-router-dom";
import formatDate from "../../../utils/formatDate";
import { Table } from "../../DataTable";
import ActionButton from "../../DataTable/ActionButton";
import { UpdateMedicationStatus } from "../../Modals";
import UpdateMedications from "../../Modals/UpdateMedications";

const Medications = ({ admissionId }) => {
  const [medicationId, setMedicationId] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getMedications = getDrugMedicationsUrl(admissionId, pageNumber, pageSize);
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
        id,
      } = medication;
      return {
        "#": ++index,
        "Administration Instructions": `${administrationInstruction ?? "N/A"}`,
        Drug: `${medication?.drug?.name ?? "N/A"}`,
        Dosage: `${dosage ?? "N/A"}`,
        FreQ: `${frequency ?? "N/A"}`,
        Start: formatDate(startDate ?? "N/A"),
        Stop: formatDate(endDate ?? "N/A"),
        Status: (
          <span
            className={
              status === "Completed"
                ? "text-success"
                : status === "Discontinued"
                ? "text-danger"
                : "text-warning"
            }
          >
            {status ?? "N/A"}
          </span>
        ),
        Action: <ActionTableAction id={id} setMedicationId={setMedicationId} />,
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
      <UpdateMedicationStatus medicationId={medicationId} mutate={mutate} />
    </div>
  );
};

const ActionTableAction = ({ id, setMedicationId }) => {
  return (
    <>
      <ActionButton>
      <Link
        to={{
          // pathname: `/ManageHealthPlanPatients/${healthPlanId}`,
          // state: healthPlanName,
        }}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Medication Status
      </Link>
        <button
          data-toggle="modal"
          data-target="#update-medication-status"
          onClick={() => setMedicationId(id)}
          className="btn btn-sm btn-block"
        >
          <span className="btn-icon icofont-server mr-2" />
          Update status
        </button>
      </ActionButton>
    </>
  );
};
export default Medications;

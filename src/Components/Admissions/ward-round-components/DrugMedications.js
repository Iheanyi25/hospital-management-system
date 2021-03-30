import React, { useState } from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { getDrugMedicationsUrl } from "../../../api/URLs";
import { Link } from "react-router-dom";
import formatDate from "../../../utils/formatDate";
import { Table } from "../../DataTable";
import ActionButton from "../../DataTable/ActionButton";
import { UpdateMedicationStatus } from "../../Modals";
import UpdateDrugMedications from "../../Modals/UpdateDrugMedications";
import { AdministerDrugMedications } from "../../Modals/AdministerDrugMedication";

const Medications = ({ admissionId }) => {
  const [medicationId, setMedicationId] = useState("");
  const [drugId, setdrugId] = useState("")
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getMedications = getDrugMedicationsUrl(
    admissionId,
    pageNumber,
    pageSize
  );
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
        Action: <ActionTableAction id={id} drugId={medication?.drug?.id} setdrugId={setdrugId} setMedicationId={setMedicationId} />,
      };
    });
  }
  return (
    <div className="row justify-content-center mx-auto mt-5">
      <div className="col-md-12">
        <div className="card border-light">
          <div className="card-body">
            <div className="d-flex justify-content-between align-item-between mr-4">
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
                key={`drugMed-${data?.medications?.length}`}
                tableID={`drugMed-${data?.medications?.length}`}
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
      <UpdateDrugMedications admissionId={admissionId} mutate={mutate} />
      <UpdateMedicationStatus medicationId={medicationId} mutate={mutate} />
      <AdministerDrugMedications admissionId={admissionId} drugId={drugId} mutate={mutate} />
    </div>
  );
};

const ActionTableAction = ({ id, setMedicationId, setdrugId, drugId }) => {
  return (
    <>
      <ActionButton>
        <Link
          to="#"
          data-toggle="modal"
          data-target="#admininster-drugMedication"
          onClick={() => setdrugId(drugId)}
          className="btn btn-sm btn-block"
        >
          <span className="btn-icon icofont-server mr-2" />
          Administer Drugs
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

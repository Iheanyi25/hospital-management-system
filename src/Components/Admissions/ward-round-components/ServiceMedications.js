import React, { useState } from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { getServiceMedicationsUrl } from "../../../api/URLs";
import formatDate from "../../../utils/formatDate";
import { Table } from "../../DataTable";
import ActionButton from "../../DataTable/ActionButton";
import { UpdateMedicationStatus } from "../../Modals";
import UpdateServiceMedication from "../../Modals/UpdateServiceMedication";

const ServiceMedications = ({ admissionId }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getServiceMedications = getServiceMedicationsUrl(admissionId, pageNumber, pageSize);
  const getServiceMedicationsConfig = fetchConfig({
    url: getServiceMedications,
    method: "get",
  });
  const { data, mutate } = useRequest(getServiceMedicationsConfig, {
    revalidateOnFocus: false,
  });

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
        Action: <ActionTableAction id={id} mutate={mutate} />,
      };
    });
  }
  return (
    <div className="row justify-content-center mx-auto mt-5">
      <div className="col-md-12">
        <div className="card border-light">
          <div className="card-body">
            <div className="d-flex justify-content-between align-item-between mb-4">
              <h5 className="m-0">Service Medications </h5>
              <button
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#update-service-medication"
              >
                Update
              </button>
            </div>
            {data && (
              <Table
                content={dataTable}
                key={`serviceMed-${data?.medications?.length}`}
                tableID={`serviceMed-${data?.medications?.length}`}
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
      <UpdateServiceMedication admissionId={admissionId} mutate={mutate} />
      {/* <UpdateMedicationStatus  medicationId={medicationId} mutate={mutate} /> */}
    </div>
  );
};

const ActionTableAction = ({ id, mutate }) => {
  return (
    <>
      <ActionButton>
        <button
          data-toggle="modal"
          data-target={`#update-medication-status-${id}`}
          className="btn btn-sm btn-block"
        >
          <span className="btn-icon icofont-server mr-2" />
          Update status
        </button>
      </ActionButton>
      <UpdateMedicationStatus  medicationId={id} mutate={mutate} medicationType="service" />
    </>
  );
};
export default ServiceMedications;

import { observer } from "mobx-react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../api/fetcher";
import {
  getServiceMedicationsUrl,
  postAdministerServiceMedicationUrl,
} from "../../../api/URLs";
import { UserContext } from "../../../mobx/UserState";
import formatDate from "../../../utils/formatDate";
import { notification } from "../../../utils/notification";
import { Table } from "../../DataTable";
import ActionButton from "../../DataTable/ActionButton";
import { UpdateMedicationStatus } from "../../Modals";
import UpdateServiceMedication from "../../Modals/UpdateServiceMedication";
import { DisplayNotes } from "../../Modals/DisplayNotes";

const ServiceMedications = observer(({ admissionId }) => {
  const{
    user: { id: initiatorId},
  } = useContext(UserContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const getServiceMedications = getServiceMedicationsUrl(
    admissionId,
    pageNumber,
    pageSize
  );
  const getServiceMedicationsConfig = fetchConfig({
    url: getServiceMedications,
    method: "get",
  });
  const { data, mutate } = useRequest(getServiceMedicationsConfig, {
    revalidateOnFocus: false,
  });

  const administerService = async (serviceId) => {
    const postAdministerServiceMedication = postAdministerServiceMedicationUrl();
    const postAdministerServiceMedicationConfig = fetchConfig({
      url: postAdministerServiceMedication,
      method: "post",
      data: {serviceId, admissionId, initiatorId },
    });
    try {
      let res = await fetchWrapper(postAdministerServiceMedicationConfig);
      console.log(res, 565);
      if (res.status === 200) {
        notification.success({ message: res.data.message });
      }
    } catch (error) {
      console.log(error);
      notification.error({ message: error?.response?.data.message });
    }
  };

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
        Service: `${medication?.service?.name ?? "N/A"}`,
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
        Action: (
          <ActionTableAction
            id={id}
            mutate={mutate}
            administerService={administerService}
            serviceId={medication?.serviceId}
            serviceNotes={`${administrationInstruction ?? "N/A"}`}
          />
        ),
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
    </div>
  );
});

const ActionTableAction = ({ id, serviceId, administerService, mutate, serviceNotes }) => {
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
        <Link
          data-toggle="modal"
          data-target={`#notes-${id}`}
          className="btn btn-sm btn-block"
        >
          Service Medication
        </Link>
        <button 
        onClick={() => administerService(serviceId)}
        className="btn btn-sm btn-block"
        >
          Administer Service
        </button>
      </ActionButton>
      <UpdateMedicationStatus
        medicationId={id}
        mutate={mutate}
        medicationType="service"
      />
       <DisplayNotes id={id} details={{title: "Administration Instructions", body: serviceNotes}}/>
    </>
  );
};
export default ServiceMedications;

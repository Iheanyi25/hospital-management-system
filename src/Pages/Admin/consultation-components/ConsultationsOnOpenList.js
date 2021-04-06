import { observer } from "mobx-react";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../api/fetcher";
import {
  getPatientConsultationsOnOpenListUrl,
  deleteConsultationUrl,
} from "../../../api/URLs";
import { Table } from "../../../Components";
import ActionButton from "../../../Components/DataTable/ActionButton";
import { ReAssign } from "../../../Components/Modals/ReAssignModal";
import { UserContext } from "../../../mobx/UserState";
import formatDate from "../../../utils/formatDate";
import formatTme from "../../../utils/formatTime";
import { notification } from "../../../utils/notification";

const ConsultationsOnOpenList = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const patientsAttentedToCount = getPatientConsultationsOnOpenListUrl(
    pageNumber,
    pageSize
  );
  const getPatientsAttentedToCountConfig = fetchConfig({
    url: patientsAttentedToCount,
    method: "get",
  });
  const { data, error, mutate } = useRequest(getPatientsAttentedToCountConfig, {
    revalidateOnFocus: false,
  });

  const deleteConsultation = async (id) => {
    try {
      const deleteConsultation = deleteConsultationUrl();
      const deleteConsultationConfig = fetchConfig({
        url: deleteConsultation,
        data: JSON.stringify({ consultationId: id }),
        method: "post",
      });
      const res = await fetchWrapper(deleteConsultationConfig);
      await mutate();
      notification.success({ message: res.data.message });
    } catch (error) {
      notification.error({ message: error?.response?.data?.message });
    }
  };
  if (error) return <div>failed to load</div>;
  let tableData = [];
  if (data) {
    tableData = data.consultations.map((consultation, index) => {
      return {
        "#": ++index,
        Patient: `${consultation.patient?.lastName} ${consultation.patient?.firstName}`,
        Doctor: `${consultation.doctor?.lastName || "unassigned"} ${
          consultation.doctor?.firstName || ""
        } `,
        "Consultation Date": formatDate(consultation?.dateOfConsultation),
        "Consultation Time": formatTme(consultation?.dateOfConsultation),
        Title: consultation?.consultationTitle,
        "Reason for consultation": consultation?.reasonForConsultation,
        Actions: (
          <ConsultationsOnOpenListActionTable
            consultation={consultation}
            deleteConsultation={deleteConsultation}
            mutate={mutate}
          />
        ),
      };
    });
  }

  return (
    <div>
      <Table
        content={tableData}
        tableID={"openList" + data?.consultations.length}
        key={"openList" + data?.consultations.length}
        paginationDetails={data?.paginationDetails}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export const ConsultationsOnOpenListActionTable = observer(
  ({ consultation, deleteConsultation, mutate }) => {
    const {
      user: { userType },
    } = useContext(UserContext);
    return (
      <div>
        <ActionButton>
          {userType === "Admin" ? (
            <Link
              title="Go For Clerking"
              to={{
                pathname: `/DoctorClarking`,
                state: {
                  id: consultation.id,
                  type: "consultation",
                  patient: consultation.patient,
                },
              }}
              key={`/DoctorClarking`}
              className="btn btn-sm btn-block"
            >
              <span className="btn-icon icofont-stethoscope-alt mr-2" />
              Go For Clerking
            </Link>
          ) : null}
          <Link
            title="Go For Pre-consultation"
            to={
              userType === "Nurse"
                ? `/NursePreConsultation/${consultation.patient.id}`
                : `/AdminPreConsultation/${consultation.patient.id}`
            }
            className="btn btn-sm btn-block"
          >
            <span className="btn-icon icofont-stethoscope-alt mr-2" />
            Go For Pre-consultation
          </Link>
          <Link
            title="Clerking History"
            to={{
              pathname: `/ViewClarkingHistory`,
              state: consultation.patient,
            }}
            className="btn btn-sm btn-block"
          >
            <span className="btn-icon icofont-stethoscope-alt mr-2" />
            Clerking History
          </Link>
          <button
            className="btn btn-sm btn-block"
            data-toggle="modal"
            data-target={`#reassign-patient-${consultation.id}`}
          >
            <span className="mr-3 btn-icon icofont-stethoscope-alt" />
            Assign to Doctor
          </button>
          <button
            className="btn btn-sm btn-block"
            onClick={() => deleteConsultation(consultation.id)}
          >
            <span className="mr-3 btn-icon icofont-delete-alt" />
            Delete Consultation
          </button>
        </ActionButton>
        <ReAssign
          idType="consultationId"
          route={"ReassignAppointment"}
          reRun={mutate}
          id={consultation.id}
        />
      </div>
    );
  }
);
export default ConsultationsOnOpenList;

import React, {useState} from "react";
import { Table } from "../../../Components";
import { ReAssign } from "../../../Components/Modals/ReAssignModal";
import { fetchWrapper } from "../../../api/fetcher";
import { deleteConsultationUrl } from "../../../api/URLs";
import { fetchConfig } from "../../../api/fetchConfig";
import {
  AttachToDoctorsTableActions,
  AttendedPatientsTableActions,
  OpenListTableActions,
} from "./ConsultationsTableActions";
import { notification } from "../../../utils/notification";

export default function ConsultationTableContainer({
  consultations,
  category,
  mutate,
}) {

  let tableData = [];
  if (consultations) {
    tableData = consultations.map((consultation, index) => {
      return {
        "#": ++index,
        Title: consultation?.consultationTitle,
        "Reason for consultation": consultation?.reasonForConsultation,
        Doctor: `${consultation.doctor?.lastName || "unassigned"} ${
          consultation.doctor?.firstName || ""
        } `,
        Patient: `${consultation.patient?.lastName} ${consultation.patient?.firstName}`,
        "Consultation Date": new Date(
          consultation?.dateOfConsultation
        ).toLocaleDateString(),
        "Consultation Time": new Date(
          consultation?.dateOfConsultation
        ).toLocaleTimeString(),
        Actions: (
          <ConsultationTableActionsContainer
            consultation={consultation}
            category={category}
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
        tableID={category + consultations.length}
        key={category + consultations.length}
      />
    </div>
  );
}

const ConsultationTableActionsContainer = ({
  consultation,
  category,
  mutate,
}) => {
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
        const errMessage = error?.response?.data?.message || "An error occurred";
        notification.error({ message: errMessage });
      }
  };

  const categories = {
    openList: (
      <OpenListTableActions
        consultation={consultation}
        deleteConsultation={deleteConsultation}
      />
    ),
    attendedPatients: <AttendedPatientsTableActions consultation={consultation} />,
    attachedToDoctors: (
      <  AttachToDoctorsTableActions
        consultation={consultation}
        deleteConsultation={deleteConsultation}
      />
    ),
  };

  return (
    <div>
      {categories[category] || "No action"}
      {categories[category] !== "completed" && (
        <ReAssign
         idType="consultationId"
          route={"ReassignAppointment"}
          reRun={mutate}
          id={consultation.id}
        />
      )}
    </div>
  );
};

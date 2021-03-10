import React from "react";
import { Table } from "../../../Components";
import DoctorImage from "../../../assets/img/DoctorIcon.svg";
import {
  CompletedPatientConsultationTableAction,
  PendingPatientConsultationTableAction,
} from "./PatientConsultationTableAction";
import {
  cancelPatientConsulationsUrl,
} from "../../../api/URLs";
import { notification } from "../../../utils/notification";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper } from "../../../api/fetcher";

export default function PatientConsultationTableContainer({
  consultations,
  category,
  mutate,
}) {
  let tableData = [];
  if (consultations) {
    tableData = consultations.map((consultation) => {
      return {
        "#": (
          <img
            src={DoctorImage}
            alt="hello"
            width={40}
            height={40}
            className="rounded-500"
          />
        ),
        "Doctor's Name": consultation?.consultationTitle,
        "Consultation Title": consultation?.reasonForConsultation,
        "Reason For Consultation": `${
          consultation.doctor?.lastName || "unassigned"
        } ${consultation.doctor?.firstName || ""} `,
        Date: new Date(consultation.dateOfConsultation).toDateString(),
        Actions: (
          <PatientConsultationTableActionsContainer
            consultation={consultation}
            category={category}
            mutate={mutate}
          />
        ),
      };
    });
  }

  console.log(tableData,55555)

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

const PatientConsultationTableActionsContainer = ({
  consultation,
  category,
  mutate,
}) => {

 const cancelConsultation = async (id) => {
    try {
      const cancelPatientConsulations = cancelPatientConsulationsUrl(id);
      const cancelPatientConsulationsConfig = fetchConfig({
        url: cancelPatientConsulations,
        method: "patch",
      });
      const res = await fetchWrapper(cancelPatientConsulationsConfig);
      notification.success({ message: res.data.message });
      await mutate();
    } catch (error) {
      console.log(error);
      notification.error({ message: error?.response?.data?.message });
    }
  };
  const categories = {
    pending: (
      <PendingPatientConsultationTableAction
        id={consultation.id}
        cancelConsultation={cancelConsultation}
      />
    ),
    completed: (
      <CompletedPatientConsultationTableAction consultation={consultation} />
    ),
  };

  return <div>{categories[category] || " "}</div>;
};

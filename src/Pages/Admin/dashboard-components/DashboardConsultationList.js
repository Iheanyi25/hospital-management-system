import React from "react";
import { Table } from "../../../Components";
import formatDate from "../../../utils/formatDate";

export default function DashboardConsultationList({ consultations }) {
  let dataTable = [];
  if (consultations) {
    dataTable = consultations.map((consultation, index) => {
      return {
        "#": ++index,
        "Consultation Title": consultation.consultationTitle,
        "Patient Name": `${consultation?.patient?.firstName} ${consultation?.patient?.lastName}`,
        "Doctor Name": `${consultation?.doctor?.firstName} ${consultation?.doctor?.lastName}`,
        Date: formatDate(consultation.dateOfConsultation) || "",
        Status: consultation.isCompleted
          ? "COMPLETED"
          : consultation.isCancelled
          ? "CANCELLED"
          : consultation.isExpired
          ? "EXPIRED"
          : "PENDING"
      };
    });
  }

  return (
    <div className="col col-md-12">
      <div className="card mb-0">
        <div className="card-header">Doctor Consultation Queue</div>
        <div className="card-body">
          <div className="table-responsive">
            {consultations && <Table content={dataTable} />}
          </div>
        </div>
      </div>
    </div>
  );
}

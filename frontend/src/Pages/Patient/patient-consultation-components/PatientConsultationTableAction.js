import React from "react";
import { Link } from "react-router-dom";
import ActionButton from "../../../Components/DataTable/ActionButton";

export const CompletedPatientConsultationTableAction = () => {
  return (
    <ActionButton>
          <Link
            type="button"
            className="btn btn-primary"
            to="/PatientClarkingHistory"
          >
            View Clerking History
          </Link>
    </ActionButton>
  );
};

export const PendingPatientConsultationTableAction = ({ id, cancelConsultation }) => {
  return (
    <ActionButton>
          <button
            type="button"
            className="btn btn-danger"
            onClick={(e) => cancelConsultation(id)}
          >
            Cancel Consultation
          </button>
    </ActionButton>
  );
};

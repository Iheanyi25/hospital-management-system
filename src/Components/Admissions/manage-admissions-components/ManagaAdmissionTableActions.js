import React from "react";
import { Link } from "react-router-dom";
import ActionButton from "../../DataTable/ActionButton";

// Everything goes in here at first
export const AdminActionTable = ({
  admissionId,
  patient,
  appointmentOrConsultationId,
  admissionNote,
  dischargeNote,
  setNoteDetails,
  dischargeStatus,
}) => {
  return (
    <div>
      <ActionButton>
        {dischargeStatus ? (
          <Link
            data-toggle="modal"
            data-target="#notes"
            className="btn btn-sm btn-block"
            onClick={() =>
              setNoteDetails({ title: "Discharge Notes", body: dischargeNote })
            }
          >
            <span className="btn-icon icofont-server mr-2" />
            Discharge Notes
          </Link>
        ) : (
          <>
            <Link
              data-toggle="modal"
              data-target="#notes"
              className="btn btn-sm btn-block"
              onClick={() =>
                setNoteDetails({
                  title: "Admission Notes",
                  body: admissionNote,
                })
              }
            >
              <span className="btn-icon icofont-server mr-2" />
              Admission Notes
            </Link>
            <Link
              to={`/AdminCreateAdmissionServiceRequest/${admissionId}`}
              className="btn btn-sm btn-block"
            >
              <span className="btn-icon icofont-server mr-2" />
              Request a service
            </Link>
          </>
        )}
        <Link
          to={{
            pathname: `/AdminWardRoundNotes/${admissionId}`,
            state: { patient, appointmentOrConsultationId, dischargeStatus },
          }}
          className="btn btn-sm btn-block"
        >
          <span className="btn-icon icofont-server mr-2" />
          Manage Admission
        </Link>
        {/* <Link
          to={{
            pathname: `/AdminManageAdmissionPrescriptions/${admissionId}`,
            state: patientName,
          }}
          className="btn btn-sm btn-block"
        >
          <span className="btn-icon icofont-server mr-2" />
          Prescriptions
        </Link> */}
        <Link
          to={`/AdminManageAdmissionServiceRequest/${admissionId}`}
          className="btn btn-sm btn-block"
        >
          <span className="btn-icon icofont-server mr-2" />
          Lab Services
        </Link>
        <Link
          to={{
            pathname: `/AdminManageAdmissionInvoices/${admissionId}`,
            state: patient.id,
          }}
          className="btn btn-sm btn-block"
        >
          <span className="btn-icon icofont-server mr-2" />
          Manage Invoices
        </Link>
      </ActionButton>
    </div>
  );
};

export const AccountantTable = ({ admissionId, patient }) => {
  return (
    <ActionButton>
      <Link
        to={{
          pathname: `/AccountantManageAdmissionInvoices/${admissionId}`,
          state: patient.id,
        }}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Manage Invoices
      </Link>
    </ActionButton>
  );
};

export const NurseActionTable = ({ admissionId, patient }) => {
  return (
    <ActionButton>
      <Link
        to={{
          pathname: `/NurseWardRoundNotes/${admissionId}`,
          state: patient,
        }}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Manage Admission
      </Link>
    </ActionButton>
  );
};

export const PharmacyActionTable = ({ admissionId, patientName }) => {
  return (
    <ActionButton>
      <Link
        to={{
          pathname: `/PharmacyManageAdmissionPrescriptions/${admissionId}`,
          state: patientName,
        }}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Prescriptions
      </Link>
    </ActionButton>
  );
};

export const LabActionTable = ({ admissionId }) => {
  return (
    <ActionButton>
      <Link
        to={`/LabManageAdmissionServiceRequest/${admissionId}`}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Lab Services
      </Link>
      <Link
        to={`/AdminWardRoundNotes/${admissionId}`}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Manage Admission
      </Link>
    </ActionButton>
  );
};

export const DoctorActionTable = ({ admissionId, patient }) => {
  return (
    <ActionButton>
      <Link
        to={{
          pathname: `/DoctorWardRoundNotes/${admissionId}`,
          state: patient,
        }}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Manage Admission
      </Link>
    </ActionButton>
  );
};

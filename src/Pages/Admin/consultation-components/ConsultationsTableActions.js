import React from "react";
import { Link } from "react-router-dom";
import ActionButton from "../../../Components/DataTable/ActionButton";

export  const OpenListTableActions = ({
  consultation,
  deleteConsultation,
})=> {
  return (
    <ActionButton>
      <SharedTableAction consultation={consultation} />
      <SharedTableActionTwo
        consultation={consultation}
        deleteConsultation={deleteConsultation}
      />
    </ActionButton>
  );
}

export const AttachToDoctorsTableActions = ({
  consultation,
  deleteConsultation,
}) => {
  return (
    <ActionButton>
      <SharedTableAction consultation={consultation} />
      <SharedTableActionTwo
        consultation={consultation}
        deleteConsultation={deleteConsultation}
      />
    </ActionButton>
  );
};


export const AttendedPatientsTableActions = ({consultation}) => {
    return (
        <div className="actions">
          <Link
            title="Pre-consultation"
            to={`/AdminPreConsultation/${consultation.id}`}
            className="btn btn-primary btn-sm btn-square rounded-pill"
          >
            <span className="btn-icon icofont-stethoscope-alt" />
          </Link>
          <Link
            title="Clarking History"
            to={{
              pathname: "/ViewClarkingHistory",
              state: {
                id: consultation.patient.id,
                firstName: consultation.patient.firstName,
                lastName: consultation.patient.lastName,
              },
            }}
            className="btn btn-sm btn-block"
          >
            <span className="mr-3 btn-icon icofont-stethoscope-alt" />
            Clarking History
          </Link>
        </div>
      );
};

export const SharedTableAction = ({ consultation }) => {
  const commonTableFunctionsObj = [
    {
      text: "Go For Clerking",
      path: `/DoctorClarking`,
      iconClass: "mr-3 btn-icon icofont-stethoscope-alt",
      state: {
        id: consultation.id,
        type: "consultation",
        patient: consultation.patient,
      },
    },
    {
      text: "Clarking History",
      path: `/ViewClarkingHistory`,
      iconClass: "mr-3 btn-icon icofont-stethoscope-alt",
      state: consultation.patient
    },
  ];

  return (
    <div>
      {commonTableFunctionsObj.map(({ path, text, iconClass, state }) => (
        <Link
          to={{
            pathname: path,
            state
          }}
          key={path}
          className="btn btn-sm btn-block"
        >
          <span className={iconClass} />
          {text}
        </Link>
      ))}
    </div>
  );
};

const SharedTableActionTwo = ({
  consultation,
  deleteConsultation,
}) => {
  return (
    <div>
      <button
        className="btn btn-sm btn-block"
        data-toggle="modal"
        data-target={`#reassign-patient-${consultation.id}`}
      >
        <span className="mr-3 btn-icon icofont-stethoscope-alt" />
        ReAssign to Doctor
      </button>
      <button
        className="btn btn-sm btn-block"
        onClick={() => deleteConsultation(consultation.id)}
      >
        <span className="mr-3 btn-icon icofont-delete-alt" />
        Delete Consultation
      </button>
    </div>
  );
};

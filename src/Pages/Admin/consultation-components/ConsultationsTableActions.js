import { observer } from "mobx-react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ActionButton from "../../../Components/DataTable/ActionButton";
import { UserContext } from "../../../mobx/UserState";

export const OpenListTableActions = ({ consultation, deleteConsultation }) => {
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

export const AttendedPatientsTableActions = observer(({ consultation }) => {
  // const {
  //   user: { userType },
  // } = useContext(UserContext);
  return (
    <ActionButton>
      {/* <Link
        title="Pre-consultation"
        to={
          userType === "Nurse"
            ? `/NursePreConsultation/${consultation.patient.id}`
            : `/AdminPreConsultation/${consultation.patient.id}`
        }
        className="btn btn-sm btn-block"
      >
        <span className="mr-3 btn-icon icofont-stethoscope-alt" />
        Pre-consultation
      </Link> */}
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
    </ActionButton>
  );
});

export const SharedTableAction = observer(({ consultation }) => {
  const {
    user: { userType },
  } = useContext(UserContext);
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
      text: "Go For Pre-consultation",
      path:
        userType === "Nurse"
          ? `/NursePreConsultation/${consultation.patient.id}`
          : `/AdminPreConsultation/${consultation.patient.id}`,
      iconClass: "mr-3 btn-icon icofont-stethoscope-alt",
    },
    {
      text: "Clarking History",
      path: `/ViewClarkingHistory`,
      iconClass: "mr-3 btn-icon icofont-stethoscope-alt",
      state: consultation.patient,
    },
  ];

  return (
    <div>
      {commonTableFunctionsObj.map(({ path, text, iconClass, state }) => {
        return userType === "Nurse" && path === "/DoctorClarking" ? null : (
          <Link
            to={{
              pathname: path,
              state,
            }}
            key={path}
            className="btn btn-sm btn-block"
          >
            <span className={iconClass} />
            {text}
          </Link>
        );
      })}
    </div>
  );
});

const SharedTableActionTwo = ({ consultation, deleteConsultation }) => {
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

import React, { useContext } from "react";
import ActionButton from "../../../Components/DataTable/ActionButton";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { UserContext } from "../../../mobx/UserState";

export const AcceptedAppointmentTableAction = ({
  appointment,
  deleteAppointment,
}) => {
  return (
    <ActionButton>
      <SharedTableAction patient={appointment.patient} />
      <SharedTableActionTwo
        appointment={appointment}
        deleteAppointment={deleteAppointment}
      />
    </ActionButton>
  );
};

export const CompletedAppointmentTableAction = ({ appointment }) => {
  return (
    <ActionButton>
      <SharedTableAction patient={appointment.patient} />
    </ActionButton>
  );
};

export const PendingAppointmentTableAction = observer(
  ({ appointment, deleteAppointment }) => {
    const {
      user: { userType },
    } = useContext(UserContext);
    return (
      <ActionButton>
        <SharedTableAction patient={appointment.patient} userType={userType} />
        {userType === "Nurse" ? null : (
          <Link
            title="Go for clerking"
            to={{
              pathname: "/DoctorClarking",
              state: {
                id: appointment.id,
                type: "appointment",
                patient: appointment.patient,
              },
            }}
            className=" btn btn-sm btn-block"
          >
            <span className="mr-3 btn-icon icofont-user" />
            Go for Clerking
          </Link>
        )}
        <SharedTableActionTwo
          appointment={appointment}
          deleteAppointment={deleteAppointment}
        />
      </ActionButton>
    );
  }
);

export const SharedTableAction = ({ patient, userType }) => {
  const commonTableFunctionsObj = [
    {
      text: "Pre Consultation",
      path:
        userType === "Nurse"
          ? `/NursePreConsultation/${patient.id}`
          : `/AdminPreConsultation/${patient.id}`,
      iconClass: "mr-3 btn-icon icofont-stethoscope-alt",
    },
    {
      text: "Clerking History",
      path: `/ViewClarkingHistory`,
      iconClass: "mr-3 btn-icon icofont-stethoscope-alt",
    },
  ];

  return (
    <div>
      {commonTableFunctionsObj.map(({ path, text, iconClass }) => (
        <Link
          to={{
            pathname: path,
            state: patient,
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

const SharedTableActionTwo = ({ appointment, deleteAppointment }) => {
  return (
    <div>
      <button
        className="btn btn-sm btn-block"
        data-toggle="modal"
        data-target={`#reassign-patient-${appointment.id}`}
      >
        <span className="mr-3 btn-icon icofont-stethoscope-alt" />
        ReAssign to Doctor
      </button>
      <button
        className="btn btn-sm btn-block"
        onClick={() => deleteAppointment(appointment.id)}
      >
        <span className="mr-3 btn-icon icofont-delete-alt" />
        Delete Appointment
      </button>
    </div>
  );
};

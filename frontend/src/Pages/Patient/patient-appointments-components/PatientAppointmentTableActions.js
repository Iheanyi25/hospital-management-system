import React from 'react'
import { Link } from "react-router-dom";
import ActionButton from '../../../Components/DataTable/ActionButton';


export const  PendingPatientAppointmentTableAction = ({id, cancelAppointment}) => {
    return (
        <ActionButton>
            <button
                type="button"
                className="btn btn-danger"
                onClick={() => cancelAppointment(id)}
              >
                Cancel Appointment
              </button>
        </ActionButton>
    )
}

export const  CompletedPatientAppointmentTableAction = () => {
    return (
        <ActionButton>
            <div>
            <Link
                type="button"
                className="btn btn-primary"
                to="/PatientClarkingHistory"
              >
                View Clerking History
              </Link>
            </div>
        </ActionButton>
    )
}

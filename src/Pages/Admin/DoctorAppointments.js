import React from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import Appointments from "../Doctor/Appointments";


const DoctorAppointments = () => {
  const params = useParams()

  return (
    <Appointments doctorId={params.doctorId} />
  )
}

export default observer(DoctorAppointments);

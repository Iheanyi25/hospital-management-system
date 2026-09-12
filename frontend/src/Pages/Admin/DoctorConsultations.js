import React from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import Consultations from "../Doctor/Consultations";


const DoctorConsultations = () => {
  const params = useParams()
  console.log(params,7777)
  return (
    <Consultations doctorId={params.doctorId} />
  )
}

export default observer(DoctorConsultations);

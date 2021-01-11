import { observer } from "mobx-react";
import React, { useContext } from "react";
import { PatientProfile } from "../../Components/Profiles";
import { UserContext } from "../../mobx/UserState";

const ViewPatientProfile = () => {
  const { user } = useContext(UserContext);
  return <PatientProfile patientId={user.id} />;
};

export default observer(ViewPatientProfile);

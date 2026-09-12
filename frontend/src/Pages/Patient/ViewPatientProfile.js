import React, { useContext } from "react";
import { observer } from "mobx-react";
import { UserContext } from "../../mobx/UserState";
import { PatientProfile } from "../../Components/Profiles";

const ViewPatientProfile = observer(({ match }) => {
  const { id } = match.params;
  const { user } = useContext(UserContext);
  return (
    <>
      <PatientProfile patientId={id ? id : user.id} />
    </>
  );
});

export default ViewPatientProfile;

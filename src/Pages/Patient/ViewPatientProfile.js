import { observer } from "mobx-react";
import React, { useContext } from "react";
import { PatientProfile } from "../../Components/Profiles";
import { UserContext } from "../../mobx/UserState";

const ViewPatientProfile = observer(() => {
	const { user: { id } } = useContext(UserContext)
  return (
    <PatientProfile
      patientId={id}
    />
  );
});

export default ViewPatientProfile;

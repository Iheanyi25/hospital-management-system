import React, { useContext } from "react";
import { NurseProfile } from "../../Components/Profiles";
import { observer } from "mobx-react";
import { UserContext } from "../../mobx/UserState";

const ViewNurseProfile = observer(({ match }) => {
  const { id } = match.params;
  const { user } = useContext(UserContext);
  return (
    <>
      <NurseProfile nurseId={id ? id : user.id} />
    </>
  );
});

export default ViewNurseProfile;

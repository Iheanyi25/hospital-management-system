import React, { useContext } from "react";
import { LabProfile } from '../../Components/Profiles'
import { observer } from "mobx-react";
import { UserContext } from "../../mobx/UserState";

const ViewLabProfile = observer(({ match }) => {
  const { id } = match.params;
  const { user } = useContext(UserContext);
  return (
    <>
      <LabProfile labId={id ? id : user.id} />
    </>
  );
});

export default ViewLabProfile;

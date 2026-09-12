import React, { useContext } from "react";
import { WardPersonnelProfile } from "../../Components/Profiles";
import { observer } from "mobx-react";
import { UserContext } from "../../mobx/UserState";

const ViewWardPersonnelProfile = observer(({ match }) => {
  const { id } = match.params;
  const { user } = useContext(UserContext);
  return (
    <>
      <WardPersonnelProfile wardPersonnelId={id ? id : user.id} />
    </>
  );
});

export default ViewWardPersonnelProfile;

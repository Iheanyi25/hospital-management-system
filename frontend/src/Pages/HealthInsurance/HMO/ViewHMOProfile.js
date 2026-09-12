import React, { useContext } from "react";
import { observer } from "mobx-react";
import { HMOProfile } from "../../../Components/Profiles/HMOProfile";
import { UserContext } from "../../../mobx/UserState";

const ViewHMOProfile = observer(({ match }) => {
  const { id } = match.params;
  const { user: { id: userId } } = useContext(UserContext);
  return (
    <>
      <HMOProfile hmoId={id ? id : userId} />
    </>
  );
});

export default ViewHMOProfile;